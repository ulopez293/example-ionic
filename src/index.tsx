import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import ThemeProvider from './context/ThemeProvider'
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

if (window.indexedDB) {
  let request = window.indexedDB.open("tiendaDatabase", 4)
  request.onupgradeneeded = function(event:any) {
    let db = event.target.result

    let objectStore = db.createObjectStore("productos", { keyPath: "identificador" })
    objectStore.createIndex("nombre", "nombre", { unique: false })
    objectStore.transaction.oncomplete = () => {
      db.close()
    }

  }

  ReactDOM.render(
    <React.StrictMode>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
  );
}


// Call the element loader after the platform has been bootstrapped
defineCustomElements(window)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
