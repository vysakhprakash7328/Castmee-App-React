import React, { useRef, useState, useEffect } from "react";
import {
  Button,
  Card,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import apiEndpoint from "./Services/ApiConfig";
import axios from "axios";
import getNewAccessToken from "./Services/getRefreshToken";

export default function ArtistPhotosAndVideos({ handleChange, handlePrevChange }) {
  const fileInputRef = useRef(null);
  const fileInputRefLeftProfile = useRef(null);
  const fileInputRefRightProfile = useRef(null);
  const fileInputRefUptoBustLevelImage = useRef(null);
  const fileInputRefFullLength = useRef(null);
  const videoInputRef = useRef(null);
  const [leftimageSrc, setLeftImageSrc] = useState("");
  const [rightimageSrc, setRightImageSrc] = useState("");
  const [uptoburstimageSrc, setUptoBurstImageSrc] = useState("");
  const [fullbodyimageSrc, setFullBodyImageSrc] = useState("");
  const [videoSrc, setVideoSrc] = useState(null);

  const handleLeftFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setLeftImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleRightFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setRightImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleBurstFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUptoBurstImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handlefullbodyFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFullBodyImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setVideoSrc(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const updateProfile = (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    const fileInputs = [
      { ref: fileInputRefLeftProfile, key: 'left_profile' },
      { ref: fileInputRefRightProfile, key: 'right_profile' },
      { ref: fileInputRefUptoBustLevelImage, key: 'headshot_image' },
      { ref: fileInputRefFullLength, key: 'fullbodyshot_image' },
      { ref: videoInputRef, key: 'video' }
    ];
  
    fileInputs.forEach(({ ref, key }) => {
      if (ref.current && ref.current.files[0]) {
        formData.append(key, ref.current.files[0]);
      }
    });
  
    const user_data_str = localStorage.getItem('user_details');
    const user_data = JSON.parse(user_data_str);
  
    const apiUrl = apiEndpoint + '/api/update_artist/';
    const refreshToken = user_data.data.refresh;
    const artist_id = user_data.data.data.id;
    formData.append('artist_id', artist_id);
  
    getNewAccessToken(refreshToken)
      .then((accessToken) => {
        axios.put(apiUrl, formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
          .then(response => {
            console.log(response.data)
            alert("Data updated successfully:", response.data);
          })
          .catch(error => {
            alert("Error updating data:", error);
          });
      });
  };

  useEffect(() => {
    videoInputRef.current = document.createElement('input');
    videoInputRef.current.type = 'file';
  }, []);

  const handleVideoBoxClick = () => {
    if (videoInputRef.current) {
      videoInputRef.current.click();
    }
  };





  return (
    <>
      <Card>
        <Card.Header>
          <Card.Title as="h4">Photos <h6>(See sample Images)</h6></Card.Title>
        </Card.Header>
        <Card.Body>
          <Form>


            <Row>
              <Col className="pr-1" md="6">
                <Form.Group>
                  <label>Left Profile</label>
                  <div
                    style={{
                      width: "180px",
                      height: "180px",
                      border: "1px solid #ced4da",
                      borderRadius: "4px",
                      textAlign: "center",
                      lineHeight: "150px",
                      cursor: "pointer",
                      backgroundImage: `url(${leftimageSrc || "path_to_sample_image"})`, // Set background image
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    onClick={() => fileInputRefLeftProfile.current.click()}
                  >
                    <input
                      type="file"
                      style={{ display: "none" }}
                      onChange={handleLeftFileChange}
                      ref={fileInputRefLeftProfile}
                    />
                    {!leftimageSrc && <span>+</span>}
                  </div>
                </Form.Group>
              </Col>
              <Col className="pr-1" md="6">
                <Form.Group>
                  <label>Right Profile</label>
                  <div
                    style={{
                      width: "180px",
                      height: "180px",
                      border: "1px solid #ced4da",
                      borderRadius: "4px",
                      textAlign: "center",
                      lineHeight: "150px",
                      cursor: "pointer",
                      backgroundImage: `url(${rightimageSrc || "path_to_sample_image"})`, // Set background image
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    onClick={() => fileInputRefRightProfile.current.click()}
                  >
                    <input
                      type="file"
                      style={{ display: "none" }}
                      onChange={handleRightFileChange}
                      ref={fileInputRefRightProfile}
                    />
                    {!rightimageSrc && <span>+</span>}
                  </div>
                </Form.Group>
              </Col>
              <Col className="pr-1" md="6">
                <Form.Group>
                  <label>Upto Bust Level Image</label>
                  <div
                    style={{
                      width: "180px",
                      height: "180px",
                      border: "1px solid #ced4da",
                      borderRadius: "4px",
                      textAlign: "center",
                      lineHeight: "150px",
                      cursor: "pointer",
                      backgroundImage: `url(${uptoburstimageSrc || "path_to_sample_image"})`, // Set background image
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    onClick={() => fileInputRefUptoBustLevelImage.current.click()}
                  >
                    <input
                      type="file"
                      style={{ display: "none" }}
                      onChange={handleBurstFileChange}
                      ref={fileInputRefUptoBustLevelImage}
                    />
                    {!uptoburstimageSrc && <span>+</span>}
                  </div>
                </Form.Group>
              </Col>
              <Col className="pr-1" md="6">
                <Form.Group>
                  <label>Full Length</label>
                  <div
                    style={{
                      width: "180px",
                      height: "180px",
                      border: "1px solid #ced4da",
                      borderRadius: "4px",
                      textAlign: "center",
                      lineHeight: "150px",
                      cursor: "pointer",
                      backgroundImage: `url(${fullbodyimageSrc || "path_to_sample_image"})`, // Set background image
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    onClick={() => fileInputRefFullLength.current.click()}
                  >
                    <input
                      type="file"
                      style={{ display: "none" }}
                      onChange={handlefullbodyFileChange}
                      ref={fileInputRefFullLength}
                    />
                    {!fullbodyimageSrc && <span>+</span>}
                  </div>
                </Form.Group>
              </Col>
              <Col className="pr-1" md="6">
                <Form.Group>
                  <label>Intro Video Upload</label>
                  <div
                    style={{
                      width: "180px",
                      height: "180px",
                      border: "1px solid #ced4da",
                      borderRadius: "4px",
                      textAlign: "center",
                      lineHeight: "150px",
                      cursor: "pointer",
                      backgroundImage: `url(${videoSrc || "path_to_sample_image"})`, // Set background image
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    onClick={() => videoInputRef.current.click()}
                  >
                    <input
                      type="file"
                      style={{ display: "none" }}
                      onChange={handleVideoFileChange}
                      ref={videoInputRef}
                    />
                    {!videoSrc && <span>+</span>}
                  </div>
                </Form.Group>
              </Col>
            </Row>
            <br />
            <Button
              className="btn-fill pull-right"
              type="submit"
              variant="info"
              onClick={(event) => updateProfile(event)}
            >
              Update Profile
            </Button>
            <Button
              className="btn border-0 none pull-right"
              type="submit"
              variant="info"
              onClick={handlePrevChange}
            >
              Back
            </Button>
            <div className="clearfix"></div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}
