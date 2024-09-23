
import React, { Component, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navbar, Container, Nav, Dropdown, Button } from "react-bootstrap";
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import routes from "route_producer.js";
import logout from "views/Logout";
import apiEndpoint from "views/Services/ApiConfig";
import getNewAccessToken from "views/Services/getRefreshToken";
import axios from 'axios';

function Header() {
  const location = useLocation();
  const [value, setValue] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

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

  const checkIsMobile = () => {
    setIsMobile(window.innerWidth < 768); // Adjust the threshold as needed
  };

  useEffect(() => {
    // Function to check if the screen is mobile
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // Adjust the threshold as needed
    };

    // Check on component mount and when window is resized
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);
  const mobileSidebarToggle = (e) => {
    e.preventDefault();
    document.documentElement.classList.toggle("nav-open");
    var node = document.createElement("div");
    node.id = "bodyClick";
    node.onclick = function () {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle("nav-open");
    };
    document.body.appendChild(node);
  };
  const handleDragStart = (e) => {
    // Logic for drag start
  };

  const handleDrag = (e) => {
    // Logic for drag
    // Check if the content is dragged into the top part of the screen
    // If it is, prevent dragging the Box element
    if (e.clientY <= 100) { // Adjust the threshold as needed
      e.preventDefault();
    }
  };
  const getBrandText = () => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Castmee";
  };

  const handleLogout = (event) => {
    event.preventDefault();
    logout();
  };

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
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <div className="d-flex justify-content-center align-items-center ml-2 ml-lg-0">

          <Navbar.Brand
            href="#home"
            onClick={(e) => e.preventDefault()}
            className="mr-2"
          >
            {getBrandText()}
          </Navbar.Brand>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-2">
          <span className="navbar-toggler-bar burger-lines"></span>
          <span className="navbar-toggler-bar burger-lines"></span>
          <span className="navbar-toggler-bar burger-lines"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav mr-auto" navbar>
           
            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle
                as={Nav.Link}
                data-toggle="dropdown"
                id="dropdown-notifications"
                variant="default"
                className="m-0"
              >
                <i className="nc-icon nc-email-85"></i>
                <span className="notification">
                  {notifications.length > 0 || producerRequests.length > 0 ? notifications.length + producerRequests.length : 0}
                </span>
                <span className="d-lg-none ml-1">Notification</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {notifications.length === 0 && producerRequests.length === 0 ? (
                  <Dropdown.Item>No notifications or producer requests found</Dropdown.Item>
                ) : (
                  <>
                    {notifications.map((notification, index) => (
                      <Dropdown.Item key={index} href="#pablo" onClick={(e) => e.preventDefault()}>
                        {notification}
                      </Dropdown.Item>
                    ))}
                    {producerRequests.map((request, index) => (
                      <div key={index}>
                        <Dropdown.Item href="#pablo" onClick={(e) => e.preventDefault()}>
                        {request.producer} requested your Phone number
                        <Button variant="success" onClick={() => handleApproveRequest(request.id)}>Approve</Button>
                        <Button variant="danger" onClick={() => handleRejectRequest(request)}>Reject</Button>
                        </Dropdown.Item>
                        
                      </div>
                    ))}

                  </>
                )}
              </Dropdown.Menu>
            </Dropdown>

            <Nav.Item>
              <Nav.Link
                className="m-0"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <i className="nc-icon nc-zoom-split"></i>
                <span className="d-lg-block"> Search</span>
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Nav className="ml-auto" navbar>
            <Nav.Item>
              <Nav.Link
                className="m-0"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="no-icon">Account</span>
              </Nav.Link>
            </Nav.Item>
           
            <Nav.Item>
              <Nav.Link
                className="m-0"
                href="#pablo"
                onClick={handleLogout}
              >
                <span className="no-icon">Log out</span>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>

    </Navbar>
  );
}

export default Header;
