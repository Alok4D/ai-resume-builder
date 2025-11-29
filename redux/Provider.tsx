'use client'
import { ReactNode } from "react";
import { store, persistor } from "./store";
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

export default function Provider({children} : {children: ReactNode}) {
  return (
     <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
     </ReduxProvider>
  )
}
