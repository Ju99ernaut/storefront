import Head from 'next/head'
import '../styles/globals.css'
import '../styles/sidebar.css'
import '../styles/fonts/pixelfabric-clothes/style.css'
import 'font-awesome/css/font-awesome.min.css'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Blueprint for ecommerce webapp" />
        <meta name="keywords" content="Keywords" />
        <title>Storefront</title>

        <link rel="manifest" href="/manifest.json" />
        <link
          href="/icons/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/icons/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        <meta name="theme-color" content="#317EFB" />
        <script src="/modernizr.custom.js"></script>
      </Head>
      <Component {...pageProps} />
    </>
  )
}
