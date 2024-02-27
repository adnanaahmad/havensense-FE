import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from "react-router-dom";
import { api as axios } from '../../../core/utils/interceptor';
import {apiRoute, httpMethod} from '../../../core/constants/constants';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useStylesLogin } from '../styles/loginStyle';

export default function AccountStatus(){
    const classes = useStylesLogin();
    const useEffect = React.useEffect;
    const [searchParams] = useSearchParams();
    const [token] = React.useState(searchParams.get("token"));
    const navigate = useNavigate();
    const [accountStatus, setAccountStatus] = React.useState(null);

    useEffect(() => {
        let verifyUser = async (token) => {
            try {
                await axios({
                    method: httpMethod.patch,
                    url: apiRoute.verify,
                    headers: {Authorization: `Bearer ${token}`}
                });
                // account status active screen
                setAccountStatus(() => 'active');
            } catch (error) {
                // something went wrong screen
                setAccountStatus(() => 'error');
            }
        };
        if(token) {verifyUser(token)};
    }, [token]);

    return(
        <Box className={classes.parent}>
            <Stack spacing={3}>
                {
                    !token &&
                    <Stack spacing={3}>
                        <Typography color='text.primary' variant='h5' fontWeight={500} textAlign='center'>Verify Account</Typography>
                        <Typography color='text.secondary' textAlign='center'>Check your inbox for verfication email.</Typography>
                    </Stack>
                }
                {
                    token && accountStatus && accountStatus === 'active' &&
                    <Stack spacing={3}>
                        <Typography color='text.primary' variant='h5' fontWeight={500} textAlign='center'>Congratulations</Typography>
                        <Typography color='text.secondary' textAlign='center'>Your account is now active. Please sign in to proceed.</Typography>
                    </Stack>
                }
                {
                    token && accountStatus && accountStatus === 'error' &&
                    <Stack spacing={3}>
                        <Typography color='text.primary' variant='h5' fontWeight={500} textAlign='center'>Something went wrong</Typography>
                        <Typography color='text.secondary' textAlign='center'>Please try again.</Typography>
                    </Stack>
                }
                {
                    token && accountStatus && accountStatus === 'active' &&
                    <Button className={classes.button} variant='contained' size="large" disableElevation onClick={() => navigate('/login')} sx={{color: 'text.primary'}}>
                        Go to login
                    </Button>
                }
            </Stack>
        </Box>    
    )
}