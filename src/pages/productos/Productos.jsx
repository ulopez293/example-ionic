import { useState, useEffect, useContext } from 'react'
import { IonButton } from '@ionic/react';

import './Productos.css';
import Producto from './Producto';

function Productos(props) {
  let [productos, setProductos] = useState([])

  useEffect(async () => {
    if(props.tipo == "normal") {
      let respuesta = await props.productos()
      setProductos(respuesta)
    }else{
      setProductos(props.productos)
    }
    return () => {
      setProductos([])
      console.log("Limpiando Productos..")
    }
  }, [])

  return (
    <>
    {
      productos.length >= 1 ? productos.map(product => {
        return <Producto key={product.identificador} tipo={props.tipo} producto={product} />
      }) :<h5>No hay productos registrados...</h5>
    }
    </>
  );
}

export default Productos
