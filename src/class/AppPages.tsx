import { buildOutline, buildSharp, cart, homeOutline, homeSharp, lockClosedOutline, lockClosedSharp } from "ionicons/icons"
import EstadoContext from "../interfaces/EstadoContext"
import AppPage from "../interfaces/AppPage"

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
            {
                title: (estado.login) ? 'Panel Admin' : 'Acceso',
                url: (estado.login) ? '/page/Agregar Producto' : '/page/Acceso',
                iosIcon: (estado.login) ? buildOutline : lockClosedOutline,
                mdIcon: (estado.login) ? buildSharp : lockClosedSharp
            }
        ]
    }
    public getAppPages() {
        return this.appPages
    }
}

export default AppPages