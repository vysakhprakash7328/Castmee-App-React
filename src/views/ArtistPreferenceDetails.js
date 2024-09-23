import React, { useState, useEffect } from "react";
import {
    Button,
    Card,
    Form,
    Row,
    Col,

} from "react-bootstrap";
import axios from "axios";
import apiEndpoint from "./Services/ApiConfig";
import getNewAccessToken from "./Services/getRefreshToken";

import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';

export default function ArtistPreferenceDetails({ handleChange, handlePrevChange }) {
    const [checkboxData, setCheckboxData] = useState({
        consider_me_for: [{}],
        available_for: [{}],
        preferred_format: [{}],
        preferred_genre: [{}],
        interest: [{}]
    });

    

    const [testData, setTestData] = useState([{ "id": 1, "name": "John" }])

    useEffect(() => {
        console.log(checkboxData.consider_me_for, 'consider me forrr')
    })

    const [apiData, setApiData] = useState(null);

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
                            consider_me_for: [artistDetails.consider_me_for],
                            available_for: [artistDetails.available_for],
                            preferred_format: [artistDetails.preferred_format],
                            preferred_genre: [artistDetails.preferred_genre],
                            interest: [artistDetails.interest],
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
                    <Card.Title as="h4">Preference Details</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Form>
                    <Row>
    <Col className="pr-1" md="6">
        <label>Consider Me For</label>
        <br />
        {Object.keys(checkboxData.consider_me_for[0]).map((id) => (
            <FormControlLabel
                key={id}
                control={<Checkbox color="primary" />}
                label={checkboxData.consider_me_for[0][id]} // Render the label corresponding to the ID
            />
        ))}
    </Col>

    <Col className="pr-1" md="6">
        <label>I am Available</label>
        <br />
        {Object.keys(checkboxData.available_for[0]).map((id) => (
            <FormControlLabel
                key={id}
                control={<Checkbox color="primary" />}
                label={checkboxData.available_for[0][id]}
            />
        ))}
    </Col>
</Row>


    <Row>
                            <Col className="pr-1" md="7">
                                <label>My Preferred Format</label>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox color="primary" />}

                                        label="Select All"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox color="primary" />}
                                        label="Film"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox color="primary" />}
                                        label="Television Serial"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox color="primary" />}
                                        label="OTT Platform"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox color="primary" />}
                                        label="Modeling"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox color="primary" />}
                                        label="Voice Over"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox color="primary" />}
                                        label="Dubbing Artist"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox color="primary" />}
                                        label="Documentary"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox color="primary" />}
                                        label="Reality Show"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox color="primary" />}
                                        label="Sitcom"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox color="primary" />}
                                        label="Advertisement"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox color="primary" />}
                                        label="Telefilm"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox color="primary" />}
                                        label="Short Film"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox color="primary" />}
                                        label="Art House Cinema"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox color="primary" />}
                                        label="Theatre"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox color="primary" />}
                                        label="Radio"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox color="primary" />}
                                        label="Anchoring"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox color="primary" />}
                                        label="Dance Production"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox color="primary" />}
                                        label="Puppetry"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox color="primary" />}
                                        label="Other Stage Show"
                                    />
                                </Grid>
                            </Col>
                            <Col className="pr-1" md="5">
                                <label>My Personal Preferences</label>
                                <br/>
                                <FormControl component="fieldset">
                                    <RadioGroup>
                                        <div>
                                        
                                        <label>Smoking on Screen </label><br/>

                                            <FormControlLabel
                                                control={<Radio color="primary" />}
                                                label="Yes"
                                                value="smokingYes"
                                            />
                                            <FormControlLabel
                                                control={<Radio color="primary" />}
                                                label="No"
                                                value="smokingNo"
                                            />
                                        </div>
                                        <div>
                                        <label>Swimming on Screen</label><br/>

                                            <FormControlLabel
                                                control={<Radio color="primary" />}
                                                label="Yes"
                                                value="swimmingYes"
                                            />
                                            <FormControlLabel
                                                control={<Radio color="primary" />}
                                                label="No"
                                                value="swimmingNo"
                                            />
                                        </div>
                                        <div>
                                        <label>Two Wheeler Driving </label><br/>

                                            <FormControlLabel
                                                control={<Radio color="primary" />}
                                                label="Yes"
                                                value="twoWheelerYes"
                                            />
                                            <FormControlLabel
                                                control={<Radio color="primary" />}
                                                label="No"
                                                value="twoWheelerNo"
                                            />
                                        </div>
                                        <div>
                                        <label>Four Wheeler Driving</label><br/>

                                            <FormControlLabel
                                                control={<Radio color="primary" />}
                                                label=" Yes"
                                                value="fourWheelerYes"
                                            />
                                            <FormControlLabel
                                                control={<Radio color="primary" />}
                                                label="No"
                                                value="fourWheelerNo"
                                            />
                                        </div>
                                        <div>
                                        <label>Kissing on Screen </label><br/>

                                            <FormControlLabel
                                                control={<Radio color="primary" />}
                                                label="Yes"
                                                value="kissingYes"
                                            />
                                            <FormControlLabel
                                                control={<Radio color="primary" />}
                                                label="No"
                                                value="kissingNo"
                                            />
                                        </div>
                                        <div>
                                        <label>Intimate Scenes</label><br/>

                                            <FormControlLabel
                                                control={<Radio color="primary" />}
                                                label="Yes"
                                                value="intimateScenesYes"
                                            />
                                            <FormControlLabel
                                                control={<Radio color="primary" />}
                                                label="No"
                                                value="intimateScenesNo"
                                            />
                                        </div>
                                        <div>
                                        <label>Nudity on Screen</label><br/>

                                            <FormControlLabel
                                                control={<Radio color="primary" />}
                                                label="Yes"
                                                value="nudityYes"
                                            />
                                            <FormControlLabel
                                                control={<Radio color="primary" />}
                                                label="No"
                                                value="nudityNo"
                                            />
                                        </div>
                                    </RadioGroup>
                                </FormControl>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="pr-1" md="12">
                            <label>My Preferred Genre</label>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox color="primary" />}
                                        label="Select All"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox color="primary" />}
                                        label="Romance"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox color="primary" />}
                                        label="Action"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox color="primary" />}
                                        label="Drama"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox color="primary" />}
                                        label="Comedy"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox color="primary" />}
                                        label="Costume Drama"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox color="primary" />}
                                        label="Sci-Fi"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox color="primary" />}
                                        label="Biopics"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox color="primary" />}
                                        label="Experimental"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox color="primary" />}
                                        label="Thriller"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox color="primary" />}
                                        label="Horror"
                                    />
                                    
                                </Grid>
                            </Col>
                        </Row>
                       
                        <br />
                        <Button
                            className="btn-fill pull-right"
                            type="submit"
                            variant="info"
                            onClick={handleChange}
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
