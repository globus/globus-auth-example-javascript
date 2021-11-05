import * as React from 'react';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

export default function User(props: any) {
  return (
    <Card>
      <CardHeader title={props.user.name}/>
      <CardContent style={{ flex: '1 0 auto' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <List>
            <ListItemText primary={`Email: ${props.user.email}`}></ListItemText>
            <ListItemText primary={`Organization: ${props.user.organization}`}></ListItemText>
            <ListItemText primary={`ID: ${props.user.id}`}></ListItemText>
            <ListItemText primary={`Status: ${props.user.status}`}></ListItemText>
            <ListItemText primary={`Username: ${props.user.username}`}></ListItemText>
          </List>
        </Box>
        <CardMedia
          component="img"
          style={{ width: 151 }}
          image="https://st.depositphotos.com/1585997/2680/i/950/depositphotos_26803451-stock-photo-farm-animals-lama.jpg"
        />
      </CardContent>
      <CardActions>
        <Button color="primary" variant="contained">
          Kick Em Out The Airlock
        </Button>
        <Button color="secondary" variant="outlined">
          Learn More
        </Button>
      </CardActions>      
    </Card>
 );
}