import React, { useEffect, useState } from 'react';
import CustomerNavbar from '../Navbar/CustomerNavbar';
import { Box, Button, Typography, Avatar, Modal, Fade, Backdrop, Card, Container, Stack, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import coin from "../../assets/image 94.png";
import Footer from '../Footer/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import arrow from "../../assets/arrow.png";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import CloseIcon from '@mui/icons-material/Close';
import { baseUrl } from '../../baseUrl';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

const CustomerBusinessView = () => {
    // Styled components
    const StyledCard = styled(Card)({
        borderRadius: "12px",
        boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0px 12px 28px rgba(0, 0, 0, 0.15)'
        }
    });

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
    const [business, setBusiness] = useState(null);
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
    const { id } = useParams();

    // Dummy business data (would normally come from API)
    const businesses = [
        {
            _id: 1,
            name: "John Doe",
            email: "john@example.com",
            phone: 9876543210,
            address: "123 Main St, New York, NY",
            profilePic: { filename: "profile1.jpg" },
            bussinessName: "Divine Candles",
            bussinessCategory: "Spiritual Goods",
            bussinessDescription: "Handmade spiritual candles for meditation and prayer",
            bussinessLogo: { filename: "logo1.jpg" },
            isVerified: true,
            isAdminApproved: true,
            location: {
                type: "Point",
                coordinates: [-73.935242, 40.730610]
            }
        },
        {
            _id: 2,
            name: "Jane Smith",
            email: "jane@example.com",
            phone: 9876543211,
            address: "456 Oak Ave, Los Angeles, CA",
            profilePic: { filename: "profile2.jpg" },
            bussinessName: "Sacred Scents",
            bussinessCategory: "Aromatherapy",
            bussinessDescription: "Premium incense sticks and essential oils for spiritual practices",
            bussinessLogo: { filename: "logo2.jpg" },
            isVerified: true,
            isAdminApproved: true,
            location: {
                type: "Point",
                coordinates: [-118.243683, 34.052235]
            }
        },
        {
            _id: 3,
            name: "Robert Johnson",
            email: "robert@example.com",
            phone: 9876543212,
            address: "789 Pine Rd, Chicago, IL",
            profilePic: { filename: "profile3.jpg" },
            bussinessName: "Zen Yoga Mats",
            bussinessCategory: "Yoga Equipment",
            bussinessDescription: "Eco-friendly yoga mats and meditation cushions",
            bussinessLogo: { filename: "logo3.jpg" },
            isVerified: true,
            isAdminApproved: true,
            location: {
                type: "Point",
                coordinates: [-87.629798, 41.878113]
            }
        },
        {
            _id: 4,
            name: "Emily Davis",
            email: "emily@example.com",
            phone: 9876543213,
            address: "321 Elm St, Houston, TX",
            profilePic: { filename: "profile4.jpg" },
            bussinessName: "Mystic Books",
            bussinessCategory: "Spiritual Literature",
            bussinessDescription: "Collection of spiritual and religious books from around the world",
            bussinessLogo: { filename: "logo4.jpg" },
            isVerified: true,
            isAdminApproved: true,
            location: {
                type: "Point",
                coordinates: [-95.369803, 29.760427]
            }
        },
        {
            _id: 5,
            name: "Michael Wilson",
            email: "michael@example.com",
            phone: 9876543214,
            address: "654 Maple Dr, Phoenix, AZ",
            profilePic: { filename: "profile5.jpg" },
            bussinessName: "Harmony Bells",
            bussinessCategory: "Meditation Tools",
            bussinessDescription: "Handcrafted meditation bells and singing bowls",
            bussinessLogo: { filename: "logo5.jpg" },
            isVerified: true,
            isAdminApproved: true,
            location: {
                type: "Point",
                coordinates: [-112.074036, 33.448376]
            }
        },
        {
            _id: 6,
            name: "Sarah Brown",
            email: "sarah@example.com",
            phone: 9876543215,
            address: "987 Cedar Ln, Philadelphia, PA",
            profilePic: { filename: "profile6.jpg" },
            bussinessName: "Prayer Beads Co.",
            bussinessCategory: "Religious Items",
            bussinessDescription: "Authentic prayer beads from various traditions",
            bussinessLogo: { filename: "logo6.jpg" },
            isVerified: true,
            isAdminApproved: true,
            location: {
                type: "Point",
                coordinates: [-75.165222, 39.952583]
            }
        }
    ];

    // Fetch customer data
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
        }
    };

    // Fetch business data (in a real app, this would be an API call)
    const fetchBusiness = () => {
        const foundBusiness = businesses.find(b => b._id === parseInt(id));
        if (foundBusiness) {
            setBusiness(foundBusiness);
        } else {
            navigate('/customer');
            toast.error("Business not found");
        }
    };

    useEffect(() => {
        fetchUser();
        fetchBusiness();
    }, [id]);

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
            toast.error("Error updating profile");
        }
    };

    if (!business) return <div>Loading...</div>;

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

            {/* Business View Content */}
            <Box sx={{ 
                padding: '40px 75px',
                backgroundColor: '#f9f9f9',
                minHeight: 'calc(100vh - 180px)'
            }}>
                <Typography variant='h4' sx={{ 
                    fontSize: "28px", 
                    fontWeight: "600", 
                    color: "text.primary", 
                    mb: "40px",
                    textAlign: 'center'
                }}>
                    {business.bussinessName}
                </Typography>
                
                <Grid container spacing={4} justifyContent="center">
                    <Grid item xs={12} md={6}>
                        <StyledCard sx={{
                            width: '100%',
                            height: '400px',
                            overflow: 'hidden'
                        }}>
                            {/* Business Logo Section */}
                            <Box sx={{
                                height: '200px',
                                width: '100%',
                                overflow: 'hidden',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#f5f5f5'
                            }}>
                                <img 
                                    src={business.bussinessLogo?.filename ? `${baseUrl}uploads/${business.bussinessLogo.filename}` : coin} 
                                    alt={business.bussinessName} 
                                    style={{
                                        height: '100%',
                                        width: '100%',
                                        objectFit: 'cover'
                                    }} 
                                />
                            </Box>
                            
                            {/* Business Details Section */}
                            <Box sx={{
                                padding: '20px',
                                display: 'flex',
                                flexDirection: 'column',
                                flexGrow: 1,
                                justifyContent: 'space-between'
                            }}>
                                <Box>
                                    <Typography variant='h5' sx={{ 
                                        fontSize: '22px', 
                                        fontWeight: 600,
                                        marginBottom: '10px'
                                    }}>
                                        {business.bussinessName}
                                    </Typography>
                                    
                                    <Box sx={{ 
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(2, 1fr)',
                                        gap: '15px',
                                        marginBottom: '20px'
                                    }}>
                                        <Box>
                                            <Typography variant='body2' sx={{ 
                                                color: 'text.secondary',
                                                fontSize: '14px'
                                            }}>
                                                Category
                                            </Typography>
                                            <Typography variant='body1' sx={{ fontWeight: 500 }}>
                                                {business.bussinessCategory}
                                            </Typography>
                                        </Box>
                                        
                                        <Box>
                                            <Typography variant='body2' sx={{ 
                                                color: 'text.secondary',
                                                fontSize: '14px'
                                            }}>
                                                Owner
                                            </Typography>
                                            <Typography variant='body1' sx={{ fontWeight: 500 }}>
                                                {business.name}
                                            </Typography>
                                        </Box>
                                        
                                        <Box>
                                            <Typography variant='body2' sx={{ 
                                                color: 'text.secondary',
                                                fontSize: '14px'
                                            }}>
                                                Contact
                                            </Typography>
                                            <Typography variant='body1' sx={{ 
                                                fontWeight: 500
                                            }}>
                                                {business.phone}
                                            </Typography>
                                        </Box>
                                        
                                        <Box>
                                            <Typography variant='body2' sx={{ 
                                                color: 'text.secondary',
                                                fontSize: '14px'
                                            }}>
                                                Status
                                            </Typography>
                                            <Typography variant='body1' sx={{ 
                                                fontWeight: 700,
                                                color: business.isAdminApproved ? 'success.main' : 'error.main'
                                            }}>
                                                {business.isAdminApproved ? 'Approved' : 'Pending'}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    
                                    <Typography variant='body2' sx={{
                                        color: 'text.secondary',
                                        fontSize: '14px',
                                        mb: '5px'
                                    }}>
                                        Description
                                    </Typography>
                                    <Typography variant='body1' sx={{
                                        fontSize: '14px'
                                    }}>
                                        {business.bussinessDescription}
                                    </Typography>
                                </Box>
                                
                                <Box sx={{ 
                                    display: 'flex',
                                    justifyContent: 'flex-end'
                                }}>
                                    <Button 
                                        variant="contained"
                                        color='secondary'
                                        endIcon={<ArrowRightAltIcon />}
                                        sx={{ 
                                            borderRadius: '8px',
                                            padding: '10px 24px',
                                            textTransform: 'none',
                                            fontSize: '16px',
                                            fontWeight: 500
                                        }}
                                        onClick={() => navigate(`/customer/viewproducts/${business._id}`)}
                                    >
                                        View Products
                                    </Button>
                                </Box>
                            </Box>
                        </StyledCard>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                        <StyledCard sx={{ 
                            padding: '20px',
                            height: '400px',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <Typography variant='h5' sx={{ 
                                fontSize: '22px', 
                                fontWeight: 600,
                                marginBottom: '20px'
                            }}>
                                Business Information
                            </Typography>
                            
                            <Box sx={{ 
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: '20px',
                                marginBottom: '20px'
                            }}>
                                <Box>
                                    <Typography variant='body2' sx={{ 
                                        color: 'text.secondary',
                                        fontSize: '14px'
                                    }}>
                                        Email
                                    </Typography>
                                    <Typography variant='body1' sx={{ fontWeight: 500 }}>
                                        {business.email}
                                    </Typography>
                                </Box>
                                
                                <Box>
                                    <Typography variant='body2' sx={{ 
                                        color: 'text.secondary',
                                        fontSize: '14px'
                                    }}>
                                        Phone
                                    </Typography>
                                    <Typography variant='body1' sx={{ fontWeight: 500 }}>
                                        {business.phone}
                                    </Typography>
                                </Box>
                                
                                <Box>
                                    <Typography variant='body2' sx={{ 
                                        color: 'text.secondary',
                                        fontSize: '14px'
                                    }}>
                                        Address
                                    </Typography>
                                    <Typography variant='body1' sx={{ fontWeight: 500 }}>
                                        {business.address}
                                    </Typography>
                                </Box>
                                
                                <Box>
                                    <Typography variant='body2' sx={{ 
                                        color: 'text.secondary',
                                        fontSize: '14px'
                                    }}>
                                        Verification
                                    </Typography>
                                    <Typography variant='body1' sx={{ 
                                        fontWeight: 700,
                                        color: business.isVerified ? 'success.main' : 'error.main'
                                    }}>
                                        {business.isVerified ? 'Verified' : 'Not Verified'}
                                    </Typography>
                                </Box>
                            </Box>
                            
                            <Typography variant='body2' sx={{
                                color: 'text.secondary',
                                fontSize: '14px',
                                mb: '5px'
                            }}>
                                Location
                            </Typography>
                            <Box sx={{ 
                                flexGrow: 1,
                                backgroundColor: '#f5f5f5',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Typography variant='body1'>
                                    Map would be displayed here (Coordinates: {business.location.coordinates.join(', ')})
                                </Typography>
                            </Box>
                        </StyledCard>
                    </Grid>
                </Grid>
            </Box>

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
    )
}

export default CustomerBusinessView;