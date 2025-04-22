const bussinessProductModel=require("../Models/bussinessProductModel");
const multer=require("multer")

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./uploads")
    },
    filename:(req,file,cb)=>{
        const prefix="product-";
        const fullName=file.originalname;
        const extension=file.originalname.split(".").pop();
        const fileName=prefix + fullName.substring(0,fullName.lastIndexOf("."))+Date.now()+ "."+ extension;
        cb(null,fileName);
    } 
})
const uploadProductPic=multer(
    {storage:storage}
    ).single("photo")

const addbussinessProduct= async(req,res)=>{
    try {
        const {productName,productDescription,weight,adds,price,stockavailable,discountPrice,specialOffer,category}=req.body;
        const photo=req.file;
        const bussinessId = req.user.id;
        
        const newbussinessProduct=new bussinessProductModel({
            productName,
            productDescription,
            weight,
            adds,
            price,
            stockavailable,
            discountPrice,
            specialOffer,
            category,
            photo,
            bussinessId
        })
        
        await newbussinessProduct.save();
        res.status(200).json({
            message:"bussiness Product added successfully",
            data:newbussinessProduct
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:error.message
        })
    }
};

const viewBussinessProduct= async(req,res)=>{
    try {
        const bussinessId=req.user.id;
        const bussinessProduct=await bussinessProductModel.find({bussinessId});
        if(!bussinessProduct){
            return res.json({
                message:"no product found"
            })
        };
        return res.json({
            message:"bussiness product",
            data:bussinessProduct
        })
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message:error.message
        })
    }

}

const editBussinessProducts= async(req,res)=>{
    try {
        const {productName,productDescription,weight,adds,price,stockavailable,discountPrice,specialOffer,category}=req.body;
        const photo=req.file;
        const productId=req.params.id;
        const updateData={
            productName,
            productDescription,
            weight,
            adds,
            price,
            stockavailable,
            discountPrice,
            specialOffer,
            category,
            photo
        }
        const editBussinessProducts=await bussinessProductModel.findByIdAndUpdate(
            productId,
            updateData,
            {new:true});
        if(!editBussinessProducts){
           return res.json({
                message:"error in updating bussiness product"
            })
        };
        return  res.json({
            message:"product updated successfully",
            data:editBussinessProducts
        })
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message:error.message
        })
    }

}

module.exports={uploadProductPic,addbussinessProduct,editBussinessProducts,viewBussinessProduct}