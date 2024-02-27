import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Box, DialogContentText, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { httpMethod, apiRoute, stripePublicKey } from '../../../core/constants/constants';
import { catchAsync } from '../../../core/utils/catchAsync';
import { useSelector } from 'react-redux';
import { api as axios } from '../../../core/utils/interceptor';
const stripe = window.Stripe(stripePublicKey);


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const validate = values => {
  const errors = {};
  if (!values.amount) {
    errors.amount = 'Required';
  }
  return errors;
};

const DonationDialog = React.forwardRef((props, ref) => {
    const [open, setOpen] = React.useState(false);
    const token = useSelector((state) => state.userSlice.token);

    const formik = useFormik({
      initialValues: {
          amount: '',
      },
      validate,
      onSubmit: (form, {resetForm}) => {
          console.log(form);
          //alert(JSON.stringify(form));
          // 1. get checkout session from endpoint
          getCheckoutSession(form.amount);
          // 2. create checout form + charge credit card
      },
    });

    const handleClose = () => {
    setOpen(false);
    };


    React.useImperativeHandle(ref, () => ({
        handleClickOpen () {
          formik.resetForm();
          setOpen(true);
        }
    }));

    let getCheckoutSession = catchAsync(async (data) => {
      const res = await axios({
          method: httpMethod.get,
          url: apiRoute.donation + '/' + data,
          headers: {Authorization: `Bearer ${token}`},
      });
      //console.log(res.data.data);
      handleClose();
      stripe.redirectToCheckout({
        sessionId: res.data.data.id
      });
    });

  return (
    <Box>
        <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
            Donate
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            Please enter the amount in USD that you want to donate,
            and then click proceed to fill the payment details.
          </DialogContentText>
          <TextField
          id="amount"
          name="amount"
          value={formik.values.amount}
          onChange={formik.handleChange}
          error={formik.touched.amount && Boolean(formik.errors.amount)}
          label="Amount in USD"
          type="tel"
          variant="standard"
          fullWidth
          sx={{mt:2}}
          />
        </DialogContent>
        <DialogActions>
            <Button autoFocus onClick={formik.handleSubmit}>
            Proceed
            </Button>
        </DialogActions>
        </BootstrapDialog>
    </Box>
    );
})

export default DonationDialog;
