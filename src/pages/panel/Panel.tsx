import { useState, useEffect, ChangeEvent } from 'react'
import { IonList, IonItem, IonLabel } from '@ionic/react'
import './Panel.css'
import Productos from '../productos/Productos'
import Producto from '../../interfaces/Producto'
import image from './image.png'
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
    return () => setProductos([])
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
    request.onsuccess = function (event: any) {
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
    <div className="ion-text-center">
      <IonList>
        {(nuevoProducto.imagen === '') ?
          <IonItem style={{ padding: '5%' }}>
            <label htmlFor="file">
              <div className="divImagen">
                <img src={image} alt="loading" />
                <p>Carga tu Imagen</p>
              </div>
            </label>
            <input name="imagen" id="file" type="file" onChange={handleImage} accept="image/png, image/jpeg" style={{ display: 'none' }}></input>
          </IonItem> :
          <IonItem style={{ padding: '5%' }}>
            <label htmlFor="file">
              <div className="divImagen2">
                <img src={nuevoProducto.imagen} alt="loading" />
              </div>
            </label>
            <input name="imagen" id="file" type="file" onChange={handleImage} accept="image/png, image/jpeg" style={{ display: 'none' }}></input>
          </IonItem>
        }
        <IonItem>
          <IonLabel class="ion-text-wrap" style={{ fontSize: 'larger' }}>
            <input name="nombre" placeholder="Nombre" onChange={handleInputChange} value={nuevoProducto.nombre}></input>
            <br /><br />
            <input name="precio" placeholder="Precio" onChange={handleInputChange} type="number" value={nuevoProducto.precio}></input>
            <br /><br />
            <input name="categoria" placeholder="Categoria"></input>
            <br /><br />
            <textarea name="descripcion" placeholder="Descripcion" onChange={handleInputChange} value={nuevoProducto.descripcion}></textarea>
            <br /><br />
          </IonLabel>
        </IonItem>
      </IonList>
      <button onClick={guardarProducto} className='color-blanco bg-color-morado' style={{ fontSize: 'larger', width: '90%', borderRadius: '10px' }}>Guardar Producto</button>
      <br /><br />
      {
        productos.length >= 1 ? <Productos productos={productos} tipo="administrador" /> : <h5>Administrador: No hay productos registrados...</h5>
      }
    </div>
  )
}

export default Panel
