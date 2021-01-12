import React,{useState, useEffect} from 'react'
import MaterialTable from 'material-table'
import authHeader from '../../services/auth-header';


const columnasCitas = [
    {title:'Codigo',field :'cod'},
    {title:'Descripcion',field :'descripcion'},
    {title :'Cupos Totales',field :'cupos_totales'},
    {title :'Cupos Disponibles',field :'cupos_disponibles'},
    {title :'Usuario Prestador',field :'cod_usuario_prestador'},
    {title :'Fecha',field :'fecha'},
    {title :'Razon social',field :'razon_social'},
];



function TableCitas() {

    const [dataCitas, setDataCitas] = useState([]);
    const [estadotabla, setstate] = useState(0);

  const API_URL = "http://127.0.0.1:8000/api/"

  const llamarCitas = () => {
    const tokenauth = authHeader();
        fetch(API_URL + "solicitante/listarCitas",{
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
        setDataCitas(response.data);
      })
  }

  const agendar = (codigo) => {
    const tokenauth = authHeader();
    const data = {'codCita' : codigo}
    console.log(data)
        fetch(API_URL + "solicitante/apartarCupo",{
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
      
      window.alert(response.message);
      })
  }

    useEffect(() => {
        llamarCitas();
    }, [estadotabla])


    return (
        <div>
            <MaterialTable
            columns = {columnasCitas}
            data = {dataCitas}
            title = "Citas"
            actions={[
                {
                    icon : 'add',
                    tooltip: 'Agendar Cupo',
                    onClick: (event,rowData)=> {
                      agendar(rowData.cod);
                      setstate(estadotabla + 1);
                    } 
                }
            ]}

            localization ={{
              header : {
                actions : 'Agendar'
              }
            }}
            />
        </div>
    )
}

export default TableCitas
