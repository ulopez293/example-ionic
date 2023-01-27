import { buildOutline, buildSharp, cart, homeOutline, homeSharp, lockClosedOutline, lockClosedSharp } from "ionicons/icons"
import EstadoContext from "../interfaces/EstadoContext"
import AppPage from "../interfaces/AppPage"
import { Usuarios } from "../constants/Usuarios"

class AppPages {
    private appPages: Array<AppPage>
    constructor(estado: EstadoContext) {
        this.appPages = [
            {
                title: 'Principal',
                url: '/page/Productos',
                iosIcon: homeOutline,
                mdIcon: homeSharp,
            },
            {
                title: 'Carrito',
                url: '/page/Carrito',
                iosIcon: cart,
                mdIcon: cart,
                cantidad: estado.carrito
            },
        ]
        if (estado.tipo_usuario === Usuarios.Administrador) {
            this.appPages.push({
                title: (estado.login) ? 'Panel Admin' : 'Acceso',
                url: (estado.login) ? '/page/Agregar Producto' : '/page/Acceso',
                iosIcon: (estado.login) ? buildOutline : lockClosedOutline,
                mdIcon: (estado.login) ? buildSharp : lockClosedSharp
            })
        }
    }
    public getAppPages() {
        return this.appPages
    }
}

export default AppPages