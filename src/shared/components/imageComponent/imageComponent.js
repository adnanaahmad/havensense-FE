import Box from '@mui/material/Box';

function ImageComponent(props) {
    return (
        <Box component="img"
        sx={{...{position: 'absolute', objectFit: 'cover'}, ...props.sx}}
        alt="The house from the offer."
        src={props.image}
        className={props.className}
        />
    );
}

export default ImageComponent;