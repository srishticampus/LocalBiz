# LocalBiz Connect - Backend Implementation Guide (Express.js + MongoDB)

## Overview
This document outlines all backend features required for the LocalBiz Connect platform based on the provided WBS. The system comprises 4 core modules: **Consumer**, **Business Owner**, **Community Organization**, and **Admin**. Below are detailed requirements for models, routes, controllers, and business logic.

---

## 1. **Authentication & Authorization**
### Features:
- **Role-based access** (Consumer, Business Owner, Community Organization, Admin) - **Implemented via separate user models**.
- **JWT-based authentication** - **Partially Implemented** (Protected routes exist, but JWT fields are not explicitly stored in models).
- **Password reset** via email - **Partially Implemented** (Routes exist, email sending is To Be Implemented).

### Implementation Steps:
1. **Models**:
   - `User` (Base Schema): *Conceptually, this is handled by separate models for each role.*
     ```javascript
     {
       email: { type: String, unique: true },
       password: String,
       role: { type: String, enum: ["consumer", "business", "community", "admin"] }, // To Be Implemented (role is implicit in separate models)
       isVerified: { type: Boolean, default: false }, // To Be Implemented
       resetPasswordToken: String, // To Be Implemented
       resetPasswordExpires: Date // To Be Implemented
     }
     ```
   - **Implemented Models**:
     - `adminModel.js`: `email`, `password`
     - `customerModel.js`: `name`, `email`, `password`, `confirmpassword`, `dateOfBirth`, `phone`, `profilePic`, `address`, `agreed`, `isActive`, `isAdminApproved`
     - `bussinessModel.js`: `name`, `email`, `password`, `confirmpassword`, `dateOfBirth`, `phone`, `profilePic`, `address`, `agreed`, `isActive`, `isAdminApproved`, `bussinessName`, `bussinessCategory`, `bussinessDescription`, `bussinessLogo`
     - `organiserModel.js`: `organizationName`, `organizationType`, `name`, `email`, `password`, `confirmpassword`, `dateOfBirth`, `phone`, `profilePic`, `address`, `agreed`, `isActive`, `isAdminApproved`

2. **Routes**:
   - `POST /admin/login` - **Implemented**.
   - `POST /customer/registration` (with profile pic upload) - **Implemented**.
   - `POST /customer/login` - **Implemented**.
   - `POST /customer/forgotpassword` - **Implemented**.
   - `POST /customer/resetpassword/:email` - **Implemented**.
   - `GET /customer/getcustomer/:id` (protected) - **Implemented**.
   - `POST /customer/editcustomer/:id` (protected, with profile pic upload) - **Implemented**.
   - `POST /organisation/registration` (with profile pic upload) - **Implemented**.
   - `POST /organisation/login` - **Implemented**.
   - `POST /organisation/forgotpassword` - **Implemented**.
   - `POST /organisation/resetpassword/:email` - **Implemented**.
   - `GET /organisation/getorganisation/:id` (protected) - **Implemented**.
   - `POST /organisation/editorganisation/:id` (protected, with profile pic upload) - **Implemented**.
   - `POST /bussiness/registration` (with upload) - **Implemented**.
   - `POST /bussiness/login` - **Implemented**.
   - `POST /bussiness/forgotpassword` - **Implemented**.
   - `POST /bussiness/resetpassword/:email` - **Implemented**.
   - `GET /bussiness/getbussiness/:id` (protected) - **Implemented**.
   - `POST /bussiness/editBussiness/:id` (protected, with upload) - **Implemented**.

3. **Controllers**:
   - Validate registration fields (e.g., email uniqueness, password strength) - **Partially Implemented** (Basic validation in controllers).
   - Hash passwords using `bcrypt` - **Implemented**.
   - Send verification/password reset emails via Nodemailer - **To Be Implemented**.

---

## 2. **Consumer Module**
### Features:
- Registration/Profile Management - **Implemented**.
- Business/Product Search - **To Be Implemented**.
- Reviews & Complaints - **To Be Implemented**.
- Chats - **To Be Implemented**.

### Implementation Steps:
1. **Models**:
   - `Consumer` (Implemented as `customerModel.js`):
     ```javascript
     {
       name: { type: String, require: true },
       email: { type: String, require: true, unique: true },
       password: { type: String, require: true },
       confirmpassword: { type: String, require: true },
       dateOfBirth: { type: Date },
       phone: { type: Number, require: true },
       profilePic: { type: Object, require: true }, // Stores uploaded file info
       address: { type: String, require: true },
       agreed: { type: Boolean, require: true },
       isActive: { type: Boolean, default: true },
       isAdminApproved: { type: Boolean, default: false }
     }
     ```
   - `Review`: **To Be Implemented**.
     ```javascript
     {
       consumer: { type: Schema.Types.ObjectId, ref: "Consumer" },
       business: { type: Schema.Types.ObjectId, ref: "Business" },
       rating: Number,
       comment: String,
     }
     ```
   - `Complaint`: **To Be Implemented**.
     ```javascript
     {
       consumer: { type: Schema.Types.ObjectId, ref: "Consumer" },
       description: String,
       status: { type: String, enum: ["pending", "resolved"] },
     }
     ```

2. **Routes**:
   - `GET /customer/getcustomer/:id` (view profile, protected) - **Implemented**.
   - `POST /customer/editcustomer/:id` (edit profile, protected, with profile pic upload) - **Implemented**.
   - `GET /api/businesses` (search with filters: category, location) - **To Be Implemented**.
   - `POST /api/reviews` (create/update reviews) - **To Be Implemented**.
   - `POST /api/complaints` (submit/view complaints) - **To Be Implemented**.

3. **Controllers**:
   - Integrate geospatial search for businesses using MongoDB’s `2dsphere` index - **To Be Implemented**.
   - Validate review ratings (1-5 stars) - **To Be Implemented**.

---

## 3. **Business Owner Module**
### Features:
- Business Profile Management - **Implemented**.
- Product Management - **Implemented**.
- Promotions/Analytics - **To Be Implemented**.
- Community Joining - **To Be Implemented**.

### Implementation Steps:
1. **Models**:
   - `Business` (Implemented as `bussinessModel.js`):
     ```javascript
     {
       name: { type: String, require: true },
       email: { type: String, require: true, unique: true },
       password: { type: String, require: true },
       confirmpassword: { type: String, require: true },
       dateOfBirth: { type: Date },
       phone: { type: Number, require: true },
       profilePic: { type: Object, require: true }, // Stores uploaded file info
       address: { type: String, require: true },
       agreed: { type: Boolean, require: true },
       isActive: { type: Boolean, default: true },
       isAdminApproved: { type: Boolean, default: false },
       bussinessName: { type: String, require: true },
       bussinessCategory: { type: String, require: true },
       bussinessDescription: { type: String, require: true },
       bussinessLogo: { type: Object, require: true } // Stores uploaded file info
       // owner: { type: Schema.Types.ObjectId, ref: "User" }, // Not implemented, authentication handled within this model
       // location: { type: { type: String }, coordinates: [Number] }, // GeoJSON - To Be Implemented
     }
     ```
   - `Product` (Implemented as `bussinessProductModel.js`):
     ```javascript
     {
       productName: { type: String, required: true },
       productDescription: { type: String, required: true },
       weight: { type: Number, required: true },
       adds: { type: String, required: true },
       price: { type: Number, required: true },
       stockavailable: { type: Number, required: true },
       discountPrice: { type: Number, required: true },
       specialOffer: { type: String, required: true },
       category: { type: String, required: true },
       photo: { type: Object, required: true }, // Stores uploaded file info
       bussinessId: { type: mongoose.Schema.Types.ObjectId, ref: "bussiness", required: true }
       // photos: [String], // Replaced by 'photo' field
     }
     ```

2. **Routes**:
   - `POST /bussiness/addproduct` (add product, protected, with product pic upload) - **Implemented**.
   - `POST /bussiness/editproduct/:id` (edit product, protected, with product pic upload) - **Implemented**.
   - `GET /bussiness/viewproduct` (view products, protected, currently includes product pic upload middleware - *review if upload is necessary on view*) - **Implemented**.
   - `GET /api/business/analytics` (sales/views data) - **To Be Implemented**.
   - `POST /api/business/join-community` (request to join a community) - **To Be Implemented**.

3. **Controllers**:
   - Track product views using middleware - **To Be Implemented**.
   - Use aggregation pipelines for analytics (e.g., total revenue) - **To Be Implemented**.

---

## 4. **Community Organization Module**
### Features:
- Event/Training/Workshop Management - **To Be Implemented**.
- Business Approval Workflow - **Partially Implemented** (Admin approval status in model).

### Implementation Steps:
1. **Models**:
   - `Community` (Implemented as `organiserModel.js`):
     ```javascript
     {
       organizationName: { type: String, required: true },
       organizationType: { type: String, required: true },
       name: { type: String, require: true },
       email: { type: String, require: true, unique: true },
       password: { type: String, require: true },
       confirmpassword: { type: String, require: true },
       dateOfBirth: { type: Date },
       phone: { type: Number, require: true },
       profilePic: { type: Object, require: true }, // Stores uploaded file info
       address: { type: String, require: true },
       agreed: { type: Boolean, require: true },
       isActive: { type: Boolean, default: true },
       isAdminApproved: { type: Boolean, default: false } // Admin approval status
       // admin: { type: Schema.Types.ObjectId, ref: "User" }, // Not implemented, authentication handled within this model
       // members: [{ type: Schema.Types.ObjectId, ref: "Business" }], // To Be Implemented
     }
     ```
   - `Event`: **To Be Implemented**.
     ```javascript
     {
       community: { type: Schema.Types.ObjectId, ref: "Community" },
       type: { type: String, enum: ["event", "training", "workshop"] },
       organizer: String,
       date: Date,
     }
     ```

2. **Routes**:
   - `POST /api/community/events` (create/edit events) - **To Be Implemented**.
   - `GET /api/community/requests` (view/approve business requests) - **To Be Implemented**.

3. **Controllers**:
   - Send notifications to businesses upon approval/rejection - **To Be Implemented**.

---

## 5. **Admin Module**
### Features:
- User/Business Verification - **Implemented** (via `isAdminApproved` field in `bussinessModel` and `organiserModel`).
- Complaint Resolution - **To Be Implemented**.
- Platform Analytics - **To Be Implemented**.

### Implementation Steps:
1. **Models**:
   - `Business` and `Community` (Organiser) schemas include `isAdminApproved: { type: Boolean, default: false }` field - **Implemented**.

2. **Routes**:
   - `POST /admin/login` - **Implemented**.
   - `GET /api/admin/requests` (approve/reject businesses/communities) - **To Be Implemented**.
   - `GET /api/admin/complaints` (view/resolve complaints) - **To Be Implemented**.
   - `GET /api/admin/analytics` (platform-wide stats) - **To Be Implemented**.

3. **Controllers**:
   - Use MongoDB aggregations for analytics (e.g., total users, active businesses) - **To Be Implemented**.

---

## 6. **Additional Features**
### Chats: **To Be Implemented**.
- **Model**: `Message` with `sender`, `receiver`, `content`, `timestamp`.
- **Routes**: `POST /api/chats` (send message), `GET /api/chats` (fetch history).

### File Uploads: **Implemented**.
- Use `multer` middleware to handle image uploads (logos, product photos) - **Implemented**.
- Store files locally - **Implemented Locally** (in `uploads` directory).

---

## 7. **Database Relationships**
- Businesses ↔ Products (One-to-Many) - **Implemented** (via `bussinessId` in `bussinessProductModel`).
- Businesses ↔ Communities (Many-to-Many) - **To Be Implemented**.
- Consumers ↔ Reviews (One-to-Many) - **To Be Implemented**.

---

## 8. **Environment Setup**
1. Install dependencies: `express`, `mongoose`, `bcrypt`, `jsonwebtoken`, `multer` - **Implemented**.
2. Configure MongoDB connection in `app.js` - **Implemented** (in `dbConnection.js`).
3. Seed initial data for testing (e.g., admin user) - **To Be Implemented**.

---
**Note**: Ensure all field names match the WBS (e.g., "Adress" → corrected to "address" in the schema). Test endpoints using Postman before final handover.
