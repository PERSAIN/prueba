import React, { Fragment} from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import authHeader from '../services/auth-header';
import {useForm} from 'react-hook-form'
import { withRouter } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
    accountCircle: {
        fontSize: 40
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
      },
    
  }));


function Roles(props) {

    // activando los estilos
    const classes = useStyles();

    // hooks para el submit al api
    const {register, handleSubmit} = useForm()
    
   

 
// funcion para asignar el rol hacer request a API
    const API_URL = "http://127.0.0.1:8000/api/"
    const rol = (data) => {
        const tokenauth = authHeader();
        if (data.solicitante === true){
            const newdata= {rol : "1"}
            fetch(API_URL + "auth/asignarPerfil",{
                method : 'POST',
                body : JSON.stringify(newdata),
                headers: {
                  'Content-Type': 'application/json',
                  'authorization' : tokenauth,
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                },
            })
            .then ( res => res.json())
            .then (response => {
              if (response.status < 200 || response.status >= 300) {
                return window.alert('Error ' + response.message);
            } 
            localStorage.setItem('Rol', 1);
            props.history.push('/home/solicitante')
            return window.alert('Rol asignado con exito')
            })
        }

        if (data.prestador === true){
            const newdata= {rol : "2"}
            fetch(API_URL + "auth/asignarPerfil",{
                method : 'POST',
                body : JSON.stringify(newdata),
                headers: {
                  'Content-Type': 'application/json',
                  'authorization' : tokenauth,
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                },
            })
            .then ( res => res.json())
            .then (response => {
              if (response.status < 200 || response.status >= 300) {
                return window.alert('Error ' + response.message);
            } 
            localStorage.setItem('Rol',2)
            props.history.push('/home/prestador')
            return window.alert('Rol asignado con exito')
            })
        }
        
    
  }


    return (
        <Fragment>
            <Container omponent="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                <AccountCircle className={classes.accountCircle}></AccountCircle> 
                <Typography component="h1" variant="h5">
                 Seleccionar su rol
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit(rol)}>
                  <FormControlLabel 
                  control={<Checkbox inputRef={register} name="solicitante" color="primary" defaultValue={0} />}
                  label="Rol solicitante"
                  />
                  <FormControlLabel 
                  control={<Checkbox inputRef={register} name="prestador" color="primary" defaultValue={0} />}
                  label="Rol prestador"
                  />
                   <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit} 
                  >
                  Asignar
                  </Button>
                </form>
                
               </div>
            </Container>
             
        </Fragment>
       
    )
}

export default withRouter(Roles)

