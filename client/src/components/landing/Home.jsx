import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Box, Button, Typography } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Link } from 'react-router-dom';
import homemain from "../../assets/homemain.png";
import search from "../../assets/search.png";
import profile from "../../assets/profile.png"
import clock from "../../assets/clock.png"
import support from "../../assets/support.png";
import man from "../../assets/man.png";
import bag from "../../assets/bag.png";
import promotion from "../../assets/promotion.png";
import expo from "../../assets/export.png";
import man1 from "../../assets/image 93.png";
import dot from "../../assets/Group 9.png";
import Footer from '../Footer/Footer';

const Home = () => {
    const homebg = {
        background: 'white',
        zIndex: -5
    };

    return (
        <>
            <Navbar homebg={homebg} />
            <Box display="flex" flexDirection="column" justifyContent="start" alignItems="center" sx={{ background: 'linear-gradient(to top, #9B70D3 0%, #FFFFFF 100%)', height: "100%", mt: "60px", gap: "30px" }}>
                <Box display="flex" justifyContent="center" alignItems="center" sx={{ borderRadius: '10px', border: "1px solid #6F32BF", height: '47px', width: "244px" }}>
                    <Typography color='secondary' variant='p' sx={{ fontSize: "18px", fontWeight: "400" }}>Discover Local Businesses...</Typography>
                </Box>
                <Typography color='primary' variant='h2' sx={{ fontSize: "52px", fontWeight: "400" }}> Your Gateway to Local Services and</Typography>
                <Typography color='secondary' variant='h2' sx={{ fontSize: "52px", fontWeight: "400" }}> Business Deals!</Typography>
                <Box display="flex" justifyContent="center" alignItems="center" gap={5}>
                    <Link to="/customer/login">
                        <Button variant="contained"
                            color="secondary"
                            endIcon={<ArrowRightAltIcon />}
                            sx={{ borderRadius: "15px" }}
                        >
                            Register</Button>
                    </Link>
                    <Button variant="contained"

                        endIcon={<ArrowRightAltIcon />}
                        sx={{ borderRadius: "15px", backgroundColor: "transparent", color: "#6F32BF" }}
                    >
                        Learn more</Button>
                </Box>
                <Box component="img" src={homemain} sx={{ height: 'auto', width: "auto", marginTop: "40px" }}></Box>

            </Box>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ mt: '100px', gap: "20px" }}>
                <Typography color='secondary' variant='p' sx={{ fontSize: "24px", fontWeight: "400" }}>How it works</Typography>
                <Typography color='primary' variant='p' sx={{ fontSize: "15px", fontWeight: "400" }}>Follow these simple steps to start your business journey</Typography>
                <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: "30px", gap: "20px" }}>
                    <Box display="flex" flexDirection="column" justifyContent="start" alignItems="start" sx={{ height: "210px", width: '282px', background: "#FAF6FF", borderRadius: "8px", padding: "20px", gap: "20px" }}>
                        <Box component="img" src={search} sx={{ height: 'auto', width: "auto" }}></Box>
                        <Typography color='secondary' variant='p' sx={{ fontSize: "18px", fontWeight: "400" }}>Search for Local Business</Typography>
                        <Typography color='primary' variant='p' sx={{ fontSize: "15px", fontWeight: "400" }}>Use our smart search to find shops, services, or offers near you—by name, category, or location.</Typography>
                    </Box>
                    <Box display="flex" flexDirection="column" justifyContent="start" alignItems="start" sx={{ height: "210px", width: '282px', background: "#FAF6FF", borderRadius: "8px", padding: "20px", gap: "20px" }}>
                        <Box component="img" src={profile} sx={{ height: 'auto', width: "auto" }}></Box>
                        <Typography color='secondary' variant='p' sx={{ fontSize: "18px", fontWeight: "400" }}>Explore Business Profiles</Typography>
                        <Typography color='primary' variant='p' sx={{ fontSize: "15px", fontWeight: "400" }}>View detailed listings with photos, menus/products, working hours, and contact info—all in one place.</Typography>
                    </Box>
                    <Box display="flex" flexDirection="column" justifyContent="start" alignItems="start" sx={{ height: "210px", width: '282px', background: "#FAF6FF", borderRadius: "8px", padding: "20px", gap: "20px" }}>
                        <Box component="img" src={clock} sx={{ height: 'auto', width: "auto" }}></Box>
                        <Typography color='secondary' variant='p' sx={{ fontSize: "18px", fontWeight: "400" }}>Discover Deals</Typography>
                        <Typography color='primary' variant='p' sx={{ fontSize: "15px", fontWeight: "400" }}>Check real customer reviews and grab exclusive local promotions and discounts.</Typography>
                    </Box>
                    <Box display="flex" flexDirection="column" justifyContent="start" alignItems="start" sx={{ height: "210px", width: '282px', background: "#FAF6FF", borderRadius: "8px", padding: "20px", gap: "20px" }}>
                        <Box component="img" src={support} sx={{ height: 'auto', width: "auto" }}></Box>
                        <Typography color='secondary' variant='p' sx={{ fontSize: "18px", fontWeight: "400" }}>Connect & Support Local</Typography>
                        <Typography color='primary' variant='p' sx={{ fontSize: "15px", fontWeight: "400" }}>Call, message, visit, or share your favorite business—support your community to get great service.</Typography>
                    </Box>
                </Box>

            </Box>
            <Box display="flex" justifyContent="space-around" alignItems="center" sx={{ background: "#F6F7F9", height: "646px", mt: "100px" }}>
                <Box component='img' src={man}></Box>
                <Box display="flex" sx={{ mb: "50px" }} flexDirection={"column"} justifyContent="center" gap={4} alignItems="center">
                    <Box>
                        <Typography variant='p' color='secondary' sx={{ fontSize: "22px" }}>Our services</Typography>
                    </Box>
                    <Box display="flex" justifyContent="center" gap={2} alignItems="center" sx={{ height: "92px" }}>
                        <Box component="img" src={bag}></Box>
                        <Box display="flex" justifyContent="center" alignItems="start" flexDirection={"column"} gap={2}>
                            <Typography variant='p' color='secondary' sx={{ fontSize: "24px" }}>Business Discovery</Typography>
                            <Typography variant='p' color='primary' sx={{ fontSize: "15px" }}>Find verified local businesses quickly using smart filters, <br />location-based search, and interactive maps.</Typography>
                        </Box>

                    </Box>
                    <Box display="flex" justifyContent="center" gap={2} alignItems="center" sx={{ height: "92px" }}>
                        <Box component="img" src={promotion}></Box>
                        <Box display="flex" justifyContent="center" alignItems="start" flexDirection={"column"} gap={2}>
                            <Typography variant='p' color='secondary' sx={{ fontSize: "24px" }}>Promotion & Engagement</Typography>
                            <Typography variant='p' color='primary' sx={{ fontSize: "15px" }}>Access exclusive local deals, browse promotions, and <br /> interact directly with businesses through messages.</Typography>
                        </Box>

                    </Box>
                    <Box display="flex" justifyContent="center" gap={2} alignItems="center" sx={{ height: "92px" }}>
                        <Box component="img" src={expo}></Box>
                        <Box display="flex" justifyContent="center" alignItems="start" flexDirection={"column"} gap={2}>
                            <Typography variant='p' color='secondary' sx={{ fontSize: "24px" }}>Business Growth Tools</Typography>
                            <Typography variant='p' color='primary' sx={{ fontSize: "15px" }}>For business owners: create profiles, manage listings, run <br />promotions, and track engagement with analytics.</Typography>
                        </Box>

                    </Box>
                </Box>

            </Box>
            <Box display="flex" sx={{ mt: "100px", gap: "15px" }} justifyContent="space-around" gap={2} alignItems="center">
                <Box display="flex" flexDirection={"column"} justifyContent="space-around" gap={1} alignItems="start">
                    <Typography variant='h3' color='primary' sx={{ fontSize: "44px" }}>Everything Local, <span style={{ color: "#6F32BF" }}> All in One</span></Typography>
                    <Typography variant='h3' color='secondary' sx={{ fontSize: "44px" }}>place</Typography>
                    <Typography variant='p' color='primary' sx={{ fontSize: "15px" }}>From discovering businesses to grabbing deals and growing your own  <br />brand—Local Biz Connect empowers every step of the local experience.</Typography>
                    <Box display="flex" justifyContent="center" gap={4} alignItems="start" mt={3}>
                        <Box display="flex" justifyContent="center" gap={2} alignItems="start" flexDirection={"column"} mt={3}>
                            <Box display="flex" justifyContent="center" gap={1} alignItems="start" >
                                <Box component="img" src={dot}></Box>
                                <Typography variant='p' color='primary' sx={{ fontSize: "15px" }}>Smart Business Discovery</Typography>
                            </Box>
                            <Box display="flex" justifyContent="center" gap={1} alignItems="start" >
                                <Box component="img" src={dot}></Box>
                                <Typography variant='p' color='primary' sx={{ fontSize: "15px" }}>Customer Reviews</Typography>
                            </Box>

                        </Box>
                        <Box display="flex" justifyContent="center" gap={2} alignItems="start" flexDirection={"column"} mt={3}>
                            <Box display="flex" justifyContent="center" gap={1} alignItems="start" >
                                <Box component="img" src={dot}></Box>
                                <Typography variant='p' color='primary' sx={{ fontSize: "15px" }}>Map Integration</Typography>
                            </Box>
                            <Box display="flex" justifyContent="center" gap={1} alignItems="start" >
                                <Box component="img" src={dot}></Box>
                                <Typography variant='p' color='primary' sx={{ fontSize: "15px" }}>Exclusive Local Deals</Typography>
                            </Box>

                        </Box>
                    </Box>

                </Box>
                <Box component="img" src={man1}></Box>
            </Box>
            <Box display="flex" sx={{ mt: "100px" ,mb:"100px"}} justifyContent="center" alignItems="center">
                <Box display="flex" sx={{
                    gap: "20px", background: 'linear-gradient(to top, #6F32BF 0%, #9B70D3 70%)',height:"220px",borderRadius:"20px",width:"1200px"}} flexDirection={'column'} justifyContent="center" alignItems="center">
                    <Typography variant='p' sx={{ fontSize: "24px", fontWeight: "400", color: "white" }}>Discover and support local businesses near you—all in one place.</Typography>
                    <Button color="secondary" sx={{ backgroundColor: 'transparent', borderRadius: "15px",color:"white" }} endIcon={<ArrowRightAltIcon />}>
                        get started
                    </Button>

                </Box>

            </Box>
            <Footer/>
        </>
    )
}

export default Home
