import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import Logo from "../../assets/localBizlogo.png";
import { Link, useLocation } from "react-router-dom";
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const pages = [
    { label: 'Home', path: '/customer/home' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' }
];

const CustomerNavbar = ({customerdetails={},onAvatarClick}) => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

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

    const location = useLocation();
  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: 'transparent',boxShadow:"none"}}>
                <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 } }}>
                    <Toolbar disableGutters
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap', // Allow items to wrap on smaller screens
                        }}
                    >
                        {/* Logo for medium and larger screens */}
                        <Box sx={{
                            display: { xs: 'none', md: 'flex' },
                            alignItems: 'center',
                            flexShrink: 0, // Prevent shrinking
                        }}>
                            <Link to="/customer/home">
                                <Box component="img" src={Logo} alt='logo'
                                    sx={{ mr: 1, height: '40px' }} // Adjust logo size
                                />
                            </Link>
                        </Box>

                        {/* Search Bar */}
                        <Box sx={{
                            flexGrow: { xs: 1, md: 0 }, // Allow search bar to grow on small screens
                            ml: { xs: 0, md: 'auto' }, // Remove left margin on small screens, auto on md
                            mr: { xs: 0, md: 2 }, // Add some right margin on md
                            width: { xs: '100%', sm: 'auto' }, // Full width on xs, auto on sm
                            order: { xs: 3, md: 0 }, // Order on small screens (below logo/menu)
                            mt: { xs: 2, md: 0 }, // Top margin on small screens
                            display: 'flex',
                            justifyContent: 'center',
                        }}>
                            <TextField
                                variant="outlined"
                                placeholder="Search..."
                                size="small"
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon color="action" />
                                            </InputAdornment>
                                        ),
                                    }
                                }}
                                sx={{ width: { xs: '100%', sm: 300, md: 350 } }} // Responsive width
                            />
                        </Box>

                        {/* Mobile Menu Icon and Logo */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                                sx={{ p: 0 }} // Remove padding
                            >
                                <MenuIcon sx={{ color: "#384371" }} />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{ display: { xs: 'block', md: 'none' } }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page.label}
                                        component={Link} // Use Link component for navigation
                                        to={page.path}
                                        onClick={handleCloseNavMenu}>
                                        <Typography color='primary'
                                            sx={{ textAlign: 'center', color: '#1967D2' }}>
                                            {page.label}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                            <Link to='/customer/home' style={{ textDecoration: 'none', marginLeft: 'auto' }}>
                                <Box component="img" src={Logo} sx={{ height: '40px' }} /> {/* Adjust logo size */}
                            </Link>
                        </Box>

                        {/* Desktop Navigation Links */}
                        <Box sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                            justifyContent: 'center',
                            gap: { md: '20px', lg: '40px' }, // Responsive gap
                            order: { xs: 2, md: 0 }, // Order on small screens (below logo/menu)
                        }}>
                            {pages.map((page) => (
                                <Link style={{ textDecoration: "none" }}
                                    key={page.label}
                                    onClick={handleCloseNavMenu}
                                    to={page.path}
                                >
                                    <Typography color='primary' sx={{
                                        my: 2,
                                        fontSize: { md: "13px", lg: "14px" }, // Responsive font size
                                        fontWeight: "500",
                                        color: location.pathname === page.path ? "#6F32BF" : "inherit", // Use inherit for default color
                                        display: 'block',
                                        textTransform: "inherit",
                                        '&:hover': {
                                            color: '#1967D2'
                                        }
                                    }}> {page.label}</Typography>
                                </Link>
                            ))}
                        </Box>

                        {/* User Icons and Avatar */}
                        <Box display={"flex"} justifyContent={"flex-end"} alignItems={"center"} sx={{
                            flexGrow: { xs: 1, md: 0 }, // Allow icons to grow on small screens
                            gap: { xs: '15px', md: '30px', lg: '50px' }, // Responsive gap
                            order: { xs: 1, md: 0 }, // Order on small screens (next to mobile menu)
                            mt: { xs: 2, md: 0 }, // Top margin on small screens
                        }}>
                            <SmsOutlinedIcon color='primary' sx={{ height: '24px' }} />
                            <NotificationsOutlinedIcon color='primary' sx={{ height: '24px' }} />

                            <Box display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{ gap: "10px" }}>
                                <Typography color='secondary' sx={{ display: { xs: 'none', sm: 'block' } }}>Hi,{customerdetails?.name} </Typography>

                                {customerdetails?.profilePic?.filename ? (
                                    <Avatar onClick={onAvatarClick} src={`${import.meta.env.VITE_API_URL}uploads/${customerdetails?.profilePic?.filename}`} alt={customerdetails?.name} />
                                ) : (
                                    <Avatar onClick={onAvatarClick} >{customerdetails?.name?.charAt(0)}</Avatar>
                                )}
                            </Box>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        
    </>
  )
}

export default CustomerNavbar
