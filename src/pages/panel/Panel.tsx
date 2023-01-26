import { useState, useEffect, ChangeEvent } from 'react'
import { IonButton, IonImg, IonTextarea, IonInput, IonList, IonItemDivider, IonItem } from '@ionic/react'
import './Panel.css'
import Productos from '../productos/Productos'
import Producto from '../../interfaces/Producto'

interface PanelProps {
  listadoProductos: () => Promise<Array<Producto>>
}

function Panel({ listadoProductos }: PanelProps) {
  let [productos, setProductos] = useState<Producto[]>([])
  let [nuevoProducto, setNuevoProducto] = useState<Producto>({
    identificador: Date.now(),
    imagen: '',
    nombre: '',
    descripcion: '',
    precio: 0,
    cantidad: 0,
  })

  useEffect(() => {
    const fetchData = async () => {
      let respuesta: Array<Producto> = await listadoProductos()
      setProductos(respuesta)
    }
    fetchData()
    return () => {
      setProductos([])
      console.log("Limpiando Panel..")
    }
  }, [])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    let re = new RegExp('^[0-9]')
    if (e.target.name === 'precio' && !re.test(e.target.value)) {
      e.target.value = String(nuevoProducto[e.target.name])
      return
    }
    setNuevoProducto({
      ...nuevoProducto,
      [e.target.name]: e.target.value
    })
  }

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    let getDataUrl = (img: HTMLImageElement) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (ctx) {
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)
        return canvas.toDataURL('image/jpeg')
      } else { console.log("ctx es undefined") }
    }
    if (e.target.files) {
      let img = document.createElement("img")
      img.src = window.URL.createObjectURL(e.target.files[0])
      img.addEventListener('load', function (event) {
        let dataUrl = getDataUrl(event.currentTarget as HTMLImageElement)
        setNuevoProducto({
          ...nuevoProducto,
          [e.target.name]: dataUrl
        })
      })
    }
  }

  const guardarProducto = () => {
    for (let [, valor] of Object.entries(nuevoProducto)) {
      if (typeof valor === 'string' && valor.trim() === '') return;
    }
    let db: IDBDatabase
    let request = window.indexedDB.open("tiendaDatabase", 4)
    request.onsuccess = function (event:any) {
      db = event.target.result
      let transaction = db.transaction(["productos"], "readwrite")
      transaction.onerror = function () {
        alert("No se han podido agregar los datos, error transaccion.")
      }
      let objectStore = transaction.objectStore("productos")
      let resultado = objectStore.add(nuevoProducto)
      resultado.onsuccess = async function () {
        setNuevoProducto({
          identificador: Date.now(),
          imagen: '',
          nombre: '',
          descripcion: '',
          precio: 0,
          cantidad: 0
        })
        alert("Datos agregados correctamente")
        setProductos(await listadoProductos())
      }
      db.close()
    }
    request.onerror = function (event) {
      alert("Error al cargar Base de Datos.")
    }
  }

  return (
    <>
      <h5>Agregar Producto :</h5>
      <IonList>
        <IonItemDivider>Imagen</IonItemDivider>
        <IonItem>
          <IonImg style={{ maxWidth: '40%', margin: '20px' }} src={nuevoProducto.imagen} />
          <input name="imagen" type="file" onChange={handleImage} accept="image/png, image/jpeg"></input>
        </IonItem>
        <IonItemDivider>Nombre del Producto</IonItemDivider>
        <IonItem>
          <input name="nombre" onChange={handleInputChange} value={nuevoProducto.nombre}></input>
        </IonItem>
        <IonItemDivider>Descripcion</IonItemDivider>
        <IonItem>
          <textarea name="descripcion" onChange={handleInputChange} value={nuevoProducto.descripcion}></textarea>
        </IonItem>
        <IonItemDivider>Precio</IonItemDivider>
        <IonItem>
          <input name="precio" onChange={handleInputChange} type="number" value={nuevoProducto.precio}></input>
        </IonItem>
      </IonList>
      <IonButton onClick={guardarProducto} color="success" expand="block" fill="solid" size="large">Guardar</IonButton>
      <br /><br />
      {
        productos.length >= 1 ? <Productos productos={productos} tipo="administrador" />
          : <h5>No hay productos registrados...</h5>
      }
    </>
  )
}

export default Panel
