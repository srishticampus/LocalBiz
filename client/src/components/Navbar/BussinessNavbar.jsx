import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Logo from "../../assets/localBizlogo.png";
import { Link, useLocation } from "react-router-dom";
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const pages = [
    { label: 'Home', path: '/bussiness/home' },
    {
        label: 'Activities',
        path: '#',
        submenu: [
            { label: 'Events', path: '/bussiness/ViewEvents' },
            { label: 'Trainings', path: '/bussiness/ViewTrainning' },]
    },
    { label: 'Community', path: '/bussiness/Community' }
];

const BussinessNavbar = ({ onAvatarClick, searchTerm, onSearchChange }) => {
    const bussinessdetails = JSON.parse(localStorage.getItem("bussinessDetails"));

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [activitiesAnchorEl, setActivitiesAnchorEl] = useState(null);
    const [mobileActivitiesAnchorEl, setMobileActivitiesAnchorEl] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleActivitiesClick = (event) => {
        if (activitiesAnchorEl) {
            handleActivitiesClose();
        } else {
            setActivitiesAnchorEl(event.currentTarget);
        }
    };

    const handleActivitiesClose = () => {
        setActivitiesAnchorEl(null);
    };

    const handleMobileActivitiesClick = (event) => {
        setMobileActivitiesAnchorEl(event.currentTarget);
    };

    const handleMobileActivitiesClose = () => {
        setMobileActivitiesAnchorEl(null);
    };

    const location = useLocation();

    return (
        <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: "none" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Link to="/bussiness/home">
                            <Box component="img" src={Logo} alt='logo' sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        </Link>
                    </Box>

                    <Box sx={{ ml: "100px" }}>
                        <TextField
                            variant="outlined"
                            placeholder="Search products..."
                            size="small"
                            sx={{ width: 300 }}
                            value={searchTerm}
                            onChange={onSearchChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon color="action" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>

                    {/* Mobile Menu */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon sx={{ color: "#384371" }} />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                            keepMounted
                            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {pages.map((page) => (
                                page.label === 'Activities' ? (
                                    <div key={page.label}>
                                        <MenuItem onClick={handleMobileActivitiesClick}>
                                            <Typography textAlign="center" sx={{ color: '#384371' }}>
                                                {page.label}
                                            </Typography>
                                        </MenuItem>
                                        <Menu
                                            anchorEl={mobileActivitiesAnchorEl}
                                            open={Boolean(mobileActivitiesAnchorEl)}
                                            onClose={handleMobileActivitiesClose}
                                        >
                                            {page.submenu.map((subItem) => (
                                                <MenuItem
                                                    key={subItem.label}
                                                    onClick={handleMobileActivitiesClose}
                                                    component={Link}
                                                    to={subItem.path}
                                                    sx={{ color: '#384371' }}
                                                >
                                                    {subItem.label}
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    </div>
                                ) : (
                                    <MenuItem
                                        key={page.label}
                                        onClick={handleCloseNavMenu}
                                        component={Link}
                                        to={page.path}
                                    >
                                        <Typography textAlign="center" sx={{ color: '#384371' }}>
                                            {page.label}
                                        </Typography>
                                    </MenuItem>
                                )
                            ))}
                        </Menu>
                    </Box>

                    <Link to='/bussiness/home'>
                        <Box component="img" src={Logo} sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    </Link>

                    {/* Desktop Menu */}
                    <Box sx={{ ml: "200px", flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', gap: "40px" }}>
                        {pages.map((page) => (
                            page.label === 'Activities' ? (
                                <Box key={page.label} sx={{ position: 'relative' }}>
                                    <Typography
                                        onClick={handleActivitiesClick}
                                        sx={{
                                            my: 2,
                                            fontSize: "14px",
                                            fontWeight: "500",
                                            color: '#384371',
                                            display: 'block',
                                            textTransform: "inherit",
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {page.label}
                                    </Typography>
                                    <Menu
                                        anchorEl={activitiesAnchorEl}
                                        open={Boolean(activitiesAnchorEl)}
                                        onClose={handleActivitiesClose}
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                                        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                                        sx={{
                                            mt: 1,
                                            '& .MuiPaper-root': {
                                                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                                                borderRadius: '8px',
                                                minWidth: '200px'
                                            }
                                        }}
                                    >
                                        {page.submenu.map((subItem) => (
                                            <MenuItem
                                                key={subItem.label}
                                                onClick={handleActivitiesClose}
                                                component={Link}
                                                to={subItem.path}
                                                sx={{
                                                    px: 3,
                                                    py: 1,
                                                    fontSize: '14px',
                                                    color: '#384371'
                                                }}
                                            >
                                                {subItem.label}
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </Box>
                            ) : (
                                <Link
                                    style={{ textDecoration: "none" }}
                                    key={page.label}
                                    to={page.path}
                                >
                                    <Typography
                                        sx={{
                                            my: 2,
                                            fontSize: "14px",
                                            fontWeight: "500",
                                            color: '#384371',
                                            display: 'block',
                                            textTransform: "inherit"
                                        }}
                                    >
                                        {page.label}
                                    </Typography>
                                </Link>
                            )
                        ))}
                    </Box>

                    {/* Right side icons and avatar */}
                    <Box display="flex" justifyContent="space-around" alignItems="center" sx={{ mr: "100px", flexGrow: 0, gap: "50px" }}>
                        <Link to="/bussiness/ContactMsg">
                            <IconButton>
                                <SmsOutlinedIcon color="primary" sx={{ height: '24px' }} />
                            </IconButton>
                        </Link>
                        <NotificationsOutlinedIcon color="primary" sx={{ height: '24px' }} />

                        <Box display="flex" justifyContent="center" alignItems="center" sx={{ gap: "30px" }}>
                            <Typography color="secondary">Hi, {bussinessdetails?.name}</Typography>

                            {bussinessdetails?.profilePic ? (
                                <Avatar
                                    onClick={onAvatarClick}
                                    src={`http://localhost:4056/uploads/${bussinessdetails?.profilePic}`}
                                    alt={bussinessdetails?.name}
                                />
                            ) : (
                                <Avatar onClick={onAvatarClick}>
                                    {bussinessdetails?.name?.charAt(0)}
                                </Avatar>
                            )}
                        </Box>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default BussinessNavbar;
