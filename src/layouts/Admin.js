import React, { Component, useState } from "react";
import { useLocation, Route, Switch } from "react-router-dom";

import AdminNavbar from "components/Navbars/AdminNavbar";
import Sidebar from "components/Sidebar/Sidebar";

import routes from "route_producer.js";

import sidebarImage from "assets/img/sidebar-3.jpg";
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import castmeehome from '../assets/img/castmee.png';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';

function Admin() {
  const [image, setImage] = React.useState(sidebarImage);
  const [color, setColor] = React.useState("black");
  const [hasImage, setHasImage] = React.useState(true);
  const location = useLocation();
  const mainPanel = React.useRef(null);
  const [value, setValue] = useState(0);



  // Check if the screen width is less than 993 pixels
  const isMobileScreen = window.innerWidth < 993;

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
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

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainPanel.current.scrollTop = 0;
    if (
      isMobileScreen &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.remove("nav-open");
      var element = document.getElementById("bodyClick");
      element.parentNode.removeChild(element);
    }
  }, [location]);

  return (
    <>
      <div className="wrapper">
        {/* Only render Sidebar if it's not a mobile screen */}
        {!isMobileScreen && (
          <Sidebar color={color} image={hasImage ? image : ""} routes={routes} />
        )}
        <div className="main-panel" ref={mainPanel}>
          <AdminNavbar />
          <div className="content">
            <Switch>{getRoutes(routes)}</Switch>
          </div>
        </div>
        {isMobileScreen && (
          <Box
            sx={{ width: '100%', position: 'fixed', bottom: 0, zIndex: 1
          }}

          >
            <BottomNavigation
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              showLabels

              style={{ backgroundImage: 'linear-gradient(to bottom, #9e9560, #9e5b08)' }}
            >
              <BottomNavigationAction href="/admin/table" label="Blog" icon={<BorderColorOutlinedIcon />} />
              <BottomNavigationAction href="/admin/notifications" label="Notification" icon={<EmailOutlinedIcon />} />
              <BottomNavigationAction href="/admin/ProductionHouseHome"
                icon={<img src={castmeehome} alt="Home" style={{ width: '60px', height: '60px' }} />}
              />
              <BottomNavigationAction href="/admin/typography" label="Advertisments" icon={<AssignmentOutlinedIcon />} />
              <BottomNavigationAction href="/admin/WishList" label="Wishlist" icon={<AccountCircleOutlinedIcon />} />
            </BottomNavigation>
          </Box>
        )}
      </div>
    </>
  );
}

export default Admin;
