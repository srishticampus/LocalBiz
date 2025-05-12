import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import arrow from "../../assets/arrow.png";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Avatar, Box, Breadcrumbs, Button, Container, Fade, Modal, Stack, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import PhoneEnabledOutlinedIcon from '@mui/icons-material/PhoneEnabledOutlined';
import { toast } from 'react-toastify';
import CloseIcon from '@mui/icons-material/Close';
import Backdrop from '@mui/material/Backdrop';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { baseUrl } from '../../baseUrl';

const CustomerProfile = () => {
    
    
    const styleLogout = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        // border: '2px solid #000',
        borderRadius: "10px",
        boxShadow: 24,
        p: 4,
    };
    
    
    const [customerDetails, setCustomerDetails] = useState({});

    useEffect( () => {
        const customerDetails = localStorage.getItem("customerDetails");
        if (customerDetails) {
            setCustomerDetails(JSON.parse(customerDetails));

        }
   
    }, []);

    // loging out and not returing to profile page
    useEffect(() => {
        if (localStorage.getItem("customerDetails") == null) {
          navigate("/");
        }
      });

    
    
    
    const handleSubmit = async (e) => {
        const isValid = validation();
        if (!isValid) {
            return;
        }
        e.preventDefault();
        // console.log(data)
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('address', data.address);
        formData.append('phone', data.phone);
        formData.append('profilePic', data.profilePic);

        console.log(data);
        const token = localStorage.getItem("token");
        const updated = await axios.post(`${baseUrl}customer/editcustomer/${customerDetails._id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(updated);
        setData({
            name: "",
            address: "",
            email: "",
            phone: ""
        })
        if (updated.data.message === "Parent updated successfully.") {
        
            toast.success("Parent updated successfully.")
            

            const token = localStorage.getItem("token");
    const parentDetails = JSON.parse(localStorage.getItem("parentdetails"));
    const res = await axios.get(`${baseUrl}ldss/parent/getparent/${parentDetails._id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    localStorage.setItem("parentdetails", JSON.stringify(res.data.parent));
    setParentDetails(res.data.parent);

    // Close the modal
    setEditOpen(false);

        }
        else {
            
            toast.error("Error in updating parent profile")
        }


    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [editOpen, setEditOpen] = React.useState(false);
    const handleEditOpen = () => {
        setData({
            name: parentDetails.name || "",
            email: parentDetails.email || "",
            address: parentDetails.address || "",
            phone: parentDetails.phone || "",
            profilePic: null, // leave this null so user can choose a new one
        });
        setImagePreview(parentDetails?.profilePic?.filename 
            ? `${baseUrl}uploads/${parentDetails.profilePic.filename}` 
            : null);
        setEditOpen(true);
    }
    const handleEditClose = () => setEditOpen(false);

    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('parentdetails');
        // window.location.reload();
        navigate('/parent/login');
        toast.success("you logged out");

    }
  return (
    <>
      
     
    </>
  )
}

export default CustomerProfile
