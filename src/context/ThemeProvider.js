import React, { useReducer } from 'react'
import context from './ThemeContext'

const initialState = context.initialState
const ThemeContext = context.ThemeContext

const reducerTheme = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_CARRITO':
      return  {
          ...state,
          carrito: action.payload
      }
    case 'UPDATE_LOGIN':
      return  {
          ...state,
          login: action.payload
      }
    case 'UPDATE_PRODUCTOS':
      return  {
            ...state,
            productos: action.payload
      }
    default:
      return state
  }
}

function ThemeProvider(props) {
  const fullInitialState = {
    ...initialState,
  }
  let [estado, estadoAction] = useReducer(reducerTheme, fullInitialState)
  let value = { estado, estadoAction }
  return (
    <ThemeContext.Provider value={value}>
      {props.children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
