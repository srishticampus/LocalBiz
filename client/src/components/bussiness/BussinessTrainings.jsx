import React from 'react';
import BussinessNavbar from '../Navbar/BussinessNavbar';
import Footer from '../Footer/Footer';
import { Container, Box, Typography, Button, Stack } from '@mui/material';

const BussinessTrainings = () => {
  return (
    <>
      <BussinessNavbar />
      <Container maxWidth="x-lg" sx={{ mt: "100px", mb: "50px" }}>
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
          <Typography variant='h4' color='secondary' sx={{ mb: "50px" }}>Manage Trainings</Typography>
          {/* Add Trainings specific UI here */}
          <Stack spacing={2} direction="column" alignItems="center">
            <Typography variant='h6'>Add Trainings</Typography>
            <Typography variant='p'>Organizer name: [Text Field]</Typography>
            <Typography variant='p'>Organizer Email: [Email Field]</Typography>
            <Typography variant='p'>Phone number: [Number Field]</Typography>
            <Button variant='contained' color='secondary'>Add</Button>
            <hr style={{ width: '100%', margin: '20px 0' }} />
            <Typography variant='h6'>View Trainings</Typography>
            <Typography variant='p'>Organizer name: [Dynamic Value]</Typography>
            <Typography variant='p'>Organizer Email: [Dynamic Value]</Typography>
            <Typography variant='p'>Phone number: [Dynamic Value]</Typography>
            <Button variant='contained' color='secondary'>Edit</Button>
            <hr style={{ width: '100%', margin: '20px 0' }} />
            <Typography variant='h6'>Edit Trainings</Typography>
            <Typography variant='p'>Organizer name: [Text Field]</Typography>
            <Typography variant='p'>Organizer Email: [Email Field]</Typography>
            <Typography variant='p'>Phone number: [Number Field]</Typography>
            <Button variant='contained' color='secondary'>Update</Button>
            <Button variant='contained' color='secondary'>Delete</Button>
          </Stack>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default BussinessTrainings;
