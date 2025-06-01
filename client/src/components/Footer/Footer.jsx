import { Container, Stack, Box, Typography } from '@mui/material'
import React from 'react';
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <Container 
      maxWidth={false} 
      disableGutters  
      sx={{ 
        backgroundColor: "#333333",
        width: "100%",
        height: "250px",
        marginTop: "auto", // This pushes the footer to the bottom
      }}
    >
      <Stack sx={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        flexDirection: "row", 
        marginTop: '40px',
        width: "100%"
      }}>
        <Box sx={{ 
          display: "flex", 
          flexDirection: "column", 
          justifyContent: 'start', 
          alignItems: "flex-start", 
          marginTop: '10px', 
          marginLeft: "50px" 
        }}>
          <Box sx={{ 
            width: "372px", 
            height: "115px", 
            display: "flex", 
            justifyContent: "flex-start", 
            alignItems: 'center' 
          }}>
            <Box component="img" src={logo} alt='logo'></Box>
          </Box>
          <Typography sx={{ fontSize: "14px", fontWeight: "500", color: "white" }}>
            Your own brand—Local Biz Connect empowers every step  
          </Typography>
          <Typography sx={{ fontSize: "14px", fontWeight: "500", color: "white" }}>
            of the local experience.
          </Typography>
        </Box>
        <Box sx={{ 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "flex-end", 
          marginRight: '50px', 
          marginTop: "50px" 
        }}>
          <Typography variant='p' sx={{ color: "white", marginTop: "20px" }}>
            Home
          </Typography>
          <Typography variant='p' sx={{ color: "white", marginTop: "20px" }}>
            About
          </Typography>
          <Typography variant='p' sx={{ color: "white", marginTop: "20px" }}>
            Contact
          </Typography>
        </Box>
      </Stack>
      <Box sx={{ 
        borderBottom: "1px solid white",
        marginLeft: "auto",
        marginRight: "auto",
        width: "95%", 
        marginTop: "20px" 
      }}></Box>
      <Stack sx={{
        display: "flex", 
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: "20px",
        paddingLeft: "50px",
        paddingBottom: "0px",
        mb: "0px"
      }}>
        <Box>
          <Typography sx={{ color: 'white', fontSize: "14px", fontWeight: "500" }}>
            Copy right @2024. All rights reserved
          </Typography>
        </Box>
        <Box sx={{
          display: "flex", 
          flexDirection: "row",
          marginLeft: "50px",
          paddingRight: "50px",
          gap: "20px",
          mb: "20px"
        }}>
          <Typography sx={{ color: 'white', fontSize: "14px", fontWeight: "500" }}>
            Terms of conditions
          </Typography>
          <Typography sx={{ color: "white", fontSize: "14px", fontWeight: "500" }}>
            F & Q
          </Typography>
          <Typography sx={{ color: "white", fontSize: "14px", fontWeight: "500" }}>
            Privacy policy
          </Typography>
        </Box>
      </Stack>
    </Container>
  )
}

export default Footer