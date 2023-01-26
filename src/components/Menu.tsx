import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle } from '@ionic/react'
import { useLocation, useHistory } from 'react-router-dom'
import { useContext } from 'react'
import { lockClosedOutline, lockClosedSharp, buildOutline, buildSharp, homeOutline, homeSharp, cart, logOutOutline, logOutSharp } from 'ionicons/icons'
import './Menu.css'
import context from '../context/ThemeContext'

const Menu: React.FC = (): JSX.Element => {
  let location = useLocation()
  let history = useHistory()
  let { estado, estadoAction } = useContext(context.ThemeContext)
  let appPages = [
    {
      title: 'Principal',
      url: '/page/Principal',
      iosIcon: homeOutline,
      mdIcon: homeSharp
    },
    {
      title: 'Carrito',
      url: '/page/Carrito',
      iosIcon: cart,
      mdIcon: cart,
      cantidad: estado.carrito
    },
    {
      title: (estado.login) ? 'Panel Admin' : 'Acceso',
      url: (estado.login) ? '/page/Panel' : '/page/Acceso',
      iosIcon: (estado.login) ? buildOutline : lockClosedOutline,
      mdIcon: (estado.login) ? buildSharp : lockClosedSharp
    }
  ]

  const changeMenu = (url: string): void => {
    history.push(url)
  }

  const logout = () => {
    estadoAction({
      type: "UPDATE_LOGIN",
      payload: false
    })
    window.location.href = window.location.origin+'/page/Acceso'
  }
  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader onClick={() => changeMenu("/")}>
            Tienda
          </IonListHeader><br />
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
            <IonItem onClick={logout} className='' routerDirection="none"
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
