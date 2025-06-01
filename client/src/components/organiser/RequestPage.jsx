import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  InputBase,
  IconButton,
  Grid,
  Avatar,
  Card,
  CardContent,
  Button, // Import Button for Accept/Reject
} from '@mui/material';
import {
  Search as SearchIcon,
} from '@mui/icons-material';
import { styled, alpha } from '@mui/system';
// Assuming you have these Navbar and Footer components
import OrganiserNavbar from '../Navbar/OrganiserNavbar';
import Footer from '../Footer/Footer';

// --- Styled Components ---

// Container for the whole page content (white background, rounded corners)
const PageContainer = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(3), // Rounded corners for the entire white box
  boxShadow: theme.shadows[3], // Subtle shadow
  padding: theme.spacing(4),
  margin: theme.spacing(4), // Margin around the whole container
  display: 'flex',
  flexDirection: 'column',
  minHeight: '80vh', // Adjust as needed
  overflow: 'hidden', // Ensures rounded corners
  // No maxWidth on this container to allow full width for items if needed
}));

// Search bar styling
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  border: '1px solid #e0e0e0', // Subtle border as in the image
  backgroundColor: theme.palette.common.white, // White background for search
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.9),
  },
  margin: 'auto', // Center search bar horizontally
  width: 'calc(100% - 100px)', // Adjust width as needed
  [theme.breakpoints.up('sm')]: {
    width: '60%', // Adjust width for larger screens
    maxWidth: 700, // Maximum width for search bar
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.action.active, // Gray icon color
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, `calc(1em + ${theme.spacing(4)})`),
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      // You can adjust focus width if desired, or remove for fixed width
      // width: '20ch',
      // '&:focus': {
      //   width: '30ch',
      // },
    },
  },
}));

// Individual request item card styling
const RequestCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  borderRadius: theme.spacing(1), // Slightly rounded corners for the card
  boxShadow: 'none', // No shadow, just a subtle border
  border: '1px solid #e0e0e0',
  backgroundColor: theme.palette.background.paper,
}));

const InfoBox = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  flexGrow: 1, // Allows text content to expand
}));

const ActionButton = styled(Button)(({ theme, color }) => ({
  borderRadius: '8px', // Rounded corners for buttons
  textTransform: 'none', // Prevent uppercase text
  fontWeight: 'bold',
  padding: theme.spacing(1, 2), // Adjust padding
  minWidth: 90, // Ensure consistent width for buttons
  marginLeft: theme.spacing(1), // Space between buttons
  backgroundColor: color === 'accept' ? '#4CAF50' : '#F44336', // Green for accept, Red for reject
  '&:hover': {
    backgroundColor: color === 'accept' ? '#388E3C' : '#D32F2F', // Darker shades on hover
  },
}));

// --- Main Component ---

function RequestsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data (replace with actual requests fetched from an API)
  const requests = [
    {
      id: 1,
      name: 'John Jerin',
      subtitle: 'Homemade Pottery',
      category: 'Art',
      mainImage: 'https://via.placeholder.com/60', // Replace with actual image URLs
      itemIcon: 'https://via.placeholder.com/40/D3D3D3?text=Vase', // Placeholder for the vase icon
    },
    {
      id: 2,
      name: 'Johny Deep',
      subtitle: 'Homemade Sweets',
      category: 'Chef',
      mainImage: 'https://via.placeholder.com/60/0000FF/FFFFFF?text=JD',
      itemIcon: 'https://via.placeholder.com/40/FFB6C1?text=Cupcake', // Placeholder for the cupcake icon
    },
    {
      id: 3,
      name: 'John Jerin',
      subtitle: 'Homemade Pottery',
      category: 'Art',
      mainImage: 'https://via.placeholder.com/60',
      itemIcon: 'https://via.placeholder.com/40/D3D3D3?text=Vase',
    },
    {
      id: 4,
      name: 'Johny Deep',
      subtitle: 'Homemade Sweets',
      category: 'Chef',
      mainImage: 'https://via.placeholder.com/60/0000FF/FFFFFF?text=JD',
      itemIcon: 'https://via.placeholder.com/40/FFB6C1?text=Cupcake',
    },
    {
      id: 5,
      name: 'John Jerin',
      subtitle: 'Homemade Pottery',
      category: 'Art',
      mainImage: 'https://via.placeholder.com/60',
      itemIcon: 'https://via.placeholder.com/40/D3D3D3?text=Vase',
    },
  ];

  // Filter requests based on search term
  const filteredRequests = requests.filter(request => {
    return request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           request.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
           request.category.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleAccept = (requestId) => {
    console.log(`Accepted request with ID: ${requestId}`);
    // Implement API call to accept the request
    // You might want to remove the item from the list or update its status
  };

  const handleReject = (requestId) => {
    console.log(`Rejected request with ID: ${requestId}`);
    // Implement API call to reject the request
    // You might want to remove the item from the list or update its status
  };

  return (
    <div>
      <OrganiserNavbar/> 
      <PageContainer>
        {/* Top Search Bar */}
        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 4 }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search Here"
              inputProps={{ 'aria-label': 'search' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Search>
        </Box>

        {/* REQUESTS Title */}
        <Typography
          variant="h4"
          component="h1"
          sx={{
            textAlign: 'center',
            marginBottom: 4,
            color: alpha('#000', 0.5), // Lighter black/gray color
            fontWeight: 'normal',
            fontSize: '2.5rem',
            borderBottom: '2px solid',
            borderColor: alpha('#000', 0.2), // Subtle underline
            display: 'inline-block', // To make border-bottom only cover the text
            paddingBottom: '4px',
            alignSelf: 'center', // Center the inline block
          }}
        >
          REQUESTS
        </Typography>

        {/* Requests List/Grid */}
        <Grid container spacing={2}> {/* Using spacing for gap between cards */}
          {filteredRequests.map((request) => (
            <Grid item xs={12} key={request.id}> {/* Each request takes full width */}
              <RequestCard>
                <Avatar
                  src={request.mainImage}
                  alt={request.name}
                  sx={{ width: 80, height: 80, borderRadius: '8px' }} // Square avatar/image
                  variant="square" // Make it square
                />
                <InfoBox>
                  <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                    {request.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {request.subtitle}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {request.category}
                  </Typography>
                </InfoBox>
                {/* Item specific icon/image */}
                
                {/* Accept/Reject Buttons */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ActionButton
                    variant="contained"
                    color="accept"
                    onClick={() => handleAccept(request.id)}
                  >
                    Accept
                  </ActionButton>
                  <ActionButton
                    variant="contained"
                    color="reject"
                    onClick={() => handleReject(request.id)}
                  >
                    Reject
                  </ActionButton>
                </Box>
              </RequestCard>
            </Grid>
          ))}
        </Grid>
      </PageContainer>
      <Footer/> 
    </div>
  );
}

export default RequestsPage;