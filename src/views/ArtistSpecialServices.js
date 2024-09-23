import React, { useState, useEffect } from "react";

import {
    Button,
    Card,
    Form,
    Row,
    Col
} from "react-bootstrap";
import 'react-datepicker/dist/react-datepicker.css';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import apiEndpoint from "./Services/ApiConfig";
import getNewAccessToken from "./Services/getRefreshToken";
import axios from "axios";
export default function ArtistSpecialServices({ handleChange, handlePrevChange }) {
    const [checkboxData, setCheckboxData] = useState({
        interest: [{}]
    });
    const [selectedInterests, setSelectedInterests] = useState([]); // State to store selected interests

    const handleSubmit = () => {
        const user_data_str = localStorage.getItem('user_details');
        const user_data = JSON.parse(user_data_str);
        const apiUrl = apiEndpoint + '/api/update_artist/';
        const refreshToken = user_data.data.refresh;
        const artist_id = user_data.data.data.id
        console.log(refreshToken)
        getNewAccessToken(refreshToken)
        .then((accessToken) => {
            axios.put(apiUrl,{
                interests: selectedInterests,
                artist_id: artist_id
            },{
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

    const handleCheckboxChange = (interestId) => {
        const index = selectedInterests.indexOf(interestId);
        if (index === -1) {
            setSelectedInterests([...selectedInterests, interestId]);
        } else {
            const updatedInterests = [...selectedInterests];
            updatedInterests.splice(index, 1);
            setSelectedInterests(updatedInterests);
        }
    };

    

    const handleOptionChange = (value) => {
        setSelectedOption(value);
    };
    const [selectedDate, setSelectedDate] = React.useState(null);

    const handleDateChange = date => {
        setSelectedDate(date);
    };



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
                        setCheckboxData({

                            interest: [artistDetails.interest]
                        });
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });
            })
            .catch((error) => {
                console.error('Error fetching new access token:', error);
            });
    }, []);


    return (
        <>
            <Card>
                <Card.Header>
                    <Card.Title as="h4">Special services</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Form>

                        <Row>
                            <Col className="pr-1" md="12">

                                <label>I am Interested In</label>

                                <br/>

                                {Object.keys(checkboxData.interest[0]).map((id) => (
                                    <FormControlLabel
                                        key={id}
                                        control={<Checkbox color="primary" />}
                                        label={checkboxData.interest[0][id]}
                                        checked={selectedInterests.includes(id)}
                                        onChange={() => handleCheckboxChange(id)}

                                    />
                                ))}
                            </Col>

                        </Row>

                        <br />
                        <Button
                            className="btn-fill pull-right"
                            type="submit"
                            variant="info"
                            onClick={handleSubmit}
                        >
                            Submit
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