import React, { useEffect, useState } from 'react';
import { Modal, Card, Button, Row, Col } from 'react-bootstrap';
import maleicon from '../assets/img/male icon.png';
import femaleicon from '../assets/img/female icon.png';
import axios from 'axios'; // Import axios for HTTP requests
import apiEndpoint from './Services/ApiConfig';
import getNewAccessToken from './Services/getRefreshToken';

const UserProfileCard = ({ profile, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const [reloadProfile, setReloadProfile] = useState(false); // State to trigger profile reload
    const [phoneNumberRequested, setPhoneNumberRequested] = useState(profile.phone === 1);

    const images = [
        profile.headshot_image ? profile.headshot_image : (profile.gender === 'male' ? maleicon : femaleicon),
        profile.fullbodyshot_image ? profile.fullbodyshot_image : (profile.gender === 'male' ? maleicon : femaleicon),
        profile.left_profile ? profile.left_profile : (profile.gender === 'male' ? maleicon : femaleicon),
        profile.right_profile ? profile.right_profile : (profile.gender === 'male' ? maleicon : femaleicon)
    ];

    const handleNextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };
    useEffect(() => {
        console.log(profile)
        {console.log(images[currentIndex])}

    })
    const handlePrevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const handleRequestphone = (artistId) => {
        console.log('clicked....');
        const user_data_str = localStorage.getItem('user_details');
        const user_data = JSON.parse(user_data_str);
        const apiUrl = apiEndpoint + '/api/request_contact/';
        const refreshToken = user_data.data.refresh;
        const user_id = user_data.data.data.id;

        console.log(artistId, user_id);

        getNewAccessToken(refreshToken)
            .then((accessToken) => {
                axios.post(apiUrl, { artist_id: artistId, producer_id: user_id }, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                    .then(response => {
                        console.log(response.data);
                        alert('Phone number requested');
                        setPhoneNumberRequested(true); // Update state to reflect phone number requested
                        setReloadProfile(true); // Set state to trigger profile reload

                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        if (reloadProfile) {
            // Reload profile data here
            setReloadProfile(false); // Reset reload state after reloading profile
        }
    }, [reloadProfile]);

    return (
        <Modal show={true} onHide={onClose} dialogClassName="modal-lg custom-modal">
            <Modal.Header closeButton>
                <Modal.Title>Profile Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col md={6}>
                    <div style={{ position: 'relative' }}>
                        {console.log(images[currentIndex])}
                        <Card.Img
                            variant="top"
                            src={apiEndpoint+images[currentIndex]}
                            style={{ width: '100%', height: 'auto' }}
                        />
                        
                        <button onClick={handlePrevImage} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', zIndex: 999 }}>
                            &lt;
                        </button>
                        <button onClick={handleNextImage} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', zIndex: 999 }}>
                            &gt;
                        </button>
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '10px' }}>
                        {images.map((image, index) => (
                            <span
                                key={index}
                                style={{
                                    display: 'inline-block',
                                    width: '10px',
                                    height: '10px',
                                    borderRadius: '50%',
                                    backgroundColor: currentIndex === index ? 'blue' : 'gray',
                                    margin: '0 5px',
                                    cursor: 'pointer'
                                }}
                                onClick={() => setCurrentIndex(index)}
                            />
                        ))}
                    </div>

                    </Col>
                    <Col md={6}>
                        <Card.Body>
                            <Card.Title>{profile.user_name}</Card.Title>
                            <Card.Text>{profile.bio}</Card.Text>
                            {profile.phone === 0 ? null
                                : profile.phone === 1 ?
                                    null : profile.phone
                            }
                        </Card.Body>
                        <Card.Body>
                            {/* Basic Info */}
                            <div className="info-group" >
                                <p className="info-title">Basic Info</p>
                                <p className="info-item">Age: {profile.age || 'Not available'}</p>
                                <p className="info-item">Gender: {profile.gender || 'Not available'}</p>
                                <p className="info-item">Email: {profile.email}</p>
                            </div>
                            {/* Social Media */}
                            <div className="info-group">
                                <p className="info-title">Social Media</p>
                                <p className="info-item">Instagram: {profile.instagram || 'Not available'}</p>
                                <p className="info-item">Facebook: {profile.facebook || 'Not available'}</p>
                                <p className="info-item">Twitter: {profile.twitter || 'Not available'}</p>
                                <p className="info-item">YouTube: {profile.youtube || 'Not available'}</p>
                                <p className="info-item">LinkedIn: {profile.linkedin || 'Not available'}</p>
                            </div>
                            {/* Contact */}
                            <div className="info-group">
                                <p className="info-title">Contact</p>
                                <p className="info-item">Phone: {profile.phone || 'Not available'}</p>
                                <p className="info-item">Address: {profile.address || 'Not available'}</p>
                            </div>
                            {/* Additional Info */}
                            <div className="info-group">
                                <p className="info-title">Additional Info</p>
                                <p className="info-item">Height: {profile.height || 'Not available'}</p>
                                <p className="info-item">Weight: {profile.weight || 'Not available'}</p>
                                {/* Add more fields */}
                            </div>
                        </Card.Body>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Close</Button>
                {!phoneNumberRequested ?
                    <Button variant="primary" onClick={() => handleRequestphone(profile.id)}>Request Phone number</Button>
                    :phoneNumberRequested?
                    <span>Phone number requested</span>
                    :null
                }
            </Modal.Footer>
        </Modal>
    );
};

export default UserProfileCard;
