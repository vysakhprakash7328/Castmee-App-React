import React, { useState,useEffect } from 'react';
import { Modal, Card, Button, Form } from 'react-bootstrap';
import Slider from '@material-ui/core/Slider';
import apiEndpoint from './Services/ApiConfig';
import getNewAccessToken from './Services/getRefreshToken';
import axios from 'axios';

const FilterModal = ({ show, onHide, filters,setuserData }) => {
    const [activeFilter, setActiveFilter] = useState(Object.keys(filters)[0]);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

    const [gender,setGender] = useState([{}]);

    useEffect(() => {
        const user_data_str = localStorage.getItem('user_details');
        const user_data = JSON.parse(user_data_str);


        const apiUrl = apiEndpoint + '/api/dropdowns_for_artist/';
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
                        const artistDetails = response.data.detail;

                        // console.log(artistDetails.consider_me_for)
                        // setConsidermeFor([artistDetails.consider_me_for])
                        setGender(artistDetails.gender)
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });
            })
            .catch((error) => {
                console.error('Error fetching new access token:', error);
            });
    }, []);



    const handleFilterClick = (filterKey) => {
        setActiveFilter(filterKey);
    };

    const handleOptionClick = (filterKey, key, option) => {
        setSelectedOptions({
            ...selectedOptions,
            [filterKey]: key,
        });
    };

    const handleApplyFilters = () => {
        onHide()
        console.log('Selected options:', selectedOptions);
        const user_data_str = localStorage.getItem('user_details');
        const user_data = JSON.parse(user_data_str);
        const apiUrl = apiEndpoint + '/api/filter_artists/';
        const refreshToken = user_data?.data?.refresh;

        if (!refreshToken) {
            console.error('Access token is missing');
            return;
        }

        getNewAccessToken(refreshToken)
            .then((accessToken) => {
                axios.post(apiUrl, selectedOptions, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                    .then(response => {
                        console.log(response.data);
                        setuserData(response.data.detail)
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });
            })
            .catch((error) => {
                console.error('Error refreshing access token:', error);
            });
    };

    const handleAgeRangeChange = (event, newValue) => {
        setSelectedOptions({
            ...selectedOptions,
            age: newValue
        });
    };
    const handleGenderChange = (event) => {
        setSelectedOptions((prevSelectedOptions) => ({
            ...prevSelectedOptions,
            gender: event.target.value,
        }));
    };

    return (
        <Modal show={show} onHide={onHide} size="l">
            <Modal.Header closeButton>
                <Modal.Title>Filter Options</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <h5>Age Range</h5>
                    <Slider
                        value={selectedOptions.age || [2, 45]}
                        onChange={handleAgeRangeChange}
                        valueLabelDisplay="auto"
                        min={10}
                        max={100}
                        marks={[
                            { value: 0, label: '0' },
                            { value: 25, label: '25' },
                            { value: 50, label: '50' },
                            { value: 100, label: '100' },
                        ]}
                        step={1}
                        aria-labelledby="range-slider"
                    />
                </div>

                <Form.Group controlId="filterGender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control as="select" value={selectedOptions.gender}
                    onChange={handleGenderChange}>
                        <option style={{color:'grey'}}>Select gender</option>
                        <option>male</option>
                        <option>female</option>
                        <option>other</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="filterLocation">
                    <Form.Label>Location</Form.Label>
                    <Form.Control type="text" placeholder="Enter location" />
                </Form.Group>

                {showAdvancedFilters && (
                    <div>
                        <Modal.Header closeButton>
                            <Modal.Title>Filters</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div style={{ display: 'flex' }}>
                                <div style={{ flex: '0 0 10%', marginRight: '10px' }}>
                                    {Object.keys(filters).map((filterKey) => (
                                        <Card
                                            key={filterKey}
                                            className={`mb-2 ${activeFilter === filterKey ? 'bg-primary text-white' : ''}`}
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => handleFilterClick(filterKey)}
                                        >
                                            <Card.Body>{filterKey}</Card.Body>
                                        </Card>
                                    ))}
                                </div>
                                <div style={{ flex: '1' }}>
                                    {activeFilter && (
                                        <div>
                                            <h5>{activeFilter}</h5>
                                            <div>
                                                {Object.entries(filters[activeFilter]).map(([key, option], index) => (
                                                    <Button
                                                        key={index}
                                                        variant={selectedOptions[activeFilter] === key ? "primary" : "outline-primary"}
                                                        className="mr-2 mb-2"
                                                        onClick={() => handleOptionClick(activeFilter, key, option)}
                                                    >
                                                        {option}
                                                    </Button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Modal.Body>
                        
                    </div>
                )}
            </Modal.Body>

            <Button className="float-right border-0" onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}>
                {showAdvancedFilters ? 'Hide Advanced Filters' : 'Show Advanced Filters'}
            </Button>

            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleApplyFilters}>
                    Apply Filters
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default FilterModal;
