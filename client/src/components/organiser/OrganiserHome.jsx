import React, { useEffect, useState } from 'react'
import CustomerNavbar from '../Navbar/CustomerNavbar'
import { Avatar, Box, Button, Card, Fade, Grid, Modal,Stack, Typography,Container} from '@mui/material';
import coin from "../../assets/image 94.png";
import Footer from '../Footer/Footer';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import CloseIcon from '@mui/icons-material/Close';
import Backdrop from '@mui/material/Backdrop';
import axios from 'axios';
import OrganiserNavbar from '../Navbar/OrganiserNavbar';
import arrow from "../../assets/arrow.png";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ClickAwayListener from '@mui/material/ClickAwayListener';

const OrganiserHome = () => {
    const styleLogout = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        // border: '2px solid #000',
        borderRadius: "10px",
        boxShadow: 24,
        p: 4,
    };
    const[organiser,setOrganiser]=useState({});
    const fetchUser=async()=>{
        const token = localStorage.getItem('token');
        const decoded = jwtDecode(token);
        const organiser=await axios.get(`http://localhost:3000/localbiz/organisation/getorganisation/${decoded.id}`,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const organiserdetails=localStorage.setItem("organiserDetails",
          JSON.stringify(organiser.data.organisation));
        setOrganiser(organiser.data.organisation);
        console.log(organiser.data.organisation.name);
        console.log(organiser.data.organisation.profilePic);
        console.log(organiser);

    }
    useEffect(()=>{
        fetchUser();
    },[]);

    const navigate = useNavigate();
    // const navigateToProfile=()=>{
    //      navigate('/parent/profile');
    // }
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleLogOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('organiserDetails');
        // window.location.reload();
        navigate('/organiser/login');
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
        // border: '2px solid #000',
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
            [name]: ""
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
        // console.log(data)
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('address', data.address);
        formData.append('phone', data.phone);
        formData.append('profilePic', data.profilePic);

        console.log(data);
        const token = localStorage.getItem("token");
        const updated = await axios.post(`http://localhost:3000/localbiz/organisation/editorganisation/${organiser._id}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(updated);
        setData({
            name: "",
            address: "",
            email: "",
            phone: ""
        })
        if (updated.data.message === "organisation updated successfully.") {
        
            toast.success("Organiser updated successfully.")
            // Close the modal
    setEditOpen(false);
    fetchUser();

}
else {
    
    toast.error("Error in updating Organiser profile")
}


}

const [editOpen, setEditOpen] = React.useState(false);
    const handleEditOpen = () => {
        setData({
            name: organiser.name || "",
            email: organiser.email || "",
            address: organiser.address || "",
            phone: organiser.phone || "",
            profilePic: null, // leave this null so user can choose a new one
        });
        setImagePreview(organiser?.profilePic?.filename 
            ? `http://localhost:3000/uploads/${organiser?.profilePic?.filename}` 
            : null);
        setEditOpen(true);
    }
    const handleEditClose = () => setEditOpen(false);

    // const navigate = useNavigate();
    const [showProfileCard, setShowProfileCard] = useState(false);
     const onAvatarClick=() => setShowProfileCard(prev => !prev);
     // loging out and not returing to profile page
    useEffect(() => {
        if (localStorage.getItem("token") == null) {
          navigate("/");
        }
      },[]);
  return (
    <>
    <OrganiserNavbar organiserdetails={organiser} onAvatarClick={onAvatarClick} />
    {showProfileCard && (<ClickAwayListener onClickAway={() => setShowProfileCard(false)}>
            <Box sx={{ position: 'absolute', top: "80px", right: '60px', zIndex: 5 ,width:"375px"}}>
            <Card sx={{ Width: "375px", height: "490px", position: "relative", zIndex: -2 }}>
                <Avatar sx={{ height: "146px", width: "146px", position: "absolute", top: "50px", left: "100px", zIndex: 2 }} src={`http://localhost:3000/uploads/${organiser?.profilePic?.filename}`} alt={organiser?.name}></Avatar>
                <Box sx={{ height: '132px', background: '#9B70D3', width: "100%", position: "relative" }}>
                    <Box component="img" src={arrow} sx={{ position: "absolute", top: '25px', left: "25px" }}></Box>
                </Box>
                <Box display={"flex"} flexDirection={"column"} alignItems={"center"} p={2} sx={{ gap: "15px", mt: "90px" }}>
                    <Typography variant='h5' color='secondary' sx={{ fontSize: "24px", fontWeight: "400" }}>{organiser.name}</Typography>
                    <Typography display={"flex"} justifyContent={"center"} alignItems={"center"} variant='p' color='primary' sx={{ fontSize: "15px", fontWeight: "400", gap: "30px" }}><EmailOutlinedIcon />{organiser.email}</Typography>
                    <Typography display={"flex"} justifyContent={"center"} alignItems={"center"} variant='p' color='primary' sx={{ fontSize: "15px", fontWeight: "400", gap: "30px" }}><LocalPhoneOutlinedIcon />{organiser.phone}</Typography>
                    <Typography display={"flex"} justifyContent={"center"} alignItems={"center"} variant='p' color='primary' sx={{ fontSize: "15px", fontWeight: "400", gap: "30px" }}><LocationOnOutlinedIcon />{organiser.address}</Typography>
                    <Box display={"flex"} gap={3} alignItems={"center"}>
                    <Button variant='contained' color='secondary' sx={{ borderRadius: "15px", marginTop: "20px", mb: "20px", height: "40px", width: '100px', padding: '10px 35px' }} onClick={handleEditOpen}>Edit</Button>
                    <Button variant='contained' color='secondary' sx={{ borderRadius: "15px", marginTop: "20px", mb: "20px", height: "40px", width: '100px', padding: '10px 35px' }} onClick={handleOpen}>Logout</Button>
                    </Box>
                </Box>

            </Card>
        </Box>
        </ClickAwayListener>
           ) }
    <Box sx={{borderRadius:"25px",border:"1px solid black",height:'100vh',width:"auto", margin: "20px 75px"}}>

    </Box>
    




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

            {/*  logout modal end */}

             {/* edit modal  */}
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
                                    {/*  */}
                                    <Box display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'} sx={{ width: '253px', height: "93px", gap: '10px' }}>
                                        <Button variant='contained' color='secondary' sx={{ borderRadius: "25px", marginTop: "20px", height: "40px", width: '200px', padding: '10px 35px' }}
                                            onClick={handleSubmit}
                                        >Confirm</Button>

                                    </Box>
                                </Box>
                                {/* <div style={{textAlign:"center"}}>
                                                {message.success && <p style={{ color: 'green', fontSize: '32px' }}>{message.success}</p>}
                                                {message.error && <p style={{ color: 'red', fontSize: '32px' }}>{message.error}</p>}
                                                </div> */}

                            </Container>

                        </Box>
                    </Fade>
                </Modal>
            </div>
            {/* edit modal ends */}
            <Footer/>
      
    </>
  )
}

export default OrganiserHome
