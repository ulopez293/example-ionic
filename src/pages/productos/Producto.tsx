import { trashOutline, trashSharp, addCircleSharp, addCircleOutline, closeSharp, closeOutline, createSharp, createOutline } from 'ionicons/icons'
import { useState, useEffect, useContext } from 'react'
import { IonButton, IonIcon, IonImg, IonTitle, IonToolbar, IonText } from '@ionic/react'

import './Producto.css'
import ProductoInterface from '../../interfaces/Producto'
import context from '../../context/ThemeContext'

interface ProductoProps {
  key: number
  tipo: string
  producto: ProductoInterface
}

function Producto({ tipo, producto }: ProductoProps) {
  let [visible, setVisible] = useState(true)
  let [renderProducto, setRenderProducto] = useState(producto)
  let { estado, estadoAction } = useContext(context.ThemeContext)
  let [cantidadProducto, setCantidadProducto] = useState(0)

  useEffect(() => {
    if (estado.productos.length >= 1) {
      for (let element of estado.productos) {
        if (element.identificador == producto.identificador) {
          setCantidadProducto(element.cantidad)
        }
      }
    }
    return () => { }
  }, [estado.productos])

  const agregarCarrito = () => {
    estadoAction({
      type: "UPDATE_CARRITO",
      payload: ++estado.carrito
    })

    let tempProducto: ProductoInterface = producto
    if (tempProducto.cantidad == 0) {
      tempProducto.cantidad = cantidadProducto
    }
    tempProducto.cantidad++
    if (estado.productos.length >= 1) {
      let temporalEstado: Array<ProductoInterface> = estado.productos
      temporalEstado.push(tempProducto)
      let hash:any = {}
      temporalEstado = temporalEstado.filter(item => hash[item.identificador] ? false : hash[item.identificador] = true)
      for (let indice = 0; indice < temporalEstado.length; indice++) {
        if (temporalEstado[indice].identificador == producto.identificador) {
          temporalEstado[indice].cantidad = tempProducto.cantidad
        }
      }
      estadoAction({
        type: "UPDATE_PRODUCTOS",
        payload: temporalEstado
      })
    } else {
      let array = []
      array.push(tempProducto)
      estadoAction({
        type: "UPDATE_PRODUCTOS",
        payload: array
      })
    }
  }

  const eliminarCarrito = () => {
    if (estado.carrito == 0) return
    estadoAction({
      type: "UPDATE_CARRITO",
      payload: --estado.carrito
    })

    let tempProducto: ProductoInterface = producto
    if (tempProducto.cantidad == undefined) {
      tempProducto.cantidad = cantidadProducto
    }
    if (tempProducto.cantidad == 0) return
    tempProducto.cantidad--
    if (estado.productos.length >= 1) {
      let temporalEstado: Array<ProductoInterface> = estado.productos
      temporalEstado.push(tempProducto)
      let hash:any = {}
      temporalEstado = temporalEstado.filter(item => hash[item.identificador] ? false : hash[item.identificador] = true)
      for (let indice = 0; indice < temporalEstado.length; indice++) {
        if (temporalEstado[indice].identificador == producto.identificador) {
          temporalEstado[indice].cantidad = tempProducto.cantidad
        }
      }
      estadoAction({
        type: "UPDATE_PRODUCTOS",
        payload: temporalEstado
      })
    }
  }

  const eliminarRegistro = () => {
    let db: IDBDatabase
    let request: IDBOpenDBRequest = window.indexedDB.open("tiendaDatabase", 4)
    request.onerror = function () { alert("Error al cargar Base de Datos.") }
    request.onsuccess = function (event: any) {
      db = event.target.result
      let transaction = db.transaction(["productos"], "readwrite")
        .objectStore("productos")
        .delete(producto.identificador)
      transaction.onsuccess = function () {
        alert("Registro eliminado")
        estadoAction({
          type: "UPDATE_CARRITO",
          payload: 0
        })
        estadoAction({
          type: "UPDATE_PRODUCTOS",
          payload: []
        })
        setVisible(false)
      }
      db.close()
    }
  }

  const editarRegistro = () => {
    let letrasRegex = new RegExp("^[a-zA-Z ]+$")
    let numerosRegex = new RegExp("^[0-9]")

    let nombreProducto = prompt("Ingrese el Nombre del Producto: ")
    if (typeof nombreProducto !== 'string' || !letrasRegex.test(nombreProducto)) return

    let descripcionProducto = prompt("Ingrese la Descripcion del Producto: ")
    if (typeof descripcionProducto !== 'string' || !letrasRegex.test(descripcionProducto)) return

    let precioProducto = prompt("Ingrese el Precio del Producto: ")
    if (typeof precioProducto !== 'string' || !numerosRegex.test(precioProducto)) return


    let db: IDBDatabase
    let request = window.indexedDB.open("tiendaDatabase", 4)
    request.onerror = function () { alert("Error al cargar Base de Datos.") }
    request.onsuccess = function (event: any) {
      db = event.target.result
      let objectStore = db.transaction(["productos"], "readwrite").objectStore("productos")
      let transaction = objectStore.get(producto.identificador)
      transaction.onsuccess = function (event:any) {
        let dato = event.target.result
        dato.nombre = nombreProducto
        dato.descripcion = descripcionProducto
        dato.precio = precioProducto

        let transactionUpdate = objectStore.put(dato)
        transactionUpdate.onerror = function (event) {
          alert("error update")
        }
        transactionUpdate.onsuccess = function (event) {
          alert("Registro Actualizado")
          estadoAction({
            type: "UPDATE_CARRITO",
            payload: 0
          })
          estadoAction({
            type: "UPDATE_PRODUCTOS",
            payload: []
          })
          setRenderProducto({
            ...renderProducto,
            nombre: nombreProducto ?? renderProducto.nombre,
            descripcion: descripcionProducto ?? renderProducto.descripcion,
            precio: precioProducto ? parseInt(precioProducto) : renderProducto.precio
          })
          
        }
      }
      db.close()
    }
  }

  return (
    <>
      {(visible) ?
        <div>
          <IonToolbar>
            <IonTitle>{renderProducto.nombre}</IonTitle>
          </IonToolbar>
          <IonImg style={{ maxWidth: '40%', margin: '20px' }} src={renderProducto.imagen} />
          <IonText color="dark">
            <h5>{renderProducto.descripcion}</h5>
          </IonText>
          <IonText color="primary">
            <h2>$ {renderProducto.precio}</h2>
          </IonText>
          {
            (tipo == "administrador") ?
              <>
                <IonButton onClick={editarRegistro} color="tertiary">
                  <IonIcon slot="start" ios={createOutline} md={createSharp} />
                </IonButton>
                <IonButton onClick={eliminarRegistro} color="danger">
                  <IonIcon slot="start" ios={trashOutline} md={trashSharp} />
                </IonButton>
              </> :
              <>
                <IonButton onClick={agregarCarrito} color="primary">
                  <IonIcon slot="start" ios={addCircleOutline} md={addCircleSharp} />
                </IonButton>
                <IonButton onClick={eliminarCarrito} color="warning">
                  <IonIcon slot="start" ios={closeOutline} md={closeSharp} />
                </IonButton>
                <input style={{ margin: '10px', width: '15%', padding: '10px', textAlign: 'center' }}
                  type="text" name="cantidad" value={cantidadProducto} readOnly />
              </>
          }
        </div> : ''}
    </>
  )
}

export default Producto
