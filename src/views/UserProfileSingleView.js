import React, { useState } from 'react';
import { Card } from 'react-bootstrap'; // Assuming you're using Bootstrap for styling
import maleicon from '../assets/img/male icon.png';
import femaleicon from '../assets/img/female icon.png'; // Assuming you have the female icon image file imported
import apiEndpoint from './Services/ApiConfig';
const UserProfileView = ({ profile, onNext, onPrevious, onProfileClick }) => {
    const [startX, setStartX] = useState(null);
    const [endX, setEndX] = useState(null);
    const [expanded, setExpanded] = useState(false);
    const [filledState, setFilledState] = useState(false);
    const [phoneNumberRequested, setPhoneNumberRequested] = useState(profile.phone === 1);


    const handleClick = (event) => {
        event.stopPropagation(); // Stop event propagation to prevent card expansion
        setFilledState(!filledState);
    };

    const handleTouchStart = (event) => {
        setStartX(event.touches[0].clientX);
    };

    const handleTouchEnd = (event) => {
        setEndX(event.changedTouches[0].clientX);
        handleSwipe();
    };

    const handleSwipe = () => {
        if (startX && endX) {
            const diff = endX - startX;
            if (diff > 50) {
                onPrevious();
            } else if (diff < -50) {
                onNext();
            }
            setStartX(null);
            setEndX(null);
        }
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{ cursor: 'pointer' }}
        >
            <Card onClick={handleExpandClick} style={{ marginBottom: expanded ? '20px' : '0' }}>
                <Card.Img
                    variant="top"
                    src={apiEndpoint + profile.headshot_image || (profile.gender === 'male' ? maleicon : femaleicon)}
                />
                <Card.Body>
                    <Card.Title>{profile.name}</Card.Title>
                    <Card.Text>{profile.bio}</Card.Text>
                    <svg
                        onClick={handleClick}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        fill={filledState ? "red" : "none"}
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-heart"
                    >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                </Card.Body>
            </Card>

            {expanded && (
                <Card>
                    <Card.Body>
                        {/* Basic Info */}
                        <div className="info-group">
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


                            <p className="info-item">Phone: {profile.phone === 0 ? null
                                : profile.phone === 1 ?
                                    null : profile.phone
                            }</p>
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
                    {!phoneNumberRequested ?
                        <Button variant="primary" onClick={() => handleRequestphone(profile.id)}>Request Phone number</Button>
                        : phoneNumberRequested ?
                            <span>Phone number requested</span>
                            : null
                    }
                </Card>
            )}
        </div>
    );
};

export default UserProfileView;
