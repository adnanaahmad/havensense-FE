import * as React from 'react';
import { Box, Stack, Typography } from "@mui/material";
import { toggleBorder as isBorder } from "../../../core/styles/debugging-border";
import LogoImage from '../../../assets/havensense-logo-white.svg';

function Miscellaneous(props) {

    return (
        <Box sx={{border: isBorder ? '1px solid red' : 'none', width: '100%'}}>
            <Box sx={{background: '#0f1f27', paddingX: 2, paddingY: 8}}>
                <Stack sx={{position: 'relative', maxWidth: '850px', margin: 'auto'}}>
                    <Stack direction={'row'} alignItems='center'>
                        <Box component="img" sx={{objectFit: 'cover', height: 120, width: 120, position: 'absolute', left: -42}} src={LogoImage}/>
                        <Box sx={{height: 100, width: 40}}/>
                        <Typography variant='h5' fontWeight={500} color='white'>HavenSense</Typography>
                    </Stack>
                    <Typography variant='h2' fontWeight={500} color='white'>{props.data.title}</Typography>
                </Stack>
            </Box>
            <Box sx={{maxWidth: '850px', margin: 'auto', paddingX: 2, paddingY: 8}}>
                <Stack spacing={2}>
                    {
                        props.data.paragraphs.map((node, index) => (
                            <Stack key={index}>
                                <Typography variant='h6' fontWeight={600}>{node.title}</Typography>
                                <Typography variant='subtitle1'>{node.content}</Typography>
                                {
                                    node.list &&
                                    <ul>
                                        {
                                            node.list.map((element, i) => (
                                                <li key={i}><Typography variant='subtitle1'>{element}</Typography></li>
                                            ))
                                        }
                                    </ul> 
                                }
                            </Stack>
                        ))
                    }
                </Stack>
            </Box>
        </Box>
    )
}

export default React.memo(Miscellaneous);