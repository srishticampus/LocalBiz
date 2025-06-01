"use client"

import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Container, Box, Modal, Fade, Backdrop, Avatar, Card, Grid, Stack } from '@mui/material';
import Footer from '../Footer/Footer';
import BussinessNavbar from '../Navbar/BussinessNavbar';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import arrow from "../../assets/arrow.png";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { ClickAwayListener } from '@mui/material';
import { baseUrl } from '../../baseUrl';

export default function ViewTrainning() {
  const navigate = useNavigate();
  const [bussiness, setBussiness] = useState({});
  const [trainings, setTrainings] = useState([]); // Changed from events to trainings
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

  const handleJoin = (id) => {
    console.log(`Joined training with ID: ${id}`);
  };

  useEffect(() => {
    fetchUser();
  }, []);

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
        setBussiness(response.data.bussiness);
      }
    } catch (error) {
      console.error("Error fetching business details:", error);
      toast.error("Error fetching business details");
    }
  };

  useEffect(() => {
    const fetchTrainings = async () => {
      if (bussiness._id) {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`${baseUrl}api/events/bussiness/${bussiness._id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.data && response.data.events) {
            setTrainings(response.data.events);
          }
        } catch (error) {
          console.error("Error fetching trainings:", error);
          toast.error("Error fetching trainings");
        }
      }
    };
    fetchTrainings();
  }, [bussiness._id]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('bussinessDetails');
    navigate('/bussiness/login');
    toast.success("You have been logged out");
  }

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

  const onAvatarClick = () => setShowProfileCard(prev => !prev);

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

  return (
    <div>
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

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box
          component={Paper}
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 4,
            width: '100%'
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 300,
              color: 'text.secondary',
              textAlign: 'center',
              mb: 5
            }}
          >
            View Trainings
          </Typography>

          <TableContainer component={Paper} elevation={0}>
            <Table sx={{ minWidth: 650 }} aria-label="events table">
              <TableHead>
                <TableRow sx={{ borderBottom: '1px solid rgba(224, 224, 224, 1)' }}>
                  <TableCell sx={{ color: 'primary.main', fontWeight: 'medium' }}>S NO</TableCell>
                  <TableCell sx={{ color: 'primary.main', fontWeight: 'medium' }}>Training Type</TableCell>
                  <TableCell sx={{ color: 'primary.main', fontWeight: 'medium' }}>Organizer</TableCell>
                  <TableCell sx={{ color: 'primary.main', fontWeight: 'medium' }}>Description</TableCell>
                  <TableCell sx={{ color: 'primary.main', fontWeight: 'medium' }}>Date</TableCell>
                  <TableCell sx={{ color: 'primary.main', fontWeight: 'medium' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {trainings.map((training, index) => (
                  <TableRow
                    key={training._id}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      borderBottom: '1px solid rgba(224, 224, 224, 1)'
                    }}
                  >
                    <TableCell>{index + 1}.</TableCell>
                    <TableCell>{training.type}</TableCell>
                    <TableCell>{training.organizer}</TableCell>
                    <TableCell>{training.description}</TableCell>
                    <TableCell>{new Date(training.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleJoin(training._id)}
                        variant="contained"
                        color="primary"
                        sx={{
                          px: 3,
                          py: 1,
                          borderRadius: 3,
                          textTransform: 'none'
                        }}
                      >
                        Join
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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
    </div>
  );
}
