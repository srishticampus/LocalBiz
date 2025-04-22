import React, { useEffect, useState } from 'react'
import CustomerNavbar from '../Navbar/CustomerNavbar'
import { Box, Button, Typography } from '@mui/material';
import coin from "../../assets/image 94.png";
import Footer from '../Footer/Footer';

const CustomerProductView = () => {
    const [customerDetails,setCustomerDetails]=useState({});
    useEffect(()=>{
       const customerDetails=  localStorage.getItem("customerDetails");
       setCustomerDetails(JSON.parse(customerDetails));
    },[]);
    return (
        <>
            <CustomerNavbar customerdetails={customerDetails} />
            <Box>
                <Typography sx={{ fontSize: "24px", fontWeight: "400", ml: "150px" }} variant='h4'>View Products</Typography>
            </Box>
            <Box display={"flex"} alignItems={"start"} sx={{ ml: "150px", mt: "60px", gap: "70px" }}>
                <Box sx={{ gap: "20px" }} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                    <Box sx={{ height: "575px", width: "500px" }} component="img" src={coin} alt='coin'></Box>
                    <Box sx={{ gap: "20px", mt: "20px" ,mb:"50px"}} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"start"}>
                        <Typography color='primary' sx={{ fontSize: "15px", fontWeight: "400" }} variant='p'>Reviews and Ratings</Typography>
                        <textarea rows={4} style={{ width: "360px" }}>

                        </textarea>

                        <Typography color='primary' sx={{ fontSize: "15px", fontWeight: "400" }} variant='p'>3.5★</Typography>
                        <Typography color='primary' sx={{ fontSize: "15px", fontWeight: "400" }} variant='p'>12,371 Ratings &</Typography>
                        <Typography color='primary' sx={{ fontSize: "15px", fontWeight: "400" }} variant='p'>871 Reviews</Typography>
                    </Box>

                </Box>
                <Box sx={{ gap: "80px" }} display={"flex"} justifyContent={"center"} alignItems={"start"}>
                    <Box sx={{ gap: "40px",width:"500px" }} display={"flex"} flexDirection={"column"} alignItems={"start"}>
                        <Typography color='primary' sx={{ fontSize: "18px", fontWeight: "400" }} variant='p'>Product Name</Typography>
                        <Typography color='primary' sx={{ fontSize: "18px", fontWeight: "400" }} variant='p'>Color</Typography>
                        <Typography color='primary' sx={{ fontSize: "18px", fontWeight: "400" }} variant='p'>Weight</Typography>
                        <Typography color='primary' sx={{ fontSize: "18px", fontWeight: "400" }} variant='p'>Adds</Typography>
                        <Typography color='primary' sx={{ fontSize: "18px", fontWeight: "400" }} variant='p'>Stock Available</Typography>
                        <Typography color='primary' sx={{ fontSize: "18px", fontWeight: "400" }} variant='p'>Price</Typography>
                        <Typography color='primary' sx={{ fontSize: "18px", fontWeight: "400" }} variant='p'>Special Offer</Typography>
                        <Typography color='primary' sx={{ fontSize: "18px", fontWeight: "400" }} variant='p'>Discount Price</Typography>
                        <Typography color='primary' sx={{ fontSize: "18px", fontWeight: "400" }} variant='p'>Description</Typography>
                    </Box>
                    <Box display={"flex"} flexDirection={"column"} alignItems={"end"} sx={{gap:'100px',mr:"100px"}}>
                        <Box sx={{ gap: "40px" }} display={"flex"} flexDirection={"column"} alignItems={"start"}>
                        <Typography color='primary' sx={{ fontSize: "18px", fontWeight: "400" }} variant='p'>Tea Light Candle</Typography>
                        <Typography color='primary' sx={{ fontSize: "18px", fontWeight: "400" }} variant='p'>White</Typography>
                        <Typography color='primary' sx={{ fontSize: "18px", fontWeight: "400" }} variant='p'>100gm</Typography>
                        <Typography color='primary' sx={{ fontSize: "18px", fontWeight: "400" }} variant='p'>20</Typography>
                        <Typography color='primary' sx={{ fontSize: "18px", fontWeight: "400" }} variant='p'>50</Typography>
                        <Typography color='primary' sx={{ fontSize: "18px", fontWeight: "400" }} variant='p'>200</Typography>
                        <Typography color='primary' sx={{ fontSize: "18px", fontWeight: "400" }} variant='p'>Get extra 31% off (price inclusive of cashback/coupon)</Typography>
                        <Typography color='primary' sx={{ fontSize: "18px", fontWeight: "400" }} variant='p'>180</Typography>
                        <Typography color='primary' sx={{ fontSize: "18px", fontWeight: "400" }} variant='p'>Enhance your space with this high-quality candle, designed to create a warm and soothing ambiance. Made from premium wax, it offers a clean and smokeless burn, making it ideal for home décor, relaxation, and special occasions.</Typography>
                        </Box>
                        <Button sx={{background:"#9B70D3",color:"white",  borderRadius: "15px"}}>
                        update
                    </Button>

                    </Box>
                </Box>
            </Box>
            <Footer/>

        </>
    )
}

export default CustomerProductView
