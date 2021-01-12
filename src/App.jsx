import React, {useState,useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Home from './pages/Home';
import TableCitas from './components/Table/TableCitas'
import HomeSolicitante from './pages/HomeSolicitante';
import HomePrestador from './pages/HomePrestador';
import Roles from './pages/Roles'




function App() {

 const [token, setToken] = useState(false);

 const handleToken = ()=>{
  const data = localStorage.getItem('Token');
  if (data){
    setToken(true) ;
  }
 }

 useEffect(() => {
   handleToken();
 }, [])


  return (
      <Router>
       <Navbar></Navbar> 
       <Switch>
       
        { token ?
        <div>
        <Route exact path= "/home/roles" component={Roles}></Route>
        <Route exact path= "/home/solicitante" component={HomeSolicitante}></Route>
        <Route exact path= "/tablecitas" component={TableCitas}></Route>  
        <Route exact path= "/home/prestador" component={HomePrestador}></Route>   
        </div>

        :
        
        <div>
        <Route exact path= "/home" component={Home}></Route>
        <Route exact path= "/signin" component={SignIn}></Route>
        <Route exact path= "/signup" component={SignUp}></Route>
        </div>
        
        }
             
       </Switch>
      </Router>
  );
}

export default App;
