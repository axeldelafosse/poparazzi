import { getInitialProps } from '@expo/next-adapter/document';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

class Document extends NextDocument {
  render() {
    return (
      <Html lang="en" style={{ background: 'black' }}>
        <Head>
          <link
            rel="preload"
            as="font"
            crossOrigin="crossorigin"
            type="font/woff2"
            href="/fonts/GraphikRegular.woff2"
          />
          <link
            rel="preload"
            as="font"
            crossOrigin="crossorigin"
            type="font/woff2"
            href="/fonts/GraphikSemibold.woff2"
          />
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

Document.getInitialProps = getInitialProps;

export default Document;
