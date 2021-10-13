import { Fragment } from "react";
import Head from "next/head";
import Navbar from "../navbar/navbar";
const Layout = (props) => {
  return (
    <Fragment>
      <Head>
        <title>Alumina Connect</title>
        <link rel="icon" type="image/png" href="/logo.png" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <meta
          name="description"
          content="Alumina connect for Our college students of TCET"
        ></meta>
      </Head>
      <Navbar />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
