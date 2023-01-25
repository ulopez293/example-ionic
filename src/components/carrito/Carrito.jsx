import {
  trashOutline,
  trashSharp,
  addCircleSharp,
  addCircleOutline,
  closeSharp,
  closeOutline,
  createSharp,
  createOutline,cardSharp, cardOutline
} from 'ionicons/icons';
import { useState, useEffect, useContext } from 'react'
import { useLocation, useHistory } from 'react-router-dom';
import { IonButton, IonIcon, IonImg, IonTitle, IonToolbar, IonItem, IonInput } from '@ionic/react';

import './Carrito.css';
import context from '../../context/ThemeContext'

function Carrito(props) {
  let { estado, estadoAction } = useContext(context.ThemeContext)
  let [useEstado, setUseEstado] = useState(estado.productos)

  const pagarProductos = () => {
    let total = useEstado.reduce((a, b) => +a + +(b.precio*b.cantidad), 0)
    alert("Pagar con tarjeta: $"+total)
  }

  return (
    <center>
      {
        useEstado.length >= 1 ? useEstado.map(product => {
          return product.cantidad >=1 ? <div key={product.identificador}>
                  <IonToolbar>
                    <IonTitle>{product.nombre}</IonTitle>
                  </IonToolbar>
                  <IonImg style={{maxWidth:'40%', margin:'20px'}} src={product.imagen} />
                  <ion-text color="dark">
                    <h5>{product.descripcion}</h5>
                  </ion-text>
                  <ion-text color="primary">
                    <h4>$ {product.precio*product.cantidad} , Cantidad: {product.cantidad}</h4>
                  </ion-text>
                </div> : ''
        }) :<h5>No hay productos en el carrito...</h5>
      }
      {
        estado.carrito >= 1 ? <>
        <ion-text color="dark">
          <h5>Total: $ {useEstado.reduce((a, b) => +a + +(b.precio*b.cantidad), 0)}</h5>
        </ion-text>
        <br/>
        <IonButton onClick={pagarProductos} color="success" expand="block" fill="solid" size="large">
          <IonIcon slot="start" ios={cardOutline} md={cardSharp} /> Pagar
        </IonButton>
        </>: ''
      }
    </center>
  );
}

export default Carrito
