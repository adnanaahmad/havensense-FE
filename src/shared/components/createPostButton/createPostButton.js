import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography, Stack, CardActionArea } from '@mui/material';
import VideoFileOutlinedIcon from '@mui/icons-material/VideoFileOutlined';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';

export default function CreatePost(props) {
    const iconDivStyle = {padding: '5px 8px', borderRadius: '50%'};
    const iconColor= {color: '#757575'};
    return(
        <Card sx={{ minWidth: '50px', width: '100%' }} variant='outlined'>
            <CardActionArea sx={{p:.5}} onClick={() => props.createPost()}>
                <CardContent sx={{p:'0 !important'}}>
                    <Stack direction='row' justifyContent='space-between' alignItems='center'>
                        <Typography sx={{mb:0, ml:1}} color="text.secondary">Create a post...</Typography>
                        <Stack direction='row' spacing={2}>
                            <div style={iconDivStyle}><TextSnippetOutlinedIcon sx={iconColor}/></div>
                            <div style={iconDivStyle}><VideoFileOutlinedIcon sx={iconColor}/></div>                            
                        </Stack>
                    </Stack>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
