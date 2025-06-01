"use client"
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material"
import {
  Send as SendIcon,
} from "@mui/icons-material"
import CustomerNavbar from "../Navbar/CustomerNavbar"
import Footer from "../Footer/Footer"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios';
import { toast } from 'react-toastify';
import { baseUrl } from '../../baseUrl';

export default function MsgComplaint() {
  const navigate = useNavigate();
  const [complaintDescription, setComplaintDescription] = useState('');
  const [customerDetails, setCustomerDetails] = useState(null);

  useEffect(() => {
    const storedCustomerDetails = localStorage.getItem("customerDetails");
    if (storedCustomerDetails) {
      setCustomerDetails(JSON.parse(storedCustomerDetails));
    } else {
      navigate("/customer/login"); // Redirect to login if not logged in
    }
  }, [navigate]);

  const handleComplaintChange = (event) => {
    setComplaintDescription(event.target.value);
  };

  const handleSubmitComplaint = async () => {
    if (!complaintDescription.trim()) {
      toast.error("Complaint description cannot be empty.");
      return;
    }

    if (!customerDetails || !customerDetails._id) {
      toast.error("Customer details not found. Please log in again.");
      navigate("/customer/login");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${baseUrl}api/complaints`, {
        consumer: customerDetails._id,
        description: complaintDescription,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.message === "Complaint submitted successfully") {
        toast.success("Complaint submitted successfully!");
        setComplaintDescription(''); // Clear the textarea
      } else {
        toast.error("Failed to submit complaint.");
      }
    } catch (error) {
      console.error("Error submitting complaint:", error);
      toast.error("Error submitting complaint.");
      if (error.response && error.response.status === 401) {
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem('token');
        localStorage.removeItem('customerDetails');
        navigate("/customer/login");
      }
    }
  };

  return (
    <div>
      <CustomerNavbar />

      <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
        {/* Main Content */}
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Grid container spacing={4} justifyContent="center">
            {/* Complaints Section - Left Side */}
            <Grid item xs={12} md={6}>
              <Card elevation={0} sx={{
                height: "100%",
                border: "1px solid #e0e0e0",
                borderRadius: "12px",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
                width: { xs: '100%', sm: '400px' }
              }}>
                <CardHeader
                  title="Submit a Complaint"
                  titleTypographyProps={{
                    variant: "h6",
                    fontWeight: "medium",
                    color: "primary.main"
                  }}
                  sx={{
                    borderBottom: "1px solid #f0f0f0",
                    bgcolor: "#fafafa"
                  }}
                />
                <CardContent sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                      Complaint Description
                    </Typography>
                    <TextField
                      multiline
                      rows={8}
                      fullWidth
                      variant="outlined"
                      placeholder="Describe your complaint in detail..."
                      value={complaintDescription}
                      onChange={handleComplaintChange}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          "& fieldset": {
                            borderColor: "#e0e0e0",
                          },
                          "&:hover fieldset": {
                            borderColor: "#9c27b0",
                          },
                        },
                        "& .MuiInputBase-input": {
                          fontSize: "0.875rem"
                        }
                      }}
                    />
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
                    <Button
                      variant="contained"
                      onClick={handleSubmitComplaint}
                      sx={{
                        px: 4,
                        bgcolor: "#9c27b0",
                        "&:hover": { bgcolor: "#7b1fa2" },
                        borderRadius: "8px",
                        textTransform: "none",
                        fontWeight: "500"
                      }}
                    >
                      Submit Complaint
                    </Button>
                  </Box>
                  <Box sx={{ pt: 2 }}>
                    <Link to='/customer/Viewcompaints'>
                      <Button
                        variant="outlined"
                        sx={{
                          color: "#9c27b0",
                          borderColor: "#9c27b0",
                          "&:hover": {
                            borderColor: "#7b1fa2",
                            bgcolor: "rgba(156, 39, 176, 0.04)"
                          },
                          borderRadius: "8px",
                          textTransform: "none",
                          width: "100%"
                        }}
                      >
                        View Complaints
                      </Button>
                    </Link>

                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Chats Section - Right Side (Removed as per task, but keeping for now if needed later) */}
            {/* <Grid item xs={12} md={6}>
              <Card elevation={0} sx={{
                height: "100%",
                border: "1px solid #e0e0e0",
                borderRadius: "12px",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
                width: { xs: '100%', sm: '600px' },
                marginLeft: { xs: '0', sm: '100px' }
              }}>
                <CardHeader
                  title="Chats"
                  titleTypographyProps={{
                    variant: "h6",
                    fontWeight: "medium",
                    color: "primary.main"
                  }}
                  sx={{
                    borderBottom: "1px solid #f0f0f0",
                    bgcolor: "#fafafa"
                  }}
                />
                <CardContent sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <Box sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 1.5,
                    p: 2,
                    bgcolor: "#f9f5ff",
                    borderRadius: "8px",
                    border: "1px solid #f0ebfa"
                  }}>
                    <Avatar sx={{
                      width: 40,
                      height: 40,
                      bgcolor: "#9c27b0"
                    }}>A</Avatar>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: "medium", color: "#9c27b0" }}>
                        Ashika A S
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        "Sure, I'll send it over shortly"
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5 }}>
                        10:30 AM
                      </Typography>
                    </Box>
                  </Box>

                  <Paper
                    variant="outlined"
                    sx={{
                      height: 300,
                      p: 2,
                      borderRadius: "8px",
                      borderColor: "#e0e0e0",
                      bgcolor: "#fcfcfc",
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      overflowY: "auto"
                    }}
                  >
                    <Box sx={{
                      alignSelf: "flex-start",
                      maxWidth: "70%",
                      bgcolor: "#f5f5f5",
                      p: 1.5,
                      borderRadius: "8px 8px 8px 0",
                    }}>
                      <Typography variant="body2">Hello, how can I help you today?</Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ display: "block", textAlign: "right" }}>
                        10:28 AM
                      </Typography>
                    </Box>

                    <Box sx={{
                      alignSelf: "flex-end",
                      maxWidth: "70%",
                      bgcolor: "#9c27b0",
                      p: 1.5,
                      borderRadius: "8px 8px 0 8px",
                      color: "white"
                    }}>
                      <Typography variant="body2">I have an issue with my recent order</Typography>
                      <Typography variant="caption" sx={{
                        display: "block",
                        textAlign: "right",
                        color: "rgba(255, 255, 255, 0.7)"
                      }}>
                        10:29 AM
                      </Typography>
                    </Box>
                  </Paper>

                  <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                    <TextField
                      fullWidth
                      placeholder="Type your message here..."
                      variant="outlined"
                      size="small"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px",
                          "& fieldset": {
                            borderColor: "#e0e0e0",
                          },
                          "&:hover fieldset": {
                            borderColor: "#9c27b0",
                          },
                        },
                        "& .MuiInputBase-input": {
                          fontSize: "0.875rem"
                        }
                      }}
                    />
                    <IconButton
                      sx={{
                        bgcolor: "#9c27b0",
                        color: "white",
                        "&:hover": { bgcolor: "#7b1fa2" },
                        borderRadius: "8px",
                        height: "40px",
                        width: "40px"
                      }}
                    >
                      <SendIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid> */}
          </Grid>
        </Container>

      </Box>
      <Footer />
    </div>

  )
}