import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {Link as LinkUI} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useForm} from 'react-hook-form'
import { withRouter } from 'react-router-dom';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <LinkUI color="inherit" href="https://material-ui.com/">
        Your Website
      </LinkUI>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


 function SignUp(props) {
  const classes = useStyles();
  const {register,handleSubmit} = useForm();
  const API_URL = "http://127.0.0.1:8000/api/"

  const registrar = async(data) => {
    console.log(JSON.stringify(data))
     const res = await fetch(API_URL + "auth/registrar",{
        method : 'POST',
        body : JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
    const response = await res.json();
    if (response.status !==  200) {
        return window.alert('Error ' + response.message);
    } 
    props.history.push('/signin')
    return window.alert('Registrado con exito')
    
}
 

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form}  noValidate onSubmit={handleSubmit(registrar)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                inputRef={register}
                id="usuario"
                label="Usuario"
                name="usuario"
                autoComplete="usuario"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                inputRef={register}
                required
                fullWidth
                name="clave"
                label="Clave"
                type="password"
                id="clave"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                inputRef={register}
                required
                fullWidth
                name="nombres"
                label="Razon Social"
                type="nombres"
                id="nombres"
                autoComplete="razon social"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <LinkUI href="/signin" variant="body2">
                Already have an account? Sign in
              </LinkUI>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}


export default withRouter(SignUp)