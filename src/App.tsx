import { IonApp, IonIcon, IonRouterOutlet, IonSplitPane, IonTabBar, IonTabButton, IonTabs } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { Redirect, Route } from 'react-router-dom'
import { home, heart, person } from 'ionicons/icons'
import { ThemeContext } from './context/ThemeContext'
import { useContext } from 'react'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

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
            </IonRouterOutlet>
            <IonTabBar slot="bottom" style={{ display: estado.login ? '' : 'none' }}>
              <IonTabButton tab="home" href="/page/Productos">
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
