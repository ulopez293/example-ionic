import Producto from "../interfaces/Producto"


export const getProductos = (): Promise<Producto[]> => {
  let db: any
  let request = window.indexedDB.open("tiendaDatabase", 4)
  return new Promise((resolve, reject) => {
    request.onerror = function () {
      alert("Error al cargar Base de Datos.")
      reject("Error al cargar Base de Datos.")
    }
    request.onsuccess = function (event: any) {
      db = event.target.result
      let transaction = db.transaction(["productos"])
      let objectStore = transaction.objectStore("productos")
      let tempProductosArray: Producto[] = []

      objectStore.openCursor().onsuccess = function (evt: any) {
        let cursor = evt.target.result
        if (cursor) {
          tempProductosArray.push(cursor.value)
          cursor.continue()
        } else {
          console.log("No hay mas productos..")
          resolve(tempProductosArray)
        }
      }
      db.close()
    }
  })
}