import { Box, Button, Container, Grid, Typography, Card, CardContent, Select, MenuItem } from '@mui/material';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import React, { useEffect, useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import BusinessIcon from '@mui/icons-material/Business';
import GroupsIcon from '@mui/icons-material/Groups';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSideBar';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from 'react-toastify';
import Footer from '../Footer/Footer';
import axiosInstance from '../../api/axiosInstance';

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

const AdminDashboard = () => {
    const [open, setOpen] = React.useState(false);
    const [timeRange, setTimeRange] = useState('January');
    const [analyticsData, setAnalyticsData] = useState({
        users: [],
        business: [],
        organizers: [],
        userCount: 0,
        businessCount: 0,
        organizerCount: 0,
        userGrowth: 0,
        businessGrowth: 0,
        organizerGrowth: 0,
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const navigate = useNavigate();
    const handleLogOut = () => {
        localStorage.removeItem('token');
        navigate('/admin/login');
        toast.success("You logged out successfully");
    }

    useEffect(() => {
        if (localStorage.getItem("token") == null) {
            navigate("/admin/login");
        }
        fetchAnalyticsData();
    }, [navigate, timeRange])

    const fetchAnalyticsData = async () => {
        try {
            const response = await axiosInstance.get('/api/admin/analytics', {
                params: {
                    month: timeRange // Send the selected month as a query parameter
                }
            });
            const analytics = response.data.data; // Access the nested data object
            setAnalyticsData({
                users: analytics.users?.map(item => ({ name: item.name, value: item.value })),
                business: analytics.business?.map(item => ({ name: item.name, value: item.value })),
                organizers: analytics.organizers?.map(item => ({ name: item.name, value: item.value })),
                userCount: analytics.userCount,
                businessCount: analytics.businessCount,
                organizerCount: analytics.organizerCount,
                userGrowth: parseFloat(analytics.userGrowth),
                businessGrowth: parseFloat(analytics.businessGrowth),
                organizerGrowth: parseFloat(analytics.organizerGrowth),
            });
        } catch (error) {
            console.error("Error fetching analytics data:", error);
            toast.error("Failed to fetch analytics data.");
        }
    };

    const handleTimeRangeChange = (event) => {
        setTimeRange(event.target.value);
    };

    return (
        <>
            <Container
                maxWidth="x-lg"
                sx={{
                    background: "#fffff",
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'row',
                    p: 0
                }}
            ><Grid item xs={6} md={2} sx={{ p: 0 }}>
                    <AdminSidebar />
                </Grid>
                <Grid
                    container
                    spacing={2}
                    sx={{
                        flex: 1,
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        m: 0
                    }}
                >
                    {/* Sidebar */}


                    {/* Content (right part) */}
                    <Grid
                        item
                        xs={6}
                        md={10}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                            padding: "15px 0px",
                            borderRadius: "8px",
                            flexGrow: 1
                        }}
                    >                        {/* Top Bar */}
                        <Box sx={{ height: "70px", background: "white", borderRadius: "8px", width: "98%", px: 3 }} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                            <Typography variant='h3' sx={{ fontSize: "24px", fontWeight: "500" }} color='primary'>Dashboard</Typography>
                            <Button onClick={handleOpen} variant="text" color='primary' sx={{ borderRadius: "25px", height: "40px", width: '200px', padding: '10px 35px' }} startIcon={<LogoutIcon />}>logout</Button>
                        </Box>

                        {/* Stats Cards */}
                        <Grid container spacing={3}>
                            {/* Users Card */}
                            <Grid item xs={12} md={4}>
                                <Card sx={{ borderRadius: '10px' }}>
                                    <CardContent>
                                        <Box display="flex" justifyContent="space-between" alignItems="center">
                                            <Box display="flex" alignItems="center">
                                                <PersonOutlineIcon color="primary" sx={{ fontSize: 30, mr: 1 }} />
                                                <Typography variant="h6">Users</Typography>
                                            </Box>
                                            <Box display="flex" alignItems="center" color={analyticsData.userGrowth >= 0 ? "success.main" : "error.main"}>
                                                {analyticsData.userGrowth >= 0 ? <TrendingUpIcon sx={{ mr: 0.5 }} /> : <TrendingDownIcon sx={{ mr: 0.5 }} />}
                                                <Typography variant="body2">{Math.abs(analyticsData.userGrowth)}%</Typography>
                                            </Box>
                                        </Box>
                                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>Total Users</Typography>
                                        <Typography variant="h3" sx={{ mt: 1 }}>{analyticsData?.userCount?.toLocaleString()}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>

                            {/* Business Card */}
                            <Grid item xs={12} md={4}>
                                <Card sx={{ borderRadius: '10px' }}>
                                    <CardContent>
                                        <Box display="flex" justifyContent="space-between" alignItems="center">
                                            <Box display="flex" alignItems="center">
                                                <BusinessIcon color="primary" sx={{ fontSize: 30, mr: 1 }} />
                                                <Typography variant="h6">Business</Typography>
                                            </Box>
                                            <Box display="flex" alignItems="center" color={analyticsData.businessGrowth >= 0 ? "success.main" : "error.main"}>
                                                {analyticsData.businessGrowth >= 0 ? <TrendingUpIcon sx={{ mr: 0.5 }} /> : <TrendingDownIcon sx={{ mr: 0.5 }} />}
                                                <Typography variant="body2">{Math.abs(analyticsData.businessGrowth)}%</Typography>
                                            </Box>
                                        </Box>
                                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>Total Business</Typography>
                                        <Typography variant="h3" sx={{ mt: 1 }}>{analyticsData?.businessCount?.toLocaleString()}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>

                            {/* Organizers Card */}
                            <Grid item xs={12} md={4}>
                                <Card sx={{ borderRadius: '10px' }}>
                                    <CardContent>
                                        <Box display="flex" justifyContent="space-between" alignItems="center">
                                            <Box display="flex" alignItems="center">
                                                <GroupsIcon color="primary" sx={{ fontSize: 30, mr: 1 }} />
                                                <Typography variant="h6">Organizers</Typography>
                                            </Box>
                                            <Box display="flex" alignItems="center" color={analyticsData.organizerGrowth >= 0 ? "success.main" : "error.main"}>
                                                {analyticsData.organizerGrowth >= 0 ? <TrendingUpIcon sx={{ mr: 0.5 }} /> : <TrendingDownIcon sx={{ mr: 0.5 }} />}
                                                <Typography variant="body2">{Math.abs(analyticsData.organizerGrowth)}%</Typography>
                                            </Box>
                                        </Box>
                                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>Total Organizers</Typography>
                                        <Typography variant="h3" sx={{ mt: 1 }}>{analyticsData?.organizerCount?.toLocaleString()}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>

                        {/* User Details Chart */}
                        <Card sx={{ borderRadius: '10px', boxShadow: 3 }}>
                            <CardContent>
                                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                                    <Typography variant="h6">User Details</Typography>
                                    <Select
                                        value={timeRange}
                                        onChange={handleTimeRangeChange}
                                        size="small"
                                        sx={{
                                            minWidth: 120,
                                            '& .MuiSelect-select': {
                                                color: 'primary.main'
                                            }
                                        }}
                                    >
                                        {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month) => (
                                            <MenuItem key={month} value={month}>{month}</MenuItem>
                                        ))}
                                    </Select>
                                </Box>
                                <Box sx={{ height: 300 }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={analyticsData.users} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                                            <XAxis
                                                dataKey="name"
                                                tick={{ fill: '#8884d8', fontSize: 12, fontWeight: 500 }}
                                                axisLine={{ stroke: '#ccc' }}
                                                tickLine={false}
                                            />
                                            <YAxis
                                                domain={[0, 100]}
                                                tickCount={6}
                                                tickFormatter={(value) => `${value}%`}
                                                tick={{ fill: '#8884d8', fontSize: 12, fontWeight: 500 }}
                                                axisLine={{ stroke: '#ccc' }}
                                                tickLine={false}
                                            />
                                            <Tooltip
                                                contentStyle={{
                                                    borderRadius: '10px',
                                                    backgroundColor: '#ffffff',
                                                    border: '1px solid #e0e0e0',
                                                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                                                }}
                                                formatter={(value) => [`${value}%`, 'Percentage']}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="value"
                                                stroke="#1976d2"
                                                strokeWidth={3}
                                                dot={{ r: 4, stroke: '#1976d2', strokeWidth: 2, fill: '#fff' }}
                                                activeDot={{ r: 6, stroke: '#1976d2', strokeWidth: 3, fill: '#fff' }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </Box>
                            </CardContent>
                        </Card>

                        {/* Business Details Chart */}
                        <Card sx={{ borderRadius: '10px', boxShadow: 3 }}>
                            <CardContent>
                                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                                    <Typography variant="h6">Business Details</Typography>
                                    <Select
                                        value={timeRange}
                                        onChange={handleTimeRangeChange}
                                        size="small"
                                        sx={{
                                            minWidth: 120,
                                            '& .MuiSelect-select': {
                                                color: 'primary.main'
                                            }
                                        }}
                                    >
                                        {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month) => (
                                            <MenuItem key={month} value={month}>{month}</MenuItem>
                                        ))}
                                    </Select>
                                </Box>
                                <Box sx={{ height: 300 }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={analyticsData.business} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                                            <XAxis
                                                dataKey="name"
                                                tick={{ fill: '#8884d8', fontSize: 12, fontWeight: 500 }}
                                                axisLine={{ stroke: '#ccc' }}
                                                tickLine={false}
                                            />
                                            <YAxis
                                                domain={[0, 100]}
                                                tickCount={6}
                                                tickFormatter={(value) => `${value}%`}
                                                tick={{ fill: '#8884d8', fontSize: 12, fontWeight: 500 }}
                                                axisLine={{ stroke: '#ccc' }}
                                                tickLine={false}
                                            />
                                            <Tooltip
                                                contentStyle={{
                                                    borderRadius: '10px',
                                                    backgroundColor: '#ffffff',
                                                    border: '1px solid #e0e0e0',
                                                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                                                }}
                                                formatter={(value) => [`${value}%`, 'Percentage']}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="value"
                                                stroke="#1976d2"
                                                strokeWidth={3}
                                                dot={{ r: 4, stroke: '#1976d2', strokeWidth: 2, fill: '#fff' }}
                                                activeDot={{ r: 6, stroke: '#1976d2', strokeWidth: 3, fill: '#fff' }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </Box>
                            </CardContent>
                        </Card>

                        {/* Organizer Details Chart */}
                        <Card sx={{ borderRadius: '10px', boxShadow: 3 }}>
                            <CardContent>
                                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                                    <Typography variant="h6">Organizer Details</Typography>
                                    <Select
                                        value={timeRange}
                                        onChange={handleTimeRangeChange}
                                        size="small"
                                        sx={{
                                            minWidth: 120,
                                            '& .MuiSelect-select': {
                                                color: 'primary.main'
                                            }
                                        }}
                                    >
                                        {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month) => (
                                            <MenuItem key={month} value={month}>{month}</MenuItem>
                                        ))}
                                    </Select>
                                </Box>
                                <Box sx={{ height: 300 }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={analyticsData.organizers} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                                            <XAxis
                                                dataKey="name"
                                                tick={{ fill: '#8884d8', fontSize: 12, fontWeight: 500 }}
                                                axisLine={{ stroke: '#ccc' }}
                                                tickLine={false}
                                            />
                                            <YAxis
                                                domain={[0, 100]}
                                                tickCount={6}
                                                tickFormatter={(value) => `${value}%`}
                                                tick={{ fill: '#8884d8', fontSize: 12, fontWeight: 500 }}
                                                axisLine={{ stroke: '#ccc' }}
                                                tickLine={false}
                                            />
                                            <Tooltip
                                                contentStyle={{
                                                    borderRadius: '10px',
                                                    backgroundColor: '#ffffff',
                                                    border: '1px solid #e0e0e0',
                                                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                                                }}
                                                formatter={(value) => [`${value}%`, 'Percentage']}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="value"
                                                stroke="#1976d2"
                                                strokeWidth={3}
                                                dot={{ r: 4, stroke: '#1976d2', strokeWidth: 2, fill: '#fff' }}
                                                activeDot={{ r: 6, stroke: '#1976d2', strokeWidth: 3, fill: '#fff' }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

            </Container>
            <Footer sx={{ mt: 'auto', width: '100%' }} />


            {/* logout modal */}
            <div>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                        backdrop: {
                            timeout: 500,
                        },
                    }}
                >
                    <Fade in={open}>
                        <Box sx={style}>
                            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                                <Typography id="transition-modal-title" variant="h6" component="h2">
                                    Logout Confirmation
                                </Typography>
                                <CloseIcon onClick={handleClose} sx={{ cursor: 'pointer' }} />
                            </Box>
                            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                                Are you sure you want to logout?
                            </Typography>
                            <Box display={'flex'} justifyContent={'flex-end'} gap={2} mt={3}>
                                <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                                <Button variant="contained" color="error" onClick={handleLogOut}>Logout</Button>
                            </Box>
                        </Box>
                    </Fade>
                </Modal>

            </div>
        </>
    )
}

export default AdminDashboard;
