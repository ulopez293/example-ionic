import { useContext } from 'react'
import { useLocation } from 'react-router'
import './Page.css'
import Productos from './productos/Productos'
import Acceso from './acceso/Acceso'
import Carrito from './carrito/Carrito'
import Panel from './panel/Panel'
import context from '../context/ThemeContext.js'
import { getProductos } from '../functions/getProductos'

const Routes: React.FC = () => {
    let { estado } = useContext(context.ThemeContext)
    const location = useLocation()
    return (
        <div>
            {(location.pathname === "/page/Productos" && estado.login) ? <Productos getProductos={async () => await getProductos()} tipo="normal" /> : ''}
            {(location.pathname === "/page/Carrito" && estado.login) ? <Carrito /> : ''}
            {(location.pathname === "/page/Agregar Producto" && estado.login) ? <Panel listadoProductos={getProductos} /> : ''}
            {(location.pathname === "/page/Acceso" && !estado.login) ? <Acceso /> : ''}
        </div>
    )
}

export default Routes
