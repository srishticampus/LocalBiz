import React, { useState } from 'react'
import NavbarSigin from '../Navbar/NavbarSigin';
import { Box, Button, Container, Stack, TextField, Typography, styled } from '@mui/material';
import Footer from '../Footer/Footer';
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../baseUrl';

const BussinessForgotPassword = () => {
    const textFieldStyle = { height: "65px", width: "360px", display: "flex", flexDirection: "column", justifyContent: "start", position: "relative" };
    const siginupStyle = { background: "white", boxShadow: "none" };

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("")
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError("entervalid email format");
            return false;
        }
        setEmailError("");
        return true;
    }
    const navigate = useNavigate();


    const handleForgot = async (e) => {
        e.preventDefault();
        // console.log(email)
        const isvalid = validateEmail();
        if (!isvalid) {
            return;
        }

        const response = await axios.post(`${baseUrl}bussiness/forgotpassword`, { email });
        console.log(response.data);
        setEmail("");
        if (response.data.message === " No bussiness found with this email.") {
            return toast.error("No bussiness found with this email");
        }
        // toast.info("register your new password");
        navigate(`/bussiness/resetpassword/${email}`);

    }
  return (
    <>
       <NavbarSigin siginupStyle={siginupStyle} />
            <Container maxWidth="x-lg">

                <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={"center"} gap={2} mt={5}>
                    <Stack sx={{ width: "304px", height: "360px" }}
                        display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={"center"} gap={2} mt={2}>
                        <Typography color='secondary' variant='p' sx={{ fontSize: "32px"}}>Forget Password?</Typography>
                        <Typography textAlign={"center"} color='primary' variant='p' sx={{ fontSize: "14px", fontWeight: "500" }}>
                            Enter your E-mail below to receive your password reset instruction
                        </Typography>
                        <div style={textFieldStyle}>
                            <label>Email</label>
                            <input style={{ height: "40px", borderRadius: "8px", border: " 1px solid #CCCCCC", padding: '8px' }}
                                name='email'
                                type='email'
                                value={email}
                                onChange={handleEmailChange}
                            />

                            {emailError && <p style={{ fontSize: "12px", color: "red" }}>{emailError}</p>}
                        </div>
                        <Button variant='contained' color='secondary' sx={{ borderRadius: "25px", marginTop: "20px", height: "40px", width: '200px', padding: '10px 35px' }}
                            onClick={handleForgot}
                        >Next</Button>

                    </Stack>
                </Box>


            </Container>
            <Footer />
    </>
  )
}

export default BussinessForgotPassword
