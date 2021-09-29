import '../styles/fonts.scss';
import '../styles/global.scss';

import 'raf/polyfill';
// @ts-ignore
global.setImmediate = requestAnimationFrame;
import 'setimmediate';

import React, { useState, useEffect } from 'react';
import { DripsyProvider } from 'dripsy';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

import Navigation from 'app/navigation';
import { theme } from 'app/design-system/theme';
import { SessionContext } from 'app/utils/session-context';
import { getSessionId, deleteSessionId } from 'app/utils/session-id';
import { deleteUserId } from 'app/utils/user-id';
import { deleteCache } from 'app/utils/delete-cache';
import { isServer } from 'app/utils/is-server';

function localStorageProvider() {
  const map = new Map(JSON.parse(localStorage.getItem('app-cache')) || []);

  window.addEventListener('beforeunload', () => {
    const appCache = JSON.stringify(Array.from(map.entries()));
    localStorage.setItem('app-cache', appCache);
  });

  return map;
}

export default function App({ Component, pageProps }: AppProps) {
  const [session, setSession] = useState<string>(getSessionId());

  useEffect(() => {
    const ws = new WebSocket(`wss://poparazzi.com`);

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          authorization: `Bearer ${session}`
        })
      );
    };

    ws.onclose = (e) => {
      // Session expired
      if (e.code === 4001) {
        deleteCache();
        deleteUserId();
        deleteSessionId();
        setSession(null);
      }
    };
  }, [session, setSession]);

  return (
    <>
      <Head>
        <title>Poparazzi</title>
        <meta key="title" name="title" content="Poparazzi" />
        <meta
          key="description"
          name="description"
          content="Be your friends’ poparazzi. Your friends post to your profile. See who’s been popped."
        />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.png" />
        <meta
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
          name="viewport"
        />
      </Head>
      <DripsyProvider theme={theme}>
        <SafeAreaProvider>
          <SWRConfig
            value={{
              provider: isServer ? () => new Map() : localStorageProvider
            }}
          >
            <SessionContext.Provider value={[session, setSession]}>
              <Navigation />
              <Component {...pageProps} />
            </SessionContext.Provider>
          </SWRConfig>
        </SafeAreaProvider>
      </DripsyProvider>
    </>
  );
}
