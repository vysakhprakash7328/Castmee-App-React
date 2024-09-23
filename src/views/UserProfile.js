import React, { useState, useEffect } from "react";

import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  ProgressBar,
  Tabs,
  Tab
} from "react-bootstrap";

import ArtistBasicDetails from "./ArtistBasicDetails";
import ArtistPersonalDetails from "./ArtistPersonalDetails";
import ArtistProfessionalDetails from "./ArtistProfessionalDetails";
import ArtistSocialMediaDetails from "./ArtistSocialMediaDetails";
import ArtistPreferenceDetails from "./ArtistPreferenceDetails";
import ArtistPhotosAndVideos from "./ArtistPhotosAndVideos";
import ArtistSpecialServices from "./ArtistSpecialServices";
import maleicon from "../assets/img/male icon.png"
import apiEndpoint from "./Services/ApiConfig";
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
const useStyles = makeStyles({
  profileContainer: {
    maxWidth: '600px',
    margin: '0 auto',
  },
  profileDetails: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  profileImage: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    marginRight: '20px',
  },
  profileInfo: {
    flex: '1',
  },
  username: {
    fontSize: '18px',
    color: '#666',
  },
  bio: {
    marginTop: '5px',
    fontSize: '16px',
    color: '#333',
  },
  details: {
    marginTop: '10px',
  },
  detailItem: {
    fontSize: '14px',
    color: '#555',
    fontWeight: 'bold',
    marginRight: '5px',
  },
});

function User() {

  const classes = useStyles();


  const [editprofile, setEditProfile] = React.useState(0);
  const [ProgressPercentage, setProgressPrecentage] = React.useState(25)

  const handleProfileupdatebutton = () => {
    setEditProfile(1);
  }
  const handleChangeDetailsButton = () => {
    setEditProfile(editprofile + 1)
    setProgressPrecentage(ProgressPercentage + 8)
  }
  const handlepreviousDetailsButton = () => {
    setEditProfile(editprofile - 1)
  }
  const getColorVariant = (progress) => {
    if (progress < 30) {
      return 'danger';
    } else if (progress < 60) {
      return 'warning';
    } else {
      return 'success';
    }
  };
  const [userDetails, setUserDetails] = useState([{}]);
  const [profilepercentage, setProfilePercentage] = useState(30);

  useEffect(() => {
    const user_details_str = localStorage.getItem('user_details');

    if (user_details_str) {
      const user_details = JSON.parse(user_details_str);
      setUserDetails([user_details.data.data]);
      console.log(user_details.data.data)

      const fetchProfilePercentage = (userData) => {
        // Fetch profile percentage using userData
        // Example:
        const profilePercentage = userData.profile_percentage;
        setProfilePercentage(profilePercentage)
        // Update the UI or state with the fetched profile percentage
      };


      const intervalId = setInterval(() => {
        fetchProfilePercentage(user_details.data.data);
      }, 60000); // Fetch every 60 seconds (adjust as needed)

      // Clear the interval on component unmount
      return () => clearInterval(intervalId);



    }
  }, []);


  return (
    <>
      {editprofile === 1 ? (

        <Card>
          <Card.Header>
            <Card.Title as="h5">Complete your profile</Card.Title>
          </Card.Header>
          <Card.Body>
            <ProgressBar now={profilepercentage} label={`${profilepercentage}%`} variant={getColorVariant(30)} className="mb-3" />
            <div className="text-center">
              <p className="mb-1">You're almost there!</p>
              <p className="text-muted mb-3">Complete your profile to increase your chances of landing your dream role</p>
              {editprofile === 0 ? (<Button variant="primary" onClick={handleProfileupdatebutton}>Complete Profile</Button>) : null}
            </div>
          </Card.Body>
        </Card>) : null}


      <Container fluid>
        <Row>
          <Col>
            <Card className="card-user">
              <Card.Header>
                <Card.Title as="h5">Profile Progress</Card.Title>
              </Card.Header>
              <Card.Body>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <div className="mb-2" onClick={() => setEditProfile(1)}>
                    <h6 style={{ fontFamily: 'Arial', marginBottom: '0.5rem' }}>Basic Details</h6>
                    <CircularProgressbar
                      value={50}
                      text={`${50}%`}
                      styles={{ root: { width: 100 }, path: { stroke: getColorVariant(50) } }}
                    />
                  </div>
                  <div className="mb-2" onClick={() => setEditProfile(2)}>
                    <h6 style={{ fontFamily: 'Arial', marginBottom: '0.5rem' }}>Personal Details</h6>
                    <CircularProgressbar
                      value={30}
                      text={`${30}%`}
                      styles={{ root: { width: 100 }, path: { stroke: getColorVariant(30) } }}
                    />
                  </div>
                  <div className="mb-2" onClick={() => setEditProfile(3)}>
                    <h6 style={{ fontFamily: 'Arial', marginBottom: '0.5rem' }}>Professional Details</h6>
                    <CircularProgressbar
                      value={70}
                      text={`${70}%`}
                      styles={{ root: { width: 100 }, path: { stroke: getColorVariant(70) } }}
                    />
                  </div>
                  <div className="mb-2" onClick={() => setEditProfile(4)}>
                    <h6 style={{ fontFamily: 'Arial', marginBottom: '0.5rem' }}>Social Media</h6>
                    <CircularProgressbar
                      value={20}
                      text={`${20}%`}
                      styles={{ root: { width: 100 }, path: { stroke: getColorVariant(20) } }}
                    />
                  </div>
                  <div className="mb-2" onClick={() => setEditProfile(5)}>
                    <h6 style={{ fontFamily: 'Arial', marginBottom: '0.5rem' }}>Preference</h6>
                    <CircularProgressbar
                      value={30}
                      text={`${30}%`}
                      styles={{ root: { width: 100 }, path: { stroke: getColorVariant(50) } }}
                    />
                  </div>
                  <div className="mb-2" onClick={() => setEditProfile(6)}>
                    <h6 style={{ fontFamily: 'Arial', marginBottom: '0.5rem' }}>Photos and videos</h6>
                    <CircularProgressbar
                      value={10}
                      text={`${10}%`}
                      styles={{ root: { width: 100 }, path: { stroke: getColorVariant(10) } }}
                    />
                  </div>
                  <div className="mb-2" onClick={() => setEditProfile(7)}>
                    <h6 style={{ fontFamily: 'Arial', marginBottom: '0.5rem' }}>Special Services</h6>
                    <CircularProgressbar
                      value={45}
                      text={`${45}%`}
                      styles={{ root: { width: 100 }, path: { stroke: getColorVariant(45) } }}
                    />
                  </div>
                </div>
                <br /><br /><br />
                <ProgressBar now={30} label={`${30}%`} variant={getColorVariant(30)} className="mb-3" />

              </Card.Body>
            </Card>


          </Col>



          <Col md="12">
            {editprofile === 1 ? (
              <ArtistBasicDetails handleChangeDetails={handleChangeDetailsButton} />
            ) : editprofile === 2 ? (<ArtistPersonalDetails handleChange={handleChangeDetailsButton} handlePrevChange={handlepreviousDetailsButton} />)
              : editprofile === 3 ? (<ArtistProfessionalDetails handleChange={handleChangeDetailsButton} handlePrevChange={handlepreviousDetailsButton} />) :
                editprofile === 4 ? (<ArtistSocialMediaDetails handleChange={handleChangeDetailsButton} handlePrevChange={handlepreviousDetailsButton} />) :
                  editprofile === 5 ? (<ArtistPreferenceDetails handleChange={handleChangeDetailsButton} handlePrevChange={handlepreviousDetailsButton} />) :
                    editprofile === 6 ? (<ArtistPhotosAndVideos handleChange={handleChangeDetailsButton} handlePrevChange={handlepreviousDetailsButton} />) :
                      editprofile === 7 ? (<ArtistSpecialServices handleChange={handleChangeDetailsButton} handlePrevChange={handlepreviousDetailsButton} />) : (
                        <>
                          <Card>
                            <Tabs defaultActiveKey="profileDetails" id="profileTabs">
                              <Tab eventKey="profileDetails" title="Profile Details">
                                <Card.Body>
                                  {userDetails && Object.entries(userDetails).map(([key, value]) => (
                                    <div key={key} className={classes.profileDetails}>
                                      <div className={classes.profileInfo}>
                                        <p className={classes.username}>{value.first_name}</p>
                                        <div className={classes.details}>
                                          <p>
                                            <span className={classes.detailItem}>Location:</span>
                                            {value.current_city}, {value.current_state}
                                          </p>
                                          <p>
                                            <span className={classes.detailItem}>Date of Birth:</span>
                                            {value.date_of_birth}
                                          </p>
                                          <p>
                                            <span className={classes.detailItem}>Email:</span>
                                            {value.email}
                                          </p>
                                          {/* Add more details as needed */}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </Card.Body>
                              </Tab>
                              <Tab eventKey="profileSettings" title="Profile Settings">
                                <Card.Body>
                                  {/* Profile Settings Form */}
                                  <Form>
                                    <Form.Group controlId="formEnableNotifications">
                                      <Form.Check type="checkbox" label="Enable Site Notifications" />
                                    </Form.Group>

                                    <Form.Group controlId="formEnableEmailUpdates">
                                      <Form.Check type="checkbox" label="Enable Email Updates" />
                                    </Form.Group>

                                    <Form.Group controlId="formPhoneNumber">
                                      <Form.Label>Phone Number</Form.Label>
                                      <Form.Control type="text" placeholder="Enter your phone number" />
                                    </Form.Group>

                                    <Button variant="primary" type="submit">
                                      Save Changes
                                    </Button>
                                  </Form>
                                </Card.Body>
                              </Tab>
                            </Tabs>
                          </Card>
                        </>
                      )}                     </Col>

        </Row>
      </Container>
    </>
  );
}

export default User;




