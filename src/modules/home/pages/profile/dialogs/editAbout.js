import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { httpMethod, apiRoute } from '../../../../../core/constants/constants';
import { api as axios } from '../../../../../core/utils/interceptor';
import { catchAsync } from '../../../../../core/utils/catchAsync';
import { updateUser } from '../../../slice/profileSlice';
import { setUserDetails } from '../../../../auth/slice/userSlice';

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

const EditAboutDialog = React.forwardRef((props, ref) => {
    const [open, setOpen] = React.useState(false);
    const token = useSelector((state) => state.userSlice.token);
    const user = useSelector((state) => state.userSlice.user);
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            location: '',
            portfolio: '',
            profession: ''
        },
        onSubmit: (form) => {
            editUser(form);
        },
    });

    React.useImperativeHandle(ref, () => ({
        handleClickOpen() {     
            formik.setFieldValue('location', user.location);
            formik.setFieldValue('portfolio', user.portfolio);
            formik.setFieldValue('profession', user.profession);
            setOpen(true);
        }
    }))

    const handleClose = () => {
        setOpen(false);
    };

    let editUser = catchAsync(async (form) => {
        const res = await axios({
            method: httpMethod.patch,
            url: apiRoute.user,
            headers: {Authorization: `Bearer ${token}`},
            data: form,
        });
        dispatch(setUserDetails({user: res.data.data.user}));
        dispatch(updateUser({user: res.data.data.user}));
        handleClose();
    });

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <BootstrapDialogTitle id="dialog-title" onClose={handleClose}>
          Edit About
        </BootstrapDialogTitle>
        <DialogContent>
            <TextField
              autoFocus
              id="location"
              name="location"
              label="Location"
              value={formik.values.location}
              onChange={formik.handleChange}
              error={formik.touched.location && Boolean(formik.errors.location)}
              fullWidth
              variant="standard"
              sx={{mb:3}}
            />
            <TextField
            id="portfolio"
            name="portfolio"
            label="Portfolio"
            value={formik.values.portfolio}
            onChange={formik.handleChange}
            error={formik.touched.portfolio && Boolean(formik.errors.portfolio)}
            fullWidth
            variant="standard"
            sx={{mb:3}}
            />
            <TextField
              autoFocus
              id="profession"
              name="profession"
              label="Profession"
              value={formik.values.profession}
              onChange={formik.handleChange}
              error={formik.touched.profession && Boolean(formik.errors.profession)}
              fullWidth
              variant="standard"
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={formik.handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});
export default EditAboutDialog;
