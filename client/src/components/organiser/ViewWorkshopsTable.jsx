import React, { useState, useEffect } from 'react';
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

// Styled components for specific visual tweaks (reused from ViewTrainingsTable)
const StyledTableHeadCell = styled(TableCell)(() => ({
  color: purpleColor, // Purple text for header
  fontWeight: 'normal', // Standard font weight for headers
  fontSize: '1rem', // Adjust font size if needed
  borderBottom: `2px solid ${purpleColor}`, // Purple bottom border for headers
  paddingBottom: 8, // Add some padding below the border
}));

const StyledTableRow = styled(TableRow)(() => ({
  // No specific background for alternating rows in the image, so keeping it simple
  // '&:nth-of-type(odd)': {
  //   backgroundColor: theme.palette.action.hover,
  // },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const StyledTableCell = styled(TableCell)(() => ({
  fontSize: '0.9rem', // Font size for body cells
  padding: '12px 16px', // Adjust padding for cell content
}));

const StyledEditButton = styled(Button)(() => ({
  backgroundColor: purpleColor, // Purple background for the button
  color: 'white', // White text
  borderRadius: '8px', // Rounded corners for the button
  textTransform: 'none', // Prevent uppercase text
  padding: '4px 16px', // Adjust padding
  '&:hover': {
    backgroundColor: '#7b4fc2', // Darker purple on hover
  },
}));

import axiosInstance from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ViewWorkshopsTable() {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const response = await axiosInstance.get('api/community/events');
        const filteredWorkshops = response.data.events.filter(event => event.type === 'workshop');
        setWorkshops(filteredWorkshops);
      } catch (err) {
        setError(err);
        toast.error('Failed to fetch workshops.');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkshops();
  }, []);

  const handleEdit = (workshopId) => {
    navigate(`/organiser/EditWorkShop/${workshopId}`);
  };

  if (loading) {
    return (
      <div>
        <OrganiserNavbar />
        <Container component="main" maxWidth="lg" sx={{ pt: 8, pb: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="primary">Loading workshops...</Typography>
        </Container>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <OrganiserNavbar />
        <Container component="main" maxWidth="lg" sx={{ pt: 8, pb: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="error">Error: {error.message}</Typography>
        </Container>
        <Footer />
      </div>
    );
  }

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
            View Workshops {/* Changed title */}
          </Typography>
        </Box>

        <TableContainer component={Paper} elevation={0} sx={{
          borderRadius: '16px', // Rounded corners for the whole table container
          border: '1px solid #e0e0e0', // Subtle border around the table
          overflowX: 'auto', // Allow horizontal scrolling for smaller screens
        }}>
          <Table sx={{ minWidth: 650 }} aria-label="workshops table">
            <TableHead>
              <TableRow>
                <StyledTableHeadCell>S NO</StyledTableHeadCell>
                <StyledTableHeadCell>Organizer Name</StyledTableHeadCell>
                <StyledTableHeadCell>Organizer Email</StyledTableHeadCell>
                <StyledTableHeadCell>Phone Number</StyledTableHeadCell>
                <StyledTableHeadCell align="center">Action</StyledTableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {workshops.map((workshop) => (
                <StyledTableRow key={workshop.id}>
                  <StyledTableCell component="th" scope="row">
                    {workshop.id}.
                  </StyledTableCell>
                  <StyledTableCell>{workshop.organizerName}</StyledTableCell>
                  <StyledTableCell>{workshop.organizerEmail}</StyledTableCell>
                  <StyledTableCell>{workshop.phoneNumber}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Link to="/organiser/EditWorkShop">
                      <StyledEditButton
                        variant="contained"
                        onClick={() => handleEdit(workshop.id)}
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
      <Footer />
    </div>
  );
}

export default ViewWorkshopsTable;
