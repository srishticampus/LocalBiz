import React from 'react';
import BussinessNavbar from '../Navbar/BussinessNavbar';
import Footer from '../Footer/Footer';
import { Container, Box, Typography, Button, Stack } from '@mui/material';

const BussinessChats = () => {
  return (
    <>
      <BussinessNavbar />
      <Container maxWidth="x-lg" sx={{ mt: "100px", mb: "50px" }}>
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
          <Typography variant='h4' color='secondary' sx={{ mb: "50px" }}>Chats</Typography>
          {/* Add Chats specific UI here */}
          <Stack spacing={2} direction="column" alignItems="center">
            <Typography variant='p'>Profile image: [View]</Typography>
            <Typography variant='p'>Name: [View]</Typography>
            <Typography variant='p'>Recent chats: [Left side]</Typography>
            <Typography variant='p'>Chatbox: [Text Field]</Typography>
            <Typography variant='p'>Attachment: [Icon]</Typography>
            <Button variant='contained' color='secondary'>Send icon</Button>
          </Stack>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default BussinessChats;
