import React, { useCallback, useContext } from 'react';
import { Platform } from 'react-native';
import { View, Text, Pressable } from 'dripsy';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useSWRConfig } from 'swr';

import { deleteCache } from 'app/utils/delete-cache';
import { deleteUserId } from 'app/utils/user-id';
import { deleteSessionId } from 'app/utils/session-id';
import { SessionContext } from 'app/utils/session-context';
import { useCurrentUser } from 'app/hooks/use-current-user';
import { config } from 'app/config';
import { ImagePickerButton } from 'app/design-system/image-picker';

export default function SettingsScreen() {
  const currentUser = useCurrentUser();
  const [session, setSession] = useContext(SessionContext);
  const { cache } = useSWRConfig();

  const logOut = useCallback(() => {
    cache.clear();
    deleteCache();
    deleteUserId();
    deleteSessionId();
    setSession(null);
  }, [setSession]);

  const uploadProfilePhoto = useCallback(
    async (photo) => {
      const blob = await (await fetch(photo.uri)).blob();

      try {
        const result = await fetch(
          // Use proxy on web
          Platform.OS === 'web'
            ? currentUser.profile_photo_upload_url.replace(
                'https://pop-production-data.s3.amazonaws.com',
                `${config.api_url_on_web}/api`
              )
            : currentUser.profile_photo_upload_url,
          {
            method: 'PUT',
            headers: {
              'User-Agent': `Poparazzi/1.9.15 (TTYL.Inc.Poparazzi; build:90; iOS 14.4.0) Alamofire/5.4.3`
            },
            body: blob
          }
        );
      } catch (error) {
        console.error(error);
      }
    },
    [currentUser]
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{ flex: 1, justifyContent: 'center', backgroundColor: 'black' }}
      >
        <View sx={{ justifyContent: 'center', alignItems: 'center' }}>
          <ImagePickerButton onPick={uploadProfilePhoto} type="profilePhoto" />
        </View>

        <View sx={{ padding: 8 }}>
          <Pressable onPress={logOut}>
            <Text sx={{ color: 'white' }}>Logout</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
