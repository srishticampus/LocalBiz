import React, { useEffect, useState } from 'react';
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
  styled,
  CircularProgress,
  Alert
} from '@mui/material';
import CustomerNavbar from '../Navbar/CustomerNavbar';
import Footer from '../Footer/Footer';
import axios from 'axios';
import { toast } from 'react-toastify';
import { baseUrl } from '../../baseUrl';
import { useNavigate } from 'react-router-dom';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const CustomerComplaints = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/customer/login');
          return;
        }
        // The API doc for GET /api/complaints doesn't specify a customer ID filter,
        // so it might return all complaints or complaints for the authenticated user.
        // For now, we'll assume it returns complaints relevant to the authenticated user.
        const response = await axios.get(`${baseUrl}api/complaints`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setComplaints(response.data.data);
      } catch (err) {
        console.error("Error fetching complaints:", err);
        setError("Failed to fetch complaints. Please try again later.");
        toast.error("Failed to fetch complaints.");
        if (err.response && err.response.status === 401) {
          toast.error("Session expired. Please log in again.");
          localStorage.removeItem('token');
          localStorage.removeItem('customerDetails');
          navigate("/customer/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [navigate]);

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
          My Complaints
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mt: 3 }}>{error}</Alert>
        ) : complaints.length > 0 ? (
          <Paper elevation={3} sx={{ overflow: 'hidden' }}>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="complaints table">
                <TableHead sx={{ bgcolor: 'primary.main' }}>
                  <TableRow>
                    <TableCell sx={{ color: 'common.white', fontWeight: 'bold' }}>S NO</TableCell>
                    <TableCell sx={{ color: 'common.white', fontWeight: 'bold' }}>Description</TableCell>
                    <TableCell sx={{ color: 'common.white', fontWeight: 'bold' }}>Status</TableCell>
                    {/* <TableCell sx={{ color: 'common.white', fontWeight: 'bold' }}>Date</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {complaints.map((complaint, index) => (
                    <StyledTableRow key={complaint._id}>
                      <TableCell>{index + 1}.</TableCell>
                      <TableCell sx={{ fontWeight: 'medium' }}>{complaint.description}</TableCell>
                      <TableCell>{complaint.status}</TableCell>
                      {/* <TableCell>{new Date(complaint.createdAt).toLocaleDateString()}</TableCell> */}
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        ) : (
          <Typography variant="h6" textAlign="center" sx={{ mt: 5 }}>
            No complaints submitted yet.
          </Typography>
        )}
      </Container>

      <Footer />
    </Box>
  );
};

export default CustomerComplaints;