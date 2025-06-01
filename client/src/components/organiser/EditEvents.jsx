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
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';

function EditEvents() {
  const [eventName, setEventName] = useState('');
  const [organizerName, setOrganizerName] = useState('');
  const [eventType, setEventType] = useState(''); // "event", "training", or "workshop"
  const [eventDate, setEventDate] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const { id } = useParams(); // Get event ID from URL

  useEffect(() => {
    fetchEventDetails();
  }, [id]);

  const fetchEventDetails = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/organiser/login');
      return;
    }
    try {
      // Assuming there's a GET endpoint for a single event, e.g., /api/community/events/:id
      const response = await axiosInstance.get(`/api/community/events/${id}`);
      const event = response.data.data; // Adjust based on actual API response structure
      setEventName(event.eventName || '');
      setOrganizerName(event.organizer || '');
      setEventType(event.type || '');
      setEventDate(event.date ? new Date(event.date).toISOString().split('T')[0] : '');
      setDescription(event.description || '');
    } catch (error) {
      console.error("Error fetching event details:", error);
      toast.error("Error fetching event details.");
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

      const response = await axiosInstance.put(`/api/community/events/${id}`, {
        type: eventType,
        organizer: organizerName,
        date: eventDate,
        description: description,
        // Assuming eventName is not directly updatable via this endpoint, or it's part of description
        // If eventName needs to be sent, add it here: eventName: eventName,
      });

      if (response.data.message === "Event updated successfully.") {
        toast.success("Event updated successfully!");
        // Optionally navigate back or show success message
      } else {
        toast.error("Failed to update event.");
      }
    } catch (error) {
      console.error("Error updating event:", error);
      toast.error(error.response?.data?.message || "Error updating event.");
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
          Edit Event
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
            Update Event
          </Button>
        </Box>

      </Container>
      <Footer />
    </div>
  );
}

export default EditEvents;
