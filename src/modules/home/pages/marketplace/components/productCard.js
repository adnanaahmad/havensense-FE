import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Stack } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

export default function ProductCard(props) {
  const navigate = useNavigate();
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down('sm'));
  function yearDiff(dt2, dt1) {
    var diff =(dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60 * 24);
    return Math.abs(Math.round(diff/365.25));
  }
  function monthDiff(d1, d2) {
    let months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  }
  function getTime(dateCreated) {
    const today = new Date();
    const years = yearDiff(today, dateCreated);
    const months = monthDiff(dateCreated, today);
    const days = parseInt((today - dateCreated) / (1000 * 60 * 60 * 24));
    const hours = parseInt(Math.abs(today - dateCreated) / (1000 * 60 * 60) % 24);
    const minutes = parseInt(Math.abs(today.getTime() - dateCreated.getTime()) / (1000 * 60) % 60);
    const seconds = parseInt(Math.abs(today.getTime() - dateCreated.getTime()) / (1000) % 60);
    return years ? {value: years, unit: 'yr'} : months ? {value: months, unit: 'mo'} : days ? {value: days, unit: 'day'} :
     hours ? {value: hours, unit: 'hr'} : minutes ? {value: minutes, unit: 'min'} : {value: seconds, unit: 'sec'}
  }
  const time = getTime(new Date(props.data.dateCreated));

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={() => navigate(`/home/marketplace/item/${props.data._id}`)}>
        <CardMedia
          component="img"
          height="140"
          image={props.data.media}
          alt="green iguana"
        />
        <CardContent>
            <Typography gutterBottom variant="subtitle2" component="div">
            {props.data.name}
            </Typography>
            <Typography variant='subtitle2' color='primary' component="div">
            USD {props.data.price}
            </Typography>
            <Stack direction={matchesMobile ? 'column' : 'row'} justifyContent='space-between' spacing={2}>
                <Typography variant="body2" color="text.secondary">
                    {props.data.user.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {time.value + ' ' + (time.value > 1 ? time.unit + 's' : time.unit)} ago
                </Typography>
            </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}