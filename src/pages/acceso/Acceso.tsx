import { useState } from 'react'
import './Acceso.css'
import logo from '../../images/logo.png'
import Ingreso from './Ingreso'
import Registro from './Registro'

function Acceso() {
  const [registro, setRegistro] = useState(false)
  return (
    <div className="tab-content">
      <div className="imgcontainer bg-color-morado">
        <img src={logo} alt="Avatar" className="avatar" />
      </div>
      {registro ? <Registro setRegistro={setRegistro} /> : <Ingreso setRegistro={setRegistro}/>}
    </div>
  )
}

export default Acceso
