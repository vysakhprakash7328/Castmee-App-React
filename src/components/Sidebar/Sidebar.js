import React from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import logo from "assets/img/reactlogo.png";
import { makeStyles } from '@material-ui/core/styles';

// Define styles using makeStyles
const useStyles = makeStyles((theme) => ({
  sidebarWrapper: {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100%',
    width: '250px',
    backgroundColor: '#343a40', // Dark background color
    paddingTop: '20px',
    color: '#fff', // Text color
    backdropFilter: 'blur(30px)',
    // backgroundImage: 'linear-gradient(to bottom, #e8ca66, #ffffff)', // Gradient background
    boxShadow: '0px 0px 30px rgba(227,228,237,0.37)',
    border: '2px solid rgba(255,255,255,0.18)',
    },
  logo: {
    padding: '15px 0',
    textAlign: 'center',
    '& img': {
      maxWidth: '80%' // Adjust logo size
    }
  },
  nav: {
    flexDirection: 'column' // Align items vertically
  },
  navLink: {
    padding: '10px 20px', // Adjust padding
    color: '#adb5bd', // Text color
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      color: '#fff' // Text color on hover
    }
  },
  active: {
    backgroundColor: '#495057' // Active item background color
  },
  separator: {
    margin: '10px 0',
    borderBottom: '1px solid #495057' // Separator color
  },
  footer: {
    padding: '20px',
    textAlign: 'center',
    fontSize: '14px'
  },
  icon: {
    marginRight: '10px' // Add space between icon and text
  }
}));

function Sidebar({ routes }) {
  const classes = useStyles();

  const activeRoute = (routeName) => {
    return window.location.pathname.indexOf(routeName) > -1 ? classes.active : "";
  };

  return (
    <div className={classes.sidebarWrapper}>
      <div className={classes.logo}>
        <img width={"170px"} src={require("assets/img/castmeehead.png")} alt="CastMee" />
      </div>
      <Nav className={classes.nav}>
        {routes.map((prop, key) => {
          if (!prop.redirect)
            return (
              <li
                className={
                  prop.upgrade
                    ? `${classes.active} active-pro`
                    : activeRoute(prop.layout + prop.path)
                }
                key={key}
              >
                <NavLink
                  to={prop.layout + prop.path}
                  className={`${classes.navLink}`}
                  activeClassName={classes.active}
                >
                  <i className={`${prop.icon} ${classes.icon}`} />
                  <p>{prop.name}</p>
                </NavLink>
              </li>
            );
          return null;
        })}
      </Nav>
    </div>
  );
}

export default Sidebar;
