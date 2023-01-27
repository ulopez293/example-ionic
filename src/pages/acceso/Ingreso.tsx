import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useContext, useState } from 'react'
import { useHistory } from "react-router-dom"
import './Acceso.css'
import context from '../../context/ThemeContext'
import Usuario from '../../interfaces/Usuario'
import { Usuarios } from '../../constants/Usuarios'

interface IngresoProps {
    setRegistro: Dispatch<SetStateAction<boolean>>
}

function Ingreso({ setRegistro }: IngresoProps) {
    let { estadoAction } = useContext(context.ThemeContext)
    const [USER, PASS] = ['user@gmail.com', '1234']
    const [acceso, setAcceso] = useState<Usuario>({ nombre: '', email: '', password: '' })

    let history = useHistory()

    const validarLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (acceso.email === USER && acceso.password === PASS) {
            estadoAction({ type: "UPDATE_LOGIN", payload: true })
            estadoAction({ type: "UPDATE_TIPO_USUARIO", payload: Usuarios.Administrador })
            history.push("/page/Productos")
        } else {
            alert("Otro usuario pendiente funcion validar, se va a entrar de igual forma. Para entrar como admin: user@gmail.com , 1234")
            estadoAction({ type: "UPDATE_LOGIN", payload: true })
            estadoAction({ type: "UPDATE_TIPO_USUARIO", payload: Usuarios.Cliente })
            history.push("/page/Productos")
        }
    }
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setAcceso({ ...acceso, [e.target.name]: e.target.value })

    return (
        <form onSubmit={validarLogin}>
            <div className="bg-color-morado">
                <div className="container-inputs">
                    <br /><br />
                    <input onChange={handleInputChange}
                        type="email" placeholder="Email" name="email" required />
                    <input onChange={handleInputChange}
                        type="password" placeholder="Contraseña" name="password" required />
                    <br />
                </div>
            </div>
            <div className="container">
                <button type='submit' className="psw bg-color-morado access-button" style={{ float: 'right' }}>
                    Ingresar
                </button>
                <br /><br /><br /><br />
            </div>
            <div className="ion-text-center fondo-page" style={{ fontSize: 'large' }}>
                <p className="color-gris m-5">¿Aún no tienes cuenta?</p>
                <p className="color-morado m-5 cursor" onClick={() => {setRegistro(true)}}>Registrate</p>
                <p className="color-gris" style={{ fontSize: 'medium' }}>Ubaldo Lopez | ulopez293@gmail.com</p>
                <br /><br />
            </div>
        </form>
    )
}

export default Ingreso