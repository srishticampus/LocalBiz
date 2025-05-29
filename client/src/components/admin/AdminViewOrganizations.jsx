import { Box, Button, Container, Grid, Typography, Modal, Fade, Backdrop } from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminSidebar from './AdminSideBar';
import Footer from '../Footer/Footer';

const dummyCommunityOrgs = [
  {
    id: 1,
    organizationName: "Neighborhood Helpers",
    name: "Emma Rivera",
    email: "emma@helpers.org",
    phone: "+1 555-0101",
    type: "Non-Profit",
    profileImage: "https://randomuser.me/api/portraits/women/45.jpg"
  },
  {
    id: 2,
    organizationName: "Urban Connect",
    name: "Liam Bennett",
    email: "liam@urbanconnect.com",
    phone: "+1 555-0202",
    type: "Civic Group",
    profileImage: "https://randomuser.me/api/portraits/men/34.jpg"
  },
  {
    id: 3,
    organizationName: "Green Hearts",
    name: "Ava Scott",
    email: "ava@greenhearts.org",
    phone: "+1 555-0303",
    type: "Environmental",
    profileImage: "https://randomuser.me/api/portraits/women/66.jpg"
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

const AdminViewBusinessOwners = () => {
  const [orgs, setOrgs] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setOrgs(dummyCommunityOrgs);
  }, []);

  const handleRemoveOrg = (id) => {
    setOrgs(prev => prev.filter(org => org.id !== id));
  };

  const handleLogOut = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
    toast.success("You logged out successfully");
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
            <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 100, fontSize: '2rem', fontFamily: 'Roboto, sans-serif', mb: 4 }}>Community Organizations</Typography>
            <Box sx={{ width: '100%', overflow: 'hidden', borderRadius: 2, boxShadow: 1 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #9c27b0' }}>
                    <th style={headerStyle}>S No</th>
                    <th style={headerStyle}>Profile</th>
                    <th style={headerStyle}>Organization Name</th>
                    <th style={headerStyle}>Full Name</th>
                    <th style={headerStyle}>Email</th>
                    <th style={headerStyle}>Phone Number</th>
                    <th style={headerStyle}>Organization Type</th>
                    <th style={headerStyle}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orgs.map((org, index) => (
                    <tr key={org.id} style={{ borderBottom: '1px solid #e0e0e0' }}>
                      <td style={cellStyle}>{index + 1}</td>
                      <td style={cellStyle}>
                        <Box sx={{ width: 40, height: 40, borderRadius: '50%', backgroundImage: `url(${org.profileImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                      </td>
                      <td style={cellStyle}>{org.organizationName}</td>
                      <td style={cellStyle}>{org.name}</td>
                      <td style={cellStyle}>{org.email}</td>
                      <td style={cellStyle}>{org.phone}</td>
                      <td style={cellStyle}>{org.type}</td>
                      <td style={cellStyle}>
                        <Button variant="outlined" color="error" sx={{ minWidth: 0, p: 1, borderRadius: "50%", borderWidth: 3 }} onClick={() => handleRemoveOrg(org.id)}>
                          <CancelOutlinedIcon />
                        </Button>
                      </td>
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

export default AdminViewBusinessOwners;
