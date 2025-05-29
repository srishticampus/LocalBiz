import { Box, Button, Container, Grid, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import React, { useEffect, useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSideBar';
import { toast } from 'react-toastify';
import Footer from '../Footer/Footer';
import axios from 'axios';

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

const dummyRequests = [
    { id: 1, name: "Sarah Johnson", organization: "Johnson & Co.", profileImage: "https://randomuser.me/api/portraits/women/44.jpg", status: "pending" },
    { id: 2, name: "Michael Chen", organization: "Community Builders", profileImage: "https://randomuser.me/api/portraits/men/32.jpg", status: "pending" },
    { id: 3, name: "Emma Rodriguez", organization: "Local Entrepreneurs", profileImage: "https://randomuser.me/api/portraits/women/68.jpg", status: "pending" },
    { id: 4, name: "David Wilson", organization: "Urban Developers", profileImage: "https://randomuser.me/api/portraits/men/75.jpg", status: "pending" },
    { id: 5, name: "Lisa Wong", organization: "Tech Innovators", profileImage: "https://randomuser.me/api/portraits/women/65.jpg", status: "pending" }
];

const AdminRequests = () => {
    const [open, setOpen] = React.useState(false);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const handleLogOut = () => {
        localStorage.removeItem('token');
        navigate('/admin/login');
        toast.success("You logged out successfully");
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        if (localStorage.getItem("token") == null) {
            navigate("/admin/login");
        }

        const fetchRequests = async () => {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/users');
                if (response.data && response.data.length > 0) {
                    const formattedRequests = response.data.slice(0, 5).map((user, index) => ({
                        id: user.id,
                        name: user.name,
                        organization: user.company ? user.company.name : `Organization ${index + 1}`,
                        profileImage: `https://randomuser.me/api/portraits/${index % 2 === 0 ? 'men' : 'women'}/${index * 10 + 5}.jpg`,
                        status: "pending"
                    }));
                    setRequests(formattedRequests);
                } else {
                    setRequests(dummyRequests);
                }
            } catch (error) {
                console.error("Error fetching requests:", error);
                setRequests(dummyRequests);
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, [navigate]);

    const handleRequestAction = (id, action) => {
        setRequests(prevRequests => prevRequests.filter(request => request.id !== id));

        if (action === 'approved') {
            toast.success(`Request #${id} approved successfully`);
        } else {
            toast.error(`Request #${id} rejected`);
        }
    };

    return (
        <>
            <Container maxWidth="x-lg" sx={{ background: "#fffff", minHeight: '100vh', display: 'flex', flexDirection: 'row', p: 0 }}>
                <Grid item xs={6} md={2} sx={{ p: 0 }}>
                    <AdminSidebar />
                </Grid>
                <Grid container spacing={2} sx={{ flex: 1, width: "100%", display: "flex", flexDirection: "column", gap: 2, m: 0 }}>
                    <Grid item xs={12}>
                        <Box sx={{ height: "70px", background: "white", borderRadius: "8px", width: "98%", px: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant='h3' sx={{ fontSize: "24px", fontWeight: "500" }} color='primary'>Dashboard</Typography>
                            <Button onClick={handleOpen} variant="text" color='primary' sx={{ borderRadius: "25px", height: "40px", width: '200px', padding: '10px 35px' }} startIcon={<LogoutIcon />}>logout</Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sx={{ p: 3 }}>
                        <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 100, fontSize: '2rem', fontFamily: 'Roboto, sans-serif', mb: 4 }}>Requests</Typography>
                        {loading ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                                <Typography>Loading requests...</Typography>
                            </Box>
                        ) : (
                            <Box sx={{ width: '100%', overflow: 'hidden', borderRadius: 2, boxShadow: 1 }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #9c27b0' }}>
                                            <th style={{ padding: '12px 16px', textAlign: 'left', color: '#9c27b0', fontWeight: 600 }}>S No</th>
                                            <th style={{ padding: '12px 16px', textAlign: 'left', color: '#9c27b0', fontWeight: 600 }}>Profile</th>
                                            <th style={{ padding: '12px 16px', textAlign: 'left', color: '#9c27b0', fontWeight: 600 }}>Business Owner / Organization</th>
                                            <th style={{ padding: '12px 16px', textAlign: 'left', color: '#9c27b0', fontWeight: 600 }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {requests.map((request, index) => (
                                            <tr key={request.id} style={{ borderBottom: '1px solid #e0e0e0' }}>
                                                <td style={{ padding: '12px 16px' }}>{index + 1}</td>
                                                <td style={{ padding: '12px 16px' }}>
                                                    <Box sx={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: '#e0e0e0', backgroundImage: `url(${request.profileImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                                                </td>
                                                <td style={{ padding: '12px 16px' }}>
                                                    <Typography>{request.name}</Typography>
                                                    <Typography variant="body2" color="text.secondary">{request.organization}</Typography>
                                                </td>
                                                <td style={{ padding: '12px 16px' }}>
                                                    <Button variant="outlined" color="success" sx={{ minWidth: 0, p: 1, mr: 1, borderRadius: "50%", borderWidth: 3 }} onClick={() => handleRequestAction(request.id, 'approved')}>
                                                        <CheckCircleOutlinedIcon />
                                                    </Button>
                                                    <Button variant="outlined" color="error" sx={{ minWidth: 0, p: 1, borderRadius: "50%", borderWidth: 3 }} onClick={() => handleRequestAction(request.id, 'rejected')}>
                                                        <CancelOutlinedIcon />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </Box>
                        )}
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
                            <Typography variant='h4' sx={{ fontSize: "18px", fontWeight: "600" }}>Logout</Typography>
                            <CloseIcon onClick={handleClose} sx={{ fontSize: "18px" }} />
                        </Box>
                        <hr />
                        <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
                            <Typography color='primary' sx={{ fontSize: "12px", fontWeight: '500' }} variant='p'>Are you sure you want to log out?</Typography>
                            <Box display="flex" alignItems="center" justifyContent="center" sx={{ gap: "10px" }}>
                                <Button variant='outlined' color='secondary' sx={{ borderRadius: "25px", marginTop: "20px", height: "40px", width: '100px', padding: '10px 35px' }} onClick={handleLogOut}>Yes</Button>
                                <Button variant='contained' color='secondary' sx={{ borderRadius: "25px", marginTop: "20px", height: "40px", width: '100px', padding: '10px 35px' }} onClick={handleClose}>No</Button>
                            </Box>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
};

export default AdminRequests;
