// Stepper.jsx

import React from "react";
import { Step, Stepper as MuiStepper, StepLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        width: '100%',
        marginBottom: 20,
    },
});

const steps = ['Step 1: Personal Details', 'Step 2: Artist or Production House', 'Step 3: Additional Info']; // Add more steps as needed

export default function Stepper({ activeStep }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <MuiStepper activeStep={activeStep - 1} alternativeLabel>
                {steps.map((label, index) => (
                    <Step key={index}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </MuiStepper>
        </div>
    );
}
