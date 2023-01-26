import { cardSharp, cardOutline } from 'ionicons/icons'
import { useState, useContext } from 'react'
import { IonButton, IonIcon, IonImg, IonText, IonTitle, IonToolbar } from '@ionic/react'

import './Carrito.css'
import context from '../../context/ThemeContext'
import Producto from '../../interfaces/Producto'

function Carrito() {
  let { estado } = useContext(context.ThemeContext)
  let [ useEstado ] = useState(estado.productos)

  const pagarProductos = () => {
    let total: number = useEstado.reduce((a:number, b:Producto) => +a + +(b.precio*b.cantidad), 0)
    alert("Pagar con tarjeta: $"+total)
  }

  return (
    <div className='ion-text-center'>
      {
        useEstado.length >= 1 ? useEstado.map((product:any) => {
          return product.cantidad >=1 ? <div key={product.identificador}>
                  <IonToolbar>
                    <IonTitle>{product.nombre}</IonTitle>
                  </IonToolbar>
                  <IonImg style={{maxWidth:'40%', margin:'20px'}} src={product.imagen} />
                  <IonText color="dark">
                    <h5>{product.descripcion}</h5>
                  </IonText>
                  <IonText color="primary">
                    <h4>$ {product.precio*product.cantidad} , Cantidad: {product.cantidad}</h4>
                  </IonText>
                </div> : ''
        }) :<h5>No hay productos en el carrito...</h5>
      }
      {
        estado.carrito >= 1 ? <>
        <IonText color="dark">
          <h5>Total: $ {useEstado.reduce((a:number, b:Producto) => +a + +(b.precio*b.cantidad), 0)}</h5>
        </IonText>
        <br/>
        <IonButton onClick={pagarProductos} color="success" expand="block" fill="solid" size="large">
          <IonIcon slot="start" ios={cardOutline} md={cardSharp} /> Pagar
        </IonButton>
        </>: ''
      }
    </div>
  )
}

export default Carrito
