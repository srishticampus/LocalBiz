import React, { useState } from 'react'
import NavbarSigin from '../Navbar/NavbarSigin';
import { Box, Button, Container, InputAdornment, Stack, TextField, Typography, styled } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Footer from '../Footer/Footer';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const BussinessResetPassword = () => {
    const textFieldStyle = { height: "65px", width: "360px", display: "flex", flexDirection: "column", justifyContent: "start", position: "relative" };
    const siginupStyle = { background: "white", boxShadow: "none" };

    const {email}=useParams();
    


    const[data,setData]=useState({
        password:"",
        confirmpassword:""
    });
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setData((prevData)=>{
            return{
                ...prevData,
                [name]:value
            }
        })

    }
    const[error,setError]=useState({});
    const validation=()=>{
        let isValid = true;
        let errormessage={};
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,15}$/;
        if(!data.password.trim()){
            errormessage.password="Password is required";
            isValid=false;
        }
        else if(!passwordRegex.test(data.password)){
            errormessage.password="Password should have atleast one Uppercase,smallcase,special charecter and should be 6 to 15 char length"
            isValid = false;
        }
        if(!data.confirmpassword.trim()){
            errormessage.confirmpassword="Confirm Password is required";
            isValid=false;
        }
        else if(data.confirmpassword.length<8 ||data.confirmpassword.length>20){
            errormessage.confirmpassword="Confirm Password must be 8-20 characters long";
            isValid=false;
        }
        if(data.password!==data.confirmpassword){
            errormessage.confirmpassword="Password and Confirm Password must be same";
            isValid=false;
        }
        setError(errormessage);
        return isValid;
    }
    // const [message,setMessage]=useState({
    //     success:"",
    //     error:""
    // });
    const navigate=useNavigate();
    const handleSubmit= async(e)=>{
        e.preventDefault();
        const isValid = validation();
        if (!isValid) {
            return;
        }
        const result= await axios.post(`${baseUrl}bussiness/resetpassword/${email}`,data);

        console.log(result);

        
        // console.log(data);
        console.log(email);
        

        if(result.data.message==="No bussiness found with this email."){
            // setMessage({
            //     success:"",
            //     error:"No bussiness found with this email."
            // });
            // return;
            toast.error("No bussiness found with this email.");
        }
        if(result.data.message==="Password reset successfully."){
            // setMessage({
            //     success:"Password reset successfully.",
            //     error:""
            // });
            toast.success("Password reset successfully.");
            navigate("/bussiness/login")
        }
        
    }
  return (
    <>
      <NavbarSigin siginupStyle={siginupStyle}/>
    <Container maxWidth="x-lg">
    
    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={"center"} gap={2} mt={5}>
               <Stack sx={{ width: "360px", height: "368px" }}
                display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={"center"} gap={2} mt={2}>
                    <Typography color='secondary' variant='p' sx={{ fontSize: "32px"}}>Reset Password!</Typography>
                    <Typography textAlign={"center"} color='primary' variant='p' sx={{ fontSize: "14px", fontWeight: "500" }}>
                    Enter your new password to reset.
                    </Typography>
                    <div style={textFieldStyle}>
                                <label>New Password</label>
                                <input style={{ height: "40px", borderRadius: "8px", border: " 1px solid #CCCCCC", padding: '8px' }}
                                    onChange={handleChange}
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
                                {error.password && <span style={{ color: 'red', fontSize: '12px' }}>{error.password}</span>}

                            </div>
                            <div style={textFieldStyle}>
                                <label>Confirm Password</label>
                                <input style={{ height: "40px", borderRadius: "8px", border: " 1px solid #CCCCCC", padding: '8px' }}
                                    onChange={handleChange}
                                    name='confirmpassword'
                                    value={data.confirmpassword}
                                    type='password'
                                />
                                {data.confirmpassword.length > 0 ? "" : <VisibilityOffIcon
                                    style={{
                                        position: 'absolute',
                                        right: '10px',
                                        top: '70%',
                                        transform: 'translateY(-50%)',
                                        cursor: 'pointer',
                                    }}
                                />}
                                {error.confirmpassword && <span style={{ color: 'red', fontSize: '12px' }}>{error.confirmpassword}</span>}

                            </div>
                    <Button variant='contained' color='secondary' sx={{ borderRadius: "25px", marginTop: "20px", height: "40px", width: '200px', padding: '10px 35px' }} onClick={handleSubmit}>Confirm</Button>

                </Stack>
               </Box>
               {/* {message.success && <p style={{ color: 'green', fontSize: '32px',textAlign:"center" }}>{message.success}</p>}
               {message.error && <p style={{ color: 'red', fontSize: '32px',textAlign:"center" }}>{message.error}</p>} */}

    </Container>
    <Footer/>
    </>
  )
}

export default BussinessResetPassword
