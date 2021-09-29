import React, { useState, useEffect } from 'react';
import { AppState } from 'react-native';
import * as Updates from 'expo-updates';
import { enableScreens } from 'react-native-screens';
import { DripsyProvider } from 'dripsy';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppLoading from 'expo-app-loading';
import * as Sentry from 'sentry-expo';
import { MMKV } from 'react-native-mmkv';
import { SWRConfig } from 'swr';
// import Realm from 'realm';

import Navigation from 'app/navigation';
import { theme } from 'app/design-system/theme';
import { SessionContext } from 'app/utils/session-context';
import { getSessionId, deleteSessionId } from 'app/utils/session-id';
import { deleteUserId } from 'app/utils/user-id';
import { deleteCache } from 'app/utils/delete-cache';

Sentry.init({
  dsn: 'https://1344f82c5479459eb0147cd2236f76e0@o828980.ingest.sentry.io/5811832',
  enableInExpoDevelopment: true,
  debug: process.env.STAGE === 'development'
});
enableScreens(true);

function mmkvProvider() {
  const appCache = MMKV.getString('app-cache');
  const map = new Map(appCache ? JSON.parse(appCache) : []);

  AppState.addEventListener('change', () => {
    const appCache = JSON.stringify(Array.from(map.entries()));
    MMKV.set('app-cache', appCache);
  });

  return map;
}

// import { RealmContext } from 'app/utils/realm'; // RealmProvider
// import { Schema } from 'app/schema';

// type Props = {
//   children: any;
//   config: any;
// };

// function RealmProvider({ children, config }: Props) {
//   const [realm, setRealm] = useState<Realm | null>(null);

//   useEffect(() => {
//     const newRealm = new Realm(config);
//     setRealm(newRealm);

//     // Delete all objects from the realm.
//     // newRealm.write(() => {
//     //   newRealm.deleteAll();
//     // });

//     return () => {
//       realm?.close();
//     };
//   }, [config]);

//   if (realm === null) {
//     return null;
//   }

//   return (
//     <RealmContext.Provider value={realm}>{children}</RealmContext.Provider>
//   );
// }

// Realm Sync?
// https://docs.mongodb.com/realm/sdk/react-native/examples/sync-changes-between-devices/#std-label-react-native-sync-changes-between-devices
// const config = {
//   schema: Schema,
//   deleteRealmIfMigrationNeeded: true
// };

export default function App() {
  const [fontsLoaded, error] = useFonts({
    GraphikBlack: require('./assets/fonts/GraphikBlack.otf'),
    GraphikBold: require('./assets/fonts/GraphikBold.otf'),
    GraphikMedium: require('./assets/fonts/GraphikMedium.otf'),
    GraphikRegular: require('./assets/fonts/GraphikRegular.otf'),
    GraphikSemibold: require('./assets/fonts/GraphikSemibold.otf'),
    'HoxtonSans-ExtraBoldItalic': require('./assets/fonts/HoxtonSans-ExtraBoldItalic.ttf'),
    NeueHaasGroteskDisplayW02Blk: require('./assets/fonts/NeueHaasGroteskDisplayW02Blk.ttf'),
    NeueHaasGroteskDisplayW02Bold: require('./assets/fonts/NeueHaasGroteskDisplayW02Bold.ttf'),
    NeueHaasGroteskDisplayW02Lt: require('./assets/fonts/NeueHaasGroteskDisplayW02Lt.ttf'),
    NeueHaasGroteskDisplayW02Medium: require('./assets/fonts/NeueHaasGroteskDisplayW02Medium.ttf'),
    NeueHaasGroteskDisplayW02Reg: require('./assets/fonts/NeueHaasGroteskDisplayW02Reg.ttf'),
    NeueHaasGroteskDisplayW02UltTh: require('./assets/fonts/NeueHaasGroteskDisplayW02UltTh.ttf')
  });
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

  if (error) {
    console.error(error);
  }

  return (
    <DripsyProvider theme={theme}>
      <SafeAreaProvider style={{ backgroundColor: 'black' }}>
        <SWRConfig value={{ provider: mmkvProvider }}>
          <SessionContext.Provider value={[session, setSession]}>
            {/* <RealmProvider config={config}> */}
            <StatusBar style="light" />
            {!fontsLoaded ? <AppLoading /> : <Navigation />}
            {/* </RealmProvider> */}
          </SessionContext.Provider>
        </SWRConfig>
      </SafeAreaProvider>
    </DripsyProvider>
  );
}
