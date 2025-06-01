import React, { useEffect, useState } from 'react'
import BussinessNavbar from '../Navbar/BussinessNavbar';
import { Container, Stack, Typography, Box, Button, Modal, Fade, Backdrop, Grid, Card, Avatar } from '@mui/material';
import Footer from '../Footer/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import { baseUrl } from '../../baseUrl';
import uploadphoto from "../../assets/upphoto.png";
import arrow from "../../assets/arrow.png";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { ClickAwayListener } from '@mui/material';
import axiosInstance from '../../api/axiosInstance';

const BussinessAddProduct = () => {
    const textFieldStyle = { height: "65px", width: "360px", display: "flex", flexDirection: "column", justifyContent: "start", position: "relative" }
    const siginupStyle = { background: "white", boxShadow: "none" };
    const navigate = useNavigate();

    const [bussinessdetails, setBussinessdetails] = useState({});
    const [bussiness, setBussiness] = useState({});
    const token = localStorage.getItem("token");

    useEffect(() => {
        const bussinessdetails = localStorage.getItem("bussinessDetails");
        setBussinessdetails(JSON.parse(bussinessdetails));
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            if (!token) {
                navigate('/bussiness/login');
                return;
            }

            const decoded = jwtDecode(token);
            const response = await axiosInstance.get(`/bussiness/getbussiness/${decoded.id}`);

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

    // Product related states and functions
    const [photoPreview, setPhotoPreview] = useState(null);
    const [error, setError] = useState({});

    const [data, setData] = useState({
        productName: "",
        productDescription: "",
        weight: "",
        adds: "",
        price: "",
        stockavailable: "",
        discountPrice: "",
        specialOffer: "",
        category: "",
        photo: null,
    });

    const handleDataChange = (e) => {
        const { name, value } = e.target;
        setError((prevError) => ({
            ...prevError,
            [name]: ""
        }));

        setData(prev => {
            return { ...prev, [name]: value }
        })
    }

    const handlePhotoUpload = (e) => {
        setError((prevError) => {
            return { ...prevError, photo: "" }
        })
        const file = e.target.files[0];
        if (file) {
            setData(prev => {
                return { ...prev, photo: file }
            });
            const objectURL = URL.createObjectURL(file);
            setPhotoPreview(objectURL);
        }
    }

    const validation = () => {
        let isValid = true;
        let errorMessage = {};

        if (!data.productName.trim()) {
            errorMessage.productName = "Product name should not be empty"
            isValid = false;
        }
        else if (data.productName.length < 3 || data.productName.length > 20) {
            errorMessage.productName = "Product name should be 3 to 20 char length"
            isValid = false;
        }

        if (!data.productDescription.trim()) {
            errorMessage.productDescription = "Product description should not be empty";
            isValid = false;
        }

        if (!data.weight) {
            errorMessage.weight = "Weight should not be empty";
            isValid = false;
        }

        if (!data.adds.trim()) {
            errorMessage.adds = "Adds should not be empty";
            isValid = false;
        }

        if (!data.price) {
            errorMessage.price = "Price should not be empty"
            isValid = false;
        }

        if (!data.stockavailable) {
            errorMessage.stockavailable = "Stock available should not be empty"
            isValid = false;
        }

        if (!data.discountPrice) {
            errorMessage.discountPrice = "Discount price should not be empty"
            isValid = false;
        }

        if (!data.specialOffer.trim()) {
            errorMessage.specialOffer = "Special offer should not be empty"
            isValid = false;
        }

        if (!data.category.trim()) {
            errorMessage.category = "Category should not be empty"
            isValid = false;
        }

        if (!data.photo) {
            errorMessage.photo = "Photo should not be empty"
            isValid = false;
        }

        setError(errorMessage);
        return isValid;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = validation();
        if (!isValid) {
            return;
        }

        const formData = new FormData();
        formData.append('productName', data.productName);
        formData.append('productDescription', data.productDescription);
        formData.append('weight', data.weight);
        formData.append('adds', data.adds);
        formData.append('price', data.price);
        formData.append('stockavailable', data.stockavailable);
        formData.append('discountPrice', data.discountPrice);
        formData.append('specialOffer', data.specialOffer);
        formData.append('category', data.category);
        formData.append('photo', data.photo);
        formData.append('bussinessId', bussinessdetails._id); // Add bussinessId

        try {
            const response = await axiosInstance.post('/bussiness/addproduct', formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            const result = response.data;
            console.log(result);

            if (result.message === "bussiness Product added successfully") { // Updated success message check
                setData({
                    productName: "",
                    productDescription: "",
                    weight: "",
                    adds: "",
                    price: "",
                    stockavailable: "",
                    discountPrice: "",
                    specialOffer: "",
                    category: "",
                    photo: null,
                });
                setPhotoPreview(null);
                toast.success("Product added successfully");
            }
        } catch (error) {
            console.error("Error adding product:", error);
            toast.error(error.response?.data?.message || "Failed to add product");
        }
    }

    // Profile related states and functions
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleLogOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('bussinessDetails');
        navigate('/bussiness/login');
        toast.success("You have been logged out");
    }

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

    const [editOpen, setEditOpen] = React.useState(false);
    const handleEditOpen = () => {
        setProfileData({
            name: bussiness.name || "",
            email: bussiness.email || "",
            address: bussiness.address || "",
            phone: bussiness.phone || "",
            profilePic: null,
        });
        setProfileImagePreview(bussiness?.profilePic
            ? `${baseUrl}uploads/${bussiness?.profilePic}`
            : null);
        setEditOpen(true);
    }
    const handleEditClose = () => setEditOpen(false);

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

    const [profileData, setProfileData] = useState({
        name: "",
        email: "",
        address: "",
        phone: "",
        profilePic: null
    });

    const [profileError, setProfileError] = useState({});
    const [profileImagePreview, setProfileImagePreview] = useState(null);

    const handleProfileDataChange = (e) => {
        setProfileError((prevError) => ({
            ...prevError,
            [e.target.name]: ""
        }));
        const { name, value } = e.target;
        setProfileData(prev => {
            return { ...prev, [name]: value }
        })
    };

    const handleProfileFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileData(prev => {
                return { ...prev, profilePic: file }
            });
            const objectURL = URL.createObjectURL(file);
            setProfileImagePreview(objectURL);
        }
    };

    const profileValidation = () => {
        let isValid = true;
        let errorMessage = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!profileData.name.trim()) {
            errorMessage.name = "Name should not be empty"
            isValid = false;
        }
        else if (profileData.name.length < 3 || profileData.name.length > 20) {
            errorMessage.name = "Name should be 3 to 20 char length"
            isValid = false;
        }
        if (!profileData.email.trim()) {
            errorMessage.email = "Email should not be empty";
            isValid = false;
        }
        else if (!emailRegex.test(profileData.email)) {
            errorMessage.email = "Invalid email address";
            isValid = false;
        }

        if (profileData.address.length < 10) {
            errorMessage.address = "Address should be 10 char length"
            isValid = false;
        }
        else if (!profileData.address.trim()) {
            errorMessage.address = "Address should not be empty"
            isValid = false;
        }
        if (!profileData.phone) {
            errorMessage.phone = "Phone should not be empty"
            isValid = false;
        }
        else if (!/^\d{10}$/.test(profileData.phone)) {
            errorMessage.phone = "Phone should be exactly 10 digits and contain only numbers";
            isValid = false;
        }

        setProfileError(errorMessage);
        return isValid;
    };

    const handleProfileSubmit = async (e) => {
        const isValid = profileValidation();
        if (!isValid) {
            return;
        }
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', profileData.name);
        formData.append('email', profileData.email);
        formData.append('address', profileData.address);
        formData.append('phone', profileData.phone);
        if (profileData.profilePic) {
            formData.append('profilePic', profileData.profilePic);
        }

        try {
            const updated = await axiosInstance.post(`/bussiness/editBussiness/${bussiness._id}`, formData);

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

    const [showProfileCard, setShowProfileCard] = useState(false);
    const onAvatarClick = () => setShowProfileCard(prev => !prev);

    return (
        <>
            <BussinessNavbar
                bussinessdetails={bussiness}
                onAvatarClick={onAvatarClick}
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

            <Container sx={{ position: "relative", mb: "50px", siginupStyle }} maxWidth="x-lg">
                <Box display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'} sx={{ mt: "100px" }}>
                    <Box display={'flex'} alignItems={'center'} justifyContent={'center'} sx={{ mb: "120px" }}>
                        <Typography variant='p' color='secondary' sx={{ fontSize: "32px" }}>Add Products</Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: 'center', alignItems: "start", gap: "30px", height: "293px", flexDirection: "column", marginTop: '30px' }}>
                        <Stack direction="row" sx={{ display: "flex", gap: "25px" }}>

                            <div style={textFieldStyle}>
                                <label>Product Name</label>
                                <input style={{ height: "40px", borderRadius: "8px", border: " 1px solid #CCCCCC", padding: '8px' }}
                                    onChange={handleDataChange}
                                    name='productName'
                                    value={data.productName}
                                    type='text'
                                />
                                {error.productName && <span style={{ color: 'red', fontSize: '12px' }}>{error.productName}</span>}
                            </div>

                            <div style={textFieldStyle}>
                                <label>Product Description</label>
                                <input style={{ height: "40px", borderRadius: "8px", border: " 1px solid #CCCCCC", padding: '8px' }}
                                    onChange={handleDataChange}
                                    name='productDescription'
                                    value={data.productDescription}
                                />
                                {error.productDescription && <span style={{ color: 'red', fontSize: '12px' }}>{error.productDescription}</span>}
                            </div>
                        </Stack>
                        <Stack direction={'row'} sx={{ display: "flex", gap: "25px" }}>
                            <div style={textFieldStyle}>
                                <label>Weight</label>
                                <input style={{ height: "40px", borderRadius: "8px", border: " 1px solid #CCCCCC", padding: '8px' }}
                                    onChange={handleDataChange}
                                    name='weight'
                                    value={data.weight}
                                    type='number'
                                />
                                {error.weight && <span style={{ color: 'red', fontSize: '12px' }}>{error.weight}</span>}
                            </div>
                            <div>
                                <label>Photo</label>
                                <input style={{ height: "40px", display: "none", borderRadius: "8px", border: " 1px solid #CCCCCC", padding: '8px', background: "#9B70D3" }}
                                    type="file"
                                    id="photo"
                                    accept="image/*"
                                    onChange={handlePhotoUpload}
                                />
                                <label htmlFor="photo" style={{ cursor: "pointer", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "15px" }}>
                                    {!photoPreview ? (<Box component="img" src={uploadphoto} alt='photo' sx={{ width: "150px", height: "40px" }}></Box>) : (<Typography color='secondary' variant='p'>photo selected</Typography>)}
                                </label>
                                {error.photo && <span style={{ color: 'red', fontSize: '12px' }}>{error.photo}</span>}
                            </div>

                        </Stack>
                        <Stack direction={'row'} sx={{ display: "flex", gap: "25px" }}>
                            <div style={textFieldStyle}>
                                <label>Adds</label>
                                <input style={{ height: "40px", borderRadius: "8px", border: " 1px solid #CCCCCC", padding: '8px' }}
                                    onChange={handleDataChange}
                                    name='adds'
                                    value={data.adds}
                                    type='text'
                                />
                                {error.adds && <span style={{ color: 'red', fontSize: '12px' }}>{error.adds}</span>}
                            </div>
                            <div style={textFieldStyle}>
                                <label>Price</label>
                                <input style={{ height: "40px", borderRadius: "8px", border: " 1px solid #CCCCCC", padding: '8px' }}
                                    onChange={handleDataChange}
                                    name='price'
                                    value={data.price}
                                    type='number'
                                />
                                {error.price && <span style={{ color: 'red', fontSize: '12px' }}>{error.price}</span>}
                            </div>
                        </Stack>
                        <Stack direction="row" sx={{ display: "flex", gap: "25px" }}>
                            <div style={textFieldStyle}>
                                <label>Stock Available</label>
                                <input style={{ height: "40px", borderRadius: "8px", border: " 1px solid #CCCCCC", padding: '8px' }}
                                    onChange={handleDataChange}
                                    name='stockavailable'
                                    value={data.stockavailable}
                                    type='number'
                                />
                                {error.stockavailable && <span style={{ color: 'red', fontSize: '12px' }}>{error.stockavailable}</span>}
                            </div>
                            <div style={textFieldStyle}>
                                <label>Discount price</label>
                                <input style={{ height: "40px", borderRadius: "8px", border: " 1px solid #CCCCCC", padding: '8px' }}
                                    onChange={handleDataChange}
                                    name='discountPrice'
                                    value={data.discountPrice}
                                    type='number'
                                />
                                {error.discountPrice && <span style={{ color: 'red', fontSize: '12px' }}>{error.discountPrice}</span>}
                            </div>
                        </Stack>
                        <Stack direction="row" sx={{ display: "flex", gap: "25px" }}>
                            <div style={textFieldStyle}>
                                <label>Special Offer</label>
                                <input style={{ height: "40px", borderRadius: "8px", border: " 1px solid #CCCCCC", padding: '8px' }}
                                    onChange={handleDataChange}
                                    name='specialOffer'
                                    value={data.specialOffer}
                                    type='text'
                                />
                                {error.specialOffer && <span style={{ color: 'red', fontSize: '12px' }}>{error.specialOffer}</span>}
                            </div>
                            <div style={textFieldStyle}>
                                <label>Category</label>
                                <input style={{ height: "40px", borderRadius: "8px", border: " 1px solid #CCCCCC", padding: '8px' }}
                                    onChange={handleDataChange}
                                    name='category'
                                    value={data.category}
                                    type='text'
                                />
                                {error.category && <span style={{ color: 'red', fontSize: '12px' }}>{error.category}</span>}
                            </div>
                        </Stack>
                    </Box>
                    <Box display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'} sx={{ width: '253px', height: "93px", gap: '10px', mt: "100px" }}>
                        <Button variant='contained' color='secondary' sx={{ borderRadius: "25px", marginTop: "20px", height: "40px", width: '200px', padding: '10px 35px' }}
                            onClick={handleSubmit}
                        >Add</Button>
                    </Box>
                </Box>
            </Container>
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
                                                onChange={handleProfileFileUpload}
                                                style={{ display: "none" }}
                                            />
                                            <label htmlFor="profile-upload" style={{ cursor: "pointer", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "15px" }}>
                                                <Box component="img" src={profileImagePreview ? profileImagePreview : null} alt='profilepic' sx={{ width: "150px", height: "150px", borderRadius: "50%" }}></Box>
                                                {profileImagePreview ? <Typography></Typography> : <Typography variant='p' color='primary' sx={{ fontSize: "12px", fontWeight: "500" }}>+ Add image</Typography>}
                                            </label>
                                        </Stack>
                                    </Box>
                                    <Box sx={{ display: "flex", justifyContent: 'center', alignItems: "start", gap: "30px", height: "154px", flexDirection: "column", marginTop: '30px' }}>
                                        <Stack direction="row" sx={{ display: "flex", gap: "15px" }}>
                                            <div style={textFieldStyle}>
                                                <label>Name</label>
                                                <input style={{ height: "40px", borderRadius: "8px", border: " 1px solid #CCCCCC", padding: '8px' }}
                                                    onChange={handleProfileDataChange}
                                                    name='name'
                                                    value={profileData.name}
                                                    type='text'
                                                />
                                                {profileError.name && <span style={{ color: 'red', fontSize: '12px' }}>{profileError.name}</span>}
                                            </div>
                                            <div style={textFieldStyle}>
                                                <label>Address</label>
                                                <input style={{ height: "40px", borderRadius: "8px", border: " 1px solid #CCCCCC", padding: '8px' }}
                                                    onChange={handleProfileDataChange}
                                                    name='address'
                                                    value={profileData.address}
                                                />
                                                {profileError.address && <span style={{ color: 'red', fontSize: '12px' }}>{profileError.address}</span>}
                                            </div>
                                        </Stack>
                                        <Stack direction={'row'} sx={{ display: "flex", gap: "15px" }}>
                                            <div style={textFieldStyle}>
                                                <label>Email</label>
                                                <input style={{ height: "40px", borderRadius: "8px", border: " 1px solid #CCCCCC", padding: '8px' }}
                                                    onChange={handleProfileDataChange}
                                                    name='email'
                                                    value={profileData.email}
                                                />
                                                {profileError.email && <span style={{ color: 'red', fontSize: '12px' }}>{profileError.email}</span>}
                                            </div>
                                            <div style={textFieldStyle}>
                                                <label>Phone Number</label>
                                                <input style={{ height: "40px", borderRadius: "8px", border: " 1px solid #CCCCCC", padding: '8px' }}
                                                    onChange={handleProfileDataChange}
                                                    name='phone'
                                                    value={profileData.phone}
                                                    type='tel'
                                                />
                                                {profileError.phone && <span style={{ color: 'red', fontSize: '12px' }}>{profileError.phone}</span>}
                                            </div>
                                        </Stack>
                                    </Box>
                                    <Box display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'} sx={{ width: '253px', height: "93px", gap: '10px' }}>
                                        <Button variant='contained' color='secondary' sx={{ borderRadius: "25px", marginTop: "20px", height: "40px", width: '200px', padding: '10px 35px' }}
                                            onClick={handleProfileSubmit}
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

export default BussinessAddProduct
