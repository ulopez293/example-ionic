import { Dispatch, SetStateAction } from "react"

interface SaveElement<T> {
    newElement: T
    setDefaulStateToElement: Dispatch<SetStateAction<T>>
    setUpdatedElements: Dispatch<SetStateAction<Array<T>>>
    getElements: () => Promise<Array<T>>
    dataDefaultElement: T
    nameStoreElements: string
}

export default SaveElement