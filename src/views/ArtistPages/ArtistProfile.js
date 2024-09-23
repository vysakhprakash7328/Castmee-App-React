import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { makeStyles } from '@material-ui/core/styles';
import apiEndpoint from 'views/Services/ApiConfig';
import femaleIcon from '../../assets/img/female icon.png';
import maleIcon from '../../assets/img/male icon.png';
import Modal from '@material-ui/core/Modal'; // Import Modal component
import ArtistProfileView from './ArtistProfileView';
import ArtistUpdateProfile from './ArtistUpdateProfile';


const useStyles = makeStyles({
  profileIconContainer: {
    position: 'relative',
    display: 'inline-block',
  },
  profileIcon: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
    border: '5px solid #CCA524',
  },
  profilePercentage: {
    position: 'absolute',
    bottom: '-20px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#5e5a53',
    color: '#fff',
    borderRadius: '30%',
    padding: '5px 10px',
    zIndex: '1',
    cursor: 'pointer',
  },
  card: {
    maxWidth: '400px',
    marginBottom: '20px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.1)',

  },
  profileInfo: {
    paddingLeft: '30px',
    paddingTop:'20px',
    fontFamily: 'Georgia',
    display:'inline-block',
  },
  completionCard: {
    width: '18rem',
    backgroundColor: 'rgba(0,3, 0, 0.2, 0.2)',
    textAlign: 'center',
    display: 'inline-block',
    justifyContent: 'center',
    borderRadius: '10px',
    height: '3rem',
    marginLeft: '30px',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: 'rgba(0, 3, 0, 0.5)',
      }
    
  },
  completionCardBody: {
    color: 'white',
  },
  modalContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // height: '100vh',
  },
  modalContent: {
    borderRadius: '10px',
    maxHeight: '80vh', // Limit the maximum height of the modal content
    overflowY: 'auto', // Enable vertical scrolling for overflowed content
    backgroundColor:'#ffffff',
    '&::-webkit-scrollbar': {
        display: 'none', // Hide the scrollbar
      },
  },
  modalOpen: {
    transform: 'translateY(0)', // Slide modal up
  },
});

export default function ArtistProfile() {
  const classes = useStyles();
  const [user, setUser] = useState({});
  const [modalOpen, setModalOpen] = useState(false); // State to manage modal visibility
  const [updateProfileStatus,setUpdateProfileStatus] = useState(false);


  useEffect(() => {
    const user_details = localStorage.getItem('user_details');
    const user_parsed = JSON.parse(user_details);
    setUser(user_parsed?.data?.data || {});
  }, []);
  const openModal = () => {
    setModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalOpen(false);
  };

  const updateProfileClick = () => {
    setUpdateProfileStatus(true);
  }


  return (
    <div>
      {updateProfileStatus ? <ArtistUpdateProfile user={user}/>:
      <Card className={classes.card}>
        <Card.Body>
          <div className={classes.profileIconContainer}>
            {user.headshot_image ? (
              <img src={apiEndpoint + user.headshot_image} alt={user.user_name} className={classes.profileIcon} onClick={openModal}/>
            ) : (
              <img src={user.gender === "male" ? maleIcon : femaleIcon} alt={user.gender} className={classes.profileIcon} />
            )}
            <div className={classes.profilePercentage}>{parseInt(user.profile_completion_percentage)}%</div>
          </div>
          <div className={classes.profileInfo}>
            <Card.Title style={{ fontSize: '30px', marginBottom: '5px' }}>@{user.user_name}</Card.Title>
            <Card.Title style={{ fontSize: '15px' }}>{user.first_name} {user.last_name}</Card.Title>
          </div>
          <div style={{ marginTop: '30px', display: 'flex'}}>
            
            <Card className={classes.completionCard}>
              <Card.Body className={classes.completionCardBody}>
                <Card.Title onClick={updateProfileClick}>Complete Profile</Card.Title>
              </Card.Body>
            </Card>
          </div>
        </Card.Body>
      </Card>
}
      <Modal
        open={modalOpen}
        onClose={closeModal}
        className={classes.modalContainer}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className={`${classes.modalContent} ${modalOpen ? classes.modalOpen : ''}`}>
            <ArtistProfileView user_details={user}/>
        </div>
      </Modal>
    </div>
  );
}
