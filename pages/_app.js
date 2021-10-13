import NextNProgress from "nextjs-progressbar";
import Layout from "../components/layout/layout";
import "antd/dist/antd.css";
import "../styles/globals.css";
import { Provider } from "next-auth/client";

function MyApp({ Component, pageProps }) {
  return (
    <Provider
      options={{
        clientMaxAge: 60, // Re-fetch session if cache is older than 60 seconds
      }}
      session={pageProps.session}
    >
      <NextNProgress height={4} color="#AE00FB" showOnShallow={true} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
