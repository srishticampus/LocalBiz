import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Paper,
  Stack,
} from '@mui/material';
import { styled } from '@mui/system'; // Correct import for styled
import OrganiserNavbar from '../Navbar/OrganiserNavbar';
import Footer from '../Footer/Footer';

// Custom styled components if needed for specific visual tweaks
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: 500, // Adjust max-width as per your design
  margin: 'auto', // Center the form
  marginTop: theme.spacing(8), // Add some top margin
  boxShadow: 'none', // Remove default Paper shadow if you want a flat look
  border: '1px solid #e0e0e0', // Add a subtle border similar to the image
  borderRadius: theme.spacing(2), // Slight rounded corners
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(3), // Space between text fields
  width: '100%', // Full width within the container
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px', // Rounded corners for input fields
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1.5, 5), // Adjust padding for button size
  borderRadius: '25px', // More rounded button
  textTransform: 'none', // Keep text capitalization as is
  fontWeight: 'bold',
  backgroundColor: '#9B70D3', // Purple color from the image
  '&:hover': {
    backgroundColor: '#7b4fc2', // Slightly darker purple on hover
  },
}));

function AddTrainingsForm() {
  const [organizerName, setOrganizerName] = useState('');
  const [organizerEmail, setOrganizerEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would typically send this data to your backend
    console.log({
      organizerName,
      organizerEmail,
      phoneNumber,
    });
    alert('Training details added (check console for data)!');
    // You might clear the form or navigate away after submission
    setOrganizerName('');
    setOrganizerEmail('');
    setPhoneNumber('');
  };

  return (
    <div>
        <OrganiserNavbar/>
    <Container component="main" maxWidth="md">
      <StyledPaper elevation={0}> {/* Using elevation=0 and adding custom border for flat look */}
        <Typography
          variant="h4"
          component="h1"
          sx={{
            marginBottom: 5, // Space below the title
            color: '#9B70D3', // Purple color for the title
            fontWeight: 'normal', // Thin font weight as seen in the image
            fontSize: '2.5rem', // Adjust font size for larger heading
          }}
        >
          Add Trainings
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <Stack spacing={3}> {/* Use Stack for consistent vertical spacing */}
            <Box>
              <Typography variant="body1" component="label" htmlFor="organizer-name" sx={{ display: 'block', marginBottom: '8px' }}>
                Organizer Name
              </Typography>
              <StyledTextField
                id="organizer-name"
                variant="outlined"
                value={organizerName}
                onChange={(e) => setOrganizerName(e.target.value)}
                fullWidth
                // You can add error/helperText props for validation here
              />
            </Box>

            <Box>
              <Typography variant="body1" component="label" htmlFor="organizer-email" sx={{ display: 'block', marginBottom: '8px' }}>
                Organizer Email
              </Typography>
              <StyledTextField
                id="organizer-email"
                type="email" // Use type="email" for email validation
                variant="outlined"
                value={organizerEmail}
                onChange={(e) => setOrganizerEmail(e.target.value)}
                fullWidth
              />
            </Box>

            <Box>
              <Typography variant="body1" component="label" htmlFor="phone-number" sx={{ display: 'block', marginBottom: '8px' }}>
                Phone Number
              </Typography>
              <StyledTextField
                id="phone-number"
                type="tel" // Use type="tel" for phone number input
                variant="outlined"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                fullWidth
              />
            </Box>
          </Stack>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <StyledButton
              type="submit"
              variant="contained"
              disableElevation // Removes default shadow
            >
              Add
            </StyledButton>
          </Box>
        </Box>
      </StyledPaper>
    </Container>
<Footer/>
    </div>
  );
}

export default AddTrainingsForm;