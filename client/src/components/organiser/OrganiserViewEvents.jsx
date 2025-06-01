import React from 'react';
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
import { Link } from 'react-router-dom';
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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
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
  // Sample data (replace with actual data fetched from an API)
  const events = [
    {
      id: 1,
      eventName: 'Handmade Crafts Workshop',
      organizerName: 'Creative Hands Community',
      organizerEmail: 'creativehands@example.com',
      phoneNumber: '+12 1234 1234 1234',
    },
    {
      id: 2,
      eventName: 'Handmade Crafts Workshop',
      organizerName: 'Creative Hands Community',
      organizerEmail: 'creativehands@example.com',
      phoneNumber: '+12 1234 1234 1234',
    },
    {
      id: 3,
      eventName: 'Handmade Crafts Workshop',
      organizerName: 'Creative Hands Community',
      organizerEmail: 'creativehands@example.com',
      phoneNumber: '+12 1234 1234 1234',
    },
    {
      id: 4,
      eventName: 'Handmade Crafts Workshop',
      organizerName: 'Creative Hands Community',
      organizerEmail: 'creativehands@example.com',
      phoneNumber: '+12 1234 1234 1234',
    },
    // Add more event data as needed
  ];

  const handleEdit = (eventId) => {
    console.log(`Edit event with ID: ${eventId}`);
    // Implement your edit logic here, e.g., navigate to an edit page or open a modal
  };

  return (
    <div>
      <OrganiserNavbar/>
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
              <StyledTableHeadCell>Event Name</StyledTableHeadCell> {/* New column */}
              <StyledTableHeadCell>Organizer Name</StyledTableHeadCell>
              <StyledTableHeadCell>Organizer Email</StyledTableHeadCell>
              <StyledTableHeadCell>Phone Number</StyledTableHeadCell>
              <StyledTableHeadCell align="center">Action</StyledTableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event) => (
              <StyledTableRow key={event.id}>
                <StyledTableCell component="th" scope="row">
                  {event.id}.
                </StyledTableCell>
                <StyledTableCell>{event.eventName}</StyledTableCell> {/* New cell */}
                <StyledTableCell>{event.organizerName}</StyledTableCell>
                <StyledTableCell>{event.organizerEmail}</StyledTableCell>
                <StyledTableCell>{event.phoneNumber}</StyledTableCell>
                <StyledTableCell align="center">
                  <Link to="/organiser/EditEvents">
                   <StyledEditButton
                    variant="contained"
                    onClick={() => handleEdit(event.id)}
                  >
                    Edit
                  </StyledEditButton>
                  </Link>
                 
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
<Footer/>
    </div>
  );
}

export default ViewEventsTable;