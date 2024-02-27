import Grid from '@mui/material/Grid';
import ProductCard from "./productCard";
import { Box } from '@mui/material';


export default function ProductGrid(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 12, md: 12 }}>
        {props.data.map((node, index) => (
          <Grid item xs={2} sm={4} md={3} key={index}>
            <ProductCard data={node}/>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}