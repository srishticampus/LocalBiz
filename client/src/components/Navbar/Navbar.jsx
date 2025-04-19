import React from 'react';
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
import { Link, useLocation } from "react-router-dom"




const pages = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' }
];

const Navbar = ({ contactbg = {}, aboutbg = {}, homebg = {} }) => {
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
            <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: "none", backgroundImage: `url(${contactbg})`, ...aboutbg, ...homebg }}>
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
                            <Link to="/">
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
                                    <MenuItem key={page.label}
                                        onClick={handleCloseNavMenu}

                                    >
                                        <Typography color='primary'
                                            sx={{ textAlign: 'center', color: '#1967D2' }}>
                                            {page.label}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <Box sx={{
                            display: { xs: 'flex', md: 'none' },
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexGrow: 1,
                        }}>
                            <Link to="/" >
                                <Box component="img" src={Logo} sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} ></Box>
                            </Link>

                        </Box>

                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', gap: "50px" }}>
                            {pages.map((page) => (
                                <Link
                                    to={page.path}
                                    key={page.label}
                                    style={{ textDecoration: "none" }}
                                    onClick={handleCloseNavMenu}
                                >
                                    <Typography color='primary' sx={{
                                        my: 2, fontSize: "14px", fontWeight: "500", color: location.pathname === page.path ? "#6F32BF" : "none", display: 'block', textTransform: "inherit", '&:hover': {
                                            // borderBottom: "1px solid #1967D2",
                                            color: '#1967D2'
                                        }
                                    }}> {page.label}</Typography>

                                </Link>
                            ))}
                        </Box>
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open login menu">
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleOpenUserMenu}
                                    endIcon={<ArrowRightAltIcon />}
                                    sx={{ borderRadius: "25px", textTransform: "none" }}
                                >
                                    Login
                                </Button>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Link to="/customer/login" style={{ textDecoration: "none", color: "#000" }}>
                                        Customer Login
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Link to="/organiser/login" style={{ textDecoration: "none", color: "#000" }}>
                                        Organiser Login
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Link to="/bussiness/login" style={{ textDecoration: "none", color: "#000" }}>
                                        Bussiness Login
                                    </Link>
                                </MenuItem>
                                {/* Add more roles if needed */}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    )
}

export default Navbar
