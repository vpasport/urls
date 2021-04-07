import '../styles/globals.css'
import Head from 'next/head';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Квест "WorldWideWeb"</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
