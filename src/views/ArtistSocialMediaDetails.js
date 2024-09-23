import React, { useState, useEffect } from "react";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import axios from "axios"; // Import axios for making HTTP requests
import apiEndpoint from "./Services/ApiConfig";
import getNewAccessToken from "./Services/getRefreshToken";

export default function ArtistSocialMediaDetails({ handleChange, handlePrevChange }) {
  // State for storing social media URLs
  const [socialMediaUrls, setSocialMediaUrls] = useState({
    facebook: "",
    instagram: "",
    youtube: "",
    twitter: "",
    linkedIn: ""
  });

  // Handler for input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSocialMediaUrls(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

 
  useEffect(() => {
    const user_data_str = localStorage.getItem('user_details');
    const user_data = JSON.parse(user_data_str);

    console.log(user_data)
    console.log(socialMediaUrls)
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
            setSocialMediaUrls(prevData => ({
              ...prevData,
              facebook: artistDetails.facebook,
              instagram: artistDetails.instagram,
              twitter: artistDetails.twitter,
              linkedIn: artistDetails.linkedin,
              youtube: artistDetails.youtube,

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

 
  const handleSubmit = (e) => {
    const user_data_str = localStorage.getItem('user_details');
    const user_data = JSON.parse(user_data_str);

    console.log(user_data)
    console.log(socialMediaUrls)
    const apiUrl = apiEndpoint + '/api/update_artist/';
    const refreshToken = user_data.data.refresh;
    const artist_id = user_data.data.data.id
    
    e.preventDefault(); // Prevent default form submission
    console.log(artist_id,'artistdataaaaaaaaaaaaaa')
    setSocialMediaUrls(socialMediaUrls.artist_id = artist_id)
    // Fetch new access token
    getNewAccessToken(refreshToken)
        .then((accessToken) => {
            axios.put(apiUrl, socialMediaUrls,{
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
    <Card>
      <Card.Header>
        <Card.Title as="h4">Social Media Details</Card.Title>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col className="px-1" md="12">
              <Form.Group>
                <Form.Label>Facebook URL</Form.Label>
                <Form.Control
                  name="facebook"
                  placeholder="Facebook URL"
                  type="text"
                  value={socialMediaUrls.facebook}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col className="px-1" md="12">
              <Form.Group>
                <Form.Label>Instagram URL</Form.Label>
                <Form.Control
                  name="instagram"
                  placeholder="Instagram URL"
                  type="text"
                  value={socialMediaUrls.instagram}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col className="px-1" md="12">
              <Form.Group>
                <Form.Label>YouTube URL</Form.Label>
                <Form.Control
                  name="youtube"
                  placeholder="YouTube URL"
                  type="text"
                  value={socialMediaUrls.youtube}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col className="px-1" md="12">
              <Form.Group>
                <Form.Label>Twitter URL</Form.Label>
                <Form.Control
                  name="twitter"
                  placeholder="Twitter URL"
                  type="text"
                  value={socialMediaUrls.twitter}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col className="px-1" md="12">
              <Form.Group>
                <Form.Label>LinkedIn URL</Form.Label>
                <Form.Control
                  name="linkedIn"
                  placeholder="LinkedIn URL"
                  type="text"
                  value={socialMediaUrls.linkedIn}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <br />
          <Button className="btn-fill pull-right" type="submit" variant="info">
            Update Profile
          </Button>
          <Button
            className="btn border-0 none pull-right"
            type="button"
            variant="info"
            onClick={handleSubmit}
          >
            Back
          </Button>
          <div className="clearfix"></div>
        </Form>
      </Card.Body>
    </Card>
  );
}
