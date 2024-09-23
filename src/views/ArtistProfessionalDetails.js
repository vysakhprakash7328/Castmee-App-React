import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from "react-select";
import apiEndpoint from "./Services/ApiConfig";
import getNewAccessToken from "./Services/getRefreshToken";
import axios from "axios";

export default function ArtistProfessionalDetails({ handleChange, handlePrevChange }) {
  const [projects, setProjects] = useState([
    {
      languages: [],
      skills: [],
      projectType: "",
      role: "",
      projectName: "",
      projectLink: "",
      selectedImage: null,
    },
  ]);

  useEffect(() => {
    fetchData('api/dropdowns_for_artist/');
    // fetchData('api/get_artist_user/', 'detail', setArtistDetails);
  }, []);

  const fetchData = (apiUrl) => {
    const user_data_str = localStorage.getItem('user_details');
    const user_data = JSON.parse(user_data_str);
    const refreshToken = user_data.data.refresh;

    getNewAccessToken(refreshToken)
      .then((accessToken) => {
        axios.get(apiEndpoint + apiUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
          .then(response => {
            const artistDetails = response.data.detail; // Extract artist details from response


            // Update individual fields of artistData state
            setProjects([
              {
                languages: [artistDetails.languages_known],
                skills: [artistDetails.skills],
                projectType: "",
                role: "",
                projectName: "",
                projectLink: "",
                selectedImage: null,
              }
            ]);

          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching new access token:', error);
      });
  };



  const handleProjectChange = (index, key, value) => {
    const updatedProjects = [...projects];
    updatedProjects[index][key] = value;
    setProjects(updatedProjects);
  };

  const handleAddProject = () => {
    setProjects([
      ...projects,
      {
        projectType: "",
        role: "",
        projectName: "",
        projectLink: "",
        selectedImage: null,
        languages: [],
        skills: []
      },
    ]);
  };

  const handleImageChange = (index, e) => {
    const file = e.target.files[0];
    const updatedProjects = [...projects];
    updatedProjects[index].selectedImage = file;
    setProjects(updatedProjects);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user_data_str = localStorage.getItem('user_details');
    const user_data = JSON.parse(user_data_str);
    const apiUrl = apiEndpoint + '/api/update_artist/';
    const refreshToken = user_data.data.refresh;

    getNewAccessToken(refreshToken)
      .then((accessToken) => {
        axios.put(apiUrl, projects, {
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
        <Card.Title as="h4">Professional Details</Card.Title>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>

          <Row>
            <Col className="px-1" md="6">
              {projects[0].languages.map((langObj, index) => (
                <div key={index}>
                  <Form.Group>
                    <label>Languages</label>
                    <Select
                      options={[{ value: langObj.value, label: langObj.label }]} // Assuming langObj has properties value and label
                      onChange={(selectedOption) =>
                        handleProjectChange(index, "languages", selectedOption)
                      }
                      isMulti
                      placeholder="Select Languages"
                    />
                  </Form.Group>
                </div>
              ))}

            </Col>
            <Col className="px-1" md="6">
              {projects[0].skills.map((langObj, index) => (
                <div key={index}>

                  <Form.Group>
                    <label>Skills</label>
                    <Select
                      options={Object.keys(langObj).map(key => ({ value: key, label: langObj[key] }))}
                      onChange={(selectedOptions) =>
                        handleProjectChange(index, "skills", selectedOptions)
                      }
                      isMulti
                      placeholder="Select Skills"
                    />
                  </Form.Group>
                </div>
              ))}
            </Col>
          </Row>
          {projects.map((project, index) => (
            <div key={index}>
              <Row>
                <Col className="px-1" md="6">
                  <Form.Group>
                    <label>Project Type</label>
                    <Select
                      options={[
                        { value: "Movie", label: "Movie" },
                        { value: "Series", label: "Series" },
                        { value: "Short Film", label: "Short Film" },
                      ]}
                      value={project.projectType}
                      onChange={(selectedOption) =>
                        handleProjectChange(index, "projectType", selectedOption)
                      }
                      placeholder="Select Project Type"
                    />
                  </Form.Group>
                </Col>
                <Col className="px-1" md="6">
                  <Form.Group>
                    <label>Role</label>
                    <Select
                      options={[
                        { value: "Actor", label: "Actor" },
                        { value: "Director", label: "Director" },
                        { value: "Producer", label: "Producer" },
                      ]}
                      value={project.role}
                      onChange={(selectedOption) =>
                        handleProjectChange(index, "role", selectedOption)
                      }
                      placeholder="Select Role"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col className="px-1" md="12">
                  <Form.Group>
                    <label>Project Name</label>
                    <Form.Control
                      placeholder="Project Name"
                      type="text"
                      value={project.projectName}
                      onChange={(e) =>
                        handleProjectChange(index, "projectName", e.target.value)
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md="12">
                  <Form.Group>
                    <label>Project Link</label>
                    <Form.Control
                      placeholder="Project Link"
                      type="text"
                      value={project.projectLink}
                      onChange={(e) =>
                        handleProjectChange(index, "projectLink", e.target.value)
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md="12">
                  <Form.Group>
                    <label>Upload a Poster Image</label>
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        id={`imageInput_${index}`}
                        accept="image/*"
                        onChange={(e) => handleImageChange(index, e)}
                      />
                      <label className="custom-file-label" htmlFor={`imageInput_${index}`}>
                        Choose file
                      </label>
                    </div>
                  </Form.Group>
                  {project.selectedImage && (
                    <img
                      src={URL.createObjectURL(project.selectedImage)}
                      alt="Image Preview"
                      style={{ maxWidth: "100%", marginTop: "10px" }}
                    />
                  )}
                </Col>
              </Row>
            </div>
          ))}
          <Button variant="info" onClick={handleAddProject}>Add New Project</Button>
          <Button className="btn-fill pull-right" type="submit" variant="info">Update Profile</Button>
          <Button className="btn border-0 none pull-right" variant="info" onClick={handlePrevChange}>Back</Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
