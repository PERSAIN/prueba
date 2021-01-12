import React from 'react';
import BorderColor from '@material-ui/icons/BorderColor';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useForm} from 'react-hook-form'
import authHeader from '../../services/auth-header';



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  borderColor: {
    margin: theme.spacing(2),
    
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function FormCita() {
  
  const classes = useStyles();
  const {register, handleSubmit} = useForm()
  const API_URL = "http://127.0.0.1:8000/api/"

  const crearCita = (data) => {
    console.log(JSON.stringify(data))
    const tokenauth = authHeader();
     fetch(API_URL + "prestador/crearCita",{
        method : 'POST',
        body : JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'authorization' : tokenauth,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
    .then(res => res.json())
    .then (response => {
        if (response.status < 200 || response.status >= 300) {
          return window.alert('Error ' + response.message);
      } 
        return window.alert('Cita creada con exito')
      })
}

  return (  
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.paper}>
      <BorderColor className={classes.borderColor} fontSize="large">
        <LockOutlinedIcon />
      </BorderColor> 
      <Typography component="h1" variant="h5">
        Formato Cita
      </Typography>
      <form className={classes.form} noValidate onSubmit={handleSubmit(crearCita)}>
        <TextField
          variant="outlined"
          margin="normal"
          inputRef={register}
          required
          fullWidth
          id="outlined-textarea"
          label="Descripcion"
          name="descripcion"
          autoComplete="descripcion"
          autoFocus
        />
        <TextField
          margin = "normal"
          fullWidth
          required
          id="outlined-textarea"
          label="Cupos Cita"
          placeholder="Cupos Cita"
          name= "cupos_totales"
          multiline
          inputRef={register}
          variant="outlined"
        />
        <TextField
        name ="fecha"
        id="fecha"
        label="Fecha"
        type="date"
        defaultValue="2020-05-24"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        inputRef={register}
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
          Agendar
        </Button>
      </form>
    </div>
  </Container>
  );
}
