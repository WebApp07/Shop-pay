import "../styles/globals.scss";
import Head from "next/head";
import { Provider } from "react-redux";
import store from "../store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/lib/integration/react";
import { SessionProvider } from "next-auth/react";

let persistor = persistStore(store);

function MyApp({ Component, pageProps, session }) {
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
      <SessionProvider session={session}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Component {...pageProps} />
          </PersistGate>
        </Provider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
