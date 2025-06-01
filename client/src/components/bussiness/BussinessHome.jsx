import React, { useEffect, useState } from 'react'
import { Box, Button, Fade, Grid, Modal, Typography, Container, Stack, Card, Avatar } from '@mui/material';
import Footer from '../Footer/Footer';
import BussinessNavbar from '../Navbar/BussinessNavbar';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import CloseIcon from '@mui/icons-material/Close';
import Backdrop from '@mui/material/Backdrop';
import axios from 'axios';
import arrow from "../../assets/arrow.png";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { ClickAwayListener } from '@mui/material';
import { baseUrl } from '../../baseUrl';

const BussinessHome = () => {
    const [bussinessdetails, setBussinessdetails] = useState(
        JSON.parse(localStorage.getItem("bussinessDetails")) || {}
    );
    const token = localStorage.getItem("token");
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const [analyticsData, setAnalyticsData] = useState(null);

    useEffect(() => {
        fetchProducts();
        fetchUser();
        fetchAnalytics();
    }, []);

    useEffect(() => {
        // Filter products based on search term whenever products or searchTerm changes
        if (searchTerm.trim() === "") {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter(product =>
                product.productName.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    }, [searchTerm, products]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${baseUrl}bussiness/viewproduct`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (response.data && response.data.data) {
                const filteredProducts = response.data.data.filter(
                    product => product && product.bussinessId === bussinessdetails._id
                );
                setProducts(filteredProducts || []);
                setFilteredProducts(filteredProducts || []);
            } else {
                setProducts([]);
                setFilteredProducts([]);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            toast.error("Error fetching products");
            setProducts([]);
            setFilteredProducts([]);
        }
    };

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

    const [bussiness, setBussiness] = useState({});
    const fetchUser = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/bussiness/login');
                return;
            }

            const decoded = jwtDecode(token);
            const response = await axios.get(`${baseUrl}bussiness/getbussiness/${decoded.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data && response.data.bussiness) {
                localStorage.setItem("bussinessDetails", JSON.stringify(response.data.bussiness));
                setBussiness(response.data.bussiness);
                setBussinessdetails(response.data.bussiness);
            }
        } catch (error) {
            console.error("Error fetching business details:", error);
            toast.error("Error fetching business details");
        }
    }

    const fetchAnalytics = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/bussiness/login');
                return;
            }
            const response = await axios.get(`${baseUrl}api/business/analytics`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data && response.data.data) {
                setAnalyticsData(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching business analytics:", error);
            toast.error("Error fetching business analytics");
        }
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleLogOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('bussinessDetails');
        navigate('/bussiness/login');
        toast.success("You have been logged out");
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
        if (data.profilePic) {
            formData.append('profilePic', data.profilePic);
        }

        const token = localStorage.getItem("token");
        try {
            const updated = await axios.post(`${baseUrl}bussiness/editBussiness/${bussiness._id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (updated.data && updated.data.message === "bussiness updated successfully.") {
                toast.success("Business updated successfully.")
                setEditOpen(false);
                fetchUser();
            }
            else {
                toast.error("Error in updating Business profile")
            }
        } catch (error) {
            console.error("Error updating business:", error);
            toast.error("Error updating business profile");
        }
    }

    const [editOpen, setEditOpen] = React.useState(false);
    const handleEditOpen = () => {
        setData({
            name: bussiness.name || "",
            email: bussiness.email || "",
            address: bussiness.address || "",
            phone: bussiness.phone || "",
            profilePic: null,
        });

        setImagePreview(bussiness?.profilePic
            ? `${baseUrl}uploads/${bussiness?.profilePic}`
            : null);
        setEditOpen(true);
    }

    const handleEditClose = () => setEditOpen(false);

    const [showProfileCard, setShowProfileCard] = useState(false);
    const onAvatarClick = () => setShowProfileCard(prev => !prev);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/bussiness/login");
            return;
        }
    }, [navigate]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <>
            <BussinessNavbar
                bussinessdetails={bussiness}
                onAvatarClick={onAvatarClick}
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
            />

            {showProfileCard && (
                <ClickAwayListener onClickAway={() => setShowProfileCard(false)}>
                    <Box sx={{ position: 'absolute', top: "80px", right: '60px', zIndex: 5, width: "375px" }}>
                        <Card sx={{ Width: "375px", height: "490px", position: "relative", zIndex: -2 }}>
                            <Avatar sx={{ height: "146px", width: "146px", position: "absolute", top: "50px", left: "100px", zIndex: 2 }}
                                src={bussiness?.profilePic ? `${baseUrl}uploads/${bussiness?.profilePic}` : ""}
                                alt={bussiness?.name || "Business"}></Avatar>
                            <Box sx={{ height: '132px', background: '#9B70D3', width: "100%", position: "relative" }}>
                                <Box component="img" src={arrow} sx={{ position: "absolute", top: '25px', left: "25px" }}></Box>
                            </Box>
                            <Box display={"flex"} flexDirection={"column"} alignItems={"center"} p={2} sx={{ gap: "15px", mt: "90px" }}>
                                <Typography variant='h5' color='secondary' sx={{ fontSize: "24px", fontWeight: "400" }}>{bussiness.name || "Business"}</Typography>
                                <Typography display={"flex"} justifyContent={"center"} alignItems={"center"} variant='p' color='primary' sx={{ fontSize: "15px", fontWeight: "400", gap: "30px" }}><EmailOutlinedIcon />{bussiness.email || "No email"}</Typography>
                                <Typography display={"flex"} justifyContent={"center"} alignItems={"center"} variant='p' color='primary' sx={{ fontSize: "15px", fontWeight: "400", gap: "30px" }}><LocalPhoneOutlinedIcon />{bussiness.phone || "No phone"}</Typography>
                                <Typography display={"flex"} justifyContent={"center"} alignItems={"center"} variant='p' color='primary' sx={{ fontSize: "15px", fontWeight: "400", gap: "30px" }}><LocationOnOutlinedIcon />{bussiness.address || "No address"}</Typography>
                                <Box display={"flex"} gap={3} alignItems={"center"}>
                                    <Button variant='contained' color='secondary' sx={{ borderRadius: "15px", marginTop: "20px", mb: "20px", height: "40px", width: '100px', padding: '10px 35px' }} onClick={handleEditOpen}>Edit</Button>
                                    <Button variant='contained' color='secondary' sx={{ borderRadius: "15px", marginTop: "20px", mb: "20px", height: "40px", width: '100px', padding: '10px 35px' }} onClick={handleOpen}>Logout</Button>
                                </Box>
                            </Box>
                        </Card>
                    </Box>
                </ClickAwayListener>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 75px' }}>
                <Typography variant='p' sx={{ fontSize: "24px", fontWeight: "400", color: "black" }}>View Products</Typography>
                <Link to='/bussiness/addproduct'>
                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{ borderRadius: "25px" }}
                    >
                        Add Product
                    </Button>
                </Link>
            </Box>

            {/* Business Analytics Section */}
            <Box sx={{
                border: "1px solid black",
                borderRadius: "15px",
                margin: "20px 75px",
                padding: "20px",
                mt: 4
            }}>
                <Typography variant='h5' sx={{ fontSize: "24px", fontWeight: "600", color: "black", mb: 2 }}>Business Analytics</Typography>
                {analyticsData ? (
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Card sx={{ p: 2, bgcolor: '#f0f0f0' }}>
                                <Typography variant='h6'>Total Sales:</Typography>
                                <Typography variant='h4'>{analyticsData.totalSales}</Typography>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Card sx={{ p: 2, bgcolor: '#f0f0f0' }}>
                                <Typography variant='h6'>Total Views:</Typography>
                                <Typography variant='h4'>{analyticsData.totalViews}</Typography>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant='h6' sx={{ mt: 2 }}>Product Sales:</Typography>
                            {analyticsData.productSales && analyticsData.productSales.length > 0 ? (
                                <Stack spacing={1}>
                                    {analyticsData.productSales.map((product) => (
                                        <Typography key={product.productId} variant='body1'>
                                            {product.productName}: {product.salesCount} sales
                                        </Typography>
                                    ))}
                                </Stack>
                            ) : (
                                <Typography variant='body2' color='text.secondary'>No product sales data available.</Typography>
                            )}
                        </Grid>
                    </Grid>
                ) : (
                    <Typography variant="body1" color="text.secondary">Loading analytics data...</Typography>
                )}
            </Box>

            <Box sx={{
                border: "1px solid black",
                borderRadius: "15px",
                margin: "20px 75px",
                padding: "20px"
            }}>
                {filteredProducts.length === 0 ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                        <Typography variant="h6">
                            {searchTerm ? "No products match your search." : "No products found. Add your first product!"}
                        </Typography>
                    </Box>
                ) : (
                    <Grid
                        container
                        spacing={3}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        {filteredProducts.map((item) => (
                            item && (
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    key={item._id}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: '100%',
                                            maxWidth: '500px',
                                            height: "auto",
                                            minHeight: "291px",
                                            border: "1px solid black",
                                            borderRadius: "10px",
                                            padding: "20px",
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: '100%',
                                                gap: '20px',
                                                flexDirection: { xs: 'column', sm: 'row' }
                                            }}
                                        >
                                            <Box
                                                component="img"
                                                src={item.photo?.filename ? `${baseUrl}uploads/${item.photo.filename}` : "https://via.placeholder.com/100"}
                                                sx={{
                                                    width: "100px",
                                                    height: "100px",
                                                    objectFit: 'cover',
                                                    borderRadius: '8px'
                                                }}
                                                alt={item.productName || "Product"}
                                            />
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: '10px',
                                                    width: '100%'
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        width: '100%'
                                                    }}
                                                >
                                                    <Typography variant='p' sx={{ fontSize: "16px", fontWeight: "500", color: "black" }}>Product:</Typography>
                                                    <Typography variant='p' sx={{ fontSize: "16px", fontWeight: "400", color: "black" }}>{item.productName || "N/A"}</Typography>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        width: '100%'
                                                    }}
                                                >
                                                    <Typography variant='p' sx={{ fontSize: "16px", fontWeight: "500", color: "black" }}>Stock:</Typography>
                                                    <Typography variant='p' sx={{ fontSize: "16px", fontWeight: "400", color: "black" }}>{item.stockavailable || "0"}</Typography>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        width: '100%'
                                                    }}
                                                >
                                                    <Typography variant='p' sx={{ fontSize: "16px", fontWeight: "500", color: "black" }}>Special Offer:</Typography>
                                                    <Typography variant='p' sx={{ fontSize: "16px", fontWeight: "400", color: "black" }}>{item.specialOffer ? "Yes" : "No"}</Typography>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        width: '100%'
                                                    }}
                                                >
                                                    <Typography variant='p' sx={{ fontSize: "16px", fontWeight: "500", color: "black" }}>Discount:</Typography>
                                                    <Typography variant='p' sx={{ fontSize: "16px", fontWeight: "400", color: "black" }}>{item.discountPrice || "0"}%</Typography>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        width: '100%'
                                                    }}
                                                >
                                                    <Typography variant='p' sx={{ fontSize: "16px", fontWeight: "500", color: "black" }}>Price:</Typography>
                                                    <Typography variant='p' sx={{ fontSize: "16px", fontWeight: "400", color: "black" }}>₹{item.price || "0"}</Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                gap: '20px',
                                                width: '100%',
                                                marginTop: '20px'
                                            }}
                                        >
                                            {console.log("Navigating to product ID:", item._id)} {/* Added log */}
                                            <Link to={`/bussiness/ViewProduct/${item._id}`} style={{ textDecoration: 'none' }}>
                                                <Button
                                                    variant="contained"
                                                    color='secondary'
                                                    sx={{ borderRadius: "25px", width: '100px' }}
                                                >
                                                    View
                                                </Button>
                                            </Link>
                                            <Link to={`/bussiness/editproduct/${item._id}`} style={{ textDecoration: 'none' }}>
                                                <Button
                                                    variant="contained"
                                                    color='secondary'
                                                    sx={{ borderRadius: "25px", width: '100px' }}
                                                >
                                                    Edit
                                                </Button>
                                            </Link>
                                        </Box>
                                    </Box>
                                </Grid>
                            )
                        ))}
                    </Grid>
                )}
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

export default BussinessHome;
