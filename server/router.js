const express=require("express");
const router=express.Router();

const protectedRoute=require("./Middleware/protectedRoute")

const customerController=require("./Controller/customerController");

const organisationController=require("./Controller/OrganiserController");

const bussinessController=require("./Controller/bussinessController")

const adminController=require("./Controller/adminController");

const bussinessProductController=require("./Controller/bussinessProductController");
const businessSearchController = require("./Controller/businessSearchController");
const reviewController = require("./Controller/reviewController");
const complaintController = require("./Controller/complaintController");
const businessAnalyticsController = require("./Controller/businessAnalyticsController");
const eventController = require("./Controller/eventController");
const communityController = require("./Controller/communityController");
const chatController = require("./Controller/chatController");

//Default Route
router.get("/",(req,res)=>{
    res.send("Welcome to Local Biz API");
})
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
router.get('/bussiness/getproduct/:id', protectedRoute.protectedRoute, bussinessProductController.viewSingleProduct);








// Consumer Module
router.get("/api/businesses", businessSearchController.searchBusinesses);
router.post("/api/reviews", protectedRoute.protectedRoute, reviewController.createReview);
router.put("/api/reviews/:id", protectedRoute.protectedRoute, reviewController.updateReview); // Assuming update by ID
router.post("/api/complaints", protectedRoute.protectedRoute, complaintController.submitComplaint);
router.get("/api/complaints", protectedRoute.protectedRoute, complaintController.viewComplaints);

// Business Owner Module
router.get("/api/business/analytics", protectedRoute.protectedRoute, businessAnalyticsController.getBusinessAnalytics);
router.post("/api/business/join-community", protectedRoute.protectedRoute, businessAnalyticsController.joinCommunity);

// Community Organization Module
router.post("/api/community/events", protectedRoute.protectedRoute, eventController.createEvent);
router.put("/api/community/events/:id", protectedRoute.protectedRoute, eventController.editEvent); // Assuming edit by ID
router.get("/api/community/requests", protectedRoute.protectedRoute, communityController.viewBusinessRequests);
router.post("/api/community/requests/:id/approve", protectedRoute.protectedRoute, communityController.approveRejectBusiness); // Assuming approve/reject by ID

// Admin Module
router.get("/api/admin/requests", protectedRoute.protectedRoute, adminController.getAdminRequests); // Placeholder for admin requests
router.post("/api/admin/requests/:id/approve", protectedRoute.protectedRoute, adminController.approveRejectUser); // Placeholder for admin approve/reject
router.get("/api/admin/complaints", protectedRoute.protectedRoute, adminController.viewComplaints); // Placeholder for admin view complaints
router.post("/api/admin/complaints/:id/resolve", protectedRoute.protectedRoute, adminController.resolveComplaint); // Placeholder for admin resolve complaints
router.get("/api/admin/analytics", protectedRoute.protectedRoute, adminController.getPlatformAnalytics); // Placeholder for admin analytics

// Additional Features - Chats
router.post("/api/chats", protectedRoute.protectedRoute, chatController.sendMessage);
router.get("/api/chats/:id", protectedRoute.protectedRoute, chatController.getChatHistory); // Assuming chat history by user/conversation ID

module.exports=router;
