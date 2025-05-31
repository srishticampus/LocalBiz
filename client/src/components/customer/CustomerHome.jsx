import React, { useEffect, useState } from 'react'
import CustomerNavbar from '../Navbar/CustomerNavbar'
import { Avatar, Box, Breadcrumbs, Card, Grid, Button, Container, Fade, Modal, Stack, Typography } from '@mui/material'
import coin from "../../assets/image 94.png";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import Footer from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import CloseIcon from '@mui/icons-material/Close';
import Backdrop from '@mui/material/Backdrop';
import { toast } from 'react-toastify';
import arrow from "../../assets/arrow.png";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { baseUrl } from '../../baseUrl';
import { Link } from 'react-router-dom';

const CustomerHome = () => {
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

    // Dummy product data
    const products = [
        {
            id: 1,
            name: "Candles",
            stock: 10,
            offer: "Special Offer",
            discount: "20%",
            price: 200,
            image: coin
        },
        {
            id: 2,
            name: "Incense Sticks",
            stock: 15,
            offer: "Limited Offer",
            discount: "15%",
            price: 150,
            image: coin
        },
        {
            id: 3,
            name: "Essential Oils",
            stock: 8,
            offer: "New Arrival",
            discount: "10%",
            price: 350,
            image: coin
        },
        {
            id: 4,
            name: "Meditation Cushion",
            stock: 5,
            offer: "Combo Offer",
            discount: "25%",
            price: 500,
            image: coin
        },
        {
            id: 5,
            name: "Yoga Mat",
            stock: 12,
            offer: "Seasonal Offer",
            discount: "30%",
            price: 800,
            image: coin
        },
        {
            id: 6,
            name: "Prayer Beads",
            stock: 20,
            offer: "Clearance Sale",
            discount: "40%",
            price: 250,
            image: coin
        },
        {
            id: 7,
            name: "Aroma Diffuser",
            stock: 7,
            offer: "Flash Sale",
            discount: "20%",
            price: 650,
            image: coin
        },
        {
            id: 8,
            name: "Spiritual Books",
            stock: 25,
            offer: "Buy 1 Get 1",
            discount: "50%",
            price: 300,
            image: coin
        }
    ];

    const [customer, setCustomer] = useState({});
    const fetchUser = async () => {
        const token = localStorage.getItem('token');
        const decoded = jwtDecode(token);
        const customer = await axios.get(`${baseUrl}customer/getcustomer/${decoded.id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const customerDatas = localStorage.setItem("customerDetails",
            JSON.stringify(customer.data.customer));
        setCustomer(customer.data.customer);
    }

    useEffect(() => {
        fetchUser();
    }, []);

    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleLogOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('customerDetails');
        navigate('/customer/login');
        toast.success("you logged out");
    }

    // for profile 
    const textFieldStyle = { height: "65px", width: "360px", display: "flex", flexDirection: "column", justifyContent: "start", position: "relative" };

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
    const [data, setData] = useState({
        name: "",
        email: "",
        address: "",
        phone: "",
        profilePic: null
    });
    const [error, setError] = useState({})
    const handleDataChange = (e) => {
        setError((prevError) => ({
            ...prevError,
            [e.target.name]: ""
        }));
        const { name, value } = e.target;
        setData(prev => {
            return { ...prev, [name]: value }
        })
    };

    const [imagePreview, setImagePreview] = useState(null);

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

    const validation = () => {
        let isValid = true;
        let errorMessage = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.name.trim()) {
            errorMessage.name = "Name should not be empty"
            isValid = false;
        }
        else if (data.name.length < 3 || data.name.length > 20) {
            errorMessage.name = "Name should be 3 to 20 char length"
            isValid = false;
        }
        if (!data.email.trim()) {
            errorMessage.email = "Email should not be empty";
            isValid = false;
        }
        else if (!emailRegex.test(data.email)) {
            errorMessage.email = "Invalid email address";
            isValid = false;
        }

        if (data.address.length < 10) {
            errorMessage.address = "Address should be 10 char length"
            isValid = false;
        }
        else if (!data.address.trim()) {
            errorMessage.address = "Address should not be empty"
            isValid = false;
        }
        if (!data.phone) {
            errorMessage.phone = "Phone should not be empty"
            isValid = false;
        }
        else if (!/^\d{10}$/.test(data.phone)) {
            errorMessage.phone = "Phone should be exactly 10 digits and contain only numbers";
            isValid = false;
        }

        setError(errorMessage);
        return isValid;
    };

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
        const updated = await axios.post(`${baseUrl}customer/editcustomer/${customer._id}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (updated.data.message === "Customer updated successfully.") {
            toast.success("Customer updated successfully.")
            setEditOpen(false);
            fetchUser();
        }
        else {
            toast.error("Error in updating Customer profile")
        }
    }

    const [editOpen, setEditOpen] = React.useState(false);
    const handleEditOpen = () => {
        setData({
            name: customer.name || "",
            email: customer.email || "",
            address: customer.address || "",
            phone: customer.phone || "",
            profilePic: null,
        });
        setImagePreview(customer?.profilePic?.filename
            ? `http://localhost:4056/uploads/${customer?.profilePic?.filename}`
            : null);
        setEditOpen(true);
    }
    const handleEditClose = () => setEditOpen(false);

    const [showProfileCard, setShowProfileCard] = useState(false);
    const onAvatarClick = () => setShowProfileCard(prev => !prev);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/customer/login");
            return;
        }
    }, []);

    return (
        <>
            <CustomerNavbar customerdetails={customer} onAvatarClick={onAvatarClick} />
            {showProfileCard && (
                <ClickAwayListener onClickAway={() => setShowProfileCard(false)}>
                    <Box sx={{ position: 'absolute', top: "80px", right: '60px', zIndex: 5, width: "375px" }}>
                        <Card sx={{ Width: "375px", height: "490px", position: "relative", zIndex: -2 }}>
                            <Avatar sx={{ height: "146px", width: "146px", position: "absolute", top: "50px", left: "100px", zIndex: 2 }}
                                src={`http://localhost:4056/uploads/${customer?.profilePic?.filename}`} alt={customer?.name}></Avatar>
                            <Box sx={{ height: '132px', background: '#9B70D3', width: "100%", position: "relative" }}>
                                <Box component="img" src={arrow} sx={{ position: "absolute", top: '25px', left: "25px" }}></Box>
                            </Box>
                            <Box display={"flex"} flexDirection={"column"} alignItems={"center"} p={2} sx={{ gap: "15px", mt: "90px" }}>
                                <Typography variant='h5' color='secondary' sx={{ fontSize: "24px", fontWeight: "400" }}>{customer.name}</Typography>
                                <Typography display={"flex"} justifyContent={"center"} alignItems={"center"} variant='p' color='primary' sx={{ fontSize: "15px", fontWeight: "400", gap: "30px" }}><EmailOutlinedIcon />{customer.email}</Typography>
                                <Typography display={"flex"} justifyContent={"center"} alignItems={"center"} variant='p' color='primary' sx={{ fontSize: "15px", fontWeight: "400", gap: "30px" }}><LocalPhoneOutlinedIcon />{customer.phone}</Typography>
                                <Typography display={"flex"} justifyContent={"center"} alignItems={"center"} variant='p' color='primary' sx={{ fontSize: "15px", fontWeight: "400", gap: "30px" }}><LocationOnOutlinedIcon />{customer.address}</Typography>
                                <Box display={"flex"} gap={3} alignItems={"center"}>
                                    <Button variant='contained' color='secondary' sx={{ borderRadius: "15px", marginTop: "20px", mb: "20px", height: "40px", width: '100px', padding: '10px 35px' }} onClick={handleEditOpen}>Edit</Button>
                                    <Button variant='contained' color='secondary' sx={{ borderRadius: "15px", marginTop: "20px", mb: "20px", height: "40px", width: '100px', padding: '10px 35px' }} onClick={handleOpen}>Logout</Button>
                                </Box>
                            </Box>
                        </Card>
                    </Box>
                </ClickAwayListener>
            )}
            
            {/* Products Section with 2 products per row and increased size */}
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
                    Our Products
                </Typography>
                
                <Grid container spacing={4} justifyContent="center">
                    {products.map((product) => (
                        <Grid item xs={12} md={6} key={product.id} sx={{
                            display: 'flex',
                            justifyContent: 'center'
                        }}>
                            <Card sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '100%',
                                maxWidth: '550px',
                                height: '400px',
                                borderRadius: '12px',
                                boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.1)',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: '0px 12px 28px rgba(0, 0, 0, 0.15)'
                                },
                                overflow: 'hidden'
                            }}>
                                {/* Product Image Section */}
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
                                        src={product.image} 
                                        alt={product.name} 
                                        style={{
                                            height: '100%',
                                            width: 'auto',
                                            objectFit: 'contain'
                                        }} 
                                    />
                                </Box>
                                
                                {/* Product Details Section */}
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
                                            {product.name}
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
                                                    Stock Available
                                                </Typography>
                                                <Typography variant='body1' sx={{ fontWeight: 500 }}>
                                                    {product.stock} units
                                                </Typography>
                                            </Box>
                                            
                                            <Box>
                                                <Typography variant='body2' sx={{ 
                                                    color: 'text.secondary',
                                                    fontSize: '14px'
                                                }}>
                                                    Special Offer
                                                </Typography>
                                                <Typography variant='body1' sx={{ fontWeight: 500 }}>
                                                    {product.offer}
                                                </Typography>
                                            </Box>
                                            
                                            <Box>
                                                <Typography variant='body2' sx={{ 
                                                    color: 'text.secondary',
                                                    fontSize: '14px'
                                                }}>
                                                    Discount
                                                </Typography>
                                                <Typography variant='body1' sx={{ 
                                                    color: 'success.main',
                                                    fontWeight: 600
                                                }}>
                                                    {product.discount} OFF
                                                </Typography>
                                            </Box>
                                            
                                            <Box>
                                                <Typography variant='body2' sx={{ 
                                                    color: 'text.secondary',
                                                    fontSize: '14px'
                                                }}>
                                                    Price
                                                </Typography>
                                                <Typography variant='body1' sx={{ 
                                                    fontWeight: 700,
                                                    fontSize: '18px'
                                                }}>
                                                    ₹{product.price}
                                                </Typography>
                                            </Box>
                                        </Box>
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
                                            component={Link}
                                            to={`/customer/viewproduct`}
                                        >
                                            View Details
                                        </Button>
                                    </Box>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            
            <Footer />

            {/* logout modal */}
            <div>
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
                                <Typography color='primary' sx={{ fontSize: "12px", fontWeight: '500' }} variant='p'>Are you sure you want to log out ? </Typography>
                                <Box display={"flex"} alignItems={"center"} justifyContent={"center"} sx={{ gap: "10px" }}>
                                    <Button variant='outlined' color='secondary' sx={{ borderRadius: "25px", marginTop: "20px", height: "40px", width: '100px', padding: '10px 35px' }} onClick={handleLogOut}>yes</Button>
                                    <Button variant='contained' color='secondary' sx={{ borderRadius: "25px", marginTop: "20px", height: "40px", width: '100px', padding: '10px 35px' }} onClick={handleClose}>no</Button>
                                </Box>
                            </Box>
                        </Box>
                    </Fade>
                </Modal>
            </div>

            {/* edit modal */}
            <div>
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
                                                <Box component="img" src={imagePreview ? imagePreview : null} alt='profilepic' sx={{ width: "150px", height: "150px", borderRadius: "50%" }}></Box>
                                                {imagePreview ? <Typography></Typography> : <Typography variant='p' color='primary' sx={{ fontSize: "12px", fontWeight: "500" }}>+ Add image</Typography>}
                                            </label>
                                        </Stack>
                                    </Box>
                                    <Box sx={{ display: "flex", justifyContent: 'center', alignItems: "start", gap: "30px", height: "154px", flexDirection: "column", marginTop: '30px' }}>
                                        <Stack direction="row" sx={{ display: "flex", gap: "15px" }}>
                                            <div style={textFieldStyle}>
                                                <label>Name</label>
                                                <input style={{ height: "40px", borderRadius: "8px", border: " 1px solid #CCCCCC", padding: '8px' }}
                                                    onChange={handleDataChange}
                                                    name='name'
                                                    value={data.name}
                                                    type='text'
                                                />
                                                {error.name && <span style={{ color: 'red', fontSize: '12px' }}>{error.name}</span>}
                                            </div>
                                            <div style={textFieldStyle}>
                                                <label>Address</label>
                                                <input style={{ height: "40px", borderRadius: "8px", border: " 1px solid #CCCCCC", padding: '8px' }}
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
                                                <input style={{ height: "40px", borderRadius: "8px", border: " 1px solid #CCCCCC", padding: '8px' }}
                                                    onChange={handleDataChange}
                                                    name='email'
                                                    value={data.email}
                                                />
                                                {error.email && <span style={{ color: 'red', fontSize: '12px' }}>{error.email}</span>}
                                            </div>
                                            <div style={textFieldStyle}>
                                                <label>Phone Number</label>
                                                <input style={{ height: "40px", borderRadius: "8px", border: " 1px solid #CCCCCC", padding: '8px' }}
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
                                        <Button variant='contained' color='secondary' sx={{ borderRadius: "25px", marginTop: "20px", height: "40px", width: '200px', padding: '10px 35px' }}
                                            onClick={handleSubmit}
                                        >Confirm</Button>
                                    </Box>
                                </Box>
                            </Container>
                        </Box>
                    </Fade>
                </Modal>
            </div>
        </>
    )
}

export default CustomerHome