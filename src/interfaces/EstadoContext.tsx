import Producto from "./Producto"

interface EstadoContext {
    login: boolean
    carrito: number
    productos: Array<Producto>
    tipo_usuario: string
}

export default EstadoContext