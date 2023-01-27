import DeleteElement from "../interfaces/DeleteElement"

export function eliminarElement(objectDelete: DeleteElement) {
  let db: IDBDatabase
  let request: IDBOpenDBRequest = window.indexedDB.open("tiendaDatabase", 4)
  request.onerror = function () { alert("Error al cargar Base de Datos.") }
  request.onsuccess = function (event: any) {
    db = event.target.result
    let transaction = db.transaction([objectDelete.nameStoreElements], "readwrite")
      .objectStore(objectDelete.nameStoreElements)
      .delete(objectDelete.identifierForDelete)
    transaction.onsuccess = function () {
      alert("Registro eliminado")
      objectDelete.resetStateElements({ type: "UPDATE_CARRITO", payload: 0 })
      objectDelete.resetStateElements({ type: "UPDATE_PRODUCTOS", payload: [] })
      objectDelete.seeableState(false)
    }
    db.close()
  }
}