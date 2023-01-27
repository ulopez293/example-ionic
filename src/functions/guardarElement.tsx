import SaveElement from "../interfaces/SaveElement"

export function guardarElement<T>(objectSave: SaveElement<T>) {
    for (const key in objectSave.newElement) {
        if (typeof objectSave.newElement[key] === 'string' && String(objectSave.newElement[key]).trim() === '') {
            alert("Hay campos vacios")
            return
        }
        if (key === 'precio' && (objectSave.newElement[key] === 0 || objectSave.newElement[key] === '0')) {
            alert("Asigna el precio")
            return
        }
    }
    let db: IDBDatabase
    let request = window.indexedDB.open("tiendaDatabase", 4)
    request.onsuccess = function (event: any) {
        db = event.target.result
        let transaction = db.transaction([objectSave.nameStoreElements], "readwrite")
        transaction.onerror = function () {
            alert("No se han podido agregar los datos, error transaccion.")
        }
        let objectStore = transaction.objectStore(objectSave.nameStoreElements)
        let resultado = objectStore.add(objectSave.newElement)
        resultado.onsuccess = async function () {
            objectSave.setDefaulStateToElement(objectSave.dataDefaultElement)
            alert("Datos agregados correctamente")
            const lista = await objectSave.getElements()
            objectSave.setUpdatedElements(lista)
        }
        db.close()
    }
    request.onerror = function (error) {
        console.log(error)
        alert("Error al cargar Base de Datos.")
    }
}