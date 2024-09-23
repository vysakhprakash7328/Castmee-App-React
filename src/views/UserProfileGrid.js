import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiEndpoint from './Services/ApiConfig';
import getNewAccessToken from './Services/getRefreshToken';
import maleicon from '../assets/img/male icon.png';
import femaleicon from '../assets/img/female icon.png';

const UserProfileGrid = ({ onProfileClick, userdata }) => {
    const [filledState, setFilledState] = useState(userdata.map(() => false));
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const user_data_str = localStorage.getItem('user_details');
        const user_data = JSON.parse(user_data_str);
        const apiUrl = apiEndpoint + '/api/get_related_wishlist/';

        const refreshToken = user_data.data.refresh;

        getNewAccessToken(refreshToken)
            .then((accessToken) => {
                axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                    .then(response => {
                        console.log(response.data);
                        setFavorites(response.data.detail);
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        const updatedFilledState = userdata.map(user => favorites.some(favorite => favorite.artist_id === user.id));
        setFilledState(updatedFilledState);
    }, [favorites, userdata]);

    const handleClick = (index, event, artist_id) => {
        event.stopPropagation();
        const updatedFilledState = [...filledState];
        updatedFilledState[index] = !updatedFilledState[index];
        setFilledState(updatedFilledState);

        toast.info(updatedFilledState[index] ? 'Added to wishlist' : 'Removed from wishlist', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            touchDraggable: true,
            progress: undefined,
        });
        const user_data_str = localStorage.getItem('user_details');
        const user_data = JSON.parse(user_data_str);
        const apiUrl = apiEndpoint + '/api/add_to_wishlist/';

        const producer_id = user_data.data.data.id;
        const refreshToken = user_data.data.refresh;
        console.log(producer_id,artist_id)

        getNewAccessToken(refreshToken)
            .then((accessToken) => {
                axios.post(apiUrl, { producer_id, artist_id }, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                    .then(response => {
                        console.log(response.data);
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <Container>
            <Row>
            {userdata ? (
    userdata.map((user, index) => (
        <Col key={index} md="4" className="mb-3">
            <Card style={{ cursor: "pointer" }} onClick={() => onProfileClick(user)}>
                <Card.Img
                    variant="top"
                    src={user.headshot_image ? apiEndpoint+user.headshot_image : (user.gender === 'male' ? maleicon : femaleicon)}
                />
                <Card.Body>
                    <Row className="mb-3">
                        <Col md={10}>
                            <Card onClick={() => onProfileClick(user)} style={{ cursor: 'pointer' }}>
                                <Card.Body>
                                    <Card.Title>{user.user_name}</Card.Title>
                                    <Card.Text>{user.bio}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={2}>
                            <svg
                                onClick={(event) => handleClick(index, event, user.id)}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                                fill={filledState[index] ? "red" : "none"}
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-heart"
                            >
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Col>
    ))
) : (
    <div>No data found</div>
)}

            </Row>
            <ToastContainer />
        </Container>
    );
};

export default UserProfileGrid;
