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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignIn(props) {
  
  const classes = useStyles();
  const {register, handleSubmit} = useForm()
  const API_URL = "http://127.0.0.1:8000/api/"

  const signin = async(data) => {
    console.log(JSON.stringify(data))
     const res = await fetch(API_URL + "auth/login",{
        method : 'POST',
        body : JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
    const response = await res.json();
    if (response.status !== 200) {
        return window.alert('Error ' + response.message);
    } 
     if (response.access_token) {
      localStorage.setItem("Token", response.access_token);
      localStorage.setItem("id", response.data.cod)
      props.history.push('/home/roles')
      return console.log('loggeado')
     }
     
    }  

  return (  
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar> 
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <form className={classes.form} noValidate onSubmit={handleSubmit(signin)}>
        <TextField
          variant="outlined"
          margin="normal"
          inputRef={register}
          required
          fullWidth
          id="ususario"
          label="Usuario"
          name="usuario"
          autoComplete="usuario"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          inputRef={register}
          required
          fullWidth
          name="clave"
          label="clave"
          type="password"
          id="clave"
          autoComplete="current-password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          /* component={Link}
          to = '/home' */
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <LinkUI href="#" variant="body2">
              Forgot password?
            </LinkUI>
          </Grid>
          <Grid item>
            <LinkUI href="/signup" variant="body2">
              {"Don't have an account? Sign Up"}
            </LinkUI>
          </Grid>
        </Grid>
      </form>
    </div>
    <Box mt ={8}>
      <Copyright></Copyright>
    </Box>
  </Container>
  );
}

export default withRouter(SignIn)