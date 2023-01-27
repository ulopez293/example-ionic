import { Categorias } from "../constants/Categorias"
interface Producto {
    identificador: number
    imagen: string
    nombre: string
    descripcion: string
    precio: number
    cantidad: number
    categoria: Categorias
}

export default Producto