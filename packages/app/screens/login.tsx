import React, { useCallback, useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { View, Text } from 'dripsy';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as Contacts from 'expo-contacts';
import * as Notifications from 'expo-notifications';
import * as Haptics from 'expo-haptics';

import { fetchAPI } from 'app/utils/fetch';
import { Button } from 'app/design-system/button';
import { Image } from 'app/design-system/image';
import type { LoginScreenProps } from 'app/navigation/types';

export default function LoginScreen({ navigation }: LoginScreenProps) {
  // TODO: show video
  // TODO: haptics

  const [hasPermission, setHasPermission] = useState(null);

  useEffect(function checkPermissions() {
    (async () => {
      if (Platform.OS !== 'web') {
        try {
          const { Camera } = require('react-native-vision-camera');
          const cameraStatus = await Camera.getCameraPermissionStatus();
          const contactStatus = await Contacts.getPermissionsAsync();
          const notificationStatus = await Notifications.getPermissionsAsync();

          setHasPermission(
            cameraStatus === 'authorized' &&
              contactStatus.granted &&
              notificationStatus.granted
          );
        } catch (error) {}
      }
    })();
  }, []);

  const onSubmit = useCallback(async () => {
    const { data } = await fetchAPI({
      url: '/api/sessions',
      method: 'POST',
      body: {
        data: { attributes: { is_cookie_based: false }, type: 'sessions' }
      }
    });

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const sessionId = data.id;

    if (Platform.OS !== 'web' && !hasPermission) {
      navigation.replace('OnboardingPermissions', {
        sessionId
      });
    } else {
      navigation.replace('OnboardingAge', {
        sessionId
      });
    }
  }, [hasPermission]);

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'blue'
        }}
      >
        <Image
          // require('@poparazzi/next/public/poparazzi-logo.png')
          source={{ uri: 'https://poparazzi.vercel.app/poparazzi-logo.png' }}
          height={13 * 1.5}
          width={184 * 1.5}
        />

        <View sx={{ padding: 12 }} />

        <Text sx={{ color: 'white', textAlign: 'center', fontSize: 16 }}>
          Your friends are your poparazzi{'\n'}and you are theirs
        </Text>

        <View sx={{ padding: 12 }} />

        <View
          sx={{
            position: 'absolute',
            bottom: 20,
            left: 0,
            right: 0,
            alignItems: 'center'
          }}
        >
          <Button onPress={onSubmit} title="Get Started" />

          <View sx={{ padding: 12 }} />

          <Text
            sx={{
              color: 'white',
              textAlign: 'center',
              fontSize: 10,
              paddingLeft: 64,
              paddingRight: 64
            }}
          >
            By tapping on "Get Started", you agree to our Terms of Service and
            Privacy Policy
          </Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
