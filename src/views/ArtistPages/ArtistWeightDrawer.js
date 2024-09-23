import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
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
        Weight: '80%',
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
    WeightButton: {
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
        Weight: '40%',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
    },
    '@media (max-width: 768px)': {
        dialogPaper: {
            width: '100%',
            Weight: '40%',
            WebkitOverflowScrolling: 'touch',
        },
    }
}));

const WeightDetails = ({ handleDrawerClose, open }) => {
    const classes = useStyles();
    const [openDialogue, setOpenDialogue] = React.useState(false);
    const [selectedWeight, setSelectedWeight] = useState(60); // Initial Weight in cm
    const minWeight = 10;
    const maxWeight = 120;

    const handleClickOpenDialogue = () => {
        setOpenDialogue(true);
    };

    const handleCloseDialogue = () => {
        setOpenDialogue(false);
    };


    const handleScroll = (event) => {
        event.preventDefault();
        const delta = Math.max(-1, Math.min(1, event.deltaY));
        setSelectedWeight(prevWeight => {
            let newWeight = prevWeight - delta;
            if (newWeight < minWeight) {
                newWeight = minWeight;
            } else if (newWeight > maxWeight) {
                newWeight = maxWeight;
            }
            return newWeight;
        });
    };

    const handleSetWeight = () => {
        // Handle setting the selected Weight
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
                        <span className={classes.icon}><ArrowBackIosIcon style={{fontSize:'15px'}}/></span>
                        Weight
                    </Button>
                </Typography>

                <Typography className={classes.header}>What is your Weight?</Typography>
                <br />
                <Button className={classes.WeightButton} onClick={handleClickOpenDialogue}>Select Weight</Button>
                <Dialog onClose={handleCloseDialogue} open={openDialogue} PaperProps={{ className: classes.dialogPaper }}>
                    <DialogTitle></DialogTitle>
                    <div onWheel={handleScroll} style={{ overflowY: 'auto', maxWeight: '60vh', textAlign: 'center' }}>
                        {Array.from({ length: 3 }, (_, i) => selectedWeight - 1 + i).map((Weight, index) => (
                            <div key={index}>
                                {Math.round(Weight)}cm
                                {index < 2 && <hr />}
                            </div>
                        ))}
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '10px' }}>
                        <Button onClick={handleSetWeight} color="primary" variant="contained">Set</Button>
                        <Button onClick={handleCloseDialogue} color="default" variant="contained" style={{ marginLeft: '10px' }}>Cancel</Button>
                    </div>
                </Dialog>
            </div>



        </Drawer>
    );
}; export default WeightDetails
