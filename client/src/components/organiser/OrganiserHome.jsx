import React, { useState, useEffect } from 'react';
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
  CircularProgress, // For loading indicator
  Alert, // For error messages
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
import axiosInstance from '../../api/axiosInstance'; // Import axiosInstance

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
  const [selectedCommunityFilter, setSelectedCommunityFilter] = useState('All'); // Renamed to avoid conflict with fetched data
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [communities, setCommunities] = useState([]); // State to store fetched communities
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axiosInstance.get('/api/communities');
        // Map the fetched data to fit the existing ItemCard structure
        const mappedCommunities = response.data.data.map(org => ({
          id: org._id,
          name: org.organizationName,
          subtitle: org.organizationType, // Using organizationType as subtitle
          category: org.organizationType, // Using organizationType as category for filtering
          mainImage: 'https://via.placeholder.com/60', // Placeholder
          icon1: 'https://via.placeholder.com/40', // Placeholder
          icon2: 'https://via.placeholder.com/40', // Placeholder
        }));
        setCommunities(mappedCommunities);
      } catch (err) {
        console.error('Error fetching communities:', err);
        setError('Failed to load communities. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCommunities();
  }, []);

  // Filter items based on search term and selected community filter
  const filteredCommunities = communities.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      community.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      community.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCommunityFilter = selectedCommunityFilter === 'All' || community.category === selectedCommunityFilter;

    return matchesSearch && matchesCommunityFilter;
  });

  return (
    <div>
      <OrganiserNavbar />
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
              value={selectedCommunityFilter}
              onChange={(e) => setSelectedCommunityFilter(e.target.value)}
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
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <Grid container spacing={3}>
            {filteredCommunities.map((community) => (
              <Grid item xs={12} sm={viewMode === 'grid' ? 6 : 12} md={viewMode === 'grid' ? 6 : 12} key={community.id}>
                <ItemCard>
                  <Avatar
                    src={community.mainImage}
                    alt={community.name}
                    sx={{ width: 80, height: 80, borderRadius: '8px' }} // Square avatar/image
                    variant="square" // Make it square
                  />
                  <InfoBox>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                      {community.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {community.subtitle}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {community.category}
                    </Typography>
                  </InfoBox>
                </ItemCard>
              </Grid>
            ))}
          </Grid>
        )}
      </PageContainer>
      <Footer />
    </div>
  );
}

export default OrganiserHome;
