import { useState, useEffect, useContext } from 'react'
import { IonButton, IonImg, IonTextarea, IonInput, IonList, IonContent, IonItemDivider, IonItem, IonLabel, IonMenuToggle } from '@ionic/react';
import Productos from '../productos/Productos'
import './Panel.css';

function Panel(props) {
  let [productos, setProductos] = useState([])
  let [nuevoProducto, setNuevoProducto] = useState({
    identificador: Date.now(),
    imagen: '',
    nombre: '',
    descripcion: '',
    precio: ''
  })

  useEffect(async () => {
    let respuesta = await props.listadoProductos()
    setProductos(respuesta)
    return () => {
      setProductos([])
      console.log("Limpiando Panel..")
    }
  }, [])

  const handleInputChange = e => {
    let re = new RegExp('^[0-9]');
    if(e.target.name == 'precio' && !re.test(e.target.value)) {
      e.target.value = nuevoProducto[e.target.name]
      return
    }
    setNuevoProducto({
      ...nuevoProducto,
      [e.target.name] : e.target.value
    })
  }

  const handleImage = e => {

    let getDataUrl = (img) => {
       const canvas = document.createElement('canvas');
       const ctx = canvas.getContext('2d');
       canvas.width = img.width;
       canvas.height = img.height;
       ctx.drawImage(img, 0, 0);
       return canvas.toDataURL('image/jpeg');
    }

    let img = document.createElement("img")
    img.src = window.URL.createObjectURL(e.target.files[0])
    img.addEventListener('load', function (event) {
       let dataUrl = getDataUrl(event.currentTarget)
       setNuevoProducto({
         ...nuevoProducto,
         [e.target.name] : dataUrl
       })
    })

  }

  const guardarProducto = e => {
    for (let propiedad in nuevoProducto) {
      if(typeof nuevoProducto[propiedad]==='string'){
        if(nuevoProducto[propiedad].trim()=='') return
      }
    }
    let db
    let request = window.indexedDB.open("tiendaDatabase", 4)
    request.onsuccess = function(event) {
      db = event.target.result
      let transaction = db.transaction(["productos"], "readwrite")
      transaction.onerror = function(event) {
        alert("No se han podido agregar los datos, error transaccion.")
      }
      let objectStore = transaction.objectStore("productos")
      let resultado = objectStore.add(nuevoProducto)
      resultado.onsuccess = async function(event) {
        setNuevoProducto({
          identificador: Date.now(),
          imagen: '',
          nombre: '',
          descripcion: '',
          precio: ''
        })
        alert("Datos agregados correctamente")
        setProductos(await props.listadoProductos())
      }
      db.close()
    }
    request.onerror = function(event) {
      alert("Error al cargar Base de Datos.")
    }
  }

  return (
    <>
      <h5>Agregar Producto :</h5>
      <IonList>
        <IonItemDivider>Imagen</IonItemDivider>
        <IonItem>
          <IonImg style={{maxWidth:'40%', margin:'20px'}} src={nuevoProducto.imagen} />
          <input name="imagen" type="file" onChange={handleImage} accept="image/png, image/jpeg"></input>
        </IonItem>
        <IonItemDivider>Nombre del Producto</IonItemDivider>
        <IonItem>
          <IonInput name="nombre" onIonChange={handleInputChange} value={nuevoProducto.nombre}></IonInput>
        </IonItem>
        <IonItemDivider>Descripcion</IonItemDivider>
        <IonItem>
          <IonTextarea name="descripcion" onIonChange={handleInputChange} value={nuevoProducto.descripcion}></IonTextarea>
        </IonItem>
        <IonItemDivider>Precio</IonItemDivider>
        <IonItem>
          <IonInput name="precio" onIonChange={handleInputChange} type="number" value={nuevoProducto.precio}></IonInput>
        </IonItem>
      </IonList>
      <IonButton onClick={guardarProducto} color="success" expand="block" fill="solid" size="large">Guardar</IonButton>
      <br/><br/>
      {
        productos.length >= 1 ? <Productos productos={productos} tipo="administrador"/>
        :<h5>No hay productos registrados...</h5>
      }
    </>
  );
}

export default Panel
