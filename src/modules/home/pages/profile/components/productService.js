import * as React from 'react';
import { Box } from "@mui/material";
import { toggleBorder as isBorder } from "../../../../../core/styles/debugging-border";
import { catchAsync } from "../../../../../core/utils/catchAsync";
import { api as axios } from "../../../../../core/utils/interceptor";
import { httpMethod, apiRoute } from "../../../../../core/constants/constants";
import { useSelector } from "react-redux";
import ProductCard from "../../marketplace/components/productCard";
import { useParams } from "react-router-dom";
import { Grid } from '@mui/material';

export default function ProductsAndServices() {
    const { id } = useParams();
    const token = useSelector((state) => state.userSlice.token);
    const [productsAndServices, setProductsAndServices] = React.useState([]);

    React.useEffect(() => {
        let getProductsAndServices = catchAsync(async () => {
            const res = await axios({
                method: httpMethod.get,
                url: apiRoute.productsAndServices+`/${id}`,
                headers: {Authorization: `Bearer ${token}`},
            });
            let data = res.data.data.marketplace.filter(x => !x.removed);
            setProductsAndServices(data);
        });
        getProductsAndServices();
    }, [token, id]);
    return(
        <Box sx={{border: isBorder ? '1px solid red' : 'none', width: '100%'}}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 12, md: 12 }}>
                {productsAndServices.map((node, index) => (
                <Grid item xs={2} sm={4} md={4} key={index}>
                    <ProductCard data={node}/>
                </Grid>
                ))}
            </Grid>
        </Box>
    )
}