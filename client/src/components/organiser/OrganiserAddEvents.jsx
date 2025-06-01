import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import Footer from '../Footer/Footer';
import OrganiserNavbar from '../Navbar/OrganiserNavbar';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { baseUrl } from '../../baseUrl';

function OrganiserAddEvents() {
  const [eventName, setEventName] = useState('');
  const [organizerName, setOrganizerName] = useState('');
  const [eventType, setEventType] = useState(''); // "event", "training", or "workshop"
  const [eventDate, setEventDate] = useState('');
  const [description, setDescription] = useState('');
  const [organiserDetails, setOrganiserDetails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrganiserDetails();
  }, []);

  const fetchOrganiserDetails = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/organiser/login');
      return;
    }
    try {
      const decoded = jwtDecode(token);
      const response = await axios.get(`${baseUrl}organisation/getorganisation/${decoded.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrganiserDetails(response.data.organisation);
    } catch (error) {
      console.error("Error fetching organiser details:", error);
      toast.error("Error fetching organiser details.");
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        navigate('/organiser/login');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!eventName || !organizerName || !eventType || !eventDate) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/organiser/login');
        return;
      }

      const response = await axios.post(`${baseUrl}api/community/events`, {
        community: organiserDetails._id, // Assuming organiserDetails._id is the community ID
        type: eventType,
        organizer: organizerName,
        date: eventDate,
        description: description,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.data.message === "Event created successfully") {
        toast.success("Event added successfully!");
        setEventName('');
        setOrganizerName('');
        setEventType('');
        setEventDate('');
        setDescription('');
      } else {
        toast.error("Failed to add event.");
      }
    } catch (error) {
      console.error("Error adding event:", error);
      toast.error(error.response?.data?.message || "Error adding event.");
    }
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
          <FormControl fullWidth margin="normal" style={{ marginBottom: '20px' }}>
            <InputLabel style={{ color: '#8A2BE2' }}>Event Type</InputLabel>
            <Select
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              label="Event Type"
              InputProps={{
                style: { borderRadius: '8px' },
              }}
            >
              <MenuItem value="event">Event</MenuItem>
              <MenuItem value="training">Training</MenuItem>
              <MenuItem value="workshop">Workshop</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Event Date"
            variant="outlined"
            fullWidth
            margin="normal"
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            style={{ marginBottom: '20px' }}
            InputLabelProps={{
              shrink: true,
              style: { color: '#8A2BE2' },
            }}
            InputProps={{
              style: { borderRadius: '8px' },
            }}
          />
          <TextField
            label="Description (Optional)"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ marginBottom: '40px' }}
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
              backgroundColor: '#8A2BE2',
              color: '#fff',
              padding: '10px 40px',
              borderRadius: '25px',
              textTransform: 'none',
              fontSize: '1rem',
            }}
          >
            Add Event
          </Button>
        </Box>

      </Container>
      <Footer />
    </div>
  );
}

export default OrganiserAddEvents;