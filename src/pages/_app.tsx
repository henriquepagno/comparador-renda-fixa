import Head from 'next/head';
import type { AppProps } from 'next/app';

import Layout from '../layout';

import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Comparador | Renda Fixa</title>
        <meta
          name="description"
          content="Comparador de aplicações de renda fixa."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
