import { Box, Button, Container, Grid, Typography, Modal, Fade, Backdrop } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminSidebar from './AdminSideBar';
import Footer from '../Footer/Footer';

const dummyUsers = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    phone: "+1 555-1234",
    address: "123 Maple St, Springfield, IL",
    profileImage: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob.smith@example.com",
    phone: "+1 555-5678",
    address: "456 Oak Ave, Metropolis, NY",
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 3,
    name: "Catherine Lee",
    email: "catherine.lee@example.com",
    phone: "+1 555-8765",
    address: "789 Pine Rd, Gotham, CA",
    profileImage: "https://randomuser.me/api/portraits/women/68.jpg"
  },
  {
    id: 4,
    name: "Daniel Kim",
    email: "daniel.kim@example.com",
    phone: "+1 555-4321",
    address: "321 Cedar Blvd, Star City, TX",
    profileImage: "https://randomuser.me/api/portraits/men/75.jpg"
  }
];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const AdminViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLogOut = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
    toast.success("You logged out successfully");
  };

  useEffect(() => {
    setUsers(dummyUsers);
  }, []);

  return (
    <>
      <Container maxWidth="x-lg" sx={{ background: "#fffff", minHeight: '100vh', display: 'flex', flexDirection: 'row', p: 0 }}>
        <Grid sx={{ p: 0 }}>
          <AdminSidebar />
        </Grid>

        <Grid container spacing={2} sx={{ flex: 1, width: "100%", display: "flex", flexDirection: "column", gap: 2, m: 0 }}>
          <Grid item xs={12}>
            <Box sx={{ height: "70px", background: "white", borderRadius: "8px", width: "98%", px: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant='h3' sx={{ fontSize: "24px", fontWeight: "500" }} color='primary'>Dashboard</Typography>
              <Button onClick={handleOpen} variant="text" color='primary' sx={{ borderRadius: "25px", height: "40px", width: '200px', padding: '10px 35px' }} startIcon={<LogoutIcon />}>logout</Button>
            </Box>
          </Grid>

          <Grid item sx={{ p: 3 }}>
            <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 100, fontSize: '2rem', fontFamily: 'Roboto, sans-serif', mb: 4 }}>Users</Typography>
            <Box sx={{ width: '100%', overflow: 'hidden', borderRadius: 2, boxShadow: 1 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #9c27b0' }}>
                    <th style={headerStyle}>S No</th>
                    <th style={headerStyle}>Profile</th>
                    <th style={headerStyle}>Full Name</th>
                    <th style={headerStyle}>Email</th>
                    <th style={headerStyle}>Phone Number</th>
                    <th style={headerStyle}>Address</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user.id} style={{ borderBottom: '1px solid #e0e0e0' }}>
                      <td style={cellStyle}>{index + 1}</td>
                      <td style={cellStyle}>
                        <Box sx={{ width: 40, height: 40, borderRadius: '50%', backgroundImage: `url(${user.profileImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                      </td>
                      <td style={cellStyle}>{user.name}</td>
                      <td style={cellStyle}>{user.email}</td>
                      <td style={cellStyle}>{user.phone}</td>
                      <td style={cellStyle}>{user.address}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Footer sx={{ mt: 'auto', width: '100%' }} />

      {/* Logout Modal */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant='h4' sx={{ fontSize: "18px", fontWeight: "600" }}>Logout</Typography>
              <CloseIcon onClick={handleClose} sx={{ fontSize: "18px", cursor: 'pointer' }} />
            </Box>
            <hr />
            <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
              <Typography color='primary' sx={{ fontSize: "14px", fontWeight: '500', mb: 2 }}>
                Are you sure you want to log out?
              </Typography>
              <Box display="flex" gap={2}>
                <Button variant='outlined' color='secondary' onClick={handleLogOut}>Yes</Button>
                <Button variant='contained' color='secondary' onClick={handleClose}>No</Button>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

const headerStyle = {
  padding: '12px 16px',
  textAlign: 'left',
  color: '#9c27b0',
  fontWeight: 600
};

const cellStyle = {
  padding: '12px 16px'
};

export default AdminViewUsers;
