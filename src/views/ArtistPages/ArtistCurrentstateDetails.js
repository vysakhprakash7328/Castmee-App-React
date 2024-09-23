import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
const useStyles = makeStyles((theme) => ({
    button: {
        width: '5%',
        height: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: 'None',
        position: 'relative',
        fontFamily: 'playfair display',
    },
    icon: {
        position: 'absolute',
        left: '10px',
        fontFamily: 'Lora',
    },
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
  
}));

const CurrentStateDetails = ({ handleDrawerClose, open }) => {
    const classes = useStyles();
   


    return (
        <Drawer
            className={classes.drawer}
            variant="temporary"
            anchor="left"
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
                    </Button>
                    
                </Typography>

               
            </div>



        </Drawer>
    );
}; export default CurrentStateDetails
