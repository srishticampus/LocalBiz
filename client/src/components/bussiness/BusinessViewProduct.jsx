import React, { useEffect, useState } from 'react';
import BusinessNavbar from '../Navbar/BussinessNavbar';
import { Box, Button, Typography, Avatar, Modal, Fade, Backdrop, Card, TextField, Stack, Container, Grid } from '@mui/material';
import Footer from '../Footer/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import arrow from "../../assets/arrow.png";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import CloseIcon from '@mui/icons-material/Close';
import { baseUrl } from '../../baseUrl';
import axiosInstance from '../../api/axiosInstance';

const BusinessViewProduct = () => {
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
    const [business, setBusiness] = useState({});
    const [product, setProduct] = useState(null); // Changed from products to product
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
    const { productId } = useParams(); // Get productId from URL

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    // productToDelete state is no longer needed as we use productId from useParams

    // Fetch business data
    const fetchUser = async () => {
        const token = localStorage.getItem('token'); // Corrected to 'token'
        const decoded = jwtDecode(token);
        const business = await axiosInstance.get(`/bussiness/getbussiness/${decoded.id}`);
        localStorage.setItem("bussinessDetails", JSON.stringify(business.data.bussiness));
        setBusiness(business.data.bussiness);
    };

    // Fetch single product data
    const fetchProductDetails = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/bussiness/login');
                return;
            }
            const response = await axiosInstance.get(`/bussiness/getproduct/${productId}`); // Corrected API endpoint
            setProduct(response.data.data); // Set single product
        } catch (error) {
            console.error("Error fetching product details:", error);
            toast.error("Error fetching product details.");
            if (error.response && error.response.status === 401) {
                handleLogOut();
            }
        }
    };

    useEffect(() => {
        fetchUser();
        if (productId) {
            console.log("Fetching product details for productId:", productId); // Added log
            fetchProductDetails();
        } else {
            console.log("No productId found in URL."); // Added log
        }
    }, [productId]); // Re-fetch if productId changes

    // Modal handlers
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleEditOpen = () => {
        setData({
            name: business.name || "",
            email: business.email || "",
            address: business.address || "",
            phone: business.phone || "",
            profilePic: null,
        });
        setImagePreview(business?.profilePic
            ? `${baseUrl}uploads/${business?.profilePic}`
            : null);
        setEditOpen(true);
    };
    const handleEditClose = () => setEditOpen(false);

    // Logout handler
    const handleLogOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('bussinessDetails');
        navigate('/bussiness/login');
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
        if (data.profilePic) {
            formData.append('profilePic', data.profilePic);
        }

        try {
            const updated = await axiosInstance.post(`/bussiness/editBussiness/${business._id}`, formData);

            if (updated.data.message === "bussiness updated successfully.") {
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

    // Delete product functions
    const handleDeleteProduct = () => { // No productId parameter needed, use useParams
        setDeleteModalOpen(true);
    };

    const confirmDeleteProduct = async () => {
        try {
            // const token = localStorage.getItem("token"); // Token is used by axiosInstance
            const response = await axiosInstance.delete(`/bussiness/delete-product/${productId}`); // Use productId from useParams

            if (response.data.message === "Product deleted successfully") {
                toast.success("Product deleted successfully.");
                setDeleteModalOpen(false);
                navigate('/bussiness/viewproduct'); // Navigate back to product list or dashboard after deletion
            } else {
                toast.error("Failed to delete product.");
            }
        } catch (error) {
            console.error("Error deleting product:", error);
            toast.error("Error deleting product.");
        }
    };

    if (!product) { // Check if product is null (loading or not found)
        return (
            <>
                <BusinessNavbar bussinessdetails={business} onAvatarClick={onAvatarClick} />
                <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
                    <Typography variant="h5" color="text.secondary">Loading product details or product not found...</Typography>
                </Container>
                <Footer />
            </>
        );
    }

    return (
        <>
            <BusinessNavbar bussinessdetails={business} onAvatarClick={onAvatarClick} />

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
                                src={`${baseUrl}uploads/${business?.profilePic}`}
                                alt={business?.name}
                            />
                            <Box sx={{ height: '132px', background: '#9B70D3', width: "100%", position: "relative" }}>
                                <Box component="img" src={arrow} sx={{ position: "absolute", top: '25px', left: "25px" }} />
                            </Box>
                            <Box display={"flex"} flexDirection={"column"} alignItems={"center"} p={2} sx={{ gap: "15px", mt: "90px" }}>
                                <Typography variant='h5' color='secondary' sx={{ fontSize: "24px", fontWeight: "400" }}>
                                    {business.name}
                                </Typography>
                                <Typography display={"flex"} justifyContent={"center"} alignItems={"center"} variant='p' color='primary' sx={{ fontSize: "15px", fontWeight: "400", gap: "30px" }}>
                                    <EmailOutlinedIcon />{business.email}
                                </Typography>
                                <Typography display={"flex"} justifyContent={"center"} alignItems={"center"} variant='p' color='primary' sx={{ fontSize: "15px", fontWeight: "400", gap: "30px" }}>
                                    <LocalPhoneOutlinedIcon />{business.phone}
                                </Typography>
                                <Typography display={"flex"} justifyContent={"center"} alignItems={"center"} variant='p' color='primary' sx={{ fontSize: "15px", fontWeight: "400", gap: "30px" }}>
                                    <LocationOnOutlinedIcon />{business.address}
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

            {/* Product Detail Content */}
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Card sx={{ p: 4, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img
                            src={product.photo?.filename ? `${baseUrl}uploads/${product.photo.filename}` : "https://via.placeholder.com/400"}
                            alt={product.productName}
                            style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }}
                        />
                    </Box>
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography variant='h4' gutterBottom sx={{ fontSize: "32px", fontWeight: "600", color: "text.primary" }}>
                            {product.productName}
                        </Typography>
                        <Typography variant='body1' color='text.secondary' sx={{ mb: 2 }}>
                            {product.productDescription}
                        </Typography>
                        <Stack direction="row" alignItems="center" spacing={2} mb={1}>
                            <Typography variant='h5' fontWeight="bold">Price: ${product.price}</Typography>
                            {product.discountPrice && (
                                <Typography variant='body1' color='error' sx={{ textDecoration: 'line-through' }}>
                                    ${product.discountPrice}
                                </Typography>
                            )}
                        </Stack>
                        <Typography variant='body1' color='text.secondary' sx={{ mb: 1 }}>
                            Stock: {product.stockavailable}
                        </Typography>
                        <Typography variant='body1' color='text.secondary' sx={{ mb: 2 }}>
                            Category: {product.category}
                        </Typography>
                        <Stack direction="row" spacing={2} mt={2}>
                            <Button
                                variant="contained"
                                color="secondary"
                                size="large"
                                startIcon={<EditIcon />}
                                onClick={() => navigate(`/bussiness/editproduct/${product._id}`)}
                            >
                                Edit Product
                            </Button>
                            <Button
                                variant="outlined"
                                color="error"
                                size="large"
                                startIcon={<DeleteIcon />}
                                onClick={handleDeleteProduct} // No need to pass product._id, it's in useParams
                            >
                                Delete Product
                            </Button>
                        </Stack>
                    </Box>
                </Card>
            </Container>

            <Footer />

            {/* Delete Confirmation Modal */}
            <Modal
                open={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                aria-labelledby="delete-modal-title"
                aria-describedby="delete-modal-description"
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={deleteModalOpen}>
                    <Box sx={styleLogout}>
                        <Typography id="delete-modal-title" variant="h6" component="h2" textAlign="center">
                            Confirm Deletion
                        </Typography>
                        <Typography id="delete-modal-description" sx={{ mt: 2, textAlign: "center" }}>
                            Are you sure you want to delete this product? This action cannot be undone.
                        </Typography>
                        <Stack direction="row" spacing={2} justifyContent="center" mt={3}>
                            <Button variant="outlined" onClick={() => setDeleteModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button variant="contained" color="error" onClick={confirmDeleteProduct}>
                                Delete
                            </Button>
                        </Stack>
                    </Box>
                </Fade>
            </Modal>

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
                                        <div style={{ height: "65px", width: "360px", display: "flex", flexDirection: "column", justifyContent: "start", position: "relative" }}>
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
                                        <div style={{ height: "65px", width: "360px", display: "flex", flexDirection: "column", justifyContent: "start", position: "relative" }}>
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
                                        <div style={{ height: "65px", width: "360px", display: "flex", flexDirection: "column", justifyContent: "start", position: "relative" }}>
                                            <label>Email</label>
                                            <input
                                                style={{ height: "40px", borderRadius: "8px", border: " 1px solid #CCCCCC", padding: '8px' }}
                                                onChange={handleDataChange}
                                                name='email'
                                                value={data.email}
                                            />
                                            {error.email && <span style={{ color: 'red', fontSize: '12px' }}>{error.email}</span>}
                                        </div>
                                        <div style={{ height: "65px", width: "360px", display: "flex", flexDirection: "column", justifyContent: "start", position: "relative" }}>
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
    );
};

export default BusinessViewProduct;
