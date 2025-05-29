import React from 'react';
import BussinessNavbar from '../Navbar/BussinessNavbar';
import Footer from '../Footer/Footer';
import { Container, Box, Typography, Button, Stack } from '@mui/material';

const BussinessComplaints = () => {
  return (
    <>
      <BussinessNavbar />
      <Container maxWidth="x-lg" sx={{ mt: "100px", mb: "50px" }}>
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
          <Typography variant='h4' color='secondary' sx={{ mb: "50px" }}>Manage Complaints</Typography>
          {/* Add Complaints specific UI here */}
          <Stack spacing={2} direction="column" alignItems="center">
            <Typography variant='h6'>Add Complaints</Typography>
            <Typography variant='p'>Complaint Description: [Text Area]</Typography>
            <Button variant='contained' color='secondary'>Add</Button>
            <hr style={{ width: '100%', margin: '20px 0' }} />
            <Typography variant='h6'>View Complaints</Typography>
            <Typography variant='p'>Complaint Description: [View]</Typography>
            <Typography variant='p'>Complainant: [View]</Typography>
          </Stack>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default BussinessComplaints;
