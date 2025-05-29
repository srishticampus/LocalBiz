import {
  Box,
  Button,
  Typography,
  Menu,
  MenuItem
} from '@mui/material';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import TaskOutlinedIcon from '@mui/icons-material/TaskOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import adminlogo from "../../assets/admindashboard.png";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminSidebar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate(); // ✅ Correct hook

  const handleUsersClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    handleClose();
  };

  return (
    <Box sx={{
      height: "100%",
      background: "white",
      margin: "15px 0px",
      borderRadius: "8px",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '200px'
    }}>
      {/* Logo */}
      <Box sx={{
        width: "122px",
        height: "30px",
        marginTop: "30px",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Box component="img" src={adminlogo} alt="Admin Logo" />
      </Box>

      {/* Menu Items */}
      <Box sx={{
        width: '100%',
        marginTop: "20px",
        padding: '0 16px'
      }}>
        <Button
          fullWidth
          onClick={() => navigate('/admin/dashboard')}
          sx={{
            justifyContent: 'flex-start',
            height: "40px",
            marginBottom: "10px",
            textTransform: 'none',
            color: 'primary.main',
            '&:hover': {
              backgroundColor: 'action.hover'
            }
          }}
          startIcon={<DashboardOutlinedIcon sx={{ width: "24px" }} />}
        >
          <Typography sx={{
            fontSize: "14px",
            fontWeight: "500",
            ml: 1,
            textAlign: 'left'
          }}>
            Dashboard
          </Typography>
        </Button>

        <Button
          fullWidth
          onClick={() => navigate('/admin/requests')}
          sx={{
            justifyContent: 'flex-start',
            height: "40px",
            marginBottom: "10px",
            textTransform: 'none',
            color: 'primary.main',
            '&:hover': {
              backgroundColor: 'action.hover'
            }
          }}
          startIcon={<TaskOutlinedIcon sx={{ width: "24px" }} />}
        >
          <Typography sx={{
            fontSize: "14px",
            fontWeight: "500",
            ml: 1,
            textAlign: 'left'
          }}>
            Request
          </Typography>
        </Button>

        <Button
          fullWidth
          onClick={() => navigate('/admin/complaints')}
          sx={{
            justifyContent: 'flex-start',
            height: "40px",
            marginBottom: "10px",
            textTransform: 'none',
            color: 'primary.main',
            '&:hover': {
              backgroundColor: 'action.hover'
            }
          }}
          startIcon={<ReceiptLongOutlinedIcon sx={{ width: "24px" }} />}
        >
          <Typography sx={{
            fontSize: "14px",
            fontWeight: "500",
            ml: 1,
            textAlign: 'left'
          }}>
            Complaints
          </Typography>
        </Button>

        {/* Dropdown Button */}
        <Button
          fullWidth
          id="users-button"
          aria-controls={open ? 'users-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleUsersClick}
          sx={{
            justifyContent: 'space-between',
            height: "40px",
            marginBottom: "10px",
            textTransform: 'none',
            color: 'primary.main',
            '&:hover': {
              backgroundColor: 'action.hover'
            }
          }}
          startIcon={<PersonOutlineOutlinedIcon sx={{ width: "24px" }} />}
          endIcon={<ArrowDropDownIcon />}
        >
          <Typography sx={{
            fontSize: "14px",
            fontWeight: "500",
            ml: 1,
            textAlign: 'left',
            flexGrow: 1
          }}>
            Users
          </Typography>
        </Button>

        <Menu
          id="users-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{ 'aria-labelledby': 'users-button' }}
          PaperProps={{
            style: {
              width: '200px',
              marginLeft: '16px',
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)'
            }
          }}
        >
          <MenuItem onClick={() => handleMenuItemClick('/admin/viewusers')}>
            <Typography sx={{ fontSize: "14px", fontWeight: "500" }}>View Users</Typography>
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('/admin/bussinessowners')}>
            <Typography sx={{ fontSize: "14px", fontWeight: "500" }}>Business Owners</Typography>
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('/admin/organizations')}>
            <Typography sx={{ fontSize: "14px", fontWeight: "500" }}>Community Organizer</Typography>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default AdminSidebar;
