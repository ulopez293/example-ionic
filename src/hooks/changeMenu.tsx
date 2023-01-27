import { useCallback } from "react"
import { useHistory } from "react-router"

export const useChangeMenu = () => {
    let history = useHistory()
    return useCallback((url: string) => {
        history.push(url)
    }, [history])
}
