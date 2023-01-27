import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle } from '@ionic/react'
import { useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { logOutOutline, logOutSharp } from 'ionicons/icons'
import './Menu.css'
import context from '../context/ThemeContext'
import AppPages from '../class/AppPages'
import Context from '../interfaces/Context'
import { logout } from '../functions/logout'
import { useChangeMenu } from '../hooks/changeMenu'

const Menu: React.FC = (): JSX.Element => {
  const location = useLocation()
  const changeMenu = useChangeMenu()
  const { estado, estadoAction }: Context = useContext(context.ThemeContext)
  const appPages = new AppPages(estado).getAppPages()
  return (
    <IonMenu contentId="main" type="overlay" side="end">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader onClick={() => changeMenu("/")}>Tienda</IonListHeader><br />
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''}
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title} {appPage.cantidad} </IonLabel>
                </IonItem>
              </IonMenuToggle>
            )
          })}
          <IonMenuToggle key={Date.now()} autoHide={false}>
            <IonItem onClick={() => logout(estadoAction)} className='' routerDirection="none"
              lines="none" detail={false}>
              <IonIcon slot="start" ios={logOutOutline} md={logOutSharp} />
              <IonLabel>Salir</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  )
}

export default Menu
