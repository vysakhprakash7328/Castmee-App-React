import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { useMediaQuery } from '@react-hook/media-query';
import { FaHome, FaBloggerB, FaCompass, FaBell, FaUser, FaBars } from 'react-icons/fa';

const Card = styled.div`
  top: 10%;
  left: 0;
  width: ${props => (props.expanded ? '250px' : '70px')};
  height: 90vh;
  background-color: #282828;
  border-radius: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: width 0.3s ease;
  position: fixed;
  z-index: 10;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const ToggleButton = styled.button`
  background-color: #282828;
  border: none;
  color: #ecf0f1;
  font-size: 24px;
  cursor: pointer;
  padding: 12px;
  border-radius: 12px;
  position: absolute;
  top: 20px;
  left: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2c3e50;
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

const MenuItem = styled.div`
  color: #ecf0f1;
  font-size: ${props => (props.expanded ? '18px' : '16px')};
  font-family: 'Source Sans Pro', sans-serif;
  line-height: 24px;
  cursor: pointer;
  margin-top: ${props => (props.expanded ? '20px' : '16px')};
  display: flex;
  align-items: center;
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  box-sizing: border-box;
  transition: background-color 0.3s ease, padding-left 0.3s ease;

  ${props => props.active && css`
    background-color: #34495e;
    padding-left: ${props.expanded ? '20px' : '16px'};
  `}

  &:hover {
    background-color: #2c3e50;
  }

  @media (max-width: 768px) {
    width: ${props => (props.expanded ? '80px' : '60px')};
    padding-left: 0;
    font-size: ${props => (props.expanded ? '16px' : '14px')};
  }
`;

const Icon = styled.div`
  margin-right: ${props => (props.expanded ? '16px' : '0')};
  display: flex;
  align-items: center;
`;

const Menu = styled.div`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const BottomNavigation = styled.div`
  background-color: #2c3e50;
  justify-content: space-around;
  align-items: center;
  height: 60px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 10;
  display: none;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const CastingProducerSidebar = ({ onSidebarToggle, onPageChange }) => {
  const [activeNavItem, setActiveNavItem] = useState('Home');
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const handleItemClick = (itemName) => {
    setActiveNavItem(itemName);
    if (onPageChange) {
      onPageChange(itemName);
    }
  };

  const toggleSidebar = () => {
    const newState = !sidebarExpanded;
    setSidebarExpanded(newState);
    if (onSidebarToggle) {
      onSidebarToggle(newState);
    }
  };

  return (
    <>
      <Card expanded={sidebarExpanded}>
        <ToggleButton onClick={toggleSidebar}>
          <FaBars />
        </ToggleButton>
        <Menu>
          <MenuItem
            active={activeNavItem === 'Home'}
            expanded={sidebarExpanded}
            onClick={() => handleItemClick('Home')}
          >
            <Icon expanded={sidebarExpanded}><FaHome /></Icon>
            {sidebarExpanded && 'Home'}
          </MenuItem>
          <MenuItem
            active={activeNavItem === 'Blogs'}
            expanded={sidebarExpanded}
            onClick={() => handleItemClick('Blogs')}
          >
            <Icon expanded={sidebarExpanded}><FaBloggerB /></Icon>
            {sidebarExpanded && 'Blogs'}
          </MenuItem>
          <MenuItem
            active={activeNavItem === 'Explore'}
            expanded={sidebarExpanded}
            onClick={() => handleItemClick('Explore')}
          >
            <Icon expanded={sidebarExpanded}><FaCompass /></Icon>
            {sidebarExpanded && 'Explore'}
          </MenuItem>
          <MenuItem
            active={activeNavItem === 'Notification'}
            expanded={sidebarExpanded}
            onClick={() => handleItemClick('Notification')}
          >
            <Icon expanded={sidebarExpanded}><FaBell /></Icon>
            {sidebarExpanded && 'Notification'}
          </MenuItem>
          <MenuItem
            active={activeNavItem === 'Profile'}
            expanded={sidebarExpanded}
            onClick={() => handleItemClick('Profile')}
          >
            <Icon expanded={sidebarExpanded}><FaUser /></Icon>
            {sidebarExpanded && 'Profile'}
          </MenuItem>
          <MenuItem
            active={activeNavItem === 'Wishlist'}
            expanded={sidebarExpanded}
            onClick={() => handleItemClick('Wishlist')}
          >
            <Icon expanded={sidebarExpanded}><FaUser /></Icon>
            {sidebarExpanded && 'Wishlist'}
          </MenuItem>
        </Menu>
      </Card>

      {isMobile && (
        <BottomNavigation>
          <MenuItem
            active={activeNavItem === 'Home'}
            onClick={() => handleItemClick('Home')}
          >
            <Icon><FaHome /></Icon>
          </MenuItem>
          <MenuItem
            active={activeNavItem === 'Blogs'}
            onClick={() => handleItemClick('Blogs')}
          >
            <Icon><FaBloggerB /></Icon>
          </MenuItem>
          <MenuItem
            active={activeNavItem === 'Explore'}
            onClick={() => handleItemClick('Explore')}
          >
            <Icon><FaCompass /></Icon>
          </MenuItem>
          <MenuItem
            active={activeNavItem === 'Notification'}
            onClick={() => handleItemClick('Notification')}
          >
            <Icon><FaBell /></Icon>
          </MenuItem>
          <MenuItem
            active={activeNavItem === 'Profile'}
            onClick={() => handleItemClick('Profile')}
          >
            <Icon><FaUser /></Icon>
          </MenuItem>
          <MenuItem
            active={activeNavItem === 'Wishlist'}
            onClick={() => handleItemClick('Wishlist')}
          >
            <Icon><FaUser /></Icon>
          </MenuItem>
        </BottomNavigation>
      )}
    </>
  );
};

export default CastingProducerSidebar;
