import React,{useState, useEffect} from 'react'
import MaterialTable from 'material-table'
import authHeader from '../../services/auth-header';


const columnas = [
    {title:'Codigo',field :'cod'},
    {title:'Razon social',field : 'razon_social'},
    {title : 'Usuario',field : 'usuario'},
];



function Table() {

    const [data, setData] = useState([]);
    const [estadotabla, setstate] = useState(0);

  const API_URL = "http://127.0.0.1:8000/api/"

  const llamarPrestadores = () => {
    const tokenauth = authHeader();
        fetch(API_URL + "solicitante/listarPrestadores",{
        method : 'GET',
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
        setData(response.data);
      })
  }

  const suscribirsePrestadores = (codigo) => {
    const tokenauth = authHeader();
    const data = {'IdUserPrestador' : codigo}
    console.log(data)
        fetch(API_URL + "solicitante/subscribirse",{
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
         window.alert(response.message)
      })
  }

    useEffect(() => {
        llamarPrestadores();
    }, [estadotabla])


    return (
        <div>
            <MaterialTable
            columns = {columnas}
            data = {data}
            title = "Prestadores"
            actions={[
                {
                    icon : 'add',
                    tooltip: 'Suscribirse',
                    onClick: (event,rowData)=> {
                      suscribirsePrestadores(rowData.cod);
                      setstate(estadotabla + 1);
                    } 
                }
            ]}

            localization ={{
              header : {
                actions : 'Suscribirse'
              }
            }}
            />
        </div>
    )
}

export default Table
