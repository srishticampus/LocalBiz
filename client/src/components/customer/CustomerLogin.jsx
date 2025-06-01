import React, { useState } from 'react'
import NavbarSigin from '../Navbar/NavbarSigin';
import { Box, Button, Container, InputAdornment, Stack, TextField, Typography, styled } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Footer from '../Footer/Footer';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { baseUrl } from '../../baseUrl';

const CustomerLogin = () => {
    const textFieldStyle = { height: "65px", width: "360px", display: "flex", flexDirection: "column", justifyContent: "start", position: "relative" }
    const siginupStyle = { background: "white", boxShadow: "none" };

    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${baseUrl}customer/login`, data);
            const { token, message } = response.data;

            if (token && message === "customer logged in successfully") {
                localStorage.setItem("token", token);
                toast.success("Logged in successfully!");
                navigate("/customer/home");
            } else {
                // This case might handle unexpected successful responses without a token
                toast.error("Login failed. Please try again.");
            }
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status === 400 || error.response.status === 500) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error("An unexpected error occurred. Please try again later.");
                }
            } else if (error.request) {
                // The request was made but no response was received
                toast.error("No response from server. Please check your network connection.");
            } else {
                // Something happened in setting up the request that triggered an Error
                toast.error("An error occurred during login. Please try again.");
            }
            console.error("Login error:", error);
        }
    }
    return (
        <>
            <NavbarSigin siginupStyle={siginupStyle} />
            <Container>

                <Box display={'flex'} flexDirection={'column'} alignItems={'center'} sx={{ marginTop: "80px" }}>
                    <Typography variant="p" component="div" color='secondary' sx={{ fontSize: "32px" }}>
                        Login !
                    </Typography>
                    <Box display={'flex'} flexDirection={'column'} alignItems={'flex-end'} >

                        <Stack display={'flex'} flexDirection={'column'} gap={3}>
                            <div style={textFieldStyle}>
                                <label>Email</label>
                                <input style={{ height: "40px", borderRadius: "8px", border: " 1px solid #CCCCCC", padding: '8px' }}
                                    onChange={handleInputChange}
                                    name='email'
                                    value={data.email}
                                    type='text'

                                />

                            </div>
                            <div style={textFieldStyle}>
                                <label>Password</label>
                                <input style={{ height: "40px", borderRadius: "8px", border: " 1px solid #CCCCCC", padding: '8px' }}
                                    onChange={handleInputChange}
                                    name='password'
                                    value={data.password}
                                    type='password'
                                />
                                {data.password.length > 0 ? "" : <VisibilityOffIcon
                                    style={{
                                        position: 'absolute',
                                        right: '10px',
                                        top: '70%',
                                        transform: 'translateY(-50%)',
                                        cursor: 'pointer',
                                    }}
                                />}

                            </div>
                        </Stack>
                        <Box display={'flex'} alignItems={'flex-end'} justifyContent={'center'}>
                            <Link to="/customer/forgotpassword" style={{ textDecoration: "none" }}>
                                <Typography variant='p' sx={{ marginTop: "10px", color: '#333333', fontSize: "12px", fontWeight: '600' }}>Forgot password</Typography>
                            </Link>

                        </Box>

                    </Box>


                    <Stack display={'flex'} flexDirection={'column'} alignItems={'center'} gap={2} mt={2}>
                        <Button variant='contained' color='secondary' sx={{ borderRadius: "25px", marginTop: "20px", mb: "20px", height: "40px", width: '200px', padding: '10px 35px' }}
                            onClick={handleLogin}
                        >Login</Button>

                        <Typography sx={{ mb: "50px" }}>
                            Don't have an account? <Link to="/customer/registration"><span style={{ textDecoration: "underline", color: 'black' }}>Sign up</span></Link>
                        </Typography>
                    </Stack>
                </Box>

            </Container>
            <Footer />


        </>
    )
}

export default CustomerLogin
