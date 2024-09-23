import React, { useState,useEffect } from "react";
import {
    Button,
    Card,
    Form,
    Row,
    Col,
} from "react-bootstrap";
import Select from "react-select";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import curlyhair from '../assets/img/curly.jpg';
import coilyhair from '../assets/img/coily.jpg';
import nohair from '../assets/img/no_hair.jpg';
import wavyhair from '../assets/img/wavy.jpg';
import straighthair from '../assets/img/straight.jpg';
import blackeye from '../assets/img/black.jpg';
import blueeye from '../assets/img/blue.jpg';
import browneye from '../assets/img/brown.jpg';
import ambereye from '../assets/img/amber.jpg';
import greyeye from '../assets/img/gray.jpg';
import axios from "axios";

import apiEndpoint from "./Services/ApiConfig";
import getNewAccessToken from "./Services/getRefreshToken";

export default function ArtistPersonalDetails({ handleChange, handlePrevChange }) {
    const [formData, setFormData] = useState({
        height: "",
        weight: "",
        selectedHairType: null,
        hairColor: null,
        bodyType: null,
        selectedEyeColor: null,
        selectedSkinColor: null,
        currentState: null,
        currentCity: null,
        nativeState: null,
        nativeCity: null
    });




    useEffect(() => {
        const user_data_str = localStorage.getItem('user_details');
        const user_data = JSON.parse(user_data_str);
    
        console.log(user_data)
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
                
    
                setFormData(prevData => ({
                  ...prevData,
                  heightFeet: artistDetails.heightFeet,
                heightInches: artistDetails.heightInches,
                weight: artistDetails.weight,
                selectedHairType: artistDetails.selectedHairType,
                hairColor: artistDetails.hairColor,
                bodyType: artistDetails.bodyType,
                selectedEyeColor: artistDetails.selectedEyeColor,
                selectedSkinColor: artistDetails.selectedSkinColor,
                currentState: artistDetails.currentState,
                currentCity: artistDetails.currentCity,
                nativeState: artistDetails.nativeState,
                nativeCity: artistDetails.nativeCity
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleHairTypeChange = (type) => {
        setFormData({
            ...formData,
            selectedHairType: type
        });
    };

    const handleEyeColorChange = (type) => {
        setFormData({
            ...formData,
            selectedEyeColor: type
        });
    };
    const handleSkinColorChange = (type) => {
        setFormData({
            ...formData,
            selectedSkinColor: type
        });
    };

    const handleSelectChange = (name, selectedOption) => {
        setFormData({
            ...formData,
            [name]: selectedOption
        });
    };
    const handleSubmit = (e) => {
        const user_data_str = localStorage.getItem('user_details');
        const user_data = JSON.parse(user_data_str);
    
        console.log(user_data)
        const apiUrl = apiEndpoint + '/api/update_artist/';
        const refreshToken = user_data.data.refresh;
        e.preventDefault(); // Prevent default form submission
        const artist_id = user_data.data.data.id
        // Fetch new access token
        setFormData(formData.artist_id = artist_id)
        getNewAccessToken(refreshToken)
            .then((accessToken) => {
                axios.put(apiUrl, formData,{
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
                    <Card.Title as="h4">Personal Details</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Form>
                        <Row>
                            <Col className="pr-1" md="3">
                                <Form.Group>
                                    <label>Height (Feet)</label>
                                    <Form.Control
                                        name="heightFeet"
                                        placeholder="Feet"
                                        type="number"
                                        min="0"
                                        value={formData.heightFeet}
                                        onChange={handleInputChange}
                                    ></Form.Control>
                                </Form.Group>
                            </Col>
                            <Col className="pr-1" md="3">
                                <Form.Group>
                                    <label>Height (Inches)</label>
                                    <Form.Control
                                        name="heightInches"
                                        placeholder="Inches"
                                        type="number"
                                        min="0"
                                        max="11"
                                        value={formData.heightInches}
                                        onChange={handleInputChange}
                                    ></Form.Control>
                                </Form.Group>
                            </Col>
                            <Col md="6">
                                <Form.Group>
                                    <label>Weight (Kg)</label>
                                    <Form.Control
                                        name="weight"
                                        placeholder="kg"
                                        type="number"
                                        min="0"
                                        value={formData.weight}
                                        onChange={handleInputChange}
                                    ></Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md="12">
                                <Form.Group>
                                    <label>Hair type</label>
                                    <div className="d-flex flex-wrap">
                                        <div className="mr-3 mb-3 text-center">
                                            <img
                                                src={coilyhair}
                                                alt="Coily Hair"
                                                style={{
                                                    cursor: 'pointer',
                                                    width: '100px',
                                                    height: '100px',
                                                    border: formData.selectedHairType === 'coily' ? '2px solid blue' : 'none'
                                                }}
                                                onClick={() => handleHairTypeChange('coily')}
                                            />
                                            <div>Coily</div>
                                        </div>
                                        <div className="mr-3 mb-3 text-center">
                                            <img
                                                src={curlyhair}
                                                alt="Curly Hair"
                                                style={{
                                                    cursor: 'pointer',
                                                    width: '100px',
                                                    height: '100px',
                                                    border: formData.selectedHairType === 'curly' ? '2px solid blue' : 'none'
                                                }}
                                                onClick={() => handleHairTypeChange('curly')}
                                            />
                                            <div>Curly</div>
                                        </div>
                                        <div className="mr-3 mb-3 text-center">
                                            <img
                                                src={straighthair}
                                                alt="Straight Hair"
                                                style={{
                                                    cursor: 'pointer',
                                                    width: '100px',
                                                    height: '100px',
                                                    border: formData.selectedHairType === 'straight' ? '2px solid blue' : 'none'
                                                }}
                                                onClick={() => handleHairTypeChange('straight')}
                                            />
                                            <div>Straight</div>
                                        </div>
                                        <div className="mr-3 mb-3 text-center">
                                            <img
                                                src={wavyhair}
                                                alt="Wavy Hair"
                                                style={{
                                                    cursor: 'pointer',
                                                    width: '100px',
                                                    height: '100px',
                                                    border: formData.selectedHairType === 'wavy' ? '2px solid blue' : 'none'
                                                }}
                                                onClick={() => handleHairTypeChange('wavy')}
                                            />
                                            <div>Wavy</div>
                                        </div>
                                        <div className="mr-3 mb-3 text-center">
                                            <img
                                                src={nohair}
                                                alt="No Hair"
                                                style={{
                                                    cursor: 'pointer',
                                                    width: '100px',
                                                    height: '100px',
                                                    border: formData.selectedHairType === 'none' ? '2px solid blue' : 'none'
                                                }}
                                                onClick={() => handleHairTypeChange('none')}
                                            />
                                            <div>No Hair</div>
                                        </div>
                                    </div>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col className="px-1" md="6">
                                <Form.Group>
                                    <label>Hair Color</label>
                                    <Select
                                        options={[
                                            { value: "black", label: "Black" },
                                            { value: "brown", label: "Brown" },
                                            { value: "blonde", label: "Blonde" },
                                            { value: "red", label: "Red" },
                                            { value: "saltpepper", label: "Salt and Pepper" },
                                        ]}
                                        value={formData.hairColor}
                                        onChange={handleInputChange}
                                        isClearable
                                        placeholder="Select or type to search"
                                    />
                                </Form.Group>
                            </Col>
                            <Col px="1" md="6">
                                <Form.Group>
                                    <label>Body Type</label>
                                    <Select
                                        options={[
                                            { value: "slim", label: "Slim" },
                                            { value: "athletic", label: "Athletic" },
                                            { value: "average", label: "Average" },
                                            { value: "muscular", label: "Muscular" },
                                            { value: "curvy", label: "Curvy" },
                                            { value: "heavy", label: "Heavy" },
                                            { value: "plus-sized", label: "Plus-sized" },
                                        ]}
                                        value={formData.bodyType}
                                        onChange={handleInputChange}
                                        isClearable
                                        placeholder="Select or type to search"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md="12">
                                <Form.Group>
                                    <label>Eye Color</label>
                                    <div className="d-flex flex-wrap">
                                        <div className="mr-3 mb-3 text-center">
                                            <img
                                                src={blackeye}
                                                alt="Black Eye"
                                                style={{
                                                    cursor: 'pointer',
                                                    width: '100px',
                                                    height: '100px',
                                                    border: formData.selectedEyeColor === 'black' ? '2px solid blue' : 'none'
                                                }}
                                                onClick={() => handleEyeColorChange('black')}
                                            />
                                            <div>Black</div>
                                        </div>
                                        <div className="mr-3 mb-3 text-center">
                                            <img
                                                src={blueeye}
                                                alt="Blue Eye"
                                                style={{
                                                    cursor: 'pointer',
                                                    width: '100px',
                                                    height: '100px',
                                                    border: formData.selectedEyeColor === 'blue' ? '2px solid blue' : 'none'
                                                }}
                                                onClick={() => handleEyeColorChange('blue')}
                                            />
                                            <div>Blue</div>
                                        </div>
                                        <div className="mr-3 mb-3 text-center">
                                            <img
                                                src={browneye}
                                                alt="Brown Eye"
                                                style={{
                                                    cursor: 'pointer',
                                                    width: '100px',
                                                    height: '100px',
                                                    border: formData.selectedEyeColor === 'brown' ? '2px solid blue' : 'none'
                                                }}
                                                onClick={() => handleEyeColorChange('brown')}
                                            />
                                            <div>Brown</div>
                                        </div>
                                        <div className="mr-3 mb-3 text-center">
                                            <img
                                                src={greyeye}
                                                alt="Grey Eye"
                                                style={{
                                                    cursor: 'pointer',
                                                    width: '100px',
                                                    height: '100px',
                                                    border: formData.selectedEyeColor === 'grey' ? '2px solid blue' : 'none'
                                                }}
                                                onClick={() => handleEyeColorChange('grey')}
                                            />
                                            <div>Grey</div>
                                        </div>
                                        <div className="mr-3 mb-3 text-center">
                                            <img
                                                src={ambereye}
                                                alt="Amber Eye"
                                                style={{
                                                    cursor: 'pointer',
                                                    width: '100px',
                                                    height: '100px',
                                                    border: formData.selectedEyeColor === 'amber' ? '2px solid blue' : 'none'
                                                }}
                                                onClick={() => handleEyeColorChange('amber')}
                                            />
                                            <div>Amber</div>
                                        </div>
                                    </div>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md="12">
                                <Form.Group>
                                    <label>Skin Color</label>
                                    <div className="d-flex flex-wrap">
                                        <div
                                            className="mr-3 mb-3 text-center"
                                            style={{
                                                width: '80px',
                                                height: '80px',
                                                backgroundColor: 'rgb(255, 219, 172)',
                                                cursor: 'pointer',
                                                border: formData.selectedSkinColor === 'veryfair' ? '2px solid blue' : 'none'
                                            }}
                                            onClick={() => handleSkinColorChange('veryfair')}
                                        >
                                            Very Fair
                                        </div>
                                        <div
                                            className="mr-3 mb-3 text-center"
                                            style={{
                                                width: '80px',
                                                height: '80px',
                                                backgroundColor: 'rgb(241, 194, 125)',
                                                cursor: 'pointer',
                                                border: formData.selectedSkinColor === 'fair' ? '2px solid blue' : 'none'
                                            }}
                                            onClick={() => handleSkinColorChange('fair')}
                                        >
                                            Fair
                                        </div>
                                        <div
                                            className="mr-3 mb-3 text-center"
                                            style={{
                                                width: '80px',
                                                height: '80px',
                                                backgroundColor: 'rgb(224, 172, 105)',
                                                cursor: 'pointer',
                                                border: formData.selectedSkinColor === 'wheatish' ? '2px solid blue' : 'none'
                                            }}
                                            onClick={() => handleSkinColorChange('wheatish')}
                                        >
                                            Wheatish
                                        </div>
                                        <div
                                            className="mr-3 mb-3 text-center"
                                            style={{
                                                width: '80px',
                                                height: '80px',
                                                backgroundColor: 'rgb(198, 134, 66)',
                                                cursor: 'pointer',
                                                border: formData.selectedSkinColor === 'brown' ? '2px solid blue' : 'none'
                                            }}
                                            onClick={() => handleSkinColorChange('brown')}
                                        >
                                            Brown
                                        </div>
                                        <div
                                            className="mr-3 mb-3 text-center"
                                            style={{
                                                width: '80px',
                                                height: '80px',
                                                backgroundColor: 'rgb(141, 85, 36)',
                                                cursor: 'pointer',
                                                border: formData.selectedSkinColor === 'dark' ? '2px solid blue' : 'none'
                                            }}
                                            onClick={() => handleSkinColorChange('dark')}
                                        >
                                            Dark
                                        </div>
                                        <div
                                            className="mr-3 mb-3 text-center"
                                            style={{
                                                width: '80px',
                                                height: '80px',
                                                backgroundColor: 'rgb(88, 49, 35)',
                                                cursor: 'pointer',
                                                border: formData.selectedSkinColor === 'verydark' ? '2px solid blue' : 'none'
                                            }}
                                            onClick={() => handleSkinColorChange('verydark')}
                                        >
                                            Very Dark
                                        </div>
                                    </div>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md="6">
                                <Form.Group>
                                    <label>Current State</label>
                                    <Select
                                        options={[
                                            { value: "kerala", label: "Kerala" },
                                            { value: "tamilnad", label: "Tamilnad" },
                                            // Add more options for other states
                                        ]}
                                        value={formData.currentState}
                                        onChange={handleInputChange}
                                        isClearable
                                        placeholder="Select or type to search"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md="6">
                                <Form.Group>
                                    <label>Current City</label>
                                    <Select
                                        options={[
                                            { value: "city1", label: "City 1" },
                                            { value: "city2", label: "City 2" },
                                            // Add more options for other cities
                                        ]}
                                        value={formData.currentCity}
                                        onChange={handleInputChange}
                                        isClearable
                                        placeholder="Select or type to search"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md="6">
                                <Form.Group>
                                    <label>Native State</label>
                                    <Select
                                        options={[
                                            { value: "kerala", label: "Kerala" },
                                            { value: "tamilnad", label: "Tamilnad" },
                                            // Add more options for other states
                                        ]}
                                        value={formData.nativeState}
                                        onChange={handleInputChange}
                                        isClearable
                                        placeholder="Select or type to search"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md="6">
                                <Form.Group>
                                    <label>Native City</label>
                                    <Select
                                        options={[
                                            { value: "city1", label: "City 1" },
                                            { value: "city2", label: "City 2" },
                                            // Add more options for other cities
                                        ]}
                                        value={formData.nativeCity}
                                        onChange={handleInputChange}
                                        isClearable
                                        placeholder="Select or type to search"
                                    />
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
