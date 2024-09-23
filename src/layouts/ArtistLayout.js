import React, { useState, useEffect } from "react";
import { useLocation, Route, Switch } from "react-router-dom";
import { Modal, Box } from "@mui/material"; // Import Modal component from Material-UI
import ArtistNavbar from "components/Navbars/ArtistNavbar";
import Sidebar from "components/Sidebar/Sidebar";
import route_artist from "route_artist.js";
import { BottomNavigationAction, Popover, Button } from "@mui/material";

import sidebarImage from "assets/img/sidebar-3.jpg";
import BottomNavigation from "@mui/material/BottomNavigation";
import castmeehome from "../assets/img/castmee.png";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import apiEndpoint from "views/Services/ApiConfig";
import getNewAccessToken from "views/Services/getRefreshToken";
import axios from "axios";



function Artist() {
  const [image, setImage] = useState(sidebarImage);
  const [color, setColor] = useState("black");
  const [hasImage, setHasImage] = useState(true);
  const [value, setValue] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  

  const location = useLocation();
  const mainPanel = React.useRef(null);
  const getRoutes = (route_artist) => {
    return route_artist.map((prop, key) => {
      if (prop.layout === "/artist") {
        return (
          <Route
            path={prop.layout + prop.path}
            render={(props) => <prop.component {...props} />}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  const [notifications, setNotifications] = useState([]);
  const [producerRequests, setProducerRequests] = useState([]);

  useEffect(() => {
    // Function to fetch notifications from the API
    const fetchNotifications = async () => {
      const user_data_str = localStorage.getItem('user_details');
      const user_data = JSON.parse(user_data_str);
      const apiUrl = apiEndpoint + '/api/get_notifications/';

      const refreshToken = user_data.data.refresh;

      getNewAccessToken(refreshToken)
        .then((accessToken) => {
          axios.get(apiUrl, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          })
            .then(response => {
              console.log(response.data);
              setNotifications(response.data.detail);
            })
            .catch(error => {
              console.error('Error fetching data:', error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const fetchProducerRequest = async () => {
      const user_data_str = localStorage.getItem('user_details');
      const user_data = JSON.parse(user_data_str);
      const apiUrl = apiEndpoint + '/api/get_producer_request/';
      

      const refreshToken = user_data.data.refresh;

      getNewAccessToken(refreshToken)
        .then((accessToken) => {
          axios.get(apiUrl, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          })
            .then(response => {
              console.log(response.data);
              setProducerRequests(response.data.detail);
            })
            .catch(error => {
              console.error('Error fetching data:', error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    };

    // Fetch notifications initially
    fetchNotifications();
    fetchProducerRequest();

    // Fetch notifications periodically (every 30 seconds in this example)
    const noti_interval = setInterval(fetchNotifications, 30000);
    const interval = setInterval(fetchProducerRequest, 30000);

    // Clean up interval on component unmount
    return () => clearInterval(interval, noti_interval);
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "bottom-notification-popover" : undefined;

  // Example notifications data
  // const notifications = [
  //   { id: 1, message: "Notification 1" },
  //   { id: 2, message: "Notification 2" },
  //   { id: 3, message: "Notification 3" },
  // ];


  const isMobileScreen = window.innerWidth < 993;

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const profileIncomplete = true; // Example condition, replace with your logic
  //     if (profileIncomplete) {
  //       setOpenModal(true);
  //     }
  //   }, 60000); // 60000 milliseconds = 1 minute

  //   return () => clearInterval(interval); // Clean up interval on component unmount
  // }, []); // Empty dependency array to run effect only once on component mount
  const handleApproveRequest = async (id) => {
    const user_data_str = localStorage.getItem('user_details');
    const user_data = JSON.parse(user_data_str);
    const apiUrl = apiEndpoint + '/api/approve_producer_request/';
  
    const refreshToken = user_data.data.refresh;
  
    getNewAccessToken(refreshToken)
      .then((accessToken) => {
        axios.put(apiUrl, {
          request_contact_id: id,
          phone_view_status: "approved"
        }, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
          .then(response => {
            console.log(response.data);
            setProducerRequests(prevRequests => prevRequests.filter(request => request.id !== id));

          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="wrapper">
        {!isMobileScreen && (
          <Sidebar color={color} image={hasImage ? image : ""} routes={route_artist} />
        )}
        <div className="main-panel" ref={mainPanel}>
          <ArtistNavbar />
          <div className="content">
            <Switch>{getRoutes(route_artist)}</Switch>
          </div>
        </div>
        {isMobileScreen && (
          <Box
            sx={{
              width: "100%",
              position: "fixed",
              bottom: 0,
              zIndex: 1,
            }}
          >
            <BottomNavigation
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              showLabels
              style={{ backgroundImage: 'linear-gradient(to bottom, #ebe9e4, #e0d4b6)' }}
            >
              <BottomNavigationAction
                href="/artist/table"
                label="Blogs"
                icon={<BorderColorOutlinedIcon />}
              />
              <BottomNavigationAction
                label="Notifications"
                icon={
                  <Badge badgeContent={notifications.length} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                }
                onClick={handleClick}
              />
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <List sx={{ width: 300 }}>
                  {notifications.length === 0 ? (
                    <ListItem>
                      <ListItemText primary="No notifications" />
                    </ListItem>
                  ) : (
                    <>
                      {notifications.map((notification, index) => (
                        <ListItem key={index}>
                          <ListItemText primary={notification} />
                        </ListItem>
                      ))}
                      {producerRequests.map((request, index) => (
                        <div key={index}>
                          <ListItem>
                            {request.producer} requested your Phone number
                            <Button variant="success" onClick={() => handleApproveRequest(request.id)}>Approve</Button>
                            <Button variant="danger" onClick={() => handleRejectRequest(request)}>Reject</Button>
                          </ListItem>
                        </div>
                      ))}
                    </>
                  )}
                </List>

              </Popover>
              <BottomNavigationAction
                href="/artist/user"
                icon={<img src={castmeehome} alt="Home" style={{ width: "60px", height: "60px" }} />}
              />
              <BottomNavigationAction
                href="/artist/tablelist"
                label="Advertisments"
                icon={<AssignmentOutlinedIcon />}
              />
              <BottomNavigationAction
                href="/artist/artistprofile"
                label="Profile"
                icon={<AccountCircleOutlinedIcon />}
              />
            </BottomNavigation>
          </Box>
        )}



        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
            }}
          >
            <h2 id="modal-modal-title">Complete Your Profile</h2>
            <p id="modal-modal-description">Please complete your profile to access all features.</p>
            <Button onClick={() => setOpenModal(false)}>Close</Button>
          </Box>
        </Modal>
      </div>
    </>
  );
}

export default Artist;
