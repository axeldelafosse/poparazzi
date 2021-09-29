import React, { useCallback, useContext, useState } from 'react';
import { Platform, ActivityIndicator } from 'react-native';
import { Text, View } from 'dripsy';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';

import { ImagePickerButton } from 'app/design-system/image-picker';
import { Pressable } from 'app/design-system/pressable-scale';
// import { useCurrentUser } from 'app/hooks/use-current-user';
import { config } from 'app/config';
import { setSessionId } from 'app/utils/session-id';
import { SessionContext } from 'app/utils/session-context';
import { IconActivityEmpty } from 'app/design-system/icon/IconActivityEmpty';
import type { OnboardingProfilePictureScreenProps } from 'app/navigation/types';

export default function OnboardingProfilePictureScreen({
  route
}: OnboardingProfilePictureScreenProps) {
  const { sessionId, profilePhotoUploadUrl } = route.params;
  const [session, setSession] = useContext(SessionContext);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(
    async (photo) => {
      setIsLoading(true);

      const blob = await (await fetch(photo.uri)).blob();

      try {
        await fetch(
          // Use proxy on web
          Platform.OS === 'web'
            ? profilePhotoUploadUrl.replace(
                'https://pop-production-data.s3.amazonaws.com',
                `${config.api_url_on_web}/api`
              )
            : profilePhotoUploadUrl,
          {
            method: 'PUT',
            headers: {
              'User-Agent': `Poparazzi/1.9.15 (TTYL.Inc.Poparazzi; build:90; iOS 14.4.0) Alamofire/5.4.3`
            },
            body: blob
          }
        );

        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

        // TODO: go to share invites
        // navigation.push('OnboardingShareInvites', {
        //   sessionId
        // });

        setSessionId(sessionId);
        setSession(sessionId);
      } catch (error) {
        console.error(error);
        setIsLoading(false);

        // TODO: retry alert
        // Upload failed
        // Check your connection and try again
        // Retry
      }
    },
    [sessionId, profilePhotoUploadUrl, setIsLoading]
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'blue' }}>
        <View
          sx={{
            flex: 1,
            justifyContent: 'space-between'
          }}
        >
          <View sx={{ paddingTop: 64 }}>
            <Text
              sx={{
                color: 'white',
                fontSize: 24,
                fontWeight: 600,
                textAlign: 'center',
                paddingBottom: 16
              }}
            >
              Add Profile Picture
            </Text>

            <Text sx={{ color: 'white', textAlign: 'center' }}>
              Add a profile picture so your friends{'\n'}know it's you
            </Text>
          </View>

          <View sx={{ alignItems: 'center' }}>
            <IconActivityEmpty width={142} height={142} color="white" />
          </View>

          <View sx={{ alignItems: 'center', paddingBottom: 20 }}>
            {isLoading ? (
              <ActivityIndicator color="white" size="large" />
            ) : (
              <>
                <ImagePickerButton onPick={onSubmit} type="button" />

                <Pressable
                  onPress={() => {
                    // TODO: go to share invites
                    // navigation.push('OnboardingShareInvites', {
                    //   sessionId
                    // });

                    setSessionId(sessionId);
                    setSession(sessionId);
                  }}
                >
                  <Text
                    sx={{ color: 'white', paddingTop: 16, fontWeight: 500 }}
                  >
                    Skip
                  </Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
