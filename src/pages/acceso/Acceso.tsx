import { ChangeEvent, useContext, useState } from 'react'
import { IonButton } from '@ionic/react'
import { useHistory } from "react-router-dom"
import './Acceso.css'
import logo from '../../img/logo.png'
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

  return (
    <div className="tab-content">
      <div className="imgcontainer bg-color-morado">
        <img src={logo} alt="Avatar" className="avatar" />
      </div>

      <div className="bg-color-morado">
        <div className="container-inputs">
          <br /><br />
          <input onChange={handleInputChange}
            type="text" placeholder="Email" name="user" required />
          <input onChange={handleInputChange}
            type="password" placeholder="Contraseña" name="pass" required />
          <br />
        </div>
      </div>
      <div className="container">
        <button onClick={validarLogin} className="psw bg-color-morado access-button" style={{ float: 'right' }}>
          Ingresar
        </button>
      </div>
      <div className="ion-text-center fondo-page" style={{ fontSize: 'large' }}>
        <p><a href="#" className="color-gris m-5">¿Aún no tienes cuenta?</a></p>
        <p><a href="#" className="color-morado m-5">Registrate</a></p>
        <p className="color-gris" style={{ fontSize: 'medium' }}>Ubaldo Lopez | ulopez293@gmail.com</p>
        <br /><br />
      </div>
    </div>
  )
}

export default Acceso
