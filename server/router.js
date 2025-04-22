const express=require("express");
const router=express.Router();

const protectedRoute=require("./Middleware/protectedRoute")

const customerController=require("./Controller/customerController");

const organisationController=require("./Controller/OrganiserController");

const bussinessController=require("./Controller/bussinessController")

const adminController=require("./Controller/adminController");

const bussinessProductController=require("./Controller/bussinessProductController");

// admin
router.post("/admin/login",adminController.adminLogin)

// customer

router.post("/customer/registration",customerController.uploadProfilePic,customerController.customerRegister);
router.post("/customer/login",customerController.customerLogin);
router.post("/customer/forgotpassword",customerController.customerForgotPassword);
router.post("/customer/resetpassword/:email",customerController.customerResetPassword);
router.get("/customer/getcustomer/:id",protectedRoute.protectedRoute,customerController.getCustomerById);
router.post("/customer/editcustomer/:id",protectedRoute.protectedRoute,customerController.uploadProfilePic,customerController.editCustomerById)

// organisation

router.post("/organisation/registration",organisationController.uploadProfilePic,organisationController.organisationRegister);
router.post("/organisation/login",organisationController.organisationLogin);
router.post("/organisation/forgotpassword",organisationController.organisationForgotPassword);
router.post("/organisation/resetpassword/:email",organisationController.organisationResetPassword);
router.get("/organisation/getorganisation/:id",protectedRoute.protectedRoute,organisationController.getOrganisationById);
router.post("/organisation/editorganisation/:id",protectedRoute.protectedRoute,organisationController.uploadProfilePic,organisationController.editOrganisationById);

// Bussiness

router.post("/bussiness/registration",bussinessController.upload,bussinessController.bussinessRegister);
router.post("/bussiness/login",bussinessController.bussinessLogin);
router.post("/bussiness/forgotpassword",bussinessController.bussinessForgotPassword);
router.post("/bussiness/resetpassword/:email",bussinessController.bussinessResetPassword);
router.get("/bussiness/getbussiness/:id",protectedRoute.protectedRoute,bussinessController.getBussinessById);
router.post("/bussiness/editBussiness/:id",protectedRoute.protectedRoute,bussinessController.upload,bussinessController.editBussinessById)

// Bussiness Product
router.post("/bussiness/addproduct",protectedRoute.protectedRoute,bussinessProductController.uploadProductPic ,bussinessProductController.addbussinessProduct);
router.post("/bussiness/editproduct/:id",protectedRoute.protectedRoute,bussinessProductController.uploadProductPic ,bussinessProductController.editBussinessProducts);
router.get("/bussiness/viewproduct",protectedRoute.protectedRoute,bussinessProductController.uploadProductPic ,bussinessProductController.viewBussinessProduct);









module.exports=router;