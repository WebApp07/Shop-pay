import "../styles/globals.scss";
import Head from "next/head";
import { Provider } from "react-redux";
import store from "../store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/lib/integration/react";

let persistor = persistStore(store);

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Shoppay</title>
        <meta
          name="description"
          content="shoppay-online shopping service for all of your needs. "
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </>
  );
}

export default MyApp;
