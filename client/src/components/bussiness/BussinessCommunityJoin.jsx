import React from 'react';
import BussinessNavbar from '../Navbar/BussinessNavbar';
import Footer from '../Footer/Footer';
import { Container, Box, Typography, Button, Stack } from '@mui/material';

const BussinessCommunityJoin = () => {
  return (
    <>
      <BussinessNavbar />
      <Container maxWidth="x-lg" sx={{ mt: "100px", mb: "50px" }}>
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
          <Typography variant='h4' color='secondary' sx={{ mb: "50px" }}>Community Join</Typography>
          {/* Add Community Join specific UI here */}
          <Stack spacing={2} direction="column" alignItems="center">
            <Typography variant='p'>Business Name: [Dynamic Value]</Typography>
            <Typography variant='p'>Business Category: [Dynamic Value]</Typography>
            <Typography variant='p'>Logo: [Image Placeholder]</Typography>
            <Typography variant='p'>Community to join: [Dropdown Placeholder]</Typography>
            <Button variant='contained' color='secondary'>Send Request</Button>
          </Stack>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default BussinessCommunityJoin;
