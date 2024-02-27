import * as React from 'react';
import { catchAsync } from "../../../core/utils/catchAsync";
import { httpMethod, apiRoute } from "../../../core/constants/constants";
import ProductGrid from "./marketplace/components/productGrid";
import { useSelector } from 'react-redux';
import { api as axios } from '../../../core/utils/interceptor';
import { toggleBorder as isBorder } from '../../../core/styles/debugging-border';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box } from '@mui/material';

export default function ProductsAndServices() {
    const theme = useTheme();
    const matchesTablet = useMediaQuery(theme.breakpoints.down('md'));
    const token = useSelector((state) => state.userSlice.token);
    const [productsAndServices, setProductsAndServices] = React.useState([]);

    React.useEffect(() => {
        let getProductsAndServices = catchAsync(async () => {
            const res = await axios({
                method: httpMethod.get,
                url: apiRoute.productsAndServices,
                headers: {Authorization: `Bearer ${token}`},
            });
            let data = res.data.data.marketplace.filter(x => !x.removed);
            setProductsAndServices(data);
        });
        getProductsAndServices();
    }, [token]);
    return (
        <Box sx={{border: isBorder ? '1px solid red' : 'none', maxWidth: '850px', width: '100%', paddingY: 2, paddingX:1, mb: matchesTablet ? 8 : 4}}>
            <ProductGrid data={productsAndServices}/>
        </Box>
    )
}