import { Provider } from "react-redux";
import { useStore } from "../store";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

// import '../styles/globals.css'

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

// export default MyApp
