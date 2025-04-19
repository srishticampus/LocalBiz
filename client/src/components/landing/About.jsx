import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import aboutframe from "../../assets/aboutframe.png"
import mission from "../../assets/mission.png"
import vission from "../../assets/vission.png"
import Footer from '../Footer/Footer';

const About = () => {
    const aboutbg = {
        backgroundColor: "#F6F7F9"
    }
    return (
        <>
            <Navbar aboutbg={aboutbg} />
            <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} sx={{ height: "706px", background: "#F6F7F9", padding: "0px 100px" }}>
                <Box display={"flex"} flexDirection={"column"} alignItems={"start"} justifyContent={"center"} sx={{ gap: '30px' }}>
                    <Typography variant='h5' color='parimary' sx={{ fontSize: '18px', fontWeight: "400" }}>About Us</Typography>
                    <Typography variant='h5' color='parimary' sx={{ fontSize: '24px', fontWeight: "400" }}>Empowering Local Connections - <span style={{ color: '#6F32BF' }}>with Local Biz</span> </Typography>
                    <Typography variant='p' color='parimary' sx={{ fontSize: '15px', fontWeight: "400" }}>Local Biz Connect is a platform dedicated to connecting <br /> communities with trusted local businesses. We simplify <br /> discovery, enhance visibility, and support growth through smart <br /> digital tools. Our mission is to strengthen local economies—one <br /> business at a time.</Typography>
                </Box>
                <Box>
                    <Box component="img" src={aboutframe} sx={{ height: '486px', width: "auto" }}></Box>
                </Box>

            </Box>
            <Box display={"flex"} alignItems={"center"} justifyContent={"center"} gap={25}>
                <Box display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"} sx={{ height: '292',width:"auto", border: "1px solid black", borderRadius: '20px', padding:"20px",margin:"80px"}}>

                    <Box component="img" src={mission} sx={{ height: '106px', width: "88px" }}>
                        
                    </Box>

                    <Typography gutterBottom color='secondary' variant="h5" component="div">
                        Mission
                    </Typography>
                    <Typography variant="p" color='primary' sx={{textAlign:'center'}}>
                        To empower local businesses and consumers through a smart, <br /> user-friendly platform that fosters lasting local relationships.
                    </Typography>



                </Box>
                <Box display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"} sx={{ height: '292',width:"auto", border: "1px solid black", borderRadius: '20px', padding:"20px",margin:"80px"}}>

                    <Box component="img" src={vission} sx={{ height: '106px', width: "88px" }}>
                        
                    </Box>



                    <Typography gutterBottom color='secondary' variant="h5" component="div">
                        Vission
                    </Typography>
                    <Typography variant="p" color='primary' sx={{textAlign:'center'}}>
                    To become the go-to digital hub for local business discovery,  <br />driving community connection and sustainable economic growth <br />worldwide.
                    </Typography>



                </Box>
            </Box>
            {/* why us */}
            <Box sx={{ width:'100%',mb:"100px"}} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                <Box sx={{ gap:"20px" }} display={"flex"} alignItems={"start"} flexDirection={"column"}>
                    <Typography variant='h3' color='secondary' sx={{ fontSize: "32px", fontWeight: "600",marginTop:'20px' }}>Why Choose Skill Swap?</Typography>
                    <Box display={"flex"} alignItems={"start"} flexDirection={"column"} sx={{marginLeft:'10px',gap:'25px'}}>
                        <Box display={"flex"} alignItems={"start"} flexDirection={"column"} sx={{gap:'25px'}}>
                            <Typography variant='p' color='primary' sx={{ fontSize: "18px", fontWeight: "500" }}>1.All-in-One Platform – Discover, connect, and engage with local businesses—all from one easy-to-use interface.</Typography>
                            <Typography variant='p' color='primary' sx={{ fontSize: "18px", fontWeight: "500" }}>2.Boost Local Visibility – We help small businesses grow with powerful promotion tools and verified listings.</Typography>
                            <Typography variant='p' color='primary' sx={{ fontSize: "18px", fontWeight: "500" }}>3.Location-Based Discovery – Find what you need, when you need it, right in your neighborhood.</Typography>
                            <Typography variant='p' color='primary' sx={{ fontSize: "18px", fontWeight: "500" }}>4.Real Reviews, Real People – Make informed choices with trusted reviews from real local users.</Typography>
                            <Typography variant='p' color='primary' sx={{ fontSize: "18px", fontWeight: "500" }}>5.Exclusive Local Deals – Unlock special offers and discounts only available on our platform.</Typography>
                            
                            
                        </Box>
                    </Box>

                </Box>


            </Box>
            <Footer/>

        </>
    )
}

export default About
