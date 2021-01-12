import React, {useEffect,useState} from 'react'
import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import { Link, withRouter } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Navbar(props) {

   // Aqui revisamos si esta logeado
   const [token, setToken] = useState(false)
  
   const classes = useStyles();

   const remove = ()=> {
     localStorage.removeItem('Token');
     setToken(false)
     props.history.push('/signin')
   }


   useEffect(()=>{
    const data = localStorage.getItem('Token')
    if (data) {
        setToken(true)
    } 
  },[])

  return (

    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.HomeIcon} component={Link} to ="/home" color="inherit" aria-label="menu">
            <HomeIcon/>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Citas UI
          </Typography>
          {token ? 
          
          <div>
          <Button onClick={remove} color="inherit">SignOut</Button>
          </div>
          : 
          <div>
          <Button component={Link} to = "/signin" color="inherit">SingIN</Button>
          <Button component={Link} to = "/signup"color="inherit">SignUP</Button>
          </div>
          }
        </Toolbar>
      </AppBar>
    </div>
   
  )
}

export default withRouter(Navbar)
