import React, { useCallback, useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { View, Text, Pressable } from 'dripsy';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as Contacts from 'expo-contacts';
import * as Notifications from 'expo-notifications';
import * as Haptics from 'expo-haptics';

import { Button } from 'app/design-system/button';
import type { OnboardingPermissionsScreenProps } from 'app/navigation/types';

function Checkbox({ isChecked }: { isChecked: boolean }) {
  return <Text sx={{ fontSize: 12 }}>{isChecked ? 'Yes' : 'No'}</Text>;
}

export default function OnboardingPermissionsScreen({
  navigation,
  route
}: OnboardingPermissionsScreenProps) {
  const { sessionId } = route.params;
  const [cameraStatus, setCameraStatus] = useState(null);
  const [contactStatus, setContactStatus] = useState(null);
  const [notificationStatus, setNotificationStatus] = useState(null);

  useEffect(() => {
    async function checkPermissions() {
      const { Camera } = require('react-native-vision-camera');
      const cameraStatus = await Camera.getCameraPermissionStatus();
      const contactStatus = await Contacts.getPermissionsAsync();
      const notificationStatus = await Notifications.getPermissionsAsync();

      setCameraStatus(cameraStatus);
      setContactStatus(contactStatus.status);
      setNotificationStatus(notificationStatus.status);
    }
    checkPermissions();
  }, []);

  const onSubmit = useCallback(async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    navigation.replace('OnboardingAge', {
      sessionId
    });
  }, [sessionId]);

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <SafeAreaView
        style={{ flex: 1, backgroundColor: 'white', paddingTop: 4 }}
      >
        <Text
          sx={{
            textAlign: 'center',
            color: 'gray',
            paddingLeft: 12,
            paddingRight: 12,
            paddingBottom: 12,
            borderBottomColor: 'gray',
            borderBottomWidth: 0.2
          }}
        >
          Poparazzi is a photo sharing app where you create your friend's
          profiles and they create yours. We'll need you to allow a few
          permissions to get started.
        </Text>

        <Pressable
          onPress={async () => {
            const { Camera } = require('react-native-vision-camera');
            const status = await Camera.requestCameraPermission();
            setCameraStatus(status);
          }}
        >
          <View
            sx={{
              flexDirection: 'row',
              padding: 12,
              borderBottomColor: 'gray',
              borderBottomWidth: 0.2
            }}
          >
            <View sx={{ justifyContent: 'center' }}>
              <Text>📸</Text>
            </View>
            <View sx={{ padding: 12, width: '90%' }}>
              <Text sx={{ fontWeight: 500 }}>Camera</Text>
              <Text sx={{ color: 'gray' }}>
                So you can take and upload photos of your friends
              </Text>
            </View>
            <View sx={{ justifyContent: 'center' }}>
              <Checkbox isChecked={cameraStatus === 'authorized'} />
            </View>
          </View>
        </Pressable>

        <Pressable
          onPress={async () => {
            const status = await Contacts.requestPermissionsAsync();
            setContactStatus(status.status);
          }}
        >
          <View
            sx={{
              flexDirection: 'row',
              padding: 12,
              borderBottomColor: 'gray',
              borderBottomWidth: 0.2
            }}
          >
            <View sx={{ justifyContent: 'center' }}>
              <Text>💁‍♀️</Text>
            </View>
            <View sx={{ padding: 12, width: '90%' }}>
              <Text sx={{ fontWeight: 500 }}>Contacts</Text>
              <Text sx={{ color: 'gray' }}>
                So you can find your friends and your friends can find you
              </Text>
            </View>
            <View sx={{ justifyContent: 'center' }}>
              <Checkbox isChecked={contactStatus === 'granted'} />
            </View>
          </View>
        </Pressable>

        <Pressable
          onPress={async () => {
            const status = await Notifications.requestPermissionsAsync();
            setNotificationStatus(status.status);
          }}
        >
          <View
            sx={{
              flexDirection: 'row',
              padding: 12,
              borderBottomColor: 'gray',
              borderBottomWidth: 0.2
            }}
          >
            <View sx={{ justifyContent: 'center' }}>
              <Text>🔔</Text>
            </View>
            <View sx={{ padding: 12, width: '90%' }}>
              <Text sx={{ fontWeight: 500 }}>Notifications</Text>
              <Text sx={{ color: 'gray' }}>
                So you know when your friends take photos of you
              </Text>
            </View>
            <View sx={{ justifyContent: 'center' }}>
              <Checkbox isChecked={notificationStatus === 'granted'} />
            </View>
          </View>
        </Pressable>

        <View
          sx={{
            position: 'absolute',
            bottom: 20,
            left: 0,
            right: 0,
            alignItems: 'center'
          }}
        >
          <Button
            onPress={onSubmit}
            title="Next"
            disabled={cameraStatus !== 'authorized'}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
