import { IonApp, IonIcon, IonRouterOutlet, IonSplitPane, IonTabBar, IonTabButton, IonTabs } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { Redirect, Route } from 'react-router-dom'
import './App.css'
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

import { home, heart, person } from 'ionicons/icons'
import Carrito from './pages/carrito/Carrito'
import { ThemeContext } from './context/ThemeContext'
import { useContext } from 'react'
import ProtectedRoute from './components/ProtectedRoute'

import Page from './pages/Page'
import Menu from './components/Menu'

const App: React.FC = () => {
  let { estado } = useContext(ThemeContext)
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          {estado.login ? <Menu /> : null}
          <IonTabs>
            <IonRouterOutlet id="main">
              <Route path="/" exact={true}>
                <Redirect to="/page/Acceso" />
              </Route>
              <Route path="/page/:name" exact={true}>
                <ProtectedRoute auth={estado.login}>
                  <Page />
                </ProtectedRoute>
              </Route>
              <Route exact path="/page/Carrito">
                <ProtectedRoute auth={estado.login}>
                  <Carrito />
                </ProtectedRoute>
              </Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom" style={{ display: estado.login ? '' : 'none' }}>
              <IonTabButton tab="home" href="/page/Carrito">
                <IonIcon icon={home} />
              </IonTabButton>
              <IonTabButton tab="heart" href="/tab1">
                <IonIcon icon={heart} />
              </IonTabButton>
              <IonTabButton tab="person" href="/tab2">
                <IonIcon icon={person} />
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  )
}

export default App
