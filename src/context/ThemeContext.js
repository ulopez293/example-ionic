import React from 'react'

const initialState = {
  login: false,
  carrito: 0,
  productos: []
}
const ThemeContext = React.createContext();

const context = {
  initialState: initialState,
  ThemeContext: ThemeContext
}

export default context
