import { Dispatch } from 'react'
import EstadoContext from "./EstadoContext"

interface Context {
    estado: EstadoContext
    estadoAction: Dispatch<Action>
}

export interface Action {
    type: string
    payload: any
}

export default Context