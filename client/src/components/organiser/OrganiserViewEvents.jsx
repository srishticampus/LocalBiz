import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Container,
  Paper,
} from '@mui/material';
import { styled } from '@mui/system';
import Footer from '../Footer/Footer';
import OrganiserNavbar from '../Navbar/OrganiserNavbar';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { baseUrl } from '../../baseUrl';
// Define your custom purple color
const purpleColor = '#9B70D3';

// Styled components for specific visual tweaks (reused from previous table components)
const StyledTableHeadCell = styled(TableCell)(({ theme }) => ({
  color: purpleColor, // Purple text for header
  fontWeight: 'normal', // Standard font weight for headers
  fontSize: '1rem', // Adjust font size if needed
  borderBottom: `2px solid ${purpleColor}`, // Purple bottom border for headers
  paddingBottom: theme.spacing(1), // Add some padding below the border
}));

const StyledTableRow = styled(TableRow)(({ _theme }) => ({
  // No specific background for alternating rows in the image, so keeping it simple
  // '&:nth-of-type(odd)': {
  //   backgroundColor: theme.palette.action.hover,
  // },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: '0.9rem', // Font size for body cells
  padding: theme.spacing(1.5, 2), // Adjust padding for cell content
}));

const StyledEditButton = styled(Button)(({ theme }) => ({
  backgroundColor: purpleColor, // Purple background for the button
  color: 'white', // White text
  borderRadius: '8px', // Rounded corners for the button
  textTransform: 'none', // Prevent uppercase text
  padding: theme.spacing(0.5, 2), // Adjust padding
  '&:hover': {
    backgroundColor: '#7b4fc2', // Darker purple on hover
  },
}));

function ViewEventsTable() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/organiser/login');
      return;
    }
    try {
      const response = await axios.get(`${baseUrl}api/community/events`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEvents(response.data.data); // Assuming the API returns an array of events under 'data'
    } catch (error) {
      console.error("Error fetching events:", error);
      toast.error("Error fetching events.");
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        navigate('/organiser/login');
      }
    }
  };

  const handleEdit = (eventId) => {
    navigate(`/organiser/EditEvents/${eventId}`);
  };

  return (
    <div>
      <OrganiserNavbar />
      <Container component="main" maxWidth="lg" sx={{ pt: 8, pb: 4 }}>
        <Box sx={{ textAlign: 'center', marginBottom: 6 }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              color: purpleColor, // Purple color for the title
              fontWeight: 'normal', // Thin font weight
              fontSize: '2.5rem', // Larger font size for the heading
            }}
          >
            View Events {/* Changed title */}
          </Typography>
        </Box>

        <TableContainer component={Paper} elevation={0} sx={{
          borderRadius: '16px', // Rounded corners for the whole table container
          border: '1px solid #e0e0e0', // Subtle border around the table
          overflowX: 'auto', // Allow horizontal scrolling for smaller screens
        }}>
          <Table sx={{ minWidth: 650 }} aria-label="events table">
            <TableHead>
              <TableRow>
                <StyledTableHeadCell>S NO</StyledTableHeadCell>
                <StyledTableHeadCell>Event Type</StyledTableHeadCell>
                <StyledTableHeadCell>Organizer</StyledTableHeadCell>
                <StyledTableHeadCell>Date</StyledTableHeadCell>
                <StyledTableHeadCell>Description</StyledTableHeadCell>
                <StyledTableHeadCell align="center">Action</StyledTableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events.map((event, index) => (
                <StyledTableRow key={event._id}>
                  <StyledTableCell component="th" scope="row">
                    {index + 1}.
                  </StyledTableCell>
                  <StyledTableCell>{event.type}</StyledTableCell>
                  <StyledTableCell>{event.organizer}</StyledTableCell>
                  <StyledTableCell>{new Date(event.date).toLocaleDateString()}</StyledTableCell>
                  <StyledTableCell>{event.description}</StyledTableCell>
                  <StyledTableCell align="center">
                    <StyledEditButton
                      variant="contained"
                      onClick={() => handleEdit(event._id)}
                    >
                      Edit
                    </StyledEditButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <Footer />
    </div>
  );
}

export default ViewEventsTable;