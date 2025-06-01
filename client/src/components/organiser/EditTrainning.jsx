import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Paper,
  Stack,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { styled } from '@mui/system'; // Correct import for styled
import OrganiserNavbar from '../Navbar/OrganiserNavbar';
import Footer from '../Footer/Footer';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { baseUrl } from '../../baseUrl';

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

function EditTrainning() {
  const [organizerName, setOrganizerName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const { id } = useParams(); // Get training ID from URL

  useEffect(() => {
    fetchTrainingDetails();
  }, [id]);

  const fetchTrainingDetails = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/organiser/login');
      return;
    }
    try {
      const response = await axios.get(`${baseUrl}api/community/events/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const training = response.data.data; // Adjust based on actual API response structure
      setOrganizerName(training.organizer || '');
      setEventDate(training.date ? new Date(training.date).toISOString().split('T')[0] : '');
      setDescription(training.description || '');
    } catch (error) {
      console.error("Error fetching training details:", error);
      toast.error("Error fetching training details.");
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        navigate('/organiser/login');
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!organizerName || !eventDate) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/organiser/login');
        return;
      }

      const response = await axios.put(`${baseUrl}api/community/events/${id}`, {
        type: "training", // Hardcoded type for training
        organizer: organizerName,
        date: eventDate,
        description: description,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.data.message === "Event updated successfully.") {
        toast.success("Training updated successfully!");
        navigate('/organiser/ViewTrainning'); // Navigate back to view trainings
      } else {
        toast.error("Failed to update training.");
      }
    } catch (error) {
      console.error("Error updating training:", error);
      toast.error(error.response?.data?.message || "Error updating training.");
    }
  };

  return (
    <div>
      <OrganiserNavbar />
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
            Edit Training
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
                <Typography variant="body1" component="label" htmlFor="event-date" sx={{ display: 'block', marginBottom: '8px' }}>
                  Training Date
                </Typography>
                <StyledTextField
                  id="event-date"
                  type="date"
                  variant="outlined"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Box>

              <Box>
                <Typography variant="body1" component="label" htmlFor="description" sx={{ display: 'block', marginBottom: '8px' }}>
                  Description (Optional)
                </Typography>
                <StyledTextField
                  id="description"
                  variant="outlined"
                  multiline
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
      <Footer />
    </div>
  );
}

export default EditTrainning;
