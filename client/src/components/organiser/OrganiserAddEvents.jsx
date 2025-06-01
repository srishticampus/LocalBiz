import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
} from '@mui/material';
import Footer from '../Footer/Footer';
import OrganiserNavbar from '../Navbar/OrganiserNavbar';

function OrganiserAddEvents() {
  const [eventName, setEventName] = useState('');
  const [organizerName, setOrganizerName] = useState('');
  const [organizerEmail, setOrganizerEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send this data to a backend or state management
    console.log({
      eventName,
      organizerName,
      organizerEmail,
      phoneNumber,
    });
    alert('Event Added! (Check console for data)');
    // Optionally clear form
    setEventName('');
    setOrganizerName('');
    setOrganizerEmail('');
    setPhoneNumber('');
  };

  return (
    <div>
      <OrganiserNavbar />
    <Container
      maxWidth="sm"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#fff', // White background as in image
        padding: '20px', // Some padding
        boxSizing: 'border-box', // Include padding in element's total width and height
      }}
    >

      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        style={{
          color: '#8A2BE2', // Violet color for the title
          fontWeight: 'normal', // Lighter weight
          marginBottom: '40px', // Spacing below title
        }}
      >
        Add Events
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: '100%',
          maxWidth: '500px', // Max width for the form fields container
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // Center text fields
        }}
      >
        <TextField
          label="Event Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          style={{ marginBottom: '20px' }} // Spacing between fields
          InputLabelProps={{
            style: { color: '#8A2BE2' }, // Label color
          }}
          InputProps={{
            style: { borderRadius: '8px' }, // Slightly rounded corners
          }}
        />
        <TextField
          label="Organizer Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={organizerName}
          onChange={(e) => setOrganizerName(e.target.value)}
          style={{ marginBottom: '20px' }}
          InputLabelProps={{
            style: { color: '#8A2BE2' },
          }}
          InputProps={{
            style: { borderRadius: '8px' },
          }}
        />
        <TextField
          label="Organizer Email"
          variant="outlined"
          fullWidth
          margin="normal"
          type="email"
          value={organizerEmail}
          onChange={(e) => setOrganizerEmail(e.target.value)}
          style={{ marginBottom: '20px' }}
          InputLabelProps={{
            style: { color: '#8A2BE2' },
          }}
          InputProps={{
            style: { borderRadius: '8px' },
          }}
        />
        <TextField
          label="Phone Number"
          variant="outlined"
          fullWidth
          margin="normal"
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          style={{ marginBottom: '40px' }} // More spacing before the button
          InputLabelProps={{
            style: { color: '#8A2BE2' },
          }}
          InputProps={{
            style: { borderRadius: '8px' },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          style={{
            backgroundColor: '#8A2BE2', // Violet button color
            color: '#fff', // White text
            padding: '10px 40px', // Button padding
            borderRadius: '25px', // Rounded button
            textTransform: 'none', // Prevent uppercase text
            fontSize: '1rem',
          }}
        >
          Add
        </Button>
      </Box>
     
    </Container>
     <Footer/>
    </div>
  );
}

export default OrganiserAddEvents;