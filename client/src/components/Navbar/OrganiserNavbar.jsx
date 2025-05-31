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
    { label: 'Home', path: '/organiser/home' },
    { label: 'Requests', path: '/organiser/bussinessrequest' },  
    { 
        label: 'Activities', 
        path: '#',
        submenu: [
            { 
                label: 'Events', 
                submenu: [
                    { label: 'Add Events', path: '/organiser/add-events' },
                    { label: 'View Events', path: '/organiser/view-events' }
                ]
            },
            { 
                label: 'Trainings', 
                submenu: [
                    { label: 'Add Trainings', path: '/organiser/add-trainings' },
                    { label: 'View Trainings', path: '/organiser/view-trainings' }
                ]
            },
            { 
                label: 'Workshops', 
                submenu: [
                    { label: 'Add Workshops', path: '/organiser/add-workshops' },
                    { label: 'View Workshops', path: '/organiser/view-workshops' }
                ]
            }
        ]
    },        
    { label: 'About', path: '/organiser/AboutUs' },
    { label: 'Contact', path: '/organiser/Contact' }
];

const OrganiserNavbar = ({organiserdetails={},onAvatarClick}) => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [activitiesAnchorEl, setActivitiesAnchorEl] = React.useState(null);
    const [subMenuAnchorEl, setSubMenuAnchorEl] = React.useState(null);
    const [currentSubMenu, setCurrentSubMenu] = React.useState(null);

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

    const handleActivitiesMenuOpen = (event) => {
        setActivitiesAnchorEl(event.currentTarget);
    };

    const handleActivitiesMenuClose = () => {
        setActivitiesAnchorEl(null);
    };

    const handleSubMenuOpen = (event, subMenuItems) => {
        setCurrentSubMenu(subMenuItems);
        setSubMenuAnchorEl(event.currentTarget);
    };

    const handleSubMenuClose = () => {
        setSubMenuAnchorEl(null);
    };

    const location = useLocation();

    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: 'transparent',boxShadow:"none"}}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <Link to="/customer/home">
                                <Box component="img" src={Logo} alt='logo'
                                    sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
                                </Box>
                            </Link>
                        </Box>

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
                                    <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                                        {page.submenu ? (
                                            <>
                                                <Typography color='primary' onClick={handleActivitiesMenuOpen}>
                                                    {page.label}
                                                </Typography>
                                                <Menu
                                                    anchorEl={activitiesAnchorEl}
                                                    open={Boolean(activitiesAnchorEl)}
                                                    onClose={handleActivitiesMenuClose}
                                                >
                                                    {page.submenu.map((item) => (
                                                        <MenuItem 
                                                            key={item.label}
                                                            onMouseEnter={(e) => handleSubMenuOpen(e, item.submenu)}
                                                        >
                                                            {item.label}
                                                            <ArrowRightAltIcon />
                                                        </MenuItem>
                                                    ))}
                                                </Menu>
                                                <Menu
                                                    anchorEl={subMenuAnchorEl}
                                                    open={Boolean(subMenuAnchorEl)}
                                                    onClose={handleSubMenuClose}
                                                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                                    transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                                                >
                                                    {currentSubMenu?.map((subItem) => (
                                                        <MenuItem 
                                                            key={subItem.label} 
                                                            component={Link} 
                                                            to={subItem.path}
                                                            onClick={handleSubMenuClose}
                                                        >
                                                            {subItem.label}
                                                        </MenuItem>
                                                    ))}
                                                </Menu>
                                            </>
                                        ) : (
                                            <Link to={page.path} style={{ textDecoration: 'none' }}>
                                                <Typography color='primary' sx={{ color: '#1967D2' }}>
                                                    {page.label}
                                                </Typography>
                                            </Link>
                                        )}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <Link to='/customer/home'>
                            <Box component="img" src={Logo} sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} ></Box>
                        </Link>
                        
                        <Box sx={{ml:"200px", flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', gap: "40px" }}>
                            {pages.map((page) => (
                                page.submenu ? (
                                    <Box key={page.label}>
                                        <Typography 
                                            color='primary'
                                            onClick={handleActivitiesMenuOpen}
                                            sx={{
                                                my: 2, 
                                                fontSize: "14px", 
                                                fontWeight: "500", 
                                                cursor: 'pointer',
                                                color: location.pathname.startsWith('/organiser/activities') ? "#6F32BF" : "inherit", 
                                                display: 'block', 
                                                textTransform: "inherit", 
                                                '&:hover': {
                                                    color: '#1967D2'
                                                }
                                            }}
                                        >
                                            {page.label}
                                        </Typography>
                                        <Menu
                                            anchorEl={activitiesAnchorEl}
                                            open={Boolean(activitiesAnchorEl)}
                                            onClose={handleActivitiesMenuClose}
                                        >
                                            {page.submenu.map((item) => (
                                                <MenuItem 
                                                    key={item.label}
                                                    onMouseEnter={(e) => handleSubMenuOpen(e, item.submenu)}
                                                >
                                                    {item.label}
                                                    <ArrowRightAltIcon />
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                        <Menu
                                            anchorEl={subMenuAnchorEl}
                                            open={Boolean(subMenuAnchorEl)}
                                            onClose={handleSubMenuClose}
                                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                                        >
                                            {currentSubMenu?.map((subItem) => (
                                                <MenuItem 
                                                    key={subItem.label} 
                                                    component={Link} 
                                                    to={subItem.path}
                                                    onClick={() => {
                                                        handleSubMenuClose();
                                                        handleActivitiesMenuClose();
                                                    }}
                                                >
                                                    {subItem.label}
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    </Box>
                                ) : (
                                    <Link style={{ textDecoration: "none" }}
                                        key={page.label}
                                        to={page.path}
                                    >
                                        <Typography color='primary'sx={{
                                            my: 2, 
                                            fontSize: "14px", 
                                            fontWeight: "500", 
                                            color: location.pathname === page.path ? "#6F32BF" : "inherit", 
                                            display: 'block', 
                                            textTransform: "inherit", 
                                            '&:hover': {
                                                color: '#1967D2'
                                            }
                                        }}> 
                                            {page.label}
                                        </Typography>
                                    </Link>
                                )
                            ))}
                        </Box>
                        <Box display={"flex"} justifyContent={"space-around"} alignItems={"center"} sx={{ mr:"100px",flexGrow: 0, gap: "50px" }}>
                            <SmsOutlinedIcon color='primary' sx={{ height: '24px' }} />
                            <NotificationsOutlinedIcon color='primary' sx={{ height: '24px' }} />
                            
                            <Box display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{ gap: "30px" }}>
                                <Typography color='secondary'>Hi,{organiserdetails?.name} </Typography>
                            
                                {organiserdetails?.profilePic?.filename ? (
                                    <Avatar onClick={onAvatarClick} src={`http://localhost:3000/uploads/${organiserdetails?.profilePic?.filename}`} alt={organiserdetails?.name} />
                                ) : (
                                    <Avatar onClick={onAvatarClick} >{organiserdetails?.name?.charAt(0)}</Avatar>
                                )}
                            </Box>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    )
}

export default OrganiserNavbar