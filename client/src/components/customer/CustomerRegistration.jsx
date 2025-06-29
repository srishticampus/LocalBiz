import React, { useState } from 'react'
import NavbarSigin from '../Navbar/NavbarSigin'
import { Container, Stack, Typography, Box, TextField, styled, InputAdornment, Checkbox, Button } from '@mui/material';
import profileFrame from "../../assets/image 42.png";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Footer from '../Footer/Footer';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { baseUrl } from '../../baseUrl';

const CustomerRegistration = () => {
  const textFieldStyle = { height: "65px", width: "360px", display: "flex", flexDirection: "column", justifyContent: "start", position: "relative" }
  const siginupStyle = { background: "white", boxShadow: "none" }

  const [checked, setChecked] = React.useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (event) => {
    if (event.target.checked) {
        setError((prevError) => ({
            ...prevError,
            terms: ""
        }));
    }
      setChecked(event.target.checked);
  };

  const [imagePreview, setImagePreview] = useState(null);

  const [message, setMessage] = useState({
      success: "",
      error: ""
  })
  const [error, setError] = useState({})

  const [data, setData] = useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      address: "",
      phone: "",
      profilePic: null
  });
  const handleDataChange = (e) => {
    setError((prevError) => ({
        ...prevError,
        [name]: ""
    }));
      const { name, value } = e.target;
      setData(prev => {
          return { ...prev, [name]: value }
      })

  }

  const handleFileUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
          setData(prev => {
              return { ...prev, profilePic: file }
          });
          const objectURL = URL.createObjectURL(file);
          setImagePreview(objectURL);
      }

  }
  const validation = () => {
      let isValid = true;
      let errorMessage = {};
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,15}$/;
      if (!data.name.trim()) {
          errorMessage.name="Name should not be empty"
          isValid = false;
      }
      else if(data.name.length<3||data.name.length>20){
          errorMessage.name="Name should be 3 to 20 char length"
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
      if (!data.password.trim()) {
          errorMessage.password = "Password should not be empty";
          isValid = false;
      }
      else if(!passwordRegex.test(data.password)){
        errorMessage.password="Password should have atleast one Uppercase,smallcase,special charecter and should be 6 to 15 char length"
        isValid = false;
    }
      if (!data.confirmPassword.trim()) {
          errorMessage.confirmPassword = "Confirm Password should not be empty";
          isValid = false;
      }
      else if(data.confirmPassword.length<8||data.confirmPassword.length>20){
          errorMessage.confirmPassword="Confirm password should be 8 to 20 char length"
          isValid = false;
      }
      if (data.password !== data.confirmPassword) {
          errorMessage.confirmPassword = "Password and confirm password should be same";
          isValid = false;
      }
      const addressRegex = /^[a-zA-Z0-9\s,.'-]{10,}$/; // Allows alphanumeric, spaces, commas, periods, apostrophes, hyphens, min 10 chars
      if (!data.address.trim()) {
          errorMessage.address="Address should not be empty"
          isValid = false;
      }
      else if(!addressRegex.test(data.address)){
          errorMessage.address="Address should be at least 10 characters long and can contain letters, numbers, spaces, and common punctuation."
          isValid = false;
      }

      const phoneRegex = /^\d{10}$/; // Exactly 10 digits
      if (!data.phone.trim()) {
          errorMessage.phone="Phone number should not be empty"
          isValid = false;
      }
      else if(!phoneRegex.test(data.phone)){
          errorMessage.phone="Phone number should be exactly 10 digits"
          isValid = false;
      }
      if(!checked){
          errorMessage.terms = "Please accept the terms and conditions";
          isValid = false;
      }
      setError(errorMessage);
      return isValid;

  }

const navigate=useNavigate();
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
      formData.append('password', data.password);
      formData.append('confirmpassword', data.confirmPassword);
      formData.append('address', data.address);
      formData.append('phone', data.phone);
      formData.append('profilePic', data.profilePic);
      formData.append('agreed', checked)

      const response = await axios.post(`${baseUrl}customer/registration`, formData);

      const result = response.data;
      console.log(result);
      console.log(result.message);


      console.log(data);


      if (result.message === "Customer already registered with this phone number") {
        //   return setMessage({
        //       success: "",
        //       error: "you have already registered with this phone number"

        //   })
        toast.error("you have already registered with this phone number")
      }
      if (result.message === "Customer already registered with this email") {
        //   return setMessage({
        //       success: "",
        //       error: "you have already registered with this email id"

        //   })
        toast.error("you have already registered with this email id")
      }
      if (result.message === "Customer created successfully") {
          setData({
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
              address: "",
              phone: "",
              profilePic: null
          });
          setChecked(false);
          setImagePreview(null);

        //   return setMessage({ success: "Customer Profile created", error: "" });
        toast.success("Customer Profile created");
        navigate("/customer/login");
        
      }


  }
  return (
    <>
    <NavbarSigin siginupStyle={siginupStyle}/>
    <Container sx={{ position: "relative",mb:"50px" ,siginupStyle }} maxWidth="x-lg">
                
                <Box display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'}>
                    <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
                        <Stack spacing={2} sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginTop: "60px" }}>
                            <input
                                type="file"
                                id="profile-upload"
                                accept="image/*"
                                onChange={handleFileUpload}
                                style={{ display: "none" }}
                            />

                            <Typography variant='p' color='secondary' sx={{ fontSize: "32px"}}>Sign Up!</Typography>
                            
                            <label htmlFor="profile-upload" style={{ cursor: "pointer", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "15px" }}>
                                <Box component="img" src={imagePreview ? imagePreview : profileFrame} alt='profilepic' sx={{ width: "150px", height: "150px", borderRadius: "50%" }}></Box>
                                {imagePreview ? <Typography></Typography> : <Typography variant='p'  sx={{ fontSize: "12px", fontWeight: "500" }}>+ add image</Typography>}

                            </label>
                        </Stack>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: 'center', alignItems: "start", gap: "30px", height: "293px", flexDirection: "column", marginTop: '30px' }}>
                        <Stack direction="row" sx={{ display: "flex", gap: "25px" }}>

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
                        <Stack direction={'row'} sx={{ display: "flex", gap: "25px" }}>
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
                                <label>Password</label>
                                <input style={{ height: "40px", borderRadius: "8px", border: " 1px solid #CCCCCC", padding: '8px' }}
                                    onChange={handleDataChange}
                                    name='password'
                                    value={data.password}
                                    type={showPassword ? 'text' : 'password'}
                                />
                                <Box
                                    onClick={() => setShowPassword(!showPassword)}
                                    sx={{
                                        position: 'absolute',
                                        right: '10px',
                                        top: '70%',
                                        transform: 'translateY(-50%)',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </Box>
                                {error.password && <span style={{ color: 'red', fontSize: '12px' }}>{error.password}</span>}
                            </div>
                        </Stack>
                        <Stack direction={'row'} sx={{ display: "flex", gap: "25px" }}>
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
                            <div style={textFieldStyle}>
                                <label>Confirm Password</label>
                                <input style={{ height: "40px", borderRadius: "8px", border: " 1px solid #CCCCCC", padding: '8px' }}
                                    onChange={handleDataChange}
                                    name='confirmPassword'
                                    value={data.confirmPassword}
                                    type={showConfirmPassword ? 'text' : 'password'}
                                />
                                <Box
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    sx={{
                                        position: 'absolute',
                                        right: '10px',
                                        top: '70%',
                                        transform: 'translateY(-50%)',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {showConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </Box>
                                {error.confirmPassword && <span style={{ color: 'red', fontSize: '12px' }}>{error.confirmPassword}</span>}
                            </div>

                        </Stack>

                        <Stack direction={'row'}>
                            <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
                                <Checkbox
                                    checked={checked}
                                    onChange={handleChange}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                                <Typography sx={{ fontSize: "14px", fontWeight: "500" }}>
                                    Aggred to <span style={{ color: "#6F32BF" }}>Terms and Conditions</span>
                                </Typography>
                                
                               

                            </Box >
                            

                        </Stack>
                        {error.terms && <span style={{ color: 'red', fontSize: '12px',marginTop:"-30px" }}>{error.terms}</span>}


                    </Box>
                    {/*  */}
                    <Box display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'} sx={{ width: '253px', height: "93px", gap: '10px' }}>
                        <Button variant='contained' color='secondary' sx={{ borderRadius: "25px", marginTop: "20px", height: "40px", width: '200px', padding: '10px 35px' }}
                            onClick={handleSubmit}
                        >Register</Button>
                        <Typography>
                            Already have an account? <Link to="/customer/login"><span style={{ textDecoration: "underline",color:"black" }}>Sign in</span></Link>
                        </Typography>

                    </Box>
                </Box>
                {message.success && <p style={{ textAlign: "center", color: "green", fontSize: "32px", fontWeight: "600" }}>{message.success}</p>}
                {message.error && <p style={{ textAlign: "center", color: "red", fontSize: "32px", fontWeight: "600" }}>{message.error}</p>}

            </Container>
            <Footer />

    
      
    </>
  )
}

export default CustomerRegistration
