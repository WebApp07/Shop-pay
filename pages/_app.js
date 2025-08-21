import '../styles/globals.scss'
import { Provider } from 'react-redux'
import store from '../store'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/lib/integration/react'

let persistor = persistStore(store)

function MyApp({ Component, pageProps }) {


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
      </PersistGate>
    </Provider>
  )
}

export default MyApp
