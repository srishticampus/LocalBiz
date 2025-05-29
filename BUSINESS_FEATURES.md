# Business Owner Module - Features to be Implemented

This document outlines the features for the "Business Owner" module as extracted from the `LocalBizWBS.html` document, with implementation status based on the `client/src/components/bussiness` directory.

## 1. Registration [Implemented]
*   **Data Fields:**
    *   Full Name
    *   Business Name
    *   Business Category
    *   Business Description
    *   Logo (File upload)
    *   Address (Text Area)
    *   Email (Email Field)
    *   Phone Number (Number Field)
    *   Photo (Image)
    *   Password (Password Field with Eye icon)
    *   Confirm Password (Password Field with Eye icon)
    *   Agree Terms and conditions (Check box)
*   **Actions:**
    *   Register (Button) - "Registration successfully" message
    *   Already have an account? Login Now (Link) - Navigates to Login Page

## 2. Login [Implemented]
*   **Data Fields:**
    *   Email (Email Field)
    *   Password (Password Field with Eye icon)
*   **Actions:**
    *   Login (Button) - Navigates to Home page
    *   New user? Register Now (Link) - Navigates to Registration page
    *   Forgot Password? (Link) - Navigates to Forgot Password Page

## 3. Forgot Password [Implemented]
*   **Data Fields:**
    *   Email (Email Field)
*   **Actions:**
    *   Send (Button) - "Reset Link send to email"
    *   Back to Login (Link) - Navigates to Login page

## 4. Dashboard [Partially Implemented - `BussinessHome.jsx`]
*   **Elements:**
    *   Profile icon (Image Button)
    *   Products (Dropdown)
    *   Events (Link)
    *   Updates (Link)
    *   Chats (Link)

## 5. Manage Profile [Integrated into `BussinessHome.jsx`]
### 5.1. View Profile [Integrated into `BussinessHome.jsx`]
*   **Data Fields:**
    *   Photo (View)
    *   Full Name (View)
    *   Business Name (View)
    *   Business Category (View)
    *   Business Description (View)
    *   Logo (View)
    *   Address (View)
    *   Email (View)
    *   Phone Number (View)
*   **Actions:**
    *   Edit Profile (Link)

### 5.2. Edit Profile [Integrated into `BussinessHome.jsx`]
*   **Data Fields:**
    *   Photo (Image upload)
    *   Full Name (Text Field)
    *   Business Name (Text Field)
    *   Business Category (Text Field)
    *   Business Description (Text Area)
    *   Logo (File upload)
    *   Address (Text Area)
    *   Phone Number (Number Field)
*   **Actions:**
    *   Update (Button)

## 6. Manage Product
### 6.1. Add Product [Implemented]
*   **Data Fields:**
    *   Product Name (Text Field)
    *   Category (Dropdown)
    *   Product Description (Text Area)
    *   Photo (File upload)
    *   Color (Dropdown)
    *   Weight (Text Field)
    *   Adds (File upload)
    *   Stock Available (Number Field)
    *   Price (Number Field)
    *   Special offer (Text Field)
    *   Discount Price (Number Field)
*   **Actions:**
    *   Add (Button) - "Product Added Successfully" message

### 6.2. View Product [Partially Implemented - Integrated into `BussinessHome.jsx`]
*   **Data Fields:**
    *   Photo (View)
    *   Product Name (View)
    *   Category (View)
    *   Product Description (View)
    *   Color (View)
    *   Weight (View)
    *   Adds (View)
    *   Stock Available (View)
    *   Price (View)
    *   Special offer (View)
    *   Discount Price (View)
*   **Actions:**
    *   View (Button) - (for card view)
    *   Review and Ratings (Button)
    *   Edit product (Link)

### 6.3. Edit Product [Implemented]
*   **Data Fields:**
    *   Product Name (Text Field)
    *   Category (Dropdown)
    *   Product Description (Text Area)
    *   Photo (File upload)
    *   Color (Dropdown)
    *   Weight (Text Field)
    *   Adds (File upload)
    *   Stock Available (Number Field)
    *   Price (Number Field)
    *   Special offer (Text Field)
    *   Discount Price (Number Field)
*   **Actions:**
    *   Update (Button)
    *   Delete (Button)

## 7. Community Join [Not Implemented]
*   **Data Fields:**
    *   Business Name (View)
    *   Business Category (View)
    *   Logo (View)
    *   Community to join (Dropdown)
*   **Actions:**
    *   Send Request (Button)

## 8. Events [Not Implemented]
### 8.1. View Events
*   **Data Fields:**
    *   Event type (Events, Trainings, Workshops)
    *   Organizer name (Text Field)
    *   Organizer Email (Email Field)
    *   Phone number (Number Field)
*   **Actions:**
    *   Join (Button)

### 8.2. Add Event
*   **Data Fields:**
    *   Event Name (Text Field)
    *   Organizer name (Text Field)
    *   Organizer Email (Email Field)
    *   Phone number (Number Field)
*   **Actions:**
    *   Add (Button)

### 8.3. Edit Event
*   **Data Fields:**
    *   Event Name (Text Field)
    *   Organizer name (Text Field)
    *   Organizer Email (Email Field)
    *   Phone number (Number Field)
*   **Actions:**
    *   Update (Button)
    *   Delete (Button)

## 9. Trainings [Not Implemented]
### 9.1. Add Trainings
*   **Data Fields:**
    *   Organizer name (Text Field)
    *   Organizer Email (Email Field)
    *   Phone number (Number Field)
*   **Actions:**
    *   Add (Button)

### 9.2. View Trainings
*   **Data Fields:**
    *   Organizer name (Text Field)
    *   Organizer Email (Email Field)
    *   Phone number (Number Field)
*   **Actions:**
    *   Edit (Link)

### 9.3. Edit Trainings
*   **Data Fields:**
    *   Organizer name (Text Field)
    *   Organizer Email (Email Field)
    *   Phone number (Number Field)
*   **Actions:**
    *   Update (Button)
    *   Delete (Button)

## 10. Workshops [Not Implemented]
### 10.1. Add Workshops
*   **Data Fields:**
    *   Organizer name (Text Field)
    *   Organizer Email (Email Field)
    *   Phone number (Number Field)
*   **Actions:**
    *   Add (Button)

### 10.2. View Workshops
*   **Data Fields:**
    *   Organizer name (Text Field)
    *   Organizer Email (Email Field)
    *   Phone number (Number Field)
*   **Actions:**
    *   Edit (Link)

### 10.3. Edit Workshops
*   **Data Fields:**
    *   Organizer name (Text Field)
    *   Organizer Email (Email Field)
    *   Phone number (Number Field)
*   **Actions:**
    *   Update (Button)
    *   Delete (Button)

## 11. Updates [Not Implemented]
### 11.1. Add Updates
*   **Data Fields:**
    *   Updates (File upload)
*   **Actions:**
    *   Submit (Button)

### 11.2. View Updates
*   **Data Fields:**
    *   Updates (View)
*   **Actions:**
    *   Delete (Button)

## 12. Chats [Not Implemented]
*   **Data Fields:**
    *   Profile image (View)
    *   Name (View)
    *   Recent chats (Left side)
    *   Chatbox (Text Field)
    *   Attachment (Icon)
*   **Actions:**
    *   Send icon (Button)

## 13. Complaints [Not Implemented]
### 13.1. Add Complaints
*   **Data Fields:**
    *   Complaint Description (Text Area)
*   **Actions:**
    *   Add (Button)

### 13.2. View Complaints
*   **Data Fields:**
    *   Complaint Description (View)
    *   Complainant (View)
