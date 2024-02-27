import * as React from 'react';
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { toggleBorder as isBorder } from "../../../../../core/styles/debugging-border";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import EditAboutDialog from '../dialogs/editAbout';

const iconColor = {color: '#6f6f6f'};

export default function About() {
    const { id } = useParams();
    const dialogRef = React.useRef();
    const [editBool, setEditBool] = React.useState(false);
    const user = useSelector((state) => state.profileSlice.user);
    const loggedInUser = useSelector((state) => state.userSlice.user);
    const data = [
        {icon: <LocationOnOutlinedIcon sx={iconColor}/>, text: user.location},
        {icon: <LanguageOutlinedIcon sx={iconColor}/>, text: user.portfolio},
        {icon: <CalendarMonthOutlinedIcon sx={iconColor}/>, text: user.dateCreated ? (new Date(user.dateCreated)).toDateString() : ''},
        {icon: <WorkOutlineOutlinedIcon sx={iconColor}/>, text: user.profession}
    ];

    React.useEffect(() => {
        // show edit button if a user has opened his own profile
        id === loggedInUser._id ? setEditBool(true) : setEditBool(false);
    },[id, loggedInUser._id]);

    function edit() {
        dialogRef.current.handleClickOpen();
    }
    
    return(
        <Box sx={{border: isBorder ? '1px solid red' : 'none', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
            <Stack spacing={2}>
                {
                    data.map((node, index) => (
                        <Stack key={index} direction='row' spacing={3} alignItems='center'>
                            {node.icon}
                            <Typography variant='body2'>{node.text}</Typography>
                        </Stack>
                    ))
                }
            </Stack>
            {
                editBool &&
                <IconButton size="small" onClick={edit}>
                    <EditOutlinedIcon/>
                </IconButton>
            }
            <EditAboutDialog ref={dialogRef}/>
        </Box>
    )
}