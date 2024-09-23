import React, { useState } from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ArtistPopupDetails from "./artistPopupDetails";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import StraightenIcon from '@mui/icons-material/Straighten';
import { Row, Col } from 'react-bootstrap';

const useStyles = makeStyles((theme) => ({
    personaldetailsCard: {
        marginTop: '10px',
        width: '100%',
        height: '100%',
        color: '#3f403f',
    },
    PersonalcardContent: {},
    button: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        border: 'none',
        position: 'relative',
        fontFamily: "Playfair Display",
        textTransform: 'none',
        marginBottom: '10px',
    },
    icon: {
        position: 'absolute',
        right: '10px',
        fontFamily: "Lora",
    },
    Typography: {
        marginLeft: '30px',
        marginTop: '10px',
        fontSize: '30px',
        fontFamily: "Playfair Display",
        fontWeight: 'bold',
    },
    '@media (max-width: 600px)': {
        button: {
            width: '100%',
            marginLeft: 0,
        },
        Typography: {
            fontSize: '24px',
            marginLeft: '20px',
        },
    },
}));

export default function ArtistPersonalDetailsCard() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [drawerType, setDrawerType] = useState("");

    const handleDrawerOpen = (value) => {
        setOpen(true);
        setDrawerType(value);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Card className={classes.personaldetailsCard}>
                <Typography className={classes.Typography}>About You</Typography>
                <CardContent className={classes.PersonalcardContent}>
                    <Row>
                        <Col md={6}>
                            <Button className={classes.button} onClick={() => handleDrawerOpen("height")}>
                                <StraightenIcon style={{ fontSize: '20px' }} /> &nbsp; &nbsp; Height
                                <span className={classes.icon}>Add &nbsp;<ArrowForwardIosIcon style={{ fontSize: '15px' }} /></span>
                            </Button>
                            <Button className={classes.button} onClick={() => handleDrawerOpen("weight")}>
                                Weight
                                <span className={classes.icon}>Add &nbsp;<ArrowForwardIosIcon style={{ fontSize: '15px' }} /></span>
                            </Button>
                            <Button className={classes.button} onClick={() => handleDrawerOpen("hairType")}>
                                Hair Type
                                <span className={classes.icon}>Add &nbsp;<ArrowForwardIosIcon style={{ fontSize: '15px' }} /></span>
                            </Button>
                            <Button className={classes.button} onClick={() => handleDrawerOpen("hairColor")}>
                                Hair Color
                                <span className={classes.icon}>Add &nbsp;<ArrowForwardIosIcon style={{ fontSize: '15px' }} /></span>
                            </Button>
                            <Button className={classes.button} onClick={() => handleDrawerOpen("bodyType")}>
                                Body Type
                                <span className={classes.icon}>Add &nbsp;<ArrowForwardIosIcon style={{ fontSize: '15px' }} /></span>
                            </Button>
                            <Button className={classes.button} onClick={() => handleDrawerOpen("eyeColor")}>
                                Eye Color
                                <span className={classes.icon}>Add &nbsp;<ArrowForwardIosIcon style={{ fontSize: '15px' }} /></span>
                            </Button>
                            <Button className={classes.button} onClick={() => handleDrawerOpen("skinColor")}>
                                Skin Color
                                <span className={classes.icon}>Add &nbsp;<ArrowForwardIosIcon style={{ fontSize: '15px' }} /></span>
                            </Button>
                        </Col>
                        <Col md={6}>
                            <Button className={classes.button} onClick={() => handleDrawerOpen("current state")}>
                                Current State
                                <span className={classes.icon}>Add &nbsp;<ArrowForwardIosIcon style={{ fontSize: '15px' }} /></span>
                            </Button>
                            <Button className={classes.button} onClick={() => handleDrawerOpen("weight")}>Current City
                                <span className={classes.icon}>Add &nbsp;<ArrowForwardIosIcon style={{ fontSize: '15px' }} /></span>

                            </Button>
                            

                            <Button className={classes.button}>Native State
                                <span className={classes.icon}>Add &nbsp;<ArrowForwardIosIcon style={{ fontSize: '15px' }} /></span>

                            </Button>
                            

                            <Button className={classes.button}>Native City
                                <span className={classes.icon}>Add &nbsp;<ArrowForwardIosIcon style={{ fontSize: '15px' }} /></span>

                            </Button>
                            

                            <Button className={classes.button}>Languages
                                <span className={classes.icon}>Add &nbsp;<ArrowForwardIosIcon style={{ fontSize: '15px' }} /></span>

                            </Button>
                            

                            <Button className={classes.button}>Skills
                                <span className={classes.icon}>Add &nbsp;<ArrowForwardIosIcon style={{ fontSize: '15px' }} /></span>

                            </Button>


                        </Col>
                    </Row>
                    <ArtistPopupDetails handleDrawerClose={handleDrawerClose} drawerType={drawerType} open={open} />
                </CardContent>
            </Card>
        </div>
    );
}
