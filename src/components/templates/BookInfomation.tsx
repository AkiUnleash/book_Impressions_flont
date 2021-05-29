import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { colors } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 32,
    marginBottom: 16,
  },
  image: {
    marginRight: 32
  },
  title: {
    fontSize: 20
  },
  auther: {
    fontSize: 14
  },
  description: {
    fontSize: 14,
    color: '#616161',
    marginTop: 8
  }
}));

type props = {
  title: string,
  auther: string,
  imageurl: string,
  description: string
}

const BookInfomation: React.FC<props> = (props: props) => {

  const classes = useStyles();

  return (
    <Grid className={classes.container} container justify="center">
      <Grid className={classes.image} item xs={3}>
        <img src={props.imageurl} />
      </Grid>
      <Grid item xs={6}>
        <div className={classes.title}>{props.title}</div>
        <div className={classes.auther}>{props.auther}</div>
        <div className={classes.description}>{props.description}</div>
      </Grid>
    </Grid>
  );
}

export default BookInfomation