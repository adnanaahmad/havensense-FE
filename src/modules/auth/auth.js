import * as React from "react";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ControllerImage from "../../assets/controller.svg";
import HeadphonesImage from "../../assets/headphones.svg";
import PhoneImage from "../../assets/phone.svg";
import SpeakerImage from "../../assets/speaker.svg";
import HavenSenseLogo from "../../assets/havensense-logo.svg";
import { DarkTheme } from "../../core/styles/themes/dark-theme";
import { ThemeProvider } from "@mui/material/styles";
import ImageComponent from "../../shared/components/imageComponent/imageComponent";
import { useStylesAuth } from "./styles/authStyle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";

export default function AuthenticationModule(props) {
  const classes = useStylesAuth();
  const theme = useTheme();
  const navigate = useNavigate();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("md"));
  const matchesLaptop = useMediaQuery(theme.breakpoints.down("lg"));
  const useEffect = React.useEffect;
  useEffect(() => {
    // preload modules
    console.log("auth module");
    props.data["Login"].preload();
    props.data["Signup"].preload();
    props.data["AccountStatus"].preload();
  }, [props.data]);
  return (
    <Box className={classes.parent}>
      <Stack direction="row" height="100%" width="100%">
        {!matchesMobile && (
          <Box className={classes.boxOne}>
            <div>
              <ImageComponent
                image={ControllerImage}
                className={classes.controller}
              />
              <ImageComponent
                image={HeadphonesImage}
                className={classes.headphones}
              />
              <ImageComponent
                image={PhoneImage}
                className={matchesLaptop ? classes.phoneSmall : classes.phone}
              />
              <ImageComponent
                image={SpeakerImage}
                className={classes.spearker}
              />
            </div>
            <Stack spacing={4} className={classes.boxOneStack}>
              <Stack direction="row">
                <ImageComponent
                  image={HavenSenseLogo}
                  className={classes.havenSenseLogo}
                />
                <Typography className={classes.havenSenseTxt}>
                  HavenSense
                </Typography>
              </Stack>
              <Typography variant="h3" color="text.primary" fontWeight={500}>
                Join The First Social Interactive Online Marketplace
              </Typography>
              <Typography component={'div'} color="text.secondary" sx={{maxWidth: !matchesLaptop ? '350px' : '300px'}}>
                <ul>
                  <li>
                    <b>Create</b> sports and gaming content and connect with
                    users using the Play-by-Play feed
                  </li>
                  <li>
                    <b>Build</b> your online community with our interactive
                    features
                  </li>

                  <li>
                    <b>Buy</b> and <b>sell</b> your favorite sports and gaming
                    digital products and services with safety
                  </li>
                </ul>
                {/* it is a social interactive marketplace for all things sports and
                gaming. (users can interact through uploading 60-seconds videos
                and gifs, chat, ask or answer questions on Forum and also on
                secured private chat. */}
              </Typography>
            </Stack>
          </Box>
        )}
        <ThemeProvider theme={DarkTheme}>
          <Box
            className={classes.boxTwo}
            sx={matchesMobile ? { width: "100%!important" } : {}}
          >
            <Stack
              className={classes.boxTwoStack}
              padding={1}
              spacing={3}
              justifyContent="center"
              alignItems="center"
            >
              {/* Router Outlet to show singup login form based on route */}
              <Outlet />
            </Stack>
            <Box sx={{position: 'absolute', bottom: 10, left: 0, width: '100%'}}>
              <Stack spacing={3}>
                <Stack direction={'row'} sx={{marginX: 'auto'}} spacing={2}>
                  <Link
                  className={classes.link}
                  sx={{ color: "text.primary" }}
                  component="button"
                  variant="subtitle2"
                  onClick={() => navigate("/about-us")}
                  >
                  About Us
                  </Link>
                  <Link
                  className={classes.link}
                  sx={{ color: "text.primary" }}
                  component="button"
                  variant="subtitle2"
                  onClick={() => navigate("/terms-and-conditions")}
                  >
                  Terms and Conditions
                  </Link>
                  <Link
                  className={classes.link}
                  sx={{ color: "text.primary" }}
                  component="button"
                  variant="subtitle2"
                  onClick={() => navigate("/privacy-policy")}
                  >
                  Privacy Policy
                  </Link>
                </Stack>
                <Typography color="text.secondary" textAlign={'center'} variant="caption">
                Copyright© HavenSense
                </Typography>
              </Stack>
            </Box>
          </Box>
        </ThemeProvider>
      </Stack>
    </Box>
  );
}
