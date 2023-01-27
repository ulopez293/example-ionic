import { useState, useEffect } from 'react'
import './Productos.css';
import Producto from './Producto';
import ProductoInterface from '../../interfaces/Producto'

interface ProductosProps {
  getProductos?: () => Promise<Array<ProductoInterface>>,
  productos?: Array<ProductoInterface>
  tipo: string
}

function Productos({ getProductos, productos, tipo }: ProductosProps) {
  let [productosState, setProductos] = useState<ProductoInterface[]>([])

  useEffect(() => {
    let fetchData = async () => {
      if (tipo === "normal" && getProductos) setProductos(await getProductos())
      if (tipo === "administrador" && productos) setProductos(productos)
    }
    fetchData()
    return () => { setProductos([]) }
  }, [])

  console.log(productosState)

  return (
    <div className="ion-text-center">
      {
        productosState.length >= 1 ? productosState.map(item => (
          <Producto key={item.identificador} tipo={tipo} producto={item} />
        )) : <h5>Usuario: No hay productos registrados...</h5>
      }
    </div>
  );
}

export default Productos
