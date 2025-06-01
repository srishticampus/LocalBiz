# Client-Server Integration Plan

This document outlines the plan for integrating the client-side application with the backend API, as detailed in `server/README.md`. The focus is on implementing core functionalities, skipping already implemented authentication pages (login and registration).

## Integration Strategy

1. **Identify Client Components**: Determine which client-side components correspond to specific backend API functionalities.
2. **Implement API Calls**: Use `axios` (already present in `client/package.json`) to make API requests from the client components.
3. **Handle Authentication**: Ensure JWT tokens are included in `Authorization` headers for protected routes.
4. **State Management**: Update client-side state based on API responses.
5. **Error Handling**: Implement robust error handling for API failures.
6. **Documentation**: Document all changes in this file and create manual testing procedures in `docs/test.md`.

## Integration Phases

### Phase 1: Customer Module Integration

* **Customer Profile Management**:
  * `GET /customer/getcustomer/:id` - **Completed**. Integrated with `client/src/components/customer/CustomerProfile.jsx` to fetch user data.
  * `POST /customer/editcustomer/:id` - **Completed**. Integrated with `client/src/components/customer/CustomerProfile.jsx` to update user data.
* **Customer Business View**:
  * `GET /api/businesses` - **Completed**. Integrated with `client/src/components/customer/CustomerBussinessView.jsx` to search and display businesses with filters.
* **Customer Product View**:
  * `GET /bussiness/viewproduct` - **Completed**. Integrated with `client/src/components/customer/CustomerProductView.jsx` to display products for a specific business.
* **Customer Reviews**:
  * `POST /api/reviews` - **Completed**. Integrated with `client/src/components/customer/CustomerProductView.jsx` to submit reviews.
  * `PUT /api/reviews/:id` - **Completed**. Integrated with `client/src/components/customer/CustomerProductView.jsx` to update reviews.
* **Customer Complaints**:
  * `POST /api/complaints` - **Completed**. Integrated with `client/src/components/customer/MsgComplaint.jsx` to submit complaints.
  * `GET /api/complaints` - **Completed**. Integrated with `client/src/components/customer/CustometComplaints.jsx` to view complaints.

### Phase 2: Business Owner Module Integration

* **Business Product Management**:
  * `POST /bussiness/addproduct` - **Completed**. Integrated with `client/src/components/bussiness/BussinessAddProduct.jsx`.
  * `POST /bussiness/editproduct/:id` - **Completed**. Integrated with `client/src/components/bussiness/BussinessEditProducts.jsx` to update product details.
  * `GET /bussiness/viewproduct` - **Completed**. Integrated with `client/src/components/bussiness/BusinessViewProduct.jsx` to display products for the business owner.
* **Business Analytics**:
  * `GET /api/business/analytics` - **Completed**. Integrated with `client/src/components/bussiness/BussinessHome.jsx`.
* **Community Join Request**:
  * `POST /api/business/join-community` - **Completed**. Integrated with `client/src/components/bussiness/CommunityJoinForm.jsx`.

### Phase 3: Community Organization Module Integration

* **Event Management**:
  * `POST /api/community/events` - **Completed**. Integrated with `client/src/components/organiser/OrganiserAddEvents.jsx`. (Note: `AddTrainning.jsx` and `AddWorkshopsForm.jsx` will be handled separately if they require distinct event types or forms).
  * `PUT /api/community/events/:id` - **Completed**. Integrated with `client/src/components/organiser/EditEvents.jsx`. (Note: `EditTrainning.jsx` and `EditWorkShop.jsx` will be handled separately if they require distinct event types or forms).
  * `GET /api/community/events` - **Completed**. Integrated with `client/src/components/organiser/OrganiserViewEvents.jsx`. (Note: `ViewTrainningsTable.jsx` and `ViewWorkshopsTable.jsx` will be handled separately if they require distinct event types or views).
* **Business Requests Management**:
  * `GET /api/community/requests` - **Completed**. Integrated with `client/src/components/organiser/OrganiserBussinessRequests.jsx`.
  * `POST /api/community/requests/:id/approve` - **Completed**. Integrated with `client/src/components/organiser/OrganiserBussinessRequests.jsx`.

### Phase 4: Admin Module Integration

* **Admin Requests**:
  * `GET /api/admin/requests` - **Completed**. Integrated with `client/src/components/admin/AdminRequests.jsx`.
  * `POST /api/admin/requests/:id/approve` - **Completed**. Integrated with `client/src/components/admin/AdminRequests.jsx`.
* **Admin Complaints**:
  * `GET /api/admin/complaints` - **Completed**. Integrated with `client/src/components/admin/AdminComplaints.jsx`.
  * `POST /api/admin/complaints/:id/resolve` - **Completed**. Integrated with `client/src/components/admin/AdminComplaints.jsx`.
* **Admin Analytics**:
  * `GET /api/admin/analytics` - **Completed**. Integrated with `client/src/components/admin/AdminDashboard.jsx` and backend updated.

### Phase 5: Chat Integration

* **Send Message**:
  * `POST /api/chats` -> Integrate with `client/src/components/bussiness/BusinessContactMsg.jsx` and potentially other chat-related components.
* **Fetch Chat History**:
  * `GET /api/chats/:id` -> Integrate with `client/src/components/bussiness/BusinessContactMsg.jsx` and potentially other chat-related components.

## Next Steps

Start with Phase 1: Customer Module Integration, focusing on Customer Profile Management.
