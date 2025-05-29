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

// Sample data for all months with X-axis values in thousands
const monthlyData = {
    January: {
        users: [
            { name: '10k', value: 20 },
            { name: '15k', value: 40 },
            { name: '20k', value: 60 },
            { name: '25k', value: 80 },
        ],
        business: [
            { name: '10k', value: 10 },
            { name: '15k', value: 30 },
            { name: '20k', value: 50 },
            { name: '25k', value: 70 },
        ],
        organizers: [
            { name: '10k', value: 30 },
            { name: '15k', value: 50 },
            { name: '20k', value: 70 },
            { name: '25k', value: 90 },
        ],
        userCount: 1234,
        businessCount: 567,
        organizerCount: 89,
        userGrowth: 12,
        businessGrowth: -5,
        organizerGrowth: 8
    },
    February: {
        users: [
            { name: '10k', value: 25 },
            { name: '15k', value: 45 },
            { name: '20k', value: 65 },
            { name: '25k', value: 85 },
        ],
        business: [
            { name: '10k', value: 15 },
            { name: '15k', value: 35 },
            { name: '20k', value: 55 },
            { name: '25k', value: 75 },
        ],
        organizers: [
            { name: '10k', value: 35 },
            { name: '15k', value: 55 },
            { name: '20k', value: 75 },
            { name: '25k', value: 95 },
        ],
        userCount: 1350,
        businessCount: 580,
        organizerCount: 95,
        userGrowth: 15,
        businessGrowth: -3,
        organizerGrowth: 10
    },
    March: {
        users: [
            { name: '10k', value: 30 },
            { name: '15k', value: 50 },
            { name: '20k', value: 70 },
            { name: '25k', value: 90 },
        ],
        business: [
            { name: '10k', value: 20 },
            { name: '15k', value: 40 },
            { name: '20k', value: 60 },
            { name: '25k', value: 80 },
        ],
        organizers: [
            { name: '10k', value: 40 },
            { name: '15k', value: 60 },
            { name: '20k', value: 80 },
            { name: '25k', value: 100 },
        ],
        userCount: 1480,
        businessCount: 600,
        organizerCount: 105,
        userGrowth: 18,
        businessGrowth: 2,
        organizerGrowth: 15
    },
    April: {
        users: [
            { name: '10k', value: 35 },
            { name: '15k', value: 55 },
            { name: '20k', value: 75 },
            { name: '25k', value: 95 },
        ],
        business: [
            { name: '10k', value: 25 },
            { name: '15k', value: 45 },
            { name: '20k', value: 65 },
            { name: '25k', value: 85 },
        ],
        organizers: [
            { name: '10k', value: 45 },
            { name: '15k', value: 65 },
            { name: '20k', value: 85 },
            { name: '25k', value: 95 },
        ],
        userCount: 1600,
        businessCount: 630,
        organizerCount: 115,
        userGrowth: 20,
        businessGrowth: 5,
        organizerGrowth: 18
    },
    May: {
        users: [
            { name: '10k', value: 40 },
            { name: '15k', value: 60 },
            { name: '20k', value: 80 },
            { name: '25k', value: 100 },
        ],
        business: [
            { name: '10k', value: 30 },
            { name: '15k', value: 50 },
            { name: '20k', value: 70 },
            { name: '25k', value: 90 },
        ],
        organizers: [
            { name: '10k', value: 50 },
            { name: '15k', value: 70 },
            { name: '20k', value: 90 },
            { name: '25k', value: 100 },
        ],
        userCount: 1750,
        businessCount: 670,
        organizerCount: 130,
        userGrowth: 25,
        businessGrowth: 8,
        organizerGrowth: 22
    },
    June: {
        users: [
            { name: '10k', value: 45 },
            { name: '15k', value: 65 },
            { name: '20k', value: 85 },
            { name: '25k', value: 95 },
        ],
        business: [
            { name: '10k', value: 35 },
            { name: '15k', value: 55 },
            { name: '20k', value: 75 },
            { name: '25k', value: 95 },
        ],
        organizers: [
            { name: '10k', value: 55 },
            { name: '15k', value: 75 },
            { name: '20k', value: 85 },
            { name: '25k', value: 95 },
        ],
        userCount: 1850,
        businessCount: 700,
        organizerCount: 140,
        userGrowth: 28,
        businessGrowth: 10,
        organizerGrowth: 25
    },
    July: {
        users: [
            { name: '10k', value: 50 },
            { name: '15k', value: 70 },
            { name: '20k', value: 90 },
            { name: '25k', value: 100 },
        ],
        business: [
            { name: '10k', value: 40 },
            { name: '15k', value: 60 },
            { name: '20k', value: 80 },
            { name: '25k', value: 100 },
        ],
        organizers: [
            { name: '10k', value: 60 },
            { name: '15k', value: 80 },
            { name: '20k', value: 90 },
            { name: '25k', value: 100 },
        ],
        userCount: 1950,
        businessCount: 730,
        organizerCount: 150,
        userGrowth: 30,
        businessGrowth: 12,
        organizerGrowth: 28
    },
    August: {
        users: [
            { name: '10k', value: 55 },
            { name: '15k', value: 75 },
            { name: '20k', value: 85 },
            { name: '25k', value: 95 },
        ],
        business: [
            { name: '10k', value: 45 },
            { name: '15k', value: 65 },
            { name: '20k', value: 85 },
            { name: '25k', value: 95 },
        ],
        organizers: [
            { name: '10k', value: 65 },
            { name: '15k', value: 85 },
            { name: '20k', value: 95 },
            { name: '25k', value: 100 },
        ],
        userCount: 2050,
        businessCount: 760,
        organizerCount: 160,
        userGrowth: 32,
        businessGrowth: 15,
        organizerGrowth: 30
    },
    September: {
        users: [
            { name: '10k', value: 60 },
            { name: '15k', value: 80 },
            { name: '20k', value: 90 },
            { name: '25k', value: 100 },
        ],
        business: [
            { name: '10k', value: 50 },
            { name: '15k', value: 70 },
            { name: '20k', value: 90 },
            { name: '25k', value: 100 },
        ],
        organizers: [
            { name: '10k', value: 70 },
            { name: '15k', value: 90 },
            { name: '20k', value: 100 },
            { name: '25k', value: 100 },
        ],
        userCount: 2150,
        businessCount: 800,
        organizerCount: 170,
        userGrowth: 35,
        businessGrowth: 18,
        organizerGrowth: 35
    },
    October: {
        users: [
            { name: '10k', value: 65 },
            { name: '15k', value: 85 },
            { name: '20k', value: 95 },
            { name: '25k', value: 100 },
        ],
        business: [
            { name: '10k', value: 55 },
            { name: '15k', value: 75 },
            { name: '20k', value: 95 },
            { name: '25k', value: 100 },
        ],
        organizers: [
            { name: '10k', value: 75 },
            { name: '15k', value: 95 },
            { name: '20k', value: 100 },
            { name: '25k', value: 100 },
        ],
        userCount: 2250,
        businessCount: 830,
        organizerCount: 180,
        userGrowth: 38,
        businessGrowth: 20,
        organizerGrowth: 38
    },
    November: {
        users: [
            { name: '10k', value: 70 },
            { name: '15k', value: 90 },
            { name: '20k', value: 100 },
            { name: '25k', value: 100 },
        ],
        business: [
            { name: '10k', value: 60 },
            { name: '15k', value: 80 },
            { name: '20k', value: 100 },
            { name: '25k', value: 100 },
        ],
        organizers: [
            { name: '10k', value: 80 },
            { name: '15k', value: 100 },
            { name: '20k', value: 100 },
            { name: '25k', value: 100 },
        ],
        userCount: 2350,
        businessCount: 870,
        organizerCount: 190,
        userGrowth: 40,
        businessGrowth: 22,
        organizerGrowth: 40
    },
    December: {
        users: [
            { name: '10k', value: 75 },
            { name: '15k', value: 95 },
            { name: '20k', value: 100 },
            { name: '25k', value: 100 },
            { name: '30k', value: 75 },
            { name: '35k', value: 95 },
            { name: '40k', value: 100 },
            { name: '45k', value: 100 },
            { name: '50k', value: 75 },
            { name: '55k', value: 95 },
            { name: '60k', value: 100 },
            { name: '65k', value: 100 },    
        ],
        business: [
            { name: '10k', value: 65 },
            { name: '15k', value: 85 },
            { name: '20k', value: 100 },
            { name: '25k', value: 100 },
            { name: '30k', value: 65 },
            { name: '35k', value: 85 },
            { name: '40k', value: 100 },
            { name: '45k', value: 100 },
            { name: '50k', value: 65 },
            { name: '55k', value: 85 },
            { name: '60k', value: 100 },
            { name: '65k', value: 100 },
        ],
        organizers: [
            { name: '10k', value: 85 },
            { name: '15k', value: 100 },
            { name: '20k', value: 100 },
            { name: '25k', value: 100 },
            { name: '30k', value: 85 },
            { name: '35k', value: 100 },
            { name: '40k', value: 100 },
            { name: '45k', value: 100 },
            { name: '50k', value: 85 },
            { name: '55k', value: 100 },
            { name: '60k', value: 100 },
            { name: '65k', value: 100 },
        ],
        userCount: 2500,
        businessCount: 900,
        organizerCount: 200,
        userGrowth: 45,
        businessGrowth: 25,
        organizerGrowth: 45
    }
};

const AdminDashboard = () => {
    const [open, setOpen] = React.useState(false);
    const [timeRange, setTimeRange] = useState('January');
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const navigate = useNavigate();
    const handleLogOut = () => {
        localStorage.removeItem('token');
        navigate('/admin/login');
        toast.success("You logged out successfully");
    }

    useEffect(() => {
        if(localStorage.getItem("token") == null){
            navigate("/admin/login");
        }
    }, [navigate])

    const handleTimeRangeChange = (event) => {
        setTimeRange(event.target.value);
    };

    // Get current month's data
    const currentData = monthlyData[timeRange];

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
                                            <Box display="flex" alignItems="center" color={currentData.userGrowth >= 0 ? "success.main" : "error.main"}>
                                                {currentData.userGrowth >= 0 ? <TrendingUpIcon sx={{ mr: 0.5 }} /> : <TrendingDownIcon sx={{ mr: 0.5 }} />}
                                                <Typography variant="body2">{Math.abs(currentData.userGrowth)}%</Typography>
                                            </Box>
                                        </Box>
                                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>Total Users</Typography>
                                        <Typography variant="h3" sx={{ mt: 1 }}>{currentData.userCount.toLocaleString()}</Typography>
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
                                            <Box display="flex" alignItems="center" color={currentData.businessGrowth >= 0 ? "success.main" : "error.main"}>
                                                {currentData.businessGrowth >= 0 ? <TrendingUpIcon sx={{ mr: 0.5 }} /> : <TrendingDownIcon sx={{ mr: 0.5 }} />}
                                                <Typography variant="body2">{Math.abs(currentData.businessGrowth)}%</Typography>
                                            </Box>
                                        </Box>
                                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>Total Business</Typography>
                                        <Typography variant="h3" sx={{ mt: 1 }}>{currentData.businessCount.toLocaleString()}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>

                            {/* Organizers Card */}
                            <Grid item xs={12} md={4}>
                                <Card sx={{ borderRadius: '10px'}}>
                                    <CardContent>
                                        <Box display="flex" justifyContent="space-between" alignItems="center">
                                            <Box display="flex" alignItems="center">
                                                <GroupsIcon color="primary" sx={{ fontSize: 30, mr: 1 }} />
                                                <Typography variant="h6">Organizers</Typography>
                                            </Box>
                                            <Box display="flex" alignItems="center" color={currentData.organizerGrowth >= 0 ? "success.main" : "error.main"}>
                                                {currentData.organizerGrowth >= 0 ? <TrendingUpIcon sx={{ mr: 0.5 }} /> : <TrendingDownIcon sx={{ mr: 0.5 }} />}
                                                <Typography variant="body2">{Math.abs(currentData.organizerGrowth)}%</Typography>
                                            </Box>
                                        </Box>
                                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>Total Organizers</Typography>
                                        <Typography variant="h3" sx={{ mt: 1 }}>{currentData.organizerCount.toLocaleString()}</Typography>
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
                                        {Object.keys(monthlyData).map((month) => (
                                            <MenuItem key={month} value={month}>{month}</MenuItem>
                                        ))}
                                    </Select>
                                </Box>
                                <Box sx={{ height: 300 }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={currentData.users} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
                                        {Object.keys(monthlyData).map((month) => (
                                            <MenuItem key={month} value={month}>{month}</MenuItem>
                                        ))}
                                    </Select>
                                </Box>
                                <Box sx={{ height: 300 }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={currentData.business} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
                                        {Object.keys(monthlyData).map((month) => (
                                            <MenuItem key={month} value={month}>{month}</MenuItem>
                                        ))}
                                    </Select>
                                </Box>
                                <Box sx={{ height: 300 }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={currentData.organizers} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
                            <Box display={"flex"} justifyContent={"space-between"} alignItems={"space-between"}>
                                <Typography variant='h4' sx={{ fontSize: "18px", fontWeight: "600" }}>Logout</Typography>
                                <CloseIcon onClick={handleClose} sx={{ fontSize: "18px" }} />
                            </Box>
                            <hr />
                            <Box display={"flex"} alignItems={"center"} justifyContent={"center"} flexDirection={"column"}>
                                <Typography color='primary' sx={{ fontSize: "12px", fontWeight: '500' }} variant='p'>Are you sure you want to log out ? </Typography>
                                <Box display={"flex"} alignItems={"center"} justifyContent={"center"} sx={{gap:"10px"}}>
                                    <Button variant='outlined' color='secondary' sx={{ borderRadius: "25px", marginTop: "20px", height: "40px", width: '100px', padding: '10px 35px' }} onClick={handleLogOut}>yes</Button>
                                    <Button variant='contained' color='secondary' sx={{ borderRadius: "25px", marginTop: "20px", height: "40px", width: '100px', padding: '10px 35px' }} onClick={handleClose}>no</Button>
                                </Box>
                            </Box>
                        </Box>
                    </Fade>
                </Modal>
                
            </div>
        </>
    )
}

export default AdminDashboard;