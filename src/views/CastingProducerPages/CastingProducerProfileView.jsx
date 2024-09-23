import React, { useState } from 'react';
import CastingProducerHeader from 'components/CastingProducerComponents/CastingProducerHeader';
import CastingProducerSidebar from 'components/CastingProducerComponents/CastingProducerSidebar';
import WishlistView from 'components/CastingProducerComponents/WishlistView';
import ProfileViewScreen from 'components/CastingProducerComponents/CastingProducerProfileViewContent';

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

export default function CastingProducerProfileView() {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [activePage, setActivePage] = useState('Home');

  const handleSidebarToggle = (expanded) => {
    setSidebarExpanded(expanded);
  };

  const renderPage = () => {
    switch (activePage) {
      case 'Home':
        return <ProfileViewScreen />;
      // case 'Blogs':
      //   return <BlogsPage />;
      // case 'Explore':
      //   return <ExplorePage />;
      // case 'Notification':
      //   return <NotificationPage />;
      // case 'Profile':
      //   return <ProfilePage />;
      case 'Wishlist':
        return <WishlistView />;
      default:
        return <ProfileViewScreen />;
    }
  };

  return (
    <div style={styles.Screen}>
      <CastingProducerHeader />
      <div style={styles.Content(sidebarExpanded)}>
        <CastingProducerSidebar 
          onSidebarToggle={handleSidebarToggle} 
          onPageChange={setActivePage} // Pass the setActivePage function to the sidebar
        />
        <div style={styles.Main}>
          {renderPage()}
        </div>
      </div>
    </div>
  );
}
