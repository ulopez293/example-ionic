import { Dispatch, SetStateAction } from "react"
import { Action } from "./Context"

interface DeleteElement {
    seeableState: Dispatch<SetStateAction<boolean>>
    resetStateElements: Dispatch<SetStateAction<Action>>
    identifierForDelete: number
    nameStoreElements: string
}

export default DeleteElement