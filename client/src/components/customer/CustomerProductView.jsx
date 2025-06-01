import React, { useEffect, useState } from 'react';
import CustomerNavbar from '../Navbar/CustomerNavbar';
import { Box, Button, Typography, Avatar, Modal, Fade, Backdrop, Card, TextField, Stack, Container, Grid } from '@mui/material';
import coin from "../../assets/image 94.png";
import Footer from '../Footer/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../api/axiosInstance';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import arrow from "../../assets/arrow.png";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import CloseIcon from '@mui/icons-material/Close';
import { baseUrl } from '../../baseUrl';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

const CustomerProductView = () => {
    // Styled components

    // Modal styles
    const styleLogout = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        borderRadius: "10px",
        boxShadow: 24,
        p: 4,
    };

    const styleEditBox = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '840px',
        height: 'auto',
        bgcolor: 'white',
        borderRadius: "20px",
        boxShadow: 24,
        p: 4,
    };

    // State management
    const [customer, setCustomer] = useState({});
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [showProfileCard, setShowProfileCard] = useState(false);
    const [data, setData] = useState({
        name: "",
        email: "",
        address: "",
        phone: "",
        profilePic: null
    });
    const [error, setError] = useState({});
    const [imagePreview, setImagePreview] = useState(null);
    const navigate = useNavigate();
    const { id: businessId } = useParams(); // Get businessId from URL

    // Fetch customer data
    const [products, setProducts] = useState([]);
    const [businessDetails, setBusinessDetails] = useState(null);
    const [reviewData, setReviewData] = useState({
        rating: 0,
        comment: ""
    });
    const [reviews, setReviews] = useState([]);
    const [editingReview, setEditingReview] = useState(null); // New state for editing review

    const fetchUser = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/customer/login');
            return;
        }
        try {
            const decoded = jwtDecode(token);
            const customer = await axios.get(`${baseUrl}customer/getcustomer/${decoded.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            localStorage.setItem("customerDetails", JSON.stringify(customer.data.customer));
            setCustomer(customer.data.customer);
        } catch (error) {
            console.error("Error fetching customer:", error);
            toast.error("Error fetching customer details.");
            if (error.response && error.response.status === 401) {
                handleLogOut();
            }
        }
    };

    const fetchProducts = async () => {
        try {
            // Assuming a public endpoint or an endpoint that takes businessId as query param
            const response = await axios.get(`${baseUrl}bussiness/viewproduct`, {
                params: { bussinessId: businessId }
            });
            setProducts(response.data.products);
            // Assuming the first product or a separate endpoint provides business details
            if (response.data.products.length > 0) {
                // This is a workaround. Ideally, there should be a GET /bussiness/getbussiness/:id endpoint
                const businessRes = await axios.get(`${baseUrl}bussiness/getbussiness/${businessId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, // Business details might be protected
                    },
                });
                setBusinessDetails(businessRes.data.bussiness);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            toast.error("Error fetching products.");
        }
    };

    const fetchReviews = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${baseUrl}api/reviews/${businessId}`, { // Assuming an endpoint to get reviews for a business
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setReviews(response.data.data);
        } catch (error) {
            console.error("Error fetching reviews:", error);
            toast.error("Error fetching reviews.");
        }
    };

    useEffect(() => {
        fetchUser();
        fetchProducts();
        fetchReviews();
    }, [businessId]);

    // Modal handlers
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleEditOpen = () => {
        setData({
            name: customer.name || "",
            email: customer.email || "",
            address: customer.address || "",
            phone: customer.phone || "",
            profilePic: null,
        });
        setImagePreview(customer?.profilePic?.filename
            ? `${baseUrl}uploads/${customer?.profilePic?.filename}`
            : null);
        setEditOpen(true);
    };
    const handleEditClose = () => setEditOpen(false);

    // Logout handler
    const handleLogOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('customerDetails');
        navigate('/customer/login');
        toast.success("You have been logged out");
    };

    // Profile handlers
    const onAvatarClick = () => setShowProfileCard(prev => !prev);

    // Form handlers
    const handleDataChange = (e) => {
        setError((prevError) => ({
            ...prevError,
            [e.target.name]: ""
        }));
        const { name, value } = e.target;
        setData(prev => {
            return { ...prev, [name]: value }
        });
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData(prev => {
                return { ...prev, profilePic: file }
            });
            const objectURL = URL.createObjectURL(file);
            setImagePreview(objectURL);
        }
    };

    // Form validation
    const validation = () => {
        let isValid = true;
        let errorMessage = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!data.name.trim()) {
            errorMessage.name = "Name should not be empty";
            isValid = false;
        } else if (data.name.length < 3 || data.name.length > 20) {
            errorMessage.name = "Name should be 3 to 20 char length";
            isValid = false;
        }

        if (!data.email.trim()) {
            errorMessage.email = "Email should not be empty";
            isValid = false;
        } else if (!emailRegex.test(data.email)) {
            errorMessage.email = "Invalid email address";
            isValid = false;
        }

        if (data.address.length < 10) {
            errorMessage.address = "Address should be 10 char length";
            isValid = false;
        } else if (!data.address.trim()) {
            errorMessage.address = "Address should not be empty";
            isValid = false;
        }

        if (!data.phone) {
            errorMessage.phone = "Phone should not be empty";
            isValid = false;
        } else if (!/^\d{10}$/.test(data.phone)) {
            errorMessage.phone = "Phone should be exactly 10 digits and contain only numbers";
            isValid = false;
        }

        setError(errorMessage);
        return isValid;
    };

    // Form submission
    const handleSubmit = async (e) => {
        const isValid = validation();
        if (!isValid) {
            return;
        }
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('address', data.address);
        formData.append('phone', data.phone);
        formData.append('profilePic', data.profilePic);

        const token = localStorage.getItem("token");
        try {
            const updated = await axios.post(`${baseUrl}customer/editcustomer/${customer._id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (updated.data.message === "Customer updated successfully.") {
                toast.success("Profile updated successfully.");
                setEditOpen(false);
                fetchUser();
            } else {
                toast.error("Error updating profile");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Error updating profile");
        }
    };

    // Text field style
    const textFieldStyle = {
        height: "65px",
        width: "360px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        position: "relative"
    };

    const handleReviewChange = (e) => {
        const { name, value } = e.target;
        setReviewData(prev => ({ ...prev, [name]: value }));
    };

    const handleRatingChange = (event, newValue) => {
        setReviewData(prev => ({ ...prev, rating: newValue }));
    };

    const handleEditReviewClick = (review) => {
        setEditingReview(review);
        setReviewData({
            rating: review.rating,
            comment: review.comment
        });
    };

    const handleCancelEdit = () => {
        setEditingReview(null);
        setReviewData({ rating: 0, comment: "" });
    };

    const handleReviewSubmit = async () => {
        if (!reviewData.rating || !reviewData.comment.trim()) {
            toast.error("Please provide a rating and a comment for your review.");
            return;
        }
        try {
            const token = localStorage.getItem("token");
            let response;
            if (editingReview) {
                // Update existing review
                response = await axios.put(`${baseUrl}api/reviews/${editingReview._id}`, {
                    rating: reviewData.rating,
                    comment: reviewData.comment
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.data.message === "Review updated successfully.") {
                    toast.success("Review updated successfully!");
                } else {
                    toast.error("Failed to update review.");
                }
            } else {
                // Submit new review
                response = await axios.post(`${baseUrl}api/reviews`, {
                    consumer: customer._id,
                    business: businessId,
                    rating: reviewData.rating,
                    comment: reviewData.comment
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.data.message === "Review created successfully") {
                    toast.success("Review submitted successfully!");
                } else {
                    toast.error("Failed to submit review.");
                }
            }
            setReviewData({ rating: 0, comment: "" });
            setEditingReview(null); // Clear editing state
            fetchReviews(); // Refresh reviews
        } catch (error) {
            console.error("Error submitting/updating review:", error);
            toast.error("Error submitting/updating review.");
        }
    };

    return (
        <>
            <CustomerNavbar customerdetails={customer} onAvatarClick={onAvatarClick} />

            {/* Profile Card */}
            {showProfileCard && (
                <ClickAwayListener onClickAway={() => setShowProfileCard(false)}>
                    <Box sx={{ position: 'absolute', top: "80px", right: '60px', zIndex: 5, width: "375px" }}>
                        <Card sx={{ Width: "375px", height: "490px", position: "relative", zIndex: -2 }}>
                            <Avatar
                                sx={{
                                    height: "146px",
                                    width: "146px",
                                    position: "absolute",
                                    top: "50px",
                                    left: "100px",
                                    zIndex: 2
                                }}
                                src={`${baseUrl}uploads/${customer?.profilePic?.filename}`}
                                alt={customer?.name}
                            />
                            <Box sx={{ height: '132px', background: '#9B70D3', width: "100%", position: "relative" }}>
                                <Box component="img" src={arrow} sx={{ position: "absolute", top: '25px', left: "25px" }} />
                            </Box>
                            <Box display={"flex"} flexDirection={"column"} alignItems={"center"} p={2} sx={{ gap: "15px", mt: "90px" }}>
                                <Typography variant='h5' color='secondary' sx={{ fontSize: "24px", fontWeight: "400" }}>
                                    {customer.name}
                                </Typography>
                                <Typography display={"flex"} justifyContent={"center"} alignItems={"center"} variant='p' color='primary' sx={{ fontSize: "15px", fontWeight: "400", gap: "30px" }}>
                                    <EmailOutlinedIcon />{customer.email}
                                </Typography>
                                <Typography display={"flex"} justifyContent={"center"} alignItems={"center"} variant='p' color='primary' sx={{ fontSize: "15px", fontWeight: "400", gap: "30px" }}>
                                    <LocalPhoneOutlinedIcon />{customer.phone}
                                </Typography>
                                <Typography display={"flex"} justifyContent={"center"} alignItems={"center"} variant='p' color='primary' sx={{ fontSize: "15px", fontWeight: "400", gap: "30px" }}>
                                    <LocationOnOutlinedIcon />{customer.address}
                                </Typography>
                                <Box display={"flex"} gap={3} alignItems={"center"}>
                                    <Button
                                        variant='contained'
                                        color='secondary'
                                        sx={{ borderRadius: "15px", marginTop: "20px", mb: "20px", height: "40px", width: '100px', padding: '10px 35px' }}
                                        onClick={handleEditOpen}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant='contained'
                                        color='secondary'
                                        sx={{ borderRadius: "15px", marginTop: "20px", mb: "20px", height: "40px", width: '100px', padding: '10px 35px' }}
                                        onClick={handleOpen}
                                    >
                                        Logout
                                    </Button>
                                </Box>
                            </Box>
                        </Card>
                    </Box>
                </ClickAwayListener>
            )}

            {/* Product View Content */}
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Typography variant='h4' sx={{ fontSize: "28px", fontWeight: "600", color: "text.primary", mb: 4, textAlign: 'center' }}>
                    Products from {businessDetails?.bussinessName || "Business"}
                </Typography>

                {(products && products.length > 0) ? (
                    <Grid container spacing={4}>
                        {products.map((product) => (
                            <Grid item xs={12} sm={6} md={4} key={product._id}>
                                <Card sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
                                    <Box sx={{ height: 200, overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
                                        <img
                                            src={product.photo?.filename ? `${baseUrl}uploads/${product.photo.filename}` : coin}
                                            alt={product.productName}
                                            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                                        />
                                    </Box>
                                    <Typography variant='h6' gutterBottom>{product.productName}</Typography>
                                    <Typography variant='body2' color='text.secondary' sx={{ flexGrow: 1 }}>{product.productDescription}</Typography>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center" mt={2}>
                                        <Typography variant='body1' fontWeight="bold">Price: ${product.price}</Typography>
                                        {product.discountPrice && (
                                            <Typography variant='body2' color='error' sx={{ textDecoration: 'line-through' }}>
                                                ${product.discountPrice}
                                            </Typography>
                                        )}
                                    </Stack>
                                    <Typography variant='body2' color='text.secondary'>Stock: {product.stockavailable}</Typography>
                                    <Typography variant='body2' color='text.secondary'>Category: {product.category}</Typography>
                                    <Button variant="contained" sx={{ mt: 2 }}>
                                        Add to Cart (Placeholder)
                                    </Button>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Typography variant="h6" textAlign="center" sx={{ mt: 5 }}>
                        No products available for this business.
                    </Typography>
                )}

                {/* Reviews Section */}
                <Box sx={{ mt: 8, p: 4, border: '1px solid #e0e0e0', borderRadius: '8px', bgcolor: 'background.paper' }}>
                    <Typography variant='h5' gutterBottom>Reviews</Typography>
                    <Stack spacing={2} mb={4}>
                        {reviews.length > 0 ? (
                            reviews.map((review) => (
                                <Card key={review._id} sx={{ p: 2 }}>
                                    <Typography variant="subtitle1" fontWeight="bold">{review.consumer?.name || "Anonymous"}</Typography>
                                    <Rating
                                        name="read-only"
                                        value={review.rating}
                                        readOnly
                                        precision={0.5}
                                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                    />
                                    <Typography variant="body2">{review.comment}</Typography>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        sx={{ mt: 1 }}
                                        onClick={() => handleEditReviewClick(review)}
                                    >
                                        Edit
                                    </Button>
                                </Card>
                            ))
                        ) : (
                            <Typography variant="body2" color="text.secondary">No reviews yet. Be the first to review!</Typography>
                        )}
                    </Stack>

                    <Typography variant='h6' gutterBottom>Submit a Review</Typography>
                    <Stack spacing={2}>
                        <Rating
                            name="rating"
                            value={reviewData.rating}
                            onChange={handleRatingChange}
                            precision={1}
                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                        />
                        <TextField
                            label="Your Comment"
                            name="comment"
                            multiline
                            rows={4}
                            value={reviewData.comment}
                            onChange={handleReviewChange}
                            fullWidth
                            variant="outlined"
                        />
                        <Button variant="contained" onClick={handleReviewSubmit} sx={{ alignSelf: 'flex-end' }}>
                            {editingReview ? "Update Review" : "Submit Review"}
                        </Button>
                        {editingReview && (
                            <Button variant="outlined" onClick={handleCancelEdit} sx={{ alignSelf: 'flex-end', ml: 2 }}>
                                Cancel Edit
                            </Button>
                        )}
                    </Stack>
                </Box>
            </Container>

            <Footer />

            {/* Logout Modal */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={styleLogout}>
                        <Box display={"flex"} justifyContent={"space-between"} alignItems={"space-between"}>
                            <Typography variant='h4' sx={{ fontSize: "18px", fontWeight: "600" }}>Logout</Typography>
                            <CloseIcon onClick={handleClose} sx={{ fontSize: "18px" }} />
                        </Box>
                        <hr />
                        <Box display={"flex"} alignItems={"center"} justifyContent={"center"} flexDirection={"column"}>
                            <Typography color='primary' sx={{ fontSize: "12px", fontWeight: '500' }} variant='p'>Are you sure you want to log out? </Typography>
                            <Box display={"flex"} alignItems={"center"} justifyContent={"center"} sx={{ gap: "10px" }}>
                                <Button variant='outlined' color='secondary' sx={{ borderRadius: "25px", marginTop: "20px", height: "40px", width: '100px', padding: '10px 35px' }} onClick={handleLogOut}>Yes</Button>
                                <Button variant='contained' color='secondary' sx={{ borderRadius: "25px", marginTop: "20px", height: "40px", width: '100px', padding: '10px 35px' }} onClick={handleClose}>No</Button>
                            </Box>
                        </Box>
                    </Box>
                </Fade>
            </Modal>

            {/* Edit Profile Modal */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={editOpen}
                onClose={handleEditClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={editOpen}>
                    <Box sx={styleEditBox}>
                        <Box display={"flex"} justifyContent={"space-between"} alignItems={"space-between"}>
                            <Typography variant='h4' sx={{ fontSize: "18px", fontWeight: "600" }}>Edit</Typography>
                            <CloseIcon onClick={handleEditClose} sx={{ fontSize: "18px" }} />
                        </Box>
                        <hr />
                        <Container sx={{ position: "relative" }} maxWidth="x-lg">
                            <Box display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'}>
                                <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
                                    <Stack spacing={2} sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                                        <input
                                            type="file"
                                            id="profile-upload"
                                            accept="image/*"
                                            onChange={handleFileUpload}
                                            style={{ display: "none" }}
                                        />
                                        <label htmlFor="profile-upload" style={{ cursor: "pointer", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "15px" }}>
                                            <Box component="img" src={imagePreview ? imagePreview : null} alt='profilepic' sx={{ width: "150px", height: "150px", borderRadius: "50%" }} />
                                            {imagePreview ? <Typography /> : <Typography variant='p' color='primary' sx={{ fontSize: "12px", fontWeight: "500" }}>+ Add image</Typography>}
                                        </label>
                                    </Stack>
                                </Box>
                                <Box sx={{ display: "flex", justifyContent: 'center', alignItems: "start", gap: "30px", height: "154px", flexDirection: "column", marginTop: '30px' }}>
                                    <Stack direction="row" sx={{ display: "flex", gap: "15px" }}>
                                        <div style={textFieldStyle}>
                                            <label>Name</label>
                                            <input
                                                style={{ height: "40px", borderRadius: "8px", border: " 1px solid #CCCCCC", padding: '8px' }}
                                                onChange={handleDataChange}
                                                name='name'
                                                value={data.name}
                                                type='text'
                                            />
                                            {error.name && <span style={{ color: 'red', fontSize: '12px' }}>{error.name}</span>}
                                        </div>
                                        <div style={textFieldStyle}>
                                            <label>Address</label>
                                            <input
                                                style={{ height: "40px", borderRadius: "8px", border: " 1px solid #CCCCCC", padding: '8px' }}
                                                onChange={handleDataChange}
                                                name='address'
                                                value={data.address}
                                            />
                                            {error.address && <span style={{ color: 'red', fontSize: '12px' }}>{error.address}</span>}
                                        </div>
                                    </Stack>
                                    <Stack direction={'row'} sx={{ display: "flex", gap: "15px" }}>
                                        <div style={textFieldStyle}>
                                            <label>Email</label>
                                            <input
                                                style={{ height: "40px", borderRadius: "8px", border: " 1px solid #CCCCCC", padding: '8px' }}
                                                onChange={handleDataChange}
                                                name='email'
                                                value={data.email}
                                            />
                                            {error.email && <span style={{ color: 'red', fontSize: '12px' }}>{error.email}</span>}
                                        </div>
                                        <div style={textFieldStyle}>
                                            <label>Phone Number</label>
                                            <input
                                                style={{ height: "40px", borderRadius: "8px", border: " 1px solid #CCCCCC", padding: '8px' }}
                                                onChange={handleDataChange}
                                                name='phone'
                                                value={data.phone}
                                                type='tel'
                                            />
                                            {error.phone && <span style={{ color: 'red', fontSize: '12px' }}>{error.phone}</span>}
                                        </div>
                                    </Stack>
                                </Box>
                                <Box display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'} sx={{ width: '253px', height: "93px", gap: '10px' }}>
                                    <Button
                                        variant='contained'
                                        color='secondary'
                                        sx={{ borderRadius: "25px", marginTop: "20px", height: "40px", width: '200px', padding: '10px 35px' }}
                                        onClick={handleSubmit}
                                    >
                                        Confirm
                                    </Button>
                                </Box>
                            </Box>
                        </Container>
                    </Box>
                </Fade>
            </Modal>
        </>
    )
}

export default CustomerProductView