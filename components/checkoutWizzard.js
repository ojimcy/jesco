import useStyles from '@/utils/styles';
import { Step, StepLabel, Stepper } from '@mui/material';
import React from 'react';

export default function CheckoutWizard({ activeStep = 0 }) {
  const classes = useStyles()
  return (
    <Stepper
      activeStep={activeStep}
      alternativeLabel
      className={classes.checkoutWizzard}
    >
      {['Login', 'Shipping Address', 'Payment Method', 'Place Order'].map(
        (step) => (
          <Step key={step}>
            <StepLabel>{step}</StepLabel>
          </Step>
        )
      )}
    </Stepper>
  );
}
