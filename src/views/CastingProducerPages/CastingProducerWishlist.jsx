import React from 'react';
import CastingProducerHeader from 'components/CastingProducerComponents/CastingProducerHeader';
import CastingProducerSidebar from 'components/CastingProducerComponents/CastingProducerSidebar';
import WishlistView from 'components/CastingProducerComponents/WishlistView';
const styles = {
  Screen: {
    backgroundColor: '#161616',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  Content: {
    display: 'flex',
    flex: 1,
  },
  Main: {
    flex: 1,
    color: '#ffffff',
    fontSize: '24px',
    overflow: 'none',
  }
};



export default function CastingProducerWishlist(){
  return (
    <div style={styles.Screen}>
      <CastingProducerHeader />
      <div style={styles.Content}>
        <CastingProducerSidebar />
        <div style={styles.Main}>
            <WishlistView />
          
        </div>
      </div>
    </div>
  );
};
