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
import OrganiserNavbar from '../Navbar/OrganiserNavbar';

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
    // loging out and not returing to profile page
    useEffect(() => {
        if (localStorage.getItem("organiserDetails") == null) {
          navigate("/");
        }
      },[]);
  return (
    <>
    <OrganiserNavbar handleOpen={handleOpen} organiserdetails={organiser} />
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
            <Footer/>
      
    </>
  )
}

export default OrganiserHome
