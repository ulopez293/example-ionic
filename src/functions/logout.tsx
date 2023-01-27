import { Dispatch } from "react"
import { Action } from "../interfaces/Context"

export const logout = (estadoAction: Dispatch<Action>) => {
    estadoAction({
        type: "UPDATE_LOGIN",
        payload: false
    })
    window.location.href = window.location.origin + '/page/Acceso'
}