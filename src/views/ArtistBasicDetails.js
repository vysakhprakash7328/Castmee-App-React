import React, { useState, useEffect } from "react";

import {
  Button,
  Card,
  Form,
  Row,
  Col,
  ButtonGroup, ToggleButton
} from "react-bootstrap";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from "axios";
import apiEndpoint from "./Services/ApiConfig";
import getNewAccessToken from "./Services/getRefreshToken";

export default function ArtistBasicDetails({ handleChangeDetails }) {
  const [artistData, setArtistData] = useState({
    first_name: "",
    last_name: "",
    email:"",
    user_name: "",
    gender: "",
    date_of_birth: null,
    bio: ""
  });

  useEffect(() => {
    const user_data_str = localStorage.getItem('user_details');
    const user_data = JSON.parse(user_data_str);

    console.log(user_data)
    console.log(artistData)
    const apiUrl = apiEndpoint + '/api/get_artist_user/';
    const refreshToken = user_data.data.refresh;

    getNewAccessToken(refreshToken)
      .then((accessToken) => {
        axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }

        })
          .then(response => {
            console.log(response.data, 'artist_details');
            const artistDetails = response.data.detail; // Extract artist details from response
            

            // Update individual fields of artistData state
            setArtistData(prevData => ({
              ...prevData,
              first_name: artistDetails.first_name,
              email: artistDetails.email,
              last_name: artistDetails.last_name,
              user_name: artistDetails.user_name,
              gender: artistDetails.gender,
              date_of_birth: artistDetails.date_of_birth,
              bio: artistDetails.bio,
            }));
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching new access token:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Changing ${name} to ${value}`);
    setArtistData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  

  const handleDateChange = (date) => {
    setArtistData(prevData => ({
      ...prevData,
      dateOfBirth: date
    }));
  };

  const handleSubmit = (e) => {
    const user_data_str = localStorage.getItem('user_details');
    const user_data = JSON.parse(user_data_str);

    console.log(user_data)
    console.log(artistData)
    const artist_id = user_data.data.data.id
    const apiUrl = apiEndpoint + '/api/update_artist/';
    const refreshToken = user_data.data.refresh;
    e.preventDefault(); // Prevent default form submission
    console.log(artistData,'artistdataaaaaaaaaaaaaa')
    // Fetch new access token
    setArtistData(artistData.artist_id = artist_id)
    getNewAccessToken(refreshToken)
        .then((accessToken) => {
            axios.put(apiUrl, artistData,{
            headers: {
              Authorization: `Bearer ${accessToken}`
          }
        })
                .then(response => {
                    alert("Data updated successfully:", response.data);
                })
                .catch(error => {
                    console.error("Error updating data:", error);
                });
        })
        .catch((error) => {
            console.error('Error fetching new access token:', error);
        });
};


    return (
      <>
        <Card>
          <Card.Header>
            <Card.Title as="h4">Basic Details</Card.Title>
          </Card.Header>
          <Card.Body>
            <Form>

              <Row>
                <Col className="px-1" md="6">
                  <Form.Group>
                    <label>Username (disabled)</label>
                    <Form.Control
                      defaultValue={artistData.user_name}
                      disabled
                      placeholder="username"
                      type="text"
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col className="px-1" md="6">
                  <Form.Group>
                    <label>Email Address</label>
                    <Form.Control
                      defaultValue={artistData.email}
                      disabled
                      placeholder="email"
                      type="email"
                    ></Form.Control>
                  </Form.Group>
                </Col>

              </Row>
              <Row>
                <Col className="px-1" md="6">
                  <Form.Group>
                    <label>First Name</label>
                    <Form.Control
                      name="first_name"
                      placeholder="First Name"
                      value={artistData.first_name}
                      onChange={(e) => handleChange(e)}
                      type="text"
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col className="px-1" md="6">
                  <Form.Group>
                    <label>Last Name</label>

                    <Form.Control
                      name="last_name"
                      placeholder="Last Name"
                      value={artistData.last_name}
                      onChange={(e) => handleChange(e)}
                      type="text"
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col className="pr-1" md="6">

                  <Form.Group>
                    <label>Gender</label>
                    <br />

                    <ButtonGroup>
                      <Button
                        variant={artistData.gender === 'male' ? 'primary' : 'secondary'}
                        onClick={() => handleChange({ target: { name: 'gender', value: 'male' } })}
                      >
                        Male
                      </Button>
                      <Button
                        variant={artistData.gender === 'female' ? 'primary' : 'secondary'}
                        onClick={() => handleChange({ target: { name: 'gender', value: 'female' } })}
                      >
                        Female
                      </Button>
                      <Button
                        variant={artistData.gender === 'others' ? 'primary' : 'secondary'}
                        onClick={() => handleChange({ target: { name: 'gender', value: 'others' } })}
                      >
                        Others
                      </Button>
                    </ButtonGroup>
                  </Form.Group>
                </Col>


              </Row>
              {/* <Row>
                <Col className="px-1" md="6">
                  <label>Are you actively looking for work?</label>

                </Col>
                <Col className="px-1" md="6">

                  <Form.Group>
                    <ButtonGroup>
                      <Button
                        variant={artistData.lookingForWork === 'yes' ? 'primary' : 'secondary'}
                        onClick={() => handleChange({ target: { name: 'lookingForWork', value: 'yes' } })}
                      >
                        Yes
                      </Button>
                      <Button
                        variant={artistData.lookingForWork === 'no' ? 'primary' : 'secondary'}
                        onClick={() => handleChange({ target: { name: 'lookingForWork', value: 'no' } })}
                      >
                        No
                      </Button>

                    </ButtonGroup>
                  </Form.Group>
                </Col>

              </Row> */}
              <Row>
                <Col className="px-1" md="12">
                  <Form.Group>
                    <label>Date of Birth</label>
                    <Form.Control
                      selected={artistData.date_of_birth}
                      onChange={handleDateChange}
                      placeholder="Company"
                      type="date"
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col className="px-1" md="12">
                  <Form.Group>
                    <label>Bio</label>
                    <Form.Control
                      name="bio"
                      value={artistData.bio}
                      onChange={handleChange}
                      as="textarea"
                      rows={3}
                      placeholder="Bio"
                    ></Form.Control>
                  </Form.Group>
                </Col>

              </Row>

              <br />
              <Button
                className="btn-fill pull-right"
                type="submit"
                variant="info"
                onClick={handleSubmit}
              >
                Update Profile
              </Button>
              <div className="clearfix"></div>
            </Form>
          </Card.Body>
        </Card>
      </>
    );
  }