import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import WeightDetails from './ArtistWeightDrawer';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CurrentStateDetails from './ArtistCurrentstateDetails';
const useStyles = makeStyles((theme) => ({
    drawer: {
        width: 400,
        flexShrink: 0,
    },
    drawerPaper: {
        width: 400,
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    button: {
        width: '100%',
        height: '80%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '2px solid #aba8a7',
        position: 'relative',
        fontFamily: 'playfair display',
    },
    icon: {
        position: 'absolute',
        left: '10px',
        fontFamily: 'Lora',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Lora',
        marginTop: '40%',
        fontSize: '30px',
        fontWeight: 'bold',
    },
    heightButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '30%',
        marginTop: '10%',
        width: '40%',
        border: '2px solid #aba8a7',
    },

    dialogPaper: {
        width: '20%',
        height: '40%',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
    },
    '@media (max-width: 768px)': {
        dialogPaper: {
            width: '100%',
            height: '40%',
            WebkitOverflowScrolling: 'touch',
        },
    }
}));

const HeightDetails = ({ handleDrawerClose, open }) => {
    const classes = useStyles();
    const [openDialogue, setOpenDialogue] = React.useState(false);
    const [selectedHeight, setSelectedHeight] = useState(150); // Initial height in cm
    const minHeight = 120;
    const maxHeight = 200;

    const handleClickOpenDialogue = () => {
        setOpenDialogue(true);
    };

    const handleCloseDialogue = () => {
        setOpenDialogue(false);
    };


    const handleScroll = (event) => {
        event.preventDefault();
        const delta = Math.max(-1, Math.min(1, event.deltaY));
        setSelectedHeight(prevHeight => {
            let newHeight = prevHeight - delta;
            if (newHeight < minHeight) {
                newHeight = minHeight;
            } else if (newHeight > maxHeight) {
                newHeight = maxHeight;
            }
            return newHeight;
        });
    };

    const handleSetHeight = () => {
        // Handle setting the selected height
    };

    return (
        <Drawer
            className={classes.drawer}
            variant="temporary"
            anchor="right"
            open={open}
            onClose={handleDrawerClose}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div>
                <Typography variant="h6" noWrap>
                    <Button className={classes.button} onClick={handleDrawerClose}>
                        <span className={classes.icon}><ArrowBackIosIcon style={{ fontSize: '15px' }} /></span>
                        Height
                    </Button>
                </Typography>

                <Typography className={classes.header}>What is your height?</Typography>
                <br />
                <Button className={classes.heightButton} onClick={handleClickOpenDialogue}>Select Height</Button>
                <Dialog onClose={handleCloseDialogue} open={openDialogue} PaperProps={{ className: classes.dialogPaper }}>
                    <DialogTitle></DialogTitle>
                    <div onWheel={handleScroll} style={{ overflowY: 'auto', maxHeight: '60vh', textAlign: 'center' }}>
                        {Array.from({ length: 3 }, (_, i) => selectedHeight - 1 + i).map((height, index) => (
                            <div key={index}>
                                {Math.round(height)}cm
                                {index < 2 && <hr />}
                            </div>
                        ))}
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '10px' }}>
                        <Button onClick={handleSetHeight} color="primary" variant="contained">Set</Button>
                        <Button onClick={handleCloseDialogue} color="default" variant="contained" style={{ marginLeft: '10px' }}>Cancel</Button>
                    </div>
                </Dialog>
            </div>



        </Drawer>
    );
};

export default function ArtistPopupDetails({ handleDrawerClose, drawerType, open }) {
    return (
        <div>
            {drawerType === "height" ? <HeightDetails handleDrawerClose={handleDrawerClose} open={open} />
                : drawerType === "weight" ? <WeightDetails handleDrawerClose={handleDrawerClose} open={open} /> :
                drawerType === "current state" ? <CurrentStateDetails handleDrawerClose={handleDrawerClose} open={open} /> :
                    null}


        </div>
    );
}
