import React, { useState } from 'react';
import castmeelogo from '../../assets/img/castmeehead.png';
import artistEditProfile from '../../views/ArtistPages/ArtistEditProfile';
import Logout from 'views/LandingPage/Logout';
import logout from 'views/Logout';

const styles = {
  Header: {
    top: '0px',
    left: '0px',
    width: '100%',
    height: '10vh',
    backgroundColor: '#282828',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: '20px',
    paddingLeft: '20px',
    boxSizing: 'border-box',
    position: 'relative', // Make sure the dropdown menu is positioned relative to the header
  },
  Logo: {
    width: '10px',
    marginLeft: '50px',
  },
  ImageContainer: {
    width: '40px',
    height: '40px',
    borderRadius: '24px',
    backgroundImage: 'url(./image.png)',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    cursor: 'pointer', // Indicate that the profile image is clickable
  },
  Text: {
    color: '#ffffff',
    fontSize: '16px',
    fontFamily: 'Source Sans Pro',
    lineHeight: '21px',
  },
  Dropdown: {
    position: 'absolute',
    top: '50px', // Adjust to position dropdown below the profile image
    right: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '4px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    zIndex: 1000, // Ensure dropdown appears above other content
    display: 'flex',
    flexDirection: 'column',
  },
  DropdownItem: {
    padding: '10px 20px',
    cursor: 'pointer',
    color: '#282828',
  },
  DropdownItemHover: {
    backgroundColor: '#f0f0f0',
  }
};

const defaultProps = {
  image: 'https://app.uizard.io/placeholders/avatars/avatar-15.png',
};

const ArtistHeader = ({setActivePageHeader}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div style={styles.Header}>
      <div style={styles.Logo}>
        <img width={'200px'} src={castmeelogo} alt='castmee' />
      </div>

      <div
        style={{
          ...styles.ImageContainer,
          backgroundImage: `url(${defaultProps.image})`,
        }}
        onClick={toggleDropdown} // Toggle dropdown on click
      />

      {isDropdownOpen && (
        <div style={styles.Dropdown}>
          <div
            style={styles.DropdownItem}
            onClick={() => setActivePageHeader('settings')} // Use function syntax
          >
            Settings
          </div>
          <div
            style={styles.DropdownItem}
            onClick={() => setActivePageHeader('editprofile')} // Use function syntax
          >
            Edit Profile
          </div>
          <div
            style={styles.DropdownItem}
            onClick={() => logout()} // Handle logout click
          >
            Logout
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtistHeader;
