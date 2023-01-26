import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useContext, useState } from 'react'
import { useHistory } from "react-router-dom"
import './Acceso.css'
import context from '../../context/ThemeContext'
import Usuario from '../../interfaces/Usuario'

interface RegistroProps {
    setRegistro: Dispatch<SetStateAction<boolean>>
}

function Registro({ setRegistro }: RegistroProps) {
    let { estadoAction } = useContext(context.ThemeContext)
    const [USER, PASS] = ['administrador', '1234']
    const [acceso, setAcceso] = useState<Usuario>({ nombre: '', email: '', password: '' })
    const [confirmPassword, setConfirmPassword] = useState<string>('')

    let history = useHistory()

    const validarLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('entro')
        
        if (acceso.nombre === USER && acceso.password === PASS && confirmPassword === acceso.password) {
            estadoAction({ type: "UPDATE_LOGIN", payload: true })
            history.push("/page/Principal")
        } else {
            alert("Datos Incorrectos")
        }
    }
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setAcceso({ ...acceso, [e.target.name]: e.target.value })

    return (
        <form onSubmit={validarLogin}>
            <div className="bg-color-morado">
                <div className="container-inputs">
                    <br /><br />
                    <input onChange={handleInputChange}
                        type="text" placeholder="Nombre" name="nombre" required />
                    <input onChange={handleInputChange}
                        type="email" placeholder="Email" name="email" required />
                    <input onChange={handleInputChange}
                        type="password" placeholder="Contraseña" name="password" required />
                    <input onChange={(e) => { setConfirmPassword(e.target.value) }}
                        type="password" placeholder="Confirma Contraseña" name="repeatPassword" required />
                    <br />
                </div>
            </div>
            <div className="container">
                <button type='submit' className="psw bg-color-morado access-button" style={{ float: 'right' }}>
                    Registrar
                </button>
                <br /><br /><br /><br />
            </div>
            <div className="ion-text-center fondo-page" style={{ fontSize: 'large' }}>
                <p className="color-gris m-5">¿Ya tienes cuenta?</p>
                <p className="color-morado m-5 cursor" onClick={() => {setRegistro(false)}}>Inicia Sesion</p>
                <br /><br />
            </div>
        </form>
    )
}

export default Registro