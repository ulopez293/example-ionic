import Producto from "./Producto"

interface EstadoContext {
    login: boolean
    carrito: number
    productos: Array<Producto>
}

export default EstadoContext