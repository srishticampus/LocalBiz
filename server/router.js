const express=require("express");
const router=express.Router();

const protectedRoute=require("./Middleware/protectedRoute")

const customerController=require("./Controller/customerController");

const organisationController=require("./Controller/OrganiserController");

const bussinessController=require("./Controller/bussinessController")

const adminController=require("./Controller/adminController");

// admin
router.post("/admin/login",adminController.adminLogin)

// customer

router.post("/customer/registration",customerController.uploadProfilePic,customerController.customerRegister);
router.post("/customer/login",customerController.customerLogin);
router.post("/customer/forgotpassword",customerController.customerForgotPassword);
router.post("/customer/resetpassword/:email",customerController.customerResetPassword);
router.get("/customer/getcustomer/:id",protectedRoute.protectedRoute,customerController.getCustomerById);

// organisation

router.post("/organisation/registration",organisationController.uploadProfilePic,organisationController.organisationRegister);
router.post("/organisation/login",organisationController.organisationLogin);
router.post("/organisation/forgotpassword",organisationController.organisationForgotPassword);
router.post("/organisation/resetpassword/:email",organisationController.organisationResetPassword);
router.get("/organisation/getorganisation/:id",protectedRoute.protectedRoute,organisationController.getOrganisationById);

// Bussiness

router.post("/bussiness/registration",bussinessController.upload,bussinessController.bussinessRegister);
router.post("/bussiness/login",bussinessController.bussinessLogin);
router.post("/bussiness/forgotpassword",bussinessController.bussinessForgotPassword);
router.post("/bussiness/resetpassword/:email",bussinessController.bussinessResetPassword);
router.get("/bussiness/getbussiness/:id",protectedRoute.protectedRoute,bussinessController.getBussinessById);









module.exports=router;