import React, { useEffect, useState } from 'react'
import CustomerNavbar from '../Navbar/CustomerNavbar'
import { Box, Button, Typography, Container, Grid } from '@mui/material';
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
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Typography sx={{ fontSize: { xs: "20px", md: "24px" }, fontWeight: "400", textAlign: { xs: "center", md: "left" }, mb: 4 }} variant='h4'>View Products</Typography>

                <Grid container spacing={4} justifyContent="center" alignItems="flex-start">
                    {/* Product Image and Reviews Section */}
                    <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Box sx={{ height: { xs: "300px", md: "575px" }, width: { xs: "300px", md: "500px" }, maxWidth: "100%" }} component="img" src={coin} alt='coin'></Box>
                        <Box sx={{ gap: "20px", mt: "20px", mb: "50px", alignItems: { xs: "center", md: "start" } }} display={"flex"} flexDirection={"column"} justifyContent={"center"}>
                            <Typography color='primary' sx={{ fontSize: "15px", fontWeight: "400" }} variant='p'>Reviews and Ratings</Typography>
                            <textarea rows={4} style={{ width: "100%", maxWidth: "360px" }}>

                            </textarea>

                            <Box display={"flex"} gap={"5px"}>
                                <Typography color='primary' sx={{ fontSize: "15px", fontWeight: "400" }} variant='p'>3.5★</Typography>
                                <Typography color='primary' sx={{ fontSize: "15px", fontWeight: "400" }} variant='p'>12,371 Ratings &</Typography>
                                <Typography color='primary' sx={{ fontSize: "15px", fontWeight: "400" }} variant='p'>871 Reviews</Typography>
                            </Box>
                        </Box>
                    </Grid>

                    {/* Product Details Section */}
                    <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "column", alignItems: { xs: "center", md: "flex-start" } }}>
                        <Box sx={{ gap: "20px", width: { xs: "100%", md: "500px" }, maxWidth: "100%" }} display={"flex"} flexDirection={"column"} alignItems={"start"}>
                            <Box display={"flex"} justifyContent={"space-between"} width={"100%"}>
                                <Typography color='primary' sx={{ fontSize: "18px", fontWeight: "400" }} variant='p'>Product Name</Typography>
                                <Typography color='primary' sx={{ fontSize: "18px", fontWeight: "400" }} variant='p'>Tea Light Candle</Typography>
                            </Box>
                            <Box display={"flex"} justifyContent={"space-between"} width={"100%"}>
                                <Typography color='primary' sx={{ fontSize: "18px", fontWeight: "400" }} variant='p'>Color</Typography>
                                <Typography color='primary' sx={{ fontSize: "18px", fontWeight: "400" }} variant='p'>White</Typography>
                            </Box>
                            <Box display={"flex"} justifyContent={"space-between"} width={"100%"}>
                                <Typography color='primary' sx={{ fontSize: "18px", fontWeight: "400" }} variant='p'>Weight</Typography>
                                <Typography color='primary' sx={{ fontSize: "18px", fontWeight: "400" }} variant='p'>100gm</Typography>
                            </Box>
                            <Box display={"flex"} justifyContent={"space-between"} width={"100%"}>
                                <Typography color='primary' sx={{ fontSize: "18px", fontWeight: "400" }} variant='p'>Adds</Typography>
                                <Typography color='primary' sx={{ fontSize: "18px", fontWeight: "400" }} variant='p'>20</Typography>
                            </Box>
                            <Box display={"flex"} justifyContent={"space-between"} width={"100%"}>
                                <Typography color='primary' sx={{ fontSize: "18px", fontWeight: "400" }} variant='p'>Stock Available</Typography>
                                <Typography color='primary' sx={{ fontSize: "18px", fontWeight: "400" }} variant='p'>50</Typography>
                            </Box>
                            <Box display={"flex"} justifyContent={"space-between"} width={"100%"}>
                                <Typography color='primary' sx={{ fontSize: "18px", fontWeight: "400" }} variant='p'>Price</Typography>
                                <Typography color='primary' sx={{ fontSize: "18px", fontWeight: "400" }} variant='p'>200</Typography>
                            </Box>
                            <Box display={"flex"} justifyContent={"space-between"} width={"100%"}>
                                <Typography color='primary' sx={{ fontSize: "18px", fontWeight: "400" }} variant='p'>Special Offer</Typography>
                                <Typography color='primary' sx={{ fontSize: "18px", fontWeight: "400",textAlign:"end" }} variant='p'>Get extra 31% off (price inclusive of cashback/coupon)</Typography>
                            </Box>
                            <Box display={"flex"} justifyContent={"space-between"} width={"100%"}>
                                <Typography color='primary' sx={{ fontSize: "18px", fontWeight: "400" }} variant='p'>Discount Price</Typography>
                                <Typography color='primary' sx={{ fontSize: "18px", fontWeight: "400" }} variant='p'>180</Typography>
                            </Box>
                            <Box display={"flex"} justifyContent={"space-between"} gap={"20px"} width={"100%"}>
                                <Typography color='primary' sx={{ fontSize: "18px", fontWeight: "400" }} variant='p'>Description</Typography>
                                <Typography color='primary' sx={{ fontSize: "18px", fontWeight: "400",textAlign:'justify' }} variant='p'>Enhance your space with this high-quality candle, designed to create a warm and soothing ambiance. Made from premium wax, it offers a clean and smokeless burn, making it ideal for home décor, relaxation, and special occasions.</Typography>
                            </Box>
                            <Button sx={{ background: "#9B70D3", color: "white", borderRadius: "15px", alignSelf: "flex-end", mt: 4 }}>
                                update
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <Footer />

        </>
    )
}

export default CustomerProductView
