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
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Logo from "../../assets/localBizlogo.png";
import { Link, useLocation } from "react-router-dom";
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const pages = [
    { label: 'Home', path: '/organiser/home' },

    {
        label: 'Activities',
        path: '#',
        subItems: [
            {
                label: 'Events',
                path: '#',
                subItems: [
                    { label: 'Add Event', path: '/organiser/addevents' },
                    { label: 'View Events', path: '/organiser/Viewevents' }
                ]
            },
            {
                label: 'Trainings',
                path: '#',
                subItems: [
                    { label: 'Add Training', path: '/organiser/AddTrainning' },
                    { label: 'View Trainings', path: '/organiser/ViewTrainning' }
                ]
            },
            {
                label: 'Workshops',
                path: '#',
                subItems: [
                    { label: 'Add Workshop', path: '/organiser/AddWorkShop' },
                    { label: 'View Workshops', path: '/organiser/ViewWorkShop' }
                ]
            }
        ]
    },
    // { label: 'Updates', path: '#' }
];

const OrganiserNavbar = ({ organiserdetails = {}, onAvatarClick }) => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [activitiesAnchorEl, setActivitiesAnchorEl] = useState(null);
    const [subMenuAnchorEl, setSubMenuAnchorEl] = useState(null);
    const [currentSubMenu, setCurrentSubMenu] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleActivitiesClick = (event) => {
        setActivitiesAnchorEl(event.currentTarget);
    };

    const handleActivitiesClose = () => {
        setActivitiesAnchorEl(null);
    };

    const handleSubMenuOpen = (event, subMenu) => {
        setCurrentSubMenu(subMenu);
        setSubMenuAnchorEl(event.currentTarget);
    };

    const handleSubMenuClose = () => {
        setSubMenuAnchorEl(null);
    };

    const location = useLocation();

    const renderMenuItem = (item) => {
        if (item.subItems) {
            return (
                <MenuItem
                    key={item.label}
                    onClick={item.label === 'Activities' ? handleActivitiesClick : (e) => handleSubMenuOpen(e, item)}
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: item.label === 'Activities' ? 'rgba(25, 103, 210, 0.08)' : 'inherit',
                        '&:hover': {
                            backgroundColor: item.label === 'Activities' ? 'rgba(25, 103, 210, 0.08)' : 'rgba(0, 0, 0, 0.04)'
                        }
                    }}
                >
                    <Typography color='primary' sx={{ color: '#1967D2' }}>
                        {item.label}
                    </Typography>
                    {item.label === 'Activities' ?
                        <KeyboardArrowDownIcon fontSize="small" /> :
                        <KeyboardArrowRightIcon fontSize="small" />
                    }
                </MenuItem>
            );
        } else {
            return (
                <MenuItem
                    key={item.label}
                    component={Link}
                    to={item.path}
                    onClick={handleCloseNavMenu}
                >
                    <Typography color='primary' sx={{ color: '#1967D2' }}>
                        {item.label}
                    </Typography>
                </MenuItem>
            );
        }
    };

    const renderDesktopMenu = (item) => {
        if (item.subItems) {
            return (
                <Box key={item.label} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button
                        onClick={item.label === 'Activities' ? handleActivitiesClick : null}
                        onMouseEnter={item.label !== 'Activities' ? (e) => handleSubMenuOpen(e, item) : null}
                        sx={{
                            my: 0,
                            fontSize: "14px",
                            fontWeight: "500",
                            color: '#1967D2',
                            textTransform: "inherit",
                            backgroundColor: item.label === 'Activities' ? 'rgba(25, 103, 210, 0.08)' : 'transparent',
                            '&:hover': {
                                backgroundColor: item.label === 'Activities' ? 'rgba(25, 103, 210, 0.08)' : 'transparent',
                                color: item.label === 'Activities' ? '#1967D2' : '#6F32BF'
                            }
                        }}
                    >
                        {item.label}
                        <KeyboardArrowDownIcon fontSize="small" sx={{ ml: 0.5 }} />
                    </Button>
                </Box>
            );
        } else {
            return (
                <Box key={item.label} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Link
                        style={{ textDecoration: "none" }}
                        to={item.path}
                    >
                        <Typography
                            sx={{
                                my: 0,
                                fontSize: "14px",
                                fontWeight: "500",
                                color: location.pathname === item.path ? "#6F32BF" : "#1967D2",
                                textTransform: "inherit",
                                '&:hover': {
                                    color: '#6F32BF'
                                }
                            }}
                        >
                            {item.label}
                        </Typography>
                    </Link>
                </Box>
            );
        }
    };

    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: "none" }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: '20px'
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Link to="/customer/home">
                                <Box component="img" src={Logo} alt='logo'
                                    sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
                                </Box>
                            </Link>
                        </Box>

                        <Box sx={{ flexGrow: 1 }}>
                            <TextField
                                variant="outlined"
                                placeholder="Search..."
                                size="small"
                                sx={{ width: 300 }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
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
                                {pages.map((page) => renderMenuItem(page))}
                            </Menu>
                        </Box>

                        <Link to='/customer/home'>
                            <Box component="img" src={Logo} sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} ></Box>
                        </Link>

                        <Box sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: "40px"
                        }}>
                            {pages.map((page) => renderDesktopMenu(page))}
                        </Box>

                        <Box sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "30px",
                            flexShrink: 0
                        }}>
                            <SmsOutlinedIcon color='primary' sx={{ height: '24px' }} />
                            <NotificationsOutlinedIcon color='primary' sx={{ height: '24px' }} />

                            <Box display={"flex"} alignItems={"center"} sx={{ gap: "10px" }}>
                                <Typography color='secondary'>Hi, {organiserdetails?.name} </Typography>

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

            {/* Activities Dropdown Menu */}
            <Menu
                anchorEl={activitiesAnchorEl}
                open={Boolean(activitiesAnchorEl)}
                onClose={handleActivitiesClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                sx={{ mt: 1 }}
            >
                {pages.find(page => page.label === 'Activities')?.subItems?.map((item) => (
                    <MenuItem
                        key={item.label}
                        onClick={(e) => {
                            if (item.subItems) {
                                handleSubMenuOpen(e, item);
                            } else {
                                handleActivitiesClose();
                            }
                        }}
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            minWidth: '200px'
                        }}
                    >
                        <Typography color='primary' sx={{ color: '#1967D2' }}>
                            {item.label}
                        </Typography>
                        {item.subItems && <KeyboardArrowRightIcon fontSize="small" />}
                    </MenuItem>
                ))}
            </Menu>

            {/* Sub-menu for Activities items */}
            <Menu
                anchorEl={subMenuAnchorEl}
                open={Boolean(subMenuAnchorEl)}
                onClose={handleSubMenuClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                sx={{ mt: -1, ml: 0.5 }}
            >
                {currentSubMenu?.subItems?.map((item) => (
                    <MenuItem
                        key={item.label}
                        component={Link}
                        to={item.path}
                        onClick={() => {
                            handleSubMenuClose();
                            handleActivitiesClose();
                        }}
                    >
                        <Typography color='primary' sx={{ color: '#1967D2' }}>
                            {item.label}
                        </Typography>
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}

export default OrganiserNavbar;
