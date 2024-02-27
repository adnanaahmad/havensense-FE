import * as React from "react";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { api as axios } from "../../../core/utils/interceptor";
import { apiRoute, httpMethod } from "../../../core/constants/constants";
import { catchAsync } from "../../../core/utils/catchAsync";
import { setToken } from "../slice/userSlice";
// import GoogleIcon from '../../../assets/google.svg';
// import FacebookIcon from '../../../assets/facebook.svg';
// import AppleIcon from '../../../assets/apple.svg';
// import TwitterIcon from '../../../assets/twitter.svg';
//import ImageComponent from '../../../shared/components/imageComponent/imageComponent';
import { useStylesLogin } from "../styles/loginStyle";

function Login() {
  const classes = useStylesLogin();
  //const socialMediaIcons = [GoogleIcon, FacebookIcon, TwitterIcon, AppleIcon];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (form) => loginUser(form),
  });

  let routeTo = (path) => navigate(path);

  let loginUser = catchAsync(async (form) => {
    const loginData = await axios({
      method: httpMethod.post,
      url: apiRoute.login,
      data: form,
    });
    localStorage.setItem("token", loginData.data.token);
    dispatch(setToken({ token: loginData.data.token }));
    routeTo("/home");
  });
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
          size="large"
          disableElevation
          onClick={formik.handleSubmit}
          sx={{ color: "text.primary" }}
        >
          Login
        </Button>
        {/* <Stack direction='row' justifyContent='space-between' alignItems='center' width='100%'>
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
            Not a member yet?
          </Typography>
          <Link
            className={classes.link}
            component="button"
            variant="subtitle1"
            onClick={() => routeTo("/register")}
            sx={{ color: "text.primary" }}
          >
            Sign Up
          </Link>
        </Stack>
        {/* <Stack>
                    <Typography color='text.primary' textAlign='center'>Never received or forgot your password?</Typography>
                    <Typography color='text.primary' textAlign='center' fontWeight={500}>Reset Password</Typography>
                </Stack> */}
      </Stack>
    </Box>
  );
}
export default Login;
