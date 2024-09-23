import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonIcon from '@material-ui/icons/Person';
import WorkIcon from '@material-ui/icons/Work';
import PublicIcon from '@material-ui/icons/Public';
import SettingsIcon from '@material-ui/icons/Settings';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import FavoriteIcon from '@material-ui/icons/Favorite';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import { CircularProgressbar } from 'react-circular-progressbar';
import { useHistory } from "react-router-dom";




const useStyles = makeStyles((theme) => ({
    card: {
        borderRadius: "15px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        transition: "box-shadow 0.3s",
        "&:hover": {
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        },
    },
    icon: {
        fontSize: "4rem", // Adjust the size as needed
        marginBottom: "1rem",
        color: '#F2C918',
    },
    cardBody: {
        textAlign: "center",
    },
    rowSpacing: {
        marginBottom: "4rem",
    },
    circularProgress: {
        width: '50px', // Adjust size as needed
        height: '50px', // Adjust size as needed
    },

}));

export default function ArtistUpdateProfile({ user }) {
    const classes = useStyles();
    const history = useHistory();

    const handleBasicDetailClick = () => {
        console.log('Basic details clicked');
        history.push('/artist/artistdetail');
    };



    return (
        <div className="container">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '200px' }}>
                <CircularProgressbar
                    value={50}
                    text={`${50}%`}
                    styles={{ root: { width: 100 }, path: { color: 'red' } }}
                />
                
                <div style={{ marginTop: '20px', textAlign: 'center', color: '#333', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>
                    <h3 style={{ fontSize: '20px'}}>
                    Your profile shows great potential!

                    </h3>
                    <h5 style={{fontSize: '15px'}}>           
                    Continue adding information to unlock even better opportunities.
                </h5>
                </div>
                
            </div>

            <Row className={`${classes.rowSpacing} mb-3`}>
                <Col lg={3} md={6} sm={6} xs={6}>
                    <Card className={classes.card} onClick={handleBasicDetailClick}>
                        <Card.Body className={classes.cardBody}>
                            <AccountCircleIcon className={classes.icon} />
                            <Card.Text>Basic Details</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={3} md={6} sm={6} xs={6}>
                    <Card className={classes.card}>
                        <Card.Body className={classes.cardBody}>
                            <PersonIcon className={classes.icon} />
                            <Card.Text>Personal Details</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={3} md={6} sm={6} xs={6}>
                    <Card className={classes.card}>
                        <Card.Body className={classes.cardBody}>
                            <WorkIcon className={classes.icon} />
                            <Card.Text>Professional Details</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={3} md={6} sm={6} xs={6}>
                    <Card className={classes.card}>
                        <Card.Body className={classes.cardBody}>
                            <PublicIcon className={classes.icon} />
                            <Card.Text>Social Media</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className={`${classes.rowSpacing} mb-3`}>
                <Col lg={3} md={6} sm={6} xs={6}>
                    <Card className={classes.card}>
                        <Card.Body className={classes.cardBody}>
                            <SettingsIcon className={classes.icon} />
                            <Card.Text>Preference</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={3} md={6} sm={6} xs={6}>
                    <Card className={classes.card}>
                        <Card.Body className={classes.cardBody}>
                            <PhotoLibraryIcon className={classes.icon} />
                            <Card.Text>Photos</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={3} md={6} sm={6} xs={6}>
                    <Card className={classes.card}>
                        <Card.Body className={classes.cardBody}>
                            <VideoCameraFrontIcon className={classes.icon} style={{ fontSize: "5rem" }} />
                            <Card.Text>Videos</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={3} md={6} sm={6} xs={6}>
                    <Card className={classes.card}>
                        <Card.Body className={classes.cardBody}>
                            <FavoriteIcon className={classes.icon} />
                            <Card.Text>Special Services</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
