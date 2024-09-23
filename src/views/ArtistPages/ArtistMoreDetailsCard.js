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
        width: '90%',
        height: '100%',
        color:'#3f403f',
    },
    PersonalcardContent: {

    },
    button: {
        width: '80%',
        height: '50%',
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center',
        border: '1px solid #aba8a7',
        position: 'relative',
        fontFamily: "playfair display",
        marginLeft: '10%',
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
        fontFamily: "playfair display",
        fontWeight: 'bold',
    },
    '@media (max-width: 600px)': {
        button: {
            width: '100%',
            border: 'None',
            marginLeft: 0,
        },
        personaldetailsCard:{
            width: '100%',
        }
    },
    
  
}));

export default function ArtistMoreDetailsCard() {
    const classes = useStyles();
    const [open, setOpen] = useState(false); // State to control the drawer open/close
    const [drawerType,setDrawerType] = useState("");

    const handleDrawerOpen = (value) => {
        setOpen(true);
        setDrawerType(value)
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Card className={classes.personaldetailsCard}>
                <Typography className={classes.Typography}>More About You</Typography>

                <CardContent className={classes.PersonalcardContent}>

                    {/* Add event listener to open drawer */}
                    <Button className={classes.button} onClick={() => handleDrawerOpen("current state")}>
                       Current State
                        <span className={classes.icon}>Add &nbsp;<ArrowForwardIosIcon style={{fontSize:'15px'}}/></span>
                    </Button>
                    <br />
                    <Button className={classes.button} onClick={() => handleDrawerOpen("weight")}>Current City
                        <span className={classes.icon}>Add &nbsp;<ArrowForwardIosIcon style={{fontSize:'15px'}}/></span>

                    </Button>
                    <br />

                    <Button className={classes.button}>Native State
                        <span className={classes.icon}>Add &nbsp;<ArrowForwardIosIcon style={{fontSize:'15px'}}/></span>

                    </Button>
                    <br />

                    <Button className={classes.button}>Native City
                        <span className={classes.icon}>Add &nbsp;<ArrowForwardIosIcon style={{fontSize:'15px'}}/></span>

                    </Button>
                    <br />

                    <Button className={classes.button}>Languages
                        <span className={classes.icon}>Add &nbsp;<ArrowForwardIosIcon style={{fontSize:'15px'}}/></span>

                    </Button>
                    <br />

                    <Button className={classes.button}>Skills
                        <span className={classes.icon}>Add &nbsp;<ArrowForwardIosIcon style={{fontSize:'15px'}}/></span>

                    </Button>
                    

                    <ArtistPopupDetails handleDrawerClose={handleDrawerClose} drawerType={drawerType} open={open}/>
                    
                </CardContent>
            </Card>
        </div>
    );
}
