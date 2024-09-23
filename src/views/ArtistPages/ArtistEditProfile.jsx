import React,{useState,useEffect} from "react";
import styled from "styled-components";
import ArtistHeader from "components/ArtistComponents/ArtistHeader";
import ArtistSidebar from "components/ArtistComponents/ArtistSidebar";
import ProfileScreen from "components/ArtistComponents/ArtistProfile";
import apiEndpoint from "views/Services/ApiConfig";
import UpdateProfile from "components/ArtistComponents/UpdateProfile";

const styles = {
  Screen: {
    backgroundColor: '#161616',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  Content: (sidebarExpanded) => ({
    display: 'flex',
    flex: 1,
    marginLeft: sidebarExpanded ? '250px' : '70px', // Adjust based on sidebar width
    transition: 'margin-left 0.3s ease',
  }),
  Main: {
    flex: 1,
    color: '#ffffff',
    fontSize: '24px',
    overflow: 'none',
  }
};

const defaultProps = {
  image: "https://app.uizard.io/placeholders/avatars/avatar-4.png",
};

export default function ArtistEditProfile() {

  const [userDetails, setUserDetails] = useState([{}]);
  const [profilepercentage, setProfilePercentage] = useState(30);

  useEffect(() => {
    const user_details_str = localStorage.getItem('user_details');

    if (user_details_str) {
      const user_details = JSON.parse(user_details_str);
      setUserDetails(user_details.data.data);
      console.log(user_details.data.data)
      setProfilePercentage(user_details.data.data.profile_percentage);

      const intervalId = setInterval(() => {
        setProfilePercentage(prevPercentage => prevPercentage + 1); 
      }, 60000);

      return () => clearInterval(intervalId);
    }
  }, []);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [activePage, setActivePage] = useState('Home');

  const handleSidebarToggle = (expanded) => {
    setSidebarExpanded(expanded);
  };

  const renderPage = () => {
    switch (activePage) {
      case 'Home':
        return <UpdateProfile />;
      // case 'Blogs':
      //   return <BlogsPage />;
      // case 'Explore':
      //   return <ExplorePage />;
      // case 'Notification':
      //   return <NotificationPage />;
      // case 'Profile':
      //   return <ProfilePage />;
      // case 'Wishlist':
      //   return <WishlistView />;
      default:
        return <ProfileScreen />;
    }
  };
  const image_url = apiEndpoint + userDetails.headshot_image

  return (
    <div style={styles.Screen}>
      <ArtistHeader imageurl={image_url}/>
      <div style={styles.Content(sidebarExpanded)}>
      <ArtistSidebar
      onSidebarToggle={handleSidebarToggle} 
          onPageChange={setActivePage} 
        />
        <div style={styles.Main}>
          {renderPage()}
        </div>
      </div>
    </div>
  );
}


