import * as React from 'react';
import { Box } from "@mui/material";
import { toggleBorder as isBorder } from "../../../../core/styles/debugging-border";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Outlet } from "react-router-dom";
import { api as axios } from "../../../../core/utils/interceptor";
import { apiRoute, httpMethod } from "../../../../core/constants/constants";
import { catchAsync } from "../../../../core/utils/catchAsync";
import { useSelector, useDispatch } from "react-redux";
import { updateMarketplace } from "../../slice/marketplaceSlice";

export default function Marketplace() {
    const theme = useTheme();
    const matchesTablet = useMediaQuery(theme.breakpoints.down('md'));
    const dispatch = useDispatch();
    const token = useSelector((state) => state.userSlice.token);
    React.useEffect(() => {
        let getMarketplace = catchAsync(async () => {
            const res = await axios({
                method: httpMethod.get,
                url: apiRoute.marketplace,
                headers: {Authorization: `Bearer ${token}`},
            });
            dispatch(updateMarketplace({marketplace: res.data.data.marketplace}));
        });
        getMarketplace();
    }, [token, dispatch]);

    return (
        <Box sx={{border: isBorder ? '1px solid red' : 'none', maxWidth: '850px', width: '100%', paddingY: 2, mb: matchesTablet ? 8 : 4}}>
            <Outlet/>
        </Box>
    )
}