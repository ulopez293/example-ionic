import { PropsWithChildren } from "react"

interface ProtectedRouteProps {
  auth: boolean
  children: PropsWithChildren<React.ReactNode | undefined>
}

function ProtectedRoute(props: ProtectedRouteProps) {
  if (decodeURI(window.location.pathname) === "/page/Productos" && !props.auth) {
    window.location.href = window.location.origin + '/page/Acceso'
    return <></>
  }
  if (decodeURI(window.location.pathname) === "/page/Carrito" && !props.auth) {
    window.location.href = window.location.origin + '/page/Acceso'
    return <></>
  }
  if (decodeURI(window.location.pathname) === "/page/Agregar Producto" && !props.auth) {
    window.location.href = window.location.origin + '/page/Acceso'
    return <></>
  }

  return (<>{props.children}</>)
}

export default ProtectedRoute