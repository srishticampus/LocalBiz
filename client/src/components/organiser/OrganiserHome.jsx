import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  InputBase,
  IconButton,
  MenuItem,
  FormControl,
  Select,
  Grid,
  Avatar,
  Card,
  CardContent,
} from '@mui/material';
import {
  Search as SearchIcon,
  Tune as TuneIcon, // Filter icon
  Apps as AppsIcon, // Grid view icon
  ViewList as ViewListIcon, // Optional: for list view toggle
  KeyboardArrowDown as KeyboardArrowDownIcon // For dropdown arrow
} from '@mui/icons-material';
import { styled, alpha } from '@mui/system';
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
}));

// Search bar styling
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.05), // Light gray background
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.08),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
  flexGrow: 1, // Allows search bar to take up available space
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, `calc(1em + ${theme.spacing(4)})`),
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));

// Filter/Community select styling
const StyledSelect = styled(Select)(({ theme }) => ({
  borderRadius: '8px',
  backgroundColor: alpha(theme.palette.common.black, 0.05),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.08),
  },
  '.MuiOutlinedInput-notchedOutline': { border: 'none' }, // Remove border
  '.MuiSelect-select': {
    paddingRight: '32px !important', // Make space for the icon
  },
  '.MuiSelect-icon': {
    color: theme.palette.text.primary, // Icon color
  },
}));

// Individual item card styling
const ItemCard = styled(Card)(({ theme }) => ({
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
  flexGrow: 1,
}));

// --- Main Component ---

function OrganiserHome() {
  const [searchTerm, setSearchTerm] = useState('');
  const [community, setCommunity] = useState('All'); // Default filter
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Sample data (replace with actual data from your API)
  const items = [
    {
      id: 1,
      name: 'John Jerin',
      subtitle: 'Homemade Pottery',
      category: 'Art',
      mainImage: 'https://via.placeholder.com/60', // Replace with actual image URLs
      icon1: 'https://via.placeholder.com/40/FFC0CB?text=Vase', // Placeholder for the vase icon
      icon2: 'https://via.placeholder.com/40/FFB6C1?text=Logo', // Placeholder for the logo icon
    },
    {
      id: 2,
      name: 'John Jerin',
      subtitle: 'Homemade Pottery',
      category: 'Art',
      mainImage: 'https://via.placeholder.com/60',
      icon1: 'https://via.placeholder.com/40/FFC0CB?text=Vase',
      icon2: 'https://via.placeholder.com/40/FFB6C1?text=Logo',
    },
    {
      id: 3,
      name: 'John Jerin',
      subtitle: 'Homemade Pottery',
      category: 'Art',
      mainImage: 'https://via.placeholder.com/60',
      icon1: 'https://via.placeholder.com/40/FFC0CB?text=Vase',
      icon2: 'https://via.placeholder.com/40/FFB6C1?text=Logo',
    },
    {
      id: 4,
      name: 'John Jerin',
      subtitle: 'Homemade Pottery',
      category: 'Art',
      mainImage: 'https://via.placeholder.com/60',
      icon1: 'https://via.placeholder.com/40/FFC0CB?text=Vase',
      icon2: 'https://via.placeholder.com/40/FFB6C1?text=Logo',
    },
    // The image shows a duplicate set of these 4 items, let's create a second row for variety
    {
      id: 5,
      name: 'Jane Doe',
      subtitle: 'Custom Jewelry',
      category: 'Crafts',
      mainImage: 'https://via.placeholder.com/60/0000FF/FFFFFF?text=JD',
      icon1: 'https://via.placeholder.com/40/ADD8E6?text=Ring',
      icon2: 'https://via.placeholder.com/40/87CEEB?text=Brand',
    },
    {
      id: 6,
      name: 'Jane Doe',
      subtitle: 'Custom Jewelry',
      category: 'Crafts',
      mainImage: 'https://via.placeholder.com/60/0000FF/FFFFFF?text=JD',
      icon1: 'https://via.placeholder.com/40/ADD8E6?text=Ring',
      icon2: 'https://via.placeholder.com/40/87CEEB?text=Brand',
    },
    {
      id: 7,
      name: 'Jane Doe',
      subtitle: 'Custom Jewelry',
      category: 'Crafts',
      mainImage: 'https://via.placeholder.com/60/0000FF/FFFFFF?text=JD',
      icon1: 'https://via.placeholder.com/40/ADD8E6?text=Ring',
      icon2: 'https://via.placeholder.com/40/87CEEB?text=Brand',
    },
    {
      id: 8,
      name: 'Jane Doe',
      subtitle: 'Custom Jewelry',
      category: 'Crafts',
      mainImage: 'https://via.placeholder.com/60/0000FF/FFFFFF?text=JD',
      icon1: 'https://via.placeholder.com/40/ADD8E6?text=Ring',
      icon2: 'https://via.placeholder.com/40/87CEEB?text=Brand',
    },
  ];

  // Filter items based on search term and selected community
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCommunity = community === 'All' || item.category === community; // Assuming 'category' maps to 'community'

    return matchesSearch && matchesCommunity;
  });

  return (
    <div>
        <OrganiserNavbar/>
    <PageContainer>
      {/* Header Bar: Search, Filter, View Mode */}
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 4, gap: 2 }}>
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

        <IconButton size="large" sx={{ backgroundColor: alpha('#000', 0.05), borderRadius: '8px' }}>
          <TuneIcon />
        </IconButton>

        <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
          <StyledSelect
            value={community}
            onChange={(e) => setCommunity(e.target.value)}
            displayEmpty
            inputProps={{ 'aria-label': 'Communities filter' }}
            IconComponent={KeyboardArrowDownIcon} // Custom icon for dropdown
          >
            <MenuItem value="All">Communities</MenuItem>
            <MenuItem value="Art">Art</MenuItem>
            <MenuItem value="Crafts">Crafts</MenuItem>
            <MenuItem value="Tech">Tech</MenuItem>
            <MenuItem value="Food">Food</MenuItem>
          </StyledSelect>
        </FormControl>

        <IconButton
          size="large"
          sx={{ backgroundColor: alpha('#000', 0.05), borderRadius: '8px' }}
          onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
        >
          {viewMode === 'grid' ? <AppsIcon /> : <ViewListIcon />}
        </IconButton>
      </Box>

      {/* Items Grid */}
      <Grid container spacing={3}>
        {filteredItems.map((item) => (
          <Grid item xs={12} sm={viewMode === 'grid' ? 6 : 12} md={viewMode === 'grid' ? 6 : 12} key={item.id}>
            <ItemCard>
              <Avatar
                src={item.mainImage}
                alt={item.name}
                sx={{ width: 80, height: 80, borderRadius: '8px' }} // Square avatar/image
                variant="square" // Make it square
              />
              <InfoBox>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.subtitle}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {item.category}
                </Typography>
              </InfoBox>
             
            </ItemCard>
          </Grid>
        ))}
      </Grid>
    </PageContainer>
<Footer/>
    </div>
  );
}

export default OrganiserHome;