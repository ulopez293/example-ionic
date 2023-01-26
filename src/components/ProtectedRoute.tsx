import { PropsWithChildren } from "react"

interface ProtectedRouteProps {
  auth: boolean
  children: PropsWithChildren<React.ReactNode | undefined>
}

function ProtectedRoute(props: ProtectedRouteProps) {
  if (window.location.pathname === "/page/Principal" && !props.auth) {
    window.location.href = window.location.origin + '/page/Acceso'
    return <></>
  }
  if (window.location.pathname === "/page/Carrito" && !props.auth) {
    window.location.href = window.location.origin + '/page/Acceso'
    return <></>
  }
  if (window.location.pathname === "/page/Panel" && !props.auth) {
    window.location.href = window.location.origin + '/page/Acceso'
    return <></>
  }

  return (<>{props.children}</>)
}

export default ProtectedRoute