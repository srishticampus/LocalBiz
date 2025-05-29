import React from 'react';
import BussinessNavbar from '../Navbar/BussinessNavbar';
import Footer from '../Footer/Footer';
import { Container, Box, Typography, Button, Stack } from '@mui/material';

const BussinessUpdates = () => {
  return (
    <>
      <BussinessNavbar />
      <Container maxWidth="x-lg" sx={{ mt: "100px", mb: "50px" }}>
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
          <Typography variant='h4' color='secondary' sx={{ mb: "50px" }}>Manage Updates</Typography>
          {/* Add Updates specific UI here */}
          <Stack spacing={2} direction="column" alignItems="center">
            <Typography variant='h6'>Add Updates</Typography>
            <Typography variant='p'>Updates: [File upload]</Typography>
            <Button variant='contained' color='secondary'>Submit</Button>
            <hr style={{ width: '100%', margin: '20px 0' }} />
            <Typography variant='h6'>View Updates</Typography>
            <Typography variant='p'>Updates: [View]</Typography>
            <Button variant='contained' color='secondary'>Delete</Button>
          </Stack>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default BussinessUpdates;
