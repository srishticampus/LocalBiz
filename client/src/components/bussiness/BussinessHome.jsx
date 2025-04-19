import React, { useEffect, useState } from 'react'
import CustomerNavbar from '../Navbar/CustomerNavbar'
import { Box, Button, Fade, Grid, Modal, Typography} from '@mui/material';
import coin from "../../assets/image 94.png";
import Footer from '../Footer/Footer';
import BussinessNavbar from '../Navbar/BussinessNavbar';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import CloseIcon from '@mui/icons-material/Close';
import Backdrop from '@mui/material/Backdrop';
import axios from 'axios';

const BussinessHome = () => {
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
    const[bussiness,setBussiness]=useState({});
    const fetchUser=async()=>{
        const token = localStorage.getItem('token');
        const decoded = jwtDecode(token);
        const bussiness=await axios.get(`http://localhost:3000/localbiz/bussiness/getbussiness/${decoded.id}`,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const bussinessdetails=localStorage.setItem("bussinessDetails",
          JSON.stringify(bussiness.data.bussiness));
        setBussiness(bussiness.data.bussiness);
        console.log(bussiness.data.bussiness.name);
        console.log(bussiness.data.bussiness.profilePic);
        console.log(bussiness);

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
        localStorage.removeItem('bussinessDetails');
        // window.location.reload();
        navigate('/bussiness/login');
        toast.success("you logged out");

    }
    // loging out and not returing to profile page
    useEffect(() => {
        if (localStorage.getItem("bussinessDetails") == null) {
          navigate("/");
        }
      },[]);
  return (
    <>
      <BussinessNavbar bussinessdetails={bussiness} handleOpen={handleOpen}/>
      <Typography variant='p' sx={{ fontSize: "24px", fontWeight: "400", color: "black", ml: "75px", mt: "20px" }}> View Products</Typography>
            <Box sx={{ height: "100%", border: "1px solid black", borderRadius: "15px", margin: "20px 75px" }}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid size={6}>
                        <Box display={"flex"} alignItems={"center"} sx={{ margin:"20px",  gap:"20px",height:"291px",border: "1px solid black", borderRadius: "10px",padding:"20px"}}>
                            <Box component="img" src={coin}></Box>
                            <Box sx={{gap:"150px"}} display= {"flex"} justifyContent={"start"} alignItems={"flex-start"}>
                                <Box gap={2} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"flex-start"}>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>Product</Typography>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>Stock Available</Typography>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>Special Offer</Typography>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>Discount</Typography>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>Price</Typography>
                                    <Button variant="contained"
                            color='secondary'
                                
                                sx={{ borderRadius: "25px" }}
                            >
                                View</Button>
                                </Box>
                                <Box gap={2} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"flex-start"}>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>Candles</Typography>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>10</Typography>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>Special Offer</Typography>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>20%</Typography>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>200</Typography>
                                    <Button variant="contained"
                            color='secondary'
                            
                                sx={{ borderRadius: "25px" }}
                            >
                                Edit</Button>
                                </Box>
                            </Box>
                            
                        </Box>
                    </Grid>
                    <Grid size={6}>
                        <Box display={"flex"} alignItems={"center"} sx={{ margin:"20px",  gap:"20px",height:"291px",border: "1px solid black", borderRadius: "10px",padding:"20px"}}>
                            <Box component="img" src={coin}></Box>
                            <Box sx={{gap:"150px"}} display= {"flex"} justifyContent={"start"} alignItems={"flex-start"}>
                                <Box gap={2} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"flex-start"}>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>Product</Typography>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>Stock Available</Typography>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>Special Offer</Typography>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>Discount</Typography>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>Price</Typography>
                                    <Button variant="contained"
                            color='secondary'
                                
                                sx={{ borderRadius: "25px" }}
                            >
                                View</Button>
                                </Box>
                                <Box gap={2} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"flex-start"}>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>Candles</Typography>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>10</Typography>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>Special Offer</Typography>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>20%</Typography>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>200</Typography>
                                    <Button variant="contained"
                            color='secondary'
                            
                                sx={{ borderRadius: "25px" }}
                            >
                                Edit</Button>
                                </Box>
                            </Box>
                            
                        </Box>
                    </Grid>
                    <Grid size={6}>
                        <Box display={"flex"} alignItems={"center"} sx={{ margin:"20px",  gap:"20px",height:"291px",border: "1px solid black", borderRadius: "10px",padding:"20px"}}>
                            <Box component="img" src={coin}></Box>
                            <Box sx={{gap:"150px"}} display= {"flex"} justifyContent={"start"} alignItems={"flex-start"}>
                                <Box gap={2} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"flex-start"}>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>Product</Typography>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>Stock Available</Typography>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>Special Offer</Typography>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>Discount</Typography>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>Price</Typography>
                                    <Button variant="contained"
                            color='secondary'
                                
                                sx={{ borderRadius: "25px" }}
                            >
                                View</Button>
                                </Box>
                                <Box gap={2} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"flex-start"}>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>Candles</Typography>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>10</Typography>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>Special Offer</Typography>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>20%</Typography>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>200</Typography>
                                    <Button variant="contained"
                            color='secondary'
                            
                                sx={{ borderRadius: "25px" }}
                            >
                                Edit</Button>
                                </Box>
                            </Box>
                            
                        </Box>
                    </Grid>
                    <Grid size={6}>
                        <Box display={"flex"} alignItems={"center"} sx={{ margin:"20px",  gap:"20px",height:"291px",border: "1px solid black", borderRadius: "10px",padding:"20px"}}>
                            <Box component="img" src={coin}></Box>
                            <Box sx={{gap:"150px"}} display= {"flex"} justifyContent={"start"} alignItems={"flex-start"}>
                                <Box gap={2} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"flex-start"}>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>Product</Typography>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>Stock Available</Typography>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>Special Offer</Typography>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>Discount</Typography>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>Price</Typography>
                                    <Button variant="contained"
                            color='secondary'
                                
                                sx={{ borderRadius: "25px" }}
                            >
                                View</Button>
                                </Box>
                                <Box gap={2} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"flex-start"}>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>Candles</Typography>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>10</Typography>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>Special Offer</Typography>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>20%</Typography>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>200</Typography>
                                    <Button variant="contained"
                            color='secondary'
                            
                                sx={{ borderRadius: "25px" }}
                            >
                                Edit</Button>
                                </Box>
                            </Box>
                            
                        </Box>
                    </Grid>
                    <Grid size={6}>
                        <Box display={"flex"} alignItems={"center"} sx={{ margin:"20px",  gap:"20px",height:"291px",border: "1px solid black", borderRadius: "10px",padding:"20px"}}>
                            <Box component="img" src={coin}></Box>
                            <Box sx={{gap:"150px"}} display= {"flex"} justifyContent={"start"} alignItems={"flex-start"}>
                                <Box gap={2} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"flex-start"}>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>Product</Typography>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>Stock Available</Typography>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>Special Offer</Typography>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>Discount</Typography>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>Price</Typography>
                                    <Button variant="contained"
                            color='secondary'
                                
                                sx={{ borderRadius: "25px" }}
                            >
                                View</Button>
                                </Box>
                                <Box gap={2} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"flex-start"}>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>Candles</Typography>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>10</Typography>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>Special Offer</Typography>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>20%</Typography>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>200</Typography>
                                    <Button variant="contained"
                            color='secondary'
                            
                                sx={{ borderRadius: "25px" }}
                            >
                                Edit</Button>
                                </Box>
                            </Box>
                            
                        </Box>
                    </Grid>
                    <Grid size={6}>
                        <Box display={"flex"} alignItems={"center"} sx={{ margin:"20px",  gap:"20px",height:"291px",border: "1px solid black", borderRadius: "10px",padding:"20px"}}>
                            <Box component="img" src={coin}></Box>
                            <Box sx={{gap:"150px"}} display= {"flex"} justifyContent={"start"} alignItems={"flex-start"}>
                                <Box gap={2} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"flex-start"}>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>Product</Typography>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>Stock Available</Typography>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>Special Offer</Typography>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>Discount</Typography>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>Price</Typography>
                                    <Button variant="contained"
                            color='secondary'
                                
                                sx={{ borderRadius: "25px" }}
                            >
                                View</Button>
                                </Box>
                                <Box gap={2} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"flex-start"}>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>Candles</Typography>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>10</Typography>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>Special Offer</Typography>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>20%</Typography>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>200</Typography>
                                    <Button variant="contained"
                            color='secondary'
                            
                                sx={{ borderRadius: "25px" }}
                            >
                                Edit</Button>
                                </Box>
                            </Box>
                            
                        </Box>
                    </Grid>
                    <Grid size={6}>
                        <Box display={"flex"} alignItems={"center"} sx={{ margin:"20px",  gap:"20px",height:"291px",border: "1px solid black", borderRadius: "10px",padding:"20px"}}>
                            <Box component="img" src={coin}></Box>
                            <Box sx={{gap:"150px"}} display= {"flex"} justifyContent={"start"} alignItems={"flex-start"}>
                                <Box gap={2} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"flex-start"}>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>Product</Typography>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>Stock Available</Typography>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>Special Offer</Typography>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>Discount</Typography>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>Price</Typography>
                                    <Button variant="contained"
                            color='secondary'
                                
                                sx={{ borderRadius: "25px" }}
                            >
                                View</Button>
                                </Box>
                                <Box gap={2} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"flex-start"}>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>Candles</Typography>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>10</Typography>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>Special Offer</Typography>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>20%</Typography>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>200</Typography>
                                    <Button variant="contained"
                            color='secondary'
                            
                                sx={{ borderRadius: "25px" }}
                            >
                                Edit</Button>
                                </Box>
                            </Box>
                            
                        </Box>
                    </Grid>
                    <Grid size={6}>
                        <Box display={"flex"} alignItems={"center"} sx={{ margin:"20px",  gap:"20px",height:"291px",border: "1px solid black", borderRadius: "10px",padding:"20px"}}>
                            <Box component="img" src={coin}></Box>
                            <Box sx={{gap:"150px"}} display= {"flex"} justifyContent={"start"} alignItems={"flex-start"}>
                                <Box gap={2} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"flex-start"}>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>Product</Typography>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>Stock Available</Typography>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>Special Offer</Typography>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>Discount</Typography>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>Price</Typography>
                                    <Button variant="contained"
                            color='secondary'
                                
                                sx={{ borderRadius: "25px" }}
                            >
                                View</Button>
                                </Box>
                                <Box gap={2} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"flex-start"}>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>Candles</Typography>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>10</Typography>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>Special Offer</Typography>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>20%</Typography>
                                    <Typography variant='p' sx={{ fontSize: "18px", fontWeight: "400", color: "black" }}>200</Typography>
                                    <Button variant="contained"
                            color='secondary'
                            
                                sx={{ borderRadius: "25px" }}
                            >
                                Edit</Button>
                                </Box>
                            </Box>
                            
                        </Box>
                    </Grid>
                    
                    </Grid>

            </Box>
            <Footer/>
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
    </>
  )
}

export default BussinessHome
