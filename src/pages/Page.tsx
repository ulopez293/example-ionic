import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import { useContext } from 'react'
import { useParams, useLocation } from 'react-router'
import './Page.css'
import Productos from './productos/Productos'
import Acceso from './acceso/Acceso'
import Carrito from './carrito/Carrito'
import Panel from './panel/Panel'
import context from '../context/ThemeContext.js'
import Producto from '../interfaces/Producto'
import Menu from '../components/Menu'

const Page: React.FC = () => {
  let { estado } = useContext(context.ThemeContext)
  const location = useLocation()
  const { name } = useParams<{ name: string }>()

  const listadoProductos = (): Promise<Producto[]> => {
    let db: any
    let request = window.indexedDB.open("tiendaDatabase", 4)
    return new Promise((resolve, reject) => {
      request.onerror = function () {
        alert("Error al cargar Base de Datos.")
        reject("Error al cargar Base de Datos.")
      }
      request.onsuccess = function (event: any) {
        db = event.target.result
        let transaction = db.transaction(["productos"])
        let objectStore = transaction.objectStore("productos")
        let tempProductosArray: Producto[] = []

        objectStore.openCursor().onsuccess = function (evt: any) {
          let cursor = evt.target.result
          if (cursor) {
            tempProductosArray.push(cursor.value)
            cursor.continue()
          } else {
            console.log("No hay mas productos..")
            resolve(tempProductosArray)
          }
        }
        db.close()
      }
    })
  }

  return (
    <IonPage>
      {estado.login ?
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle className='ion-text-center'>{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        : null}
      <IonContent fullscreen>
        {estado.login ?
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle className='ion-text-center' size="large">{name}</IonTitle>
            </IonToolbar>
          </IonHeader>
          : null}
        <div>
          {(location.pathname === "/page/Principal" && estado.login) ? <Productos getProductos={async () => await listadoProductos()} tipo="normal" /> : ''}
          {(location.pathname === "/page/Carrito" && estado.login) ? <Carrito /> : ''}
          {(location.pathname === "/page/Panel" && estado.login) ? <Panel listadoProductos={listadoProductos} /> : ''}
          {(location.pathname === "/page/Acceso" && !estado.login) ? <Acceso /> : ''}
        </div>
      </IonContent>
    </IonPage>
  )
}

export default Page
