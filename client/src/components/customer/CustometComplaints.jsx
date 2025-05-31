import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Container,
  styled
} from '@mui/material';
import CustomerNavbar from '../Navbar/CustomerNavbar';
import Footer from '../Footer/Footer';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const CustomerComplaints = () => {
  const complaints = [
    {
      id: 1,
      complaint: "Handmade Jewelry Store",
      description: "We specialize in creating unique, handcrafted earrings, necklaces, and bracelets using eco-friendly materials."
    },
    {
      id: 2,
      complaint: "Pottery and Clay Crafts Business",
      description: "Bringing tradition to life through beautiful, handmade pottery, perfect for home décor and gifting."
    },
    {
      id: 3,
      complaint: "Eco-Friendly Paper Products",
      description: "Designing sustainable and biodegradable paper goods for creative minds and eco-conscious hearts."
    },
    {
      id: 4,
      complaint: "Local Bakery",
      description: "Homemade baked goods using traditional recipes and the finest ingredients for a taste of home."
    }
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CustomerNavbar />
      
      <Container maxWidth="lg" sx={{ py: 4, flex: 1 }}>
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold', 
            color: 'primary.main',
            mb: 4,
            textAlign: 'center'
          }}
        >
          Customer Complaints
        </Typography>
        
        <Paper elevation={3} sx={{ overflow: 'hidden' }}>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="complaints table">
              <TableHead sx={{ bgcolor: 'primary.main' }}>
                <TableRow>
                  <TableCell sx={{ color: 'common.white', fontWeight: 'bold' }}>S NO</TableCell>
                  <TableCell sx={{ color: 'common.white', fontWeight: 'bold' }}>Complaints</TableCell>
                  <TableCell sx={{ color: 'common.white', fontWeight: 'bold' }}>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {complaints.map((row) => (
                  <StyledTableRow key={row.id}>
                    <TableCell>{row.id}.</TableCell>
                    <TableCell sx={{ fontWeight: 'medium' }}>{row.complaint}</TableCell>
                    <TableCell>{row.description}</TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
      
      <Footer />
    </Box>
  );
};

export default CustomerComplaints;