import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import { useContext } from 'react'
import { useParams } from 'react-router'
import './Page.css'
import context from '../context/ThemeContext.js'
import Routes from './Routes'

const Page: React.FC = () => {
  let { estado } = useContext(context.ThemeContext)
  const { name } = useParams<{ name: string }>()
  return (
    <IonPage className='bg-color-morado'>
      {estado.login ?
        <IonHeader>
          <IonToolbar className='bg-color-morado' style={{padding: '0'}}>
            <IonButtons slot="end" className='bg-color-morado'style={{margin: '0px', paddingTop: '5px', paddingBottom: '5px'}}>
              <IonMenuButton className='color-blanco bg-color-morado'/>
            </IonButtons>
            <IonTitle className='ion-text-center bg-color-morado color-blanco' style={{padding: '15px', fontSize: 'x-large'}}>{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        : null}
      <IonContent fullscreen>
        {estado.login ?
          <IonHeader collapse="condense">
            <IonToolbar className='bg-color-morado' style={{padding: '0'}}>
              <IonTitle className='ion-text-center bg-color-morado color-blanco' style={{padding: '10px', fontSize: 'x-large'}} size="large">{name}</IonTitle>
            </IonToolbar>
          </IonHeader>
          : null}
          <Routes />
      </IonContent>
    </IonPage>
  )
}

export default Page
