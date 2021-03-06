import Head from 'next/head';
import type { AppProps } from 'next/app';
import numeral from 'numeral';
import 'numeral/locales/pt-br';

import Layout from '../layout';

import AppProvider from '../hookStore';

import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  numeral.locale('pt-br');

  return (
    <AppProvider>
      <Head>
        <title>Comparador | Renda Fixa</title>
        <meta
          name="description"
          content="Comparador de aplicações de renda fixa."
        />
        <link rel="icon" href="/favicon-2.ico" />
      </Head>

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  );
}

export default MyApp;
