import * as React from 'react';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import gendarmerie from '../image/gendarmerie.png'
import isep from '../image/isepLogo.png'
import {Grid} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  bar: {
    height:95,
  },
  logoG: {
    height:100,
    width:150,
  },
  logoI: {
    height:100,
    width:100,
  },
  title: {
  marginTop: 25,
  fontSize: 30,
  fontWeight: 600
  }
}));

export default function ButtonAppBar(props) {
const classes = useStyles();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className={classes.bar}>
        <Grid container direction="row" justifyContent="space-between" alignItems="center">
        <Grid>
        <img className={classes.logoG} src={gendarmerie} />
        </Grid>
        <Grid>
        <Typography className={classes.title}>Synthétiseur de texte</Typography>
        </Grid>
        <Grid>
        <img className={classes.logoI} src={isep} />
        </Grid>
        </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}