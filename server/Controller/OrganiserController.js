const organisationModel=require("../Models/organiserModel");
const bcrypt=require("bcryptjs");
const multer=require("multer");
const jwt = require("jsonwebtoken");

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

const organisationRegister= async (req,res)=>{
    try {
        const {organizationName,organizationType, name, email, password,confirmpassword, address, phone ,agreed} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const profilePic=req.file;
        const newOrganization= await new organisationModel({
            organizationName,
            organizationType,
            name,
            email,
            password:hashedPassword,
            confirmpassword:hashedPassword,
            address,
            phone,
            agreed,
            profilePic
        });
        
        let existingOrganization=await organisationModel.findOne({email});
        if(existingOrganization){
             return res.json({
                message:"Organization already registered with this email"
            })
        };
        existingOrganization=await organisationModel.findOne({phone});
        if(existingOrganization){
             return res.json({
                message:"Organization already registered with this phone number"
            })
        }
        if(password!==confirmpassword){
            return res.json({message:"Password and Confirm Password should be same."})
        }
       
       await newOrganization.save()  ;
       res.status(201).json({
        message:"Organization created successfully",
        data:newOrganization
       })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message});
    }
};

const organisationLogin=async (req,res)=>{
    try {
        const {email,password}=req.body;
        const organisation=await organisationModel.findOne({email});
        if(!organisation){
            return res.json({message:"organisation not found with this email."})
        }
        const isMatch=await bcrypt.compare(password,organisation.password);
        if(!isMatch){
            return res.json({message:"Invalid Password."})
        }
        const token=await jwt.sign({id:organisation._id},process.env.SECRET_KEY,{expiresIn:"1hr"});
        res.status(200).json({message:"organisation logged in successfully",token:token});
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message});
    }
}

const organisationForgotPassword= async(req,res)=>{
    try {
        const {email}=req.body;
        const organisation= await organisationModel.findOne({email});
        if(!organisation){
            return res.json({message:" No organisation found with this email."})
        }
        res.json({
            message:"navigate to password reset page",
        })

        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message});
    }
};
const organisationResetPassword= async(req,res)=>{
    try {
        const {password,confirmpassword}=req.body;
        // const {email}=req.params;
        const organisation= await organisationModel.findOne({email:req.params.email});
        if(!organisation){
            return res.json({message:"No organisation found with this email."})
        };
        if(password!==confirmpassword){
            return res.json({message:"Passwords do not match."})
        }
        const hashedPassword=await bcrypt.hash(password,10);
        organisation.password=hashedPassword;
        organisation.confirmpassword=hashedPassword;
        await organisation.save(); 
        res.json({message:"Password reset successfully."});

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message});
    }
}
const getOrganisationById=async(req,res)=>{
    try {
        const organisationId=req.params.id;
        const organisation=await organisationModel.findById(organisationId);
        if(!organisation){
            return res.json({message:"No organisation found with this id."})
        }
        return res.json({
            message:"organisation found with the provided id",
            organisation:organisation
        })
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message});
    }
}
const editOrganisationById = async (req, res) => {
    try {
        const organisationId = req.params.id;
        const { name, email, phone, address } = req.body;

        const updatedOrganisation = await organisationModel.findByIdAndUpdate(
            organisationId,
            { name, email, phone, address },
            { new: true }
        );

        if (!updatedOrganisation) {
            return res.status(404).json({ message: "organisation not found." });
        }

        res.json({ message: "organisation updated successfully.", organisation: updatedOrganisation });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

module.exports={organisationRegister,uploadProfilePic,organisationLogin,organisationForgotPassword,organisationResetPassword,getOrganisationById,editOrganisationById};