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
import { Avatar } from '@mui/material';
import { red } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { Stack } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { Box } from '@mui/material';

const Input = styled('input')({
    display: 'none',
});

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

const EditProfileDialog = React.forwardRef((props, ref) => {
    const [open, setOpen] = React.useState(false);
    const token = useSelector((state) => state.userSlice.token);
    const user = useSelector((state) => state.userSlice.user);
    const [uploadFile, setUploadFile] = React.useState(null);
    const [s3File, setS3File] = React.useState(null);
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            name: '',
            bio: '',
        },
        onSubmit: (form) => {
            form = s3File ? {...form, media: s3File} : form;
            editUser(form);
        },
    });

    React.useImperativeHandle(ref, () => ({
        handleClickOpen() {     
            formik.setFieldValue('name', user.name);
            formik.setFieldValue('bio', user.bio);
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

    // On file select (from the pop up)
    const onFileChange = event => {
        // Update the state
        setUploadFile(event.target.files[0]);
    };

    React.useEffect(() => {
        let uploadFiletoS3 = catchAsync(async (url) => {
            const res = await fetch(url, {
                method: httpMethod.put,
                headers: {
                  "Content-Type": "multipart/form-data"
                },
                body: uploadFile
            });
            const fileUrl = res.url.split('?')[0];
            setS3File(fileUrl);
        });
        let getSignedUrl = catchAsync(async () => {
            const res = await axios({
                method: httpMethod.get,
                url: apiRoute.s3Url,
                headers: {Authorization: `Bearer ${token}`},
            });
            //console.log('url , ', res.data.data);
            uploadFiletoS3(res.data.data);
        });
        if(uploadFile) {
            //console.log(uploadFile);
            getSignedUrl();
        }    
    }, [uploadFile, token]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <BootstrapDialogTitle id="dialog-title" onClose={handleClose}>
          Edit Profile
        </BootstrapDialogTitle>
        <DialogContent>
            {
                (user.media || s3File) &&
                <Stack direction={'row'} justifyContent='center'>
                    <Box component="img" src={s3File ? s3File : user.media} sx={{objectFit: 'cover', height: 100, width: 100, borderRadius: 20}}/>
                </Stack>
            }
            {
                !user.media && !s3File &&
                <Avatar sx={{ bgcolor: red[500], width: 100, height: 100, fontSize: 38, margin:'auto' }}>
                    {user.name ? user.name.charAt(0).toUpperCase() : ''}
                </Avatar>
            }
            <Stack direction={'row'} justifyContent='center' mt={1}>
                <label htmlFor="contained-button-file" onChange={onFileChange}>
                    <Input accept="image/*" id="contained-button-file" multiple type="file" />
                    <Button component="span" endIcon={<CameraAltIcon/>}>
                        Upload
                    </Button>
                </label>
            </Stack>
            <TextField
              autoFocus
              id="name"
              name="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              fullWidth
              variant="standard"
              sx={{mb:3}}
            />
            <TextField
            id="bio"
            name="bio"
            label="Bio"
            value={formik.values.bio}
            onChange={formik.handleChange}
            error={formik.touched.bio && Boolean(formik.errors.bio)}
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
export default EditProfileDialog;
