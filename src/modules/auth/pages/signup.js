import * as React from "react";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { api as axios } from "../../../core/utils/interceptor";
import { apiRoute, httpMethod } from "../../../core/constants/constants";
// import GoogleIcon from '../../../assets/google.svg';
// import FacebookIcon from '../../../assets/facebook.svg';
// import AppleIcon from '../../../assets/apple.svg';
// import TwitterIcon from '../../../assets/twitter.svg';
//import ImageComponent from '../../../shared/components/imageComponent/imageComponent';
import { useStylesLogin } from "../styles/loginStyle";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function Signup() {
  const classes = useStylesLogin();
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  //const socialMediaIcons = [GoogleIcon, FacebookIcon, TwitterIcon, AppleIcon];
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: (form) => {
      setOpenBackdrop(true);
      signup(form);
    },
  });

  let routeTo = (path) => navigate(path);

  let signup = async (form) => {
    try {
      await axios({
        method: httpMethod.post,
        url: apiRoute.signup,
        data: { ...form, confirmPassword: form.password },
      });
      setOpenBackdrop(false);
      routeTo("/account-status");
    } catch (error) {
      alert(error.response.data.message);
      setOpenBackdrop(false);
    }
  };
  return (
    <Box className={classes.parent}>
      <Stack spacing={3}>
        <Typography color="text.primary" variant="h5" fontWeight={500}>
          Join millions of gamers and sports fans from around the world
        </Typography>
        <Typography color="text.secondary">
          A platform where users can buy and sell their favorite digital
          products and digital services in sports and gaming with safety.
        </Typography>
        <Stack component="form" spacing={2}>
          <TextField
            id="name"
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            type="text"
            fullWidth
          />
          <TextField
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            type="email"
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            label="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            type="password"
            fullWidth
          />
        </Stack>
        <Button
          className={classes.button}
          variant="contained"
          sx={{ color: "text.primary" }}
          size="large"
          disableElevation
          onClick={formik.handleSubmit}
        >
          Sign Up
        </Button>
        {/* <Stack direction='row' width='100%' justifyContent='space-between' alignItems='center'>
                    <div className={classes.border}></div>
                    <Typography color='text.primary' fontSize='x-small' >Or Sign up with</Typography>
                    <div className={classes.border}></div>
                </Stack> */}
        {/* <Stack direction='row' justifyContent='center' spacing={3}>
                    {
                        socialMediaIcons.map((icon, index) => (
                            <ImageComponent key={index} image={icon} className={classes.socialMedia}/>
                        ))
                    }
                </Stack> */}
        <Stack>
          <Typography color="text.primary" textAlign="center">
            Already have an account
          </Typography>
          <Link
            className={classes.link}
            component="button"
            variant="subtitle1"
            onClick={() => routeTo("/login")}
            sx={{ color: "text.primary" }}
          >
            Login
          </Link>
        </Stack>
        {/* <Stack>
                    <Typography color='text.primary' textAlign='center'>Never received or forgot your password?</Typography>
                    <Typography color='text.primary' textAlign='center' fontWeight={500}>Reset Password</Typography>
                </Stack> */}
      </Stack>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
}
export default Signup;
