import { Box, Button, Container, Grid, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import React, { useEffect, useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSideBar';
import { toast } from 'react-toastify';
import Footer from '../Footer/Footer';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

const dummyComplaints = [
  { id: 1, title: 'App crash on login', description: 'The application crashes every time I try to log in.' },
  { id: 2, title: 'Missing profile picture upload', description: 'There is no option to upload profile picture on the dashboard.' },
  { id: 3, title: 'Unable to submit form', description: 'Submission button is disabled even after filling the form.' },
  { id: 4, title: 'Incorrect user role', description: 'I am logged in as a parent but I am shown educator content.' },
  { id: 5, title: 'Notification bug', description: 'Notifications keep popping up even when there are no updates.' },
];

const AdminComplaints = () => {
  const [open, setOpen] = useState(false);
  const [complaints, setComplaints] = useState(dummyComplaints);

  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
    toast.success('You logged out successfully');
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (localStorage.getItem('token') == null) {
      navigate('/admin/login');
    }
  }, [navigate]);

  return (
    <>
      <Container maxWidth="x-lg" sx={{ background: '#fffff', minHeight: '100vh', display: 'flex', flexDirection: 'row', p: 0 }}>
        <Grid item xs={6} md={2} sx={{ p: 0 }}>
          <AdminSidebar />
        </Grid>

        <Grid container spacing={2} sx={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', gap: 2, m: 0 }}>
          <Grid item xs={12}>
            <Box sx={{ height: '70px', background: 'white', borderRadius: '8px', width: '98%', px: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h3" sx={{ fontSize: '24px', fontWeight: '500' }} color="primary">Complaints</Typography>
              <Button onClick={handleOpen} variant="text" color="primary" sx={{ borderRadius: '25px', height: '40px', width: '200px', padding: '10px 35px' }} startIcon={<LogoutIcon />}>logout</Button>
            </Box>
          </Grid>

          <Grid item xs={12} sx={{ p: 3 }}>
            <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 100, fontSize: '2rem', fontFamily: 'Roboto, sans-serif', mb: 4 }}>Complaints List</Typography>
            <Box sx={{ width: '100%', overflow: 'hidden', borderRadius: 2, boxShadow: 1 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #9c27b0' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left', color: '#9c27b0', fontWeight: 600 }}>S No</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', color: '#9c27b0', fontWeight: 600 }}>Complaint</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', color: '#9c27b0', fontWeight: 600 }}>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {complaints.map((complaint, index) => (
                    <tr key={complaint.id} style={{ borderBottom: '1px solid #e0e0e0' }}>
                      <td style={{ padding: '12px 16px' }}>{index + 1}</td>
                      <td style={{ padding: '12px 16px' }}>{complaint.title}</td>
                      <td style={{ padding: '12px 16px' }}>{complaint.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Footer sx={{ mt: 'auto', width: '100%' }} />

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
            <Box display="flex" justifyContent="space-between" alignItems="space-between">
              <Typography variant="h4" sx={{ fontSize: '18px', fontWeight: '600' }}>Logout</Typography>
              <CloseIcon onClick={handleClose} sx={{ fontSize: '18px' }} />
            </Box>
            <hr />
            <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
              <Typography color="primary" sx={{ fontSize: '12px', fontWeight: '500' }} variant="p">
                Are you sure you want to log out?
              </Typography>
              <Box display="flex" alignItems="center" justifyContent="center" sx={{ gap: '10px' }}>
                <Button variant="outlined" color="secondary" sx={{ borderRadius: '25px', mt: 2, height: '40px', width: '100px', px: '35px' }} onClick={handleLogOut}>Yes</Button>
                <Button variant="contained" color="secondary" sx={{ borderRadius: '25px', mt: 2, height: '40px', width: '100px', px: '35px' }} onClick={handleClose}>No</Button>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default AdminComplaints;
