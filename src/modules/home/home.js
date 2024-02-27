import * as React from "react";
import { Link, Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import SupportImage from "../../assets/support.svg";
import ImageComponent from "../../shared/components/imageComponent/imageComponent";
import { ThemeProvider } from "@mui/material/styles";
import { LightTheme } from "../../core/styles/themes/light-theme";
import { makeStyles, createStyles } from "@mui/styles";
import { toggleBorder as isBorder } from "../../core/styles/debugging-border";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import HavenSenseLogo from "../../assets/havensense-logo.svg";
import AccountMenu from "./components/menu";
import SearchBar from "./components/searchBar";
import BottomBar from "./components/bottomBar";
import { navigationItems as items } from "../../core/constants/constants";
import { useLocation } from "react-router-dom";
import { titleCase } from "../../core/utils/titleCase";
import { Avatar, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import DonationDialog from "./dialogs/donation";
import { api as axios } from "../../core/utils/interceptor";
import { catchAsync } from "../../core/utils/catchAsync";
import { apiRoute, httpMethod, usersNavItem, role } from "../../core/constants/constants";
import { updateCart } from "./slice/cartSlice";

const drawerWidth = 250;

export const useStyles = makeStyles((theme) =>
  createStyles({
    header: {
      minHeight: "48px !important",
      position: "relative",
      display: "flex",
      justifyContent: "space-between",
    },
    havensense: {
      height: "100px",
      width: "100px",
      top: "-25px",
      left: "-25px",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      "& .MuiDrawer-paper": {
        width: drawerWidth,
        boxSizing: "border-box",
        borderWidth: isBorder ? 1 : 0,
      },
    },
    rightColumnStack: {
      border: isBorder ? "1px solid red" : "none",
      justifyContent: "center",
    },
    rightColumnStackContent: {
      width: "230px",
      marginLeft: "auto",
      marginRight: "auto",
    },
    supportDiv: {
      position: "relative",
    },
    support: {
      height: "350px",
      width: "160px",
      top: 0,
      left: "40px",
    },
    listItemButton: {
      minHeight: 48,
      justifyContent: "initial",
      px: 2.5,
    },
    listItemIcon: {
      minWidth: 0,
      justifyContent: "center",
    },
  })
);

export default function HomeModule(props) {
  const location = useLocation();
  const classes = useStyles();
  const theme = useTheme();
  const matchesLaptop = useMediaQuery(theme.breakpoints.up("lg"));
  const matchesMobile = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userSlice.token);
  const user = useSelector((state) => state.userSlice.user);
  const useEffect = React.useEffect;
  const [tab, setTab] = React.useState(0);
  const handleChange = (event, newValue) => {
    setTab(newValue);
  };
  const dialogRef = React.useRef();
  function openDonation() {
    dialogRef.current.handleClickOpen();
  }
  // user avatar
  const getUserAvatar = (user, height, width, borderRadius, fontSize) => {
    return user.media ? (
      <Box
        component="img"
        sx={{ objectFit: "cover", height, width, borderRadius }}
        src={user.media}
      />
    ) : (
      <Avatar
        sx={{ bgcolor: "#bdbdbd", height, width, fontSize }}
        aria-label="img"
      >
        {user.name ? user.name.charAt(0).toUpperCase() : ""}
      </Avatar>
    );
  };
  const profileItem = {
    id: 4,
    name: titleCase(user.name),
    icon: getUserAvatar(user, 25, 25, 10, 16),
    route: `profile/${user._id}`,
  };

  useEffect(() => {
    // preload modules
    console.log("home module");
    props.data["Profile"].preload();
    props.data["PlayByPlay"].preload();
    props.data["ProductsAndServices"].preload();
    props.data["Marketplace"].preload();
    props.data["Orders"].preload();
  }, [props.data]);

  // highlight tab based on location
  React.useMemo(
    () =>
      (() => {
        const index = items.findIndex((x) => location.pathname === x.pathName);
        setTab(index !== -1 ? items[index].id : false);
      })(),
    [location]
  );

  // get cart
  useEffect(() => {
    let getCart = catchAsync(async () => {
      const res = await axios({
        method: httpMethod.get,
        url: apiRoute.cart,
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(updateCart({ cart: res.data.data.cart }));
    });
    getCart();
  }, [token, dispatch]);

  return (
    <ThemeProvider theme={LightTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {/* header */}
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            background: "white",
          }}
          elevation={0}
          variant="outlined"
        >
          <Toolbar className={classes.header}>
            <div>
              <ImageComponent
                image={HavenSenseLogo}
                className={classes.havensense}
              />
              <Stack
                direction={"row"}
                alignItems="center"
                marginLeft={matchesLaptop ? 4 : 0}
                sx={{ position: "absolute", top: 4 }}
              >
                {matchesLaptop && (
                  <Typography fontWeight={500} color="#585858">
                    HavenSense
                  </Typography>
                )}
                <SearchBar />
              </Stack>
              <div style={{ width: 100 }} />
            </div>
            {!matchesMobile && (
              <Box sx={{ margin: "auto" }}>
                <Tabs value={tab} onChange={handleChange} centered>
                  {items.map((node, index) => (
                    <Tab
                      key={index}
                      component={Link}
                      icon={node.icon}
                      to={node.route}
                    />
                  ))}
                </Tabs>
              </Box>
            )}
            <AccountMenu />
          </Toolbar>
        </AppBar>
        {/* side navigation */}
        {matchesLaptop && (
          <Drawer variant="permanent" className={classes.drawer}>
            <Toolbar />
            <Box sx={{ overflow: "auto" }}>
              <List>
                {[profileItem, ...items, ...(user.role === role.admin ? [usersNavItem] : [])].map((node, index) => (
                  <ListItemButton
                    component={Link}
                    to={node.route}
                    key={index}
                    className={classes.listItemButton}
                  >
                    <ListItemIcon
                      className={classes.listItemIcon}
                      sx={{ mr: 3 }}
                    >
                      {node.icon}
                    </ListItemIcon>
                    <ListItemText
                      disableTypography
                      sx={{ mb: 0 }}
                      primary={
                        <Typography variant="body2">{node.name}</Typography>
                      }
                    />
                  </ListItemButton>
                ))}
              </List>
            </Box>
          </Drawer>
        )}
        {/* router outlet */}
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Toolbar />
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Outlet />
          </Box>
        </Box>
        {/* right column */}
        {matchesLaptop && (
          <Drawer
            variant="permanent"
            anchor="right"
            className={classes.drawer}
            sx={{ "& .MuiDrawer-paper": { background: "#fafafb" } }}
          >
            <Toolbar />
            <Stack className={classes.rightColumnStack}>
              <div className={classes.supportDiv}>
                <ImageComponent
                  image={SupportImage}
                  className={classes.support}
                />
              </div>
              <Stack
                marginTop={40}
                spacing={2}
                className={classes.rightColumnStackContent}
              >
                <Typography
                  textAlign="center"
                  variant="h5"
                  color="primary"
                  fontWeight={500}
                >
                  Support HavenSense
                </Typography>
                <Typography textAlign="center" variant="body2">
                  Donate to support us, so we continue to bring you a platform
                  where a beautiful community lives.
                </Typography>
              </Stack>
              <Button
                onClick={() => openDonation()}
                variant="outlined"
                sx={{ mt: 4, width: 200, marginX: "auto", borderRadius: 10 }}
                startIcon={<CreditCardOutlinedIcon />}
              >
                Pay Now
              </Button>
            </Stack>
          </Drawer>
        )}
      </Box>
      <DonationDialog ref={dialogRef} />
      {matchesMobile && <BottomBar />}
    </ThemeProvider>
  );
}
