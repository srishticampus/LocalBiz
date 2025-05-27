# LocalBiz Connect - Backend Implementation Guide (Express.js + MongoDB)

## Overview
This document outlines all backend features required for the LocalBiz Connect platform based on the provided WBS. The system comprises 4 core modules: **Consumer**, **Business Owner**, **Community Organization**, and **Admin**. Below are detailed requirements for models, routes, controllers, and business logic.

---

## 1. **Authentication & Authorization**
### Features:
- **Role-based access** (Consumer, Business Owner, Community Organization, Admin).
- **JWT-based authentication**.
- **Password reset** via email.

### Implementation Steps:
1. **Models**:
   - `User` (Base Schema):
     ```javascript
     {
       email: { type: String, unique: true },
       password: String,
       role: { type: String, enum: ["consumer", "business", "community", "admin"] },
       isVerified: { type: Boolean, default: false },
       resetPasswordToken: String,
       resetPasswordExpires: Date
     }
     ```
   - Extend base `User` schema for each role using discriminators.

2. **Routes**:
   - `POST /auth/register` (role-specific registration).
   - `POST /auth/login`.
   - `POST /auth/forgot-password`.
   - `POST /auth/reset-password/:token`.

3. **Controllers**:
   - Validate registration fields (e.g., email uniqueness, password strength).
   - Hash passwords using `bcrypt`.
   - Send verification/password reset emails via Nodemailer.

---

## 2. **Consumer Module**
### Features:
- Registration/Profile Management
- Business/Product Search
- Reviews & Complaints
- Chats

### Implementation Steps:
1. **Models**:
   - `Consumer` (extends `User`):
     ```javascript
     {
       fullName: String,
       address: String,
       phone: String,
       photo: String, // URL to image
     }
     ```
   - `Review`:
     ```javascript
     {
       consumer: { type: Schema.Types.ObjectId, ref: "Consumer" },
       business: { type: Schema.Types.ObjectId, ref: "Business" },
       rating: Number,
       comment: String,
     }
     ```
   - `Complaint`:
     ```javascript
     {
       consumer: { type: Schema.Types.ObjectId, ref: "Consumer" },
       description: String,
       status: { type: String, enum: ["pending", "resolved"] },
     }
     ```

2. **Routes**:
   - `GET /api/consumer/profile` (view/edit profile).
   - `GET /api/businesses` (search with filters: category, location).
   - `POST /api/reviews` (create/update reviews).
   - `POST /api/complaints` (submit/view complaints).

3. **Controllers**:
   - Integrate geospatial search for businesses using MongoDB’s `2dsphere` index.
   - Validate review ratings (1-5 stars).

---

## 3. **Business Owner Module**
### Features:
- Business Profile Management
- Product Management
- Promotions/Analytics
- Community Joining

### Implementation Steps:
1. **Models**:
   - `Business`:
     ```javascript
     {
       owner: { type: Schema.Types.ObjectId, ref: "User" },
       name: String,
       category: String,
       description: String,
       logo: String, // URL
       address: String,
       location: { type: { type: String }, coordinates: [Number] }, // GeoJSON
     }
     ```
   - `Product`:
     ```javascript
     {
       business: { type: Schema.Types.ObjectId, ref: "Business" },
       name: String,
       category: String,
       price: Number,
       stock: Number,
       discountPrice: Number,
       photos: [String],
     }
     ```

2. **Routes**:
   - `POST /api/business/products` (add/edit/delete products).
   - `GET /api/business/analytics` (sales/views data).
   - `POST /api/business/join-community` (request to join a community).

3. **Controllers**:
   - Track product views using middleware.
   - Use aggregation pipelines for analytics (e.g., total revenue).

---

## 4. **Community Organization Module**
### Features:
- Event/Training/Workshop Management
- Business Approval Workflow

### Implementation Steps:
1. **Models**:
   - `Community`:
     ```javascript
     {
       name: String,
       admin: { type: Schema.Types.ObjectId, ref: "User" },
       members: [{ type: Schema.Types.ObjectId, ref: "Business" }],
     }
     ```
   - `Event`:
     ```javascript
     {
       community: { type: Schema.Types.ObjectId, ref: "Community" },
       type: { type: String, enum: ["event", "training", "workshop"] },
       organizer: String,
       date: Date,
     }
     ```

2. **Routes**:
   - `POST /api/community/events` (create/edit events).
   - `GET /api/community/requests` (view/approve business requests).

3. **Controllers**:
   - Send notifications to businesses upon approval/rejection.

---

## 5. **Admin Module**
### Features:
- User/Business Verification
- Complaint Resolution
- Platform Analytics

### Implementation Steps:
1. **Models**:
   - Add `status` field to `Business` and `Community` schemas (e.g., "pending", "approved").

2. **Routes**:
   - `GET /api/admin/requests` (approve/reject businesses/communities).
   - `GET /api/admin/complaints` (view/resolve complaints).
   - `GET /api/admin/analytics` (platform-wide stats).

3. **Controllers**:
   - Use MongoDB aggregations for analytics (e.g., total users, active businesses).

---

## 6. **Additional Features**
### Chats:
- **Model**: `Message` with `sender`, `receiver`, `content`, `timestamp`.
- **Routes**: `POST /api/chats` (send message), `GET /api/chats` (fetch history).

### File Uploads:
- Use `multer` middleware to handle image uploads (logos, product photos).
- Store files in cloud storage (e.g., AWS S3) or locally.

---

## 7. **Database Relationships**
- Businesses ↔ Products (One-to-Many).
- Businesses ↔ Communities (Many-to-Many).
- Consumers ↔ Reviews (One-to-Many).

---

## 8. **Environment Setup**
1. Install dependencies: `express`, `mongoose`, `bcrypt`, `jsonwebtoken`, `multer`.
2. Configure MongoDB connection in `app.js`.
3. Seed initial data for testing (e.g., admin user).

---
**Note**: Ensure all field names match the WBS (e.g., "Adress" → corrected to "address" in the schema). Test endpoints using Postman before final handover.