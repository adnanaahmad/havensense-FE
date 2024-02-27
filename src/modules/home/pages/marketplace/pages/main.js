import * as React from 'react';
import { Box, Stack, Typography } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import InputAdornment from '@mui/material/InputAdornment';
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Link } from "react-router-dom";
import ProductDialog from "../dialogs/productDialog";
import { useSelector } from 'react-redux';
import { productCategory as itemCategory } from '../../../../../core/constants/constants';
import ProductGrid from '../components/productGrid';

function Category(props) {
    const theme = useTheme();
    const matchesTablet = useMediaQuery(theme.breakpoints.down('md'));
    const matchesMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return(
        <Stack spacing={2}>
            <Stack direction={'row'} justifyContent='space-between' alignItems={'center'}>
                <Typography variant='h6'>{props.data.category}</Typography>
                <Link to={props.data.route} style={{textDecoration: 'none'}}>
                    <Typography variant='subtitle2' color='primary'>View All</Typography>
                </Link>
            </Stack>       
            <ProductGrid data={matchesMobile ? props.data.items.slice(0, 2) : matchesTablet ? props.data.items.slice(0, 3) : props.data.items.slice(0, 4)}/>               
        </Stack>
    )
}

export default function MarketplaceMain() {
    const dialogRef = React.useRef();
    const [search, setSearch] = React.useState('');
    const marketplace = useSelector((state) => state.marketplaceSlice.marketplace);
    const filteredResults = marketplace.filter(
        product => {
          return (
            !product.removed &&
            (
                product
                .name
                .toLowerCase()
                .includes(search.toLowerCase()) ||
                product
                .user
                .name
                .toLowerCase()
                .includes(search.toLowerCase())
            )
          );
        }
    );
    const [products, setProducts] = React.useState([]);
    const [services, setServices] = React.useState([]);
    const [digitals, setDigitals] = React.useState([]);
    function addProduct() {
        dialogRef.current.handleClickOpen('create');
    }
    React.useMemo(() => 
    (() => {
      setProducts(marketplace.filter(x => x.category === itemCategory.product && !x.removed));
      setServices(marketplace.filter(x => x.category === itemCategory.service && !x.removed));
      setDigitals(marketplace.filter(x => x.category === itemCategory.digital && !x.removed));
    })(), [marketplace]);

    return (
        <Box sx={{width: '100%', paddingX:1}}>
            <Stack direction={'row'} justifyContent='space-between' alignItems='center' sx={{mb:2}}>
                <Typography variant="h6">Marketplace</Typography>
                <Button variant="contained" sx={{color: 'white'}} size='small' startIcon={<AddOutlinedIcon />} onClick={() => addProduct()}>
                    Sell Product/Service
                </Button>
            </Stack>
            <Stack spacing={6}>
                <TextField
                id="search-market"
                label="Search by name or seller ..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                    endAdornment: (
                    <InputAdornment position="end">
                        <SearchOutlinedIcon />
                    </InputAdornment>
                    ),
                }}
                variant="standard"
                />
                {
                    !search &&
                    <React.Fragment>
                        <Category data={{category: 'Services', route: 'services', items: services}} />
                        <Category data={{category: 'Products', route: 'products', items: products}} />
                        <Category data={{category: 'NFTS, Digital Collectibles', route: 'digital-collectibles', items: digitals}} />
                    </React.Fragment>
                }
                {
                    search &&
                    <ProductGrid data={filteredResults}/>
                }
            </Stack>
            <ProductDialog ref={dialogRef}/>
        </Box>
    )
}