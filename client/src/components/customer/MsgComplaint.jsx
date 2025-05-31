"use client"
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Stack,
  TextField,
  Toolbar,
  Typography,
  alpha,
  styled,
} from "@mui/material"
import {
  Search as SearchIcon,
  Message as MessageIcon,
  Notifications as NotificationsIcon,
  Send as SendIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material"
import CustomerNavbar from "../Navbar/CustomerNavbar"
import Footer from "../Footer/Footer"
import { Link } from "react-router-dom"
// Custom styled components
// const SearchBar = styled("div")(({ theme }) => ({
//   position: "relative",
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   "&:hover": {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginRight: theme.spacing(2),
//   marginLeft: 0,
//   width: "100%",
//   [theme.breakpoints.up("sm")]: {
//     marginLeft: theme.spacing(3),
//     width: "auto",
//   },
//   border: "1px solid #e0e0e0",
// }))

// const SearchIconWrapper = styled("div")(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: "100%",
//   position: "absolute",
//   pointerEvents: "none",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   color: "#9e9e9e",
// }))

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: "inherit",
//   "& .MuiInputBase-input": {
//     padding: theme.spacing(1, 1, 1, 0),
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create("width"),
//     width: "100%",
//     [theme.breakpoints.up("md")]: {
//       width: "20ch",
//     },
//   },
// }))

// const Logo = () => (
//   <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//     <Box sx={{ display: "flex", gap: 0.5 }}>
//       <Box sx={{ width: 12, height: 12, bgcolor: "primary.main", borderRadius: 0.5 }} />
//       <Box sx={{ width: 12, height: 12, bgcolor: "success.main", borderRadius: 0.5 }} />
//       <Box sx={{ width: 12, height: 12, bgcolor: "error.main", borderRadius: 0.5 }} />
//       <Box sx={{ width: 12, height: 12, bgcolor: "warning.main", borderRadius: 0.5 }} />
//     </Box>
//     <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
//       LOCAL BIZ
//     </Typography>
//   </Box>
// )

export default function LocalBizDashboard() {
  return (
    <div>
      <CustomerNavbar/>

    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {/* Complaints Section - Left Side */}
          <Grid item xs={12} md={6}>
            <Card elevation={0} sx={{ 
              height: "100%", 
              border: "1px solid #e0e0e0",
              borderRadius: "12px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
              width:"400px"
            }}>
              <CardHeader 
                title="Complaints" 
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

          {/* Chats Section - Right Side */}
          <Grid item xs={12} md={6}>
            <Card elevation={0} sx={{ 
              height: "100%",
              border: "1px solid #e0e0e0",
              borderRadius: "12px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
              width:"600px",
              marginLeft:"100px"
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
                {/* Chat Message Preview */}
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

                {/* Chat Area */}
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
                  {/* Sample incoming message */}
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
                  
                  {/* Sample outgoing message */}
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

                {/* Message Input */}
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
          </Grid>
        </Grid>
      </Container>

    </Box>
    <Footer/>
        </div>

  )
}