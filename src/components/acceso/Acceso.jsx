import { useContext, useState } from 'react';
import { IonButton } from '@ionic/react';
import { useHistory } from "react-router-dom";

import './Acceso.css';
import user from './user.png'
import context from '../../context/ThemeContext'

function Acceso() {
  let { estadoAction } = useContext(context.ThemeContext)
  const [USER, PASS] = ['administrador','1234']
  const [acceso, setAcceso] = useState({ user:'', pass:''})
  let history = useHistory()

  const validarLogin = () => {
    if(acceso.user === USER && acceso.pass === PASS) {
      estadoAction({
        type: "UPDATE_LOGIN",
        payload: true
      })
      history.push("/page/Panel")
    } else {
      alert("Datos Incorrectos")
    }
  }
  const handleInputChange = e => setAcceso({ ...acceso, [e.target.name] : e.target.value })

  const recuperarDatos = e => { alert(`USER: ${USER} PASS: ${PASS}`) }

  return (
    <>
      <div className="imgcontainer">
        <img src={user} alt="Avatar" className="avatar" />
      </div>

      <div className="container">
        <label htmlFor="user"><b>Nombre de usuario</b></label>
        <input onChange={handleInputChange}
               type="text" placeholder="Introduzca su nombre de usuario" name="user" required />

        <label htmlFor="pass"><b>Contraseña</b></label>
        <input onChange={handleInputChange}
               type="password" placeholder="Introducir la contraseña" name="pass" required />

        <IonButton onClick={validarLogin} color="primary">Acceso</IonButton>
      </div>
      <div className="container">
      <IonButton onClick={recuperarDatos} className="psw" style={{float:'right'}} color="tertiary">
        ¿Olvidaste tu contraseña?
      </IonButton>
      </div>
    </>
  );
}

export default Acceso
