import * as React from 'react';
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import InputAdornment from '@mui/material/InputAdornment';
import { TextField } from "@mui/material";
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import ProductGrid from '../components/productGrid';
import { useSelector } from "react-redux";
import { productCategory as itemCategory } from "../../../../../core/constants/constants";

export default function Services() {
    const navigate = useNavigate();
    const marketplace = useSelector(((state) => state.marketplaceSlice.marketplace));
    const [search, setSearch] = React.useState('');
    const filteredResults = marketplace.filter(
        product => {
          return (
            product.category === itemCategory.service && !product.removed &&
            (
                product.name.toLowerCase().includes(search.toLowerCase()) ||
                product.user.name.toLowerCase().includes(search.toLowerCase())
            )
          );
        }
    );
    return(
        <Box sx={{width: '100%', paddingX:1}}>
            <Button sx={{mb: 2}} variant="text" onClick={() => navigate(-1)} startIcon={<KeyboardBackspaceOutlinedIcon />}>Back</Button>
            <Stack spacing={6}>
                <TextField
                id="search-market-service"
                label="Search by service..."
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
                <ProductGrid data={filteredResults}/>
            </Stack>
        </Box>
    )
}