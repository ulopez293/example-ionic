import { ChangeEvent, useContext, useState } from 'react'
import { IonButton } from '@ionic/react'
import { useHistory } from "react-router-dom"
import './Acceso.css'
import user from './user.png'
import context from '../../context/ThemeContext'

function Acceso() {
  let { estadoAction } = useContext(context.ThemeContext)
  const [USER, PASS] = ['administrador', '1234']
  const [acceso, setAcceso] = useState({ user: '', pass: '' })
  let history = useHistory()

  const validarLogin = () => {
    if (acceso.user === USER && acceso.pass === PASS) {
      estadoAction({ type: "UPDATE_LOGIN", payload: true })
      history.push("/page/Principal")
    } else {
      alert("Datos Incorrectos")
    }
  }
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setAcceso({ ...acceso, [e.target.name]: e.target.value })

  const recuperarDatos = () => { alert(`USER: ${USER} PASS: ${PASS}`) }

  return (
    <div className="tab-content">
      <div className="imgcontainer">
        <img src={user} alt="Avatar" className="avatar" />
      </div>

      <div className="container">
        <input onChange={handleInputChange}
          type="text" placeholder="Email" name="user" required />
        <input onChange={handleInputChange}
          type="password" placeholder="Contraseña" name="pass" required />
      </div>
      <div className="container">
        <IonButton onClick={recuperarDatos} className="psw" style={{ float: 'right' }} color="tertiary">
          Ingresar
        </IonButton>
        <IonButton onClick={validarLogin} color="primary">Acceso</IonButton>
      </div>
      <br /><br /><br />
    </div>
  )
}

export default Acceso
