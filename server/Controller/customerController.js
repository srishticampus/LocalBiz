const customerModel=require("../Models/customerModel");
const bcrypt=require("bcryptjs");
const multer=require("multer");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../Utils/emailService");

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./uploads")
    },
    filename:(req,file,cb)=>{
        const prefix="profile-";
        const fullName=file.originalname;
        const extension=file.originalname.split(".").pop();
        const fileName=prefix + fullName.substring(0,fullName.lastIndexOf("."))+Date.now()+ "."+extension;
        cb(null,fileName);
    } 
})
const uploadProfilePic=multer(
    {storage:storage}
    ).single("profilePic")

const customerRegister= async (req,res)=>{
    try {
        const { name, email, password,confirmpassword, address, phone ,agreed} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const profilePic=req.file;
        const newCustomer= await new customerModel({
            name,
            email,
            password:hashedPassword,
            confirmpassword:hashedPassword,
            address,
            phone,
            agreed,
            profilePic
        });
        
        let existingCustomer=await customerModel.findOne({email});
        if(existingCustomer){
             return res.json({
                message:"Customer already registered with this email"
            })
        };
        existingCustomer=await customerModel.findOne({phone});
        if(existingCustomer){
             return res.json({
                message:"Customer already registered with this phone number"
            })
        }
        if(password!==confirmpassword){
            return res.json({message:"Password and Confirm Password should be same."})
        }
       
       await newCustomer.save()  ;
       res.status(201).json({
        message:"Customer created successfully",
        data:newCustomer
       })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message});
    }
};

const customerLogin=async (req,res)=>{
    try {
        const {email,password}=req.body;
        const customer=await customerModel.findOne({email});
        if(!customer){
            return res.json({message:"customer not found with this email."})
        }
        const isMatch=await bcrypt.compare(password,customer.password);
        if(!isMatch){
            return res.json({message:"Invalid Password."})
        }
        const token=await jwt.sign({id:customer._id},process.env.SECRET_KEY,{expiresIn:"1hr"});
        res.status(200).json({message:"customer logged in successfully",token:token});
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message});
    }
}

const customerForgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const customer = await customerModel.findOne({ email });

        if (!customer) {
            return res.status(404).json({ message: "No customer found with this email." });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString("hex");
        customer.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
        customer.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        await customer.save();

        // Create reset URL
        const resetURL = `${req.protocol}://${req.get("host")}/customer/resetpassword/${resetToken}`;

        const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetURL} \n\n with your new password. If you did not request this, please ignore this email and your password will remain unchanged.`;

        try {
            await sendEmail({
                email: customer.email,
                subject: "Password Reset Token",
                message,
            });

            res.status(200).json({
                message: "Token sent to email!",
            });
        } catch (error) {
            customer.resetPasswordToken = undefined;
            customer.resetPasswordExpires = undefined;
            await customer.save();
            return res.status(500).json({ message: "Error sending email. Please try again later." });
        }

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

const customerResetPassword = async (req, res) => {
    try {
        const resetPasswordToken = crypto.createHash("sha256").update(req.params.email).digest("hex"); // req.params.email is actually the token here
        const customer = await customerModel.findOne({
            resetPasswordToken,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!customer) {
            return res.status(400).json({ message: "Password reset token is invalid or has expired." });
        }

        const { password, confirmpassword } = req.body;

        if (password !== confirmpassword) {
            return res.status(400).json({ message: "Passwords do not match." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        customer.password = hashedPassword;
        customer.confirmpassword = hashedPassword;
        customer.resetPasswordToken = undefined;
        customer.resetPasswordExpires = undefined;

        await customer.save();
        res.status(200).json({ message: "Password reset successfully." });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};
const getCustomerById=async(req,res)=>{
    try {
        const customerId=req.params.id;
        const customer=await customerModel.findById(customerId);
        if(!customer){
            return res.json({message:"No customer found with this id."})
        }
        return res.json({
            message:"customer found with the provided id",
            customer:customer
        })
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message});
    }
}
const editCustomerById = async (req, res) => {
    try {
        const customerId = req.params.id;
        const profilePic = req.file;
        const { name, email, phone, address } = req.body;

        const updatedCustomer = await customerModel.findByIdAndUpdate(
            customerId,
            { name, email, phone, address,profilePic },
            { new: true }
        );

        if (!updatedCustomer) {
            return res.status(404).json({ message: "Customer not found." });
        }

        res.json({ message: "Customer updated successfully.", customer: updatedCustomer });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

module.exports={customerRegister,uploadProfilePic,customerLogin,customerForgotPassword,customerResetPassword,getCustomerById,editCustomerById};
