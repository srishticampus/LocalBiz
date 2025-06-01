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
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
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

function AddTrainingsForm() {
  const [organizerName, setOrganizerName] = useState('');
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

      const response = await axios.post(`${baseUrl}api/community/events`, {
        community: organiserDetails._id,
        type: "training", // Hardcoded type
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
        toast.success("Training added successfully!");
        setOrganizerName('');
        setEventDate('');
        setDescription('');
      } else {
        toast.error("Failed to add training.");
      }
    } catch (error) {
      console.error("Error adding training:", error);
      toast.error(error.response?.data?.message || "Error adding training.");
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

export default AddTrainingsForm;
