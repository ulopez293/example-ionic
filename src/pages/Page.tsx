import { IonButtons,
         IonContent,
         IonHeader,
         IonMenuButton,
         IonPage,
         IonTitle,
         IonToolbar
} from '@ionic/react'
import { useContext } from 'react'
import { useParams, useLocation } from 'react-router'
import Productos from './productos/Productos.jsx'
import Acceso from './acceso/Acceso'
import Carrito from './carrito/Carrito'
import Panel from './panel/Panel.jsx'
import './Page.css'
import context from '../context/ThemeContext.js'

const Page: React.FC = () => {
  let { estado } = useContext(context.ThemeContext)
  const location = useLocation()
  const { name } = useParams<{ name: string }>()

  const listadoProductos = () => {
    let db:any
    let request = window.indexedDB.open("tiendaDatabase", 4)
    return new Promise((resolve, reject) => {
        request.onerror = function() {
          alert("Error al cargar Base de Datos.")
          reject("Error al cargar Base de Datos.")
        }
        request.onsuccess = function(event:any) {
        db = event.target.result
        let transaction = db.transaction(["productos"])
        let objectStore = transaction.objectStore("productos")
        let tempProductosArray:any = []

        objectStore.openCursor().onsuccess = function(evt:any) {
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
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle className='ion-text-center'>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle className='ion-text-center' size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div style={{padding:'5%'}}>
          {(location.pathname==="/page/Principal") ? <Productos productos={async () => await listadoProductos()} tipo="normal"/> : ''}
          {(location.pathname==="/page/Carrito") ? <Carrito /> : ''}
          {(location.pathname==="/page/Acceso" && !estado.login) ? <Acceso /> : ''}
          {(location.pathname==="/page/Panel" && estado.login) ? <Panel listadoProductos={listadoProductos}/> : ''}
        </div>
      </IonContent>
    </IonPage>
  )
}

export default Page
