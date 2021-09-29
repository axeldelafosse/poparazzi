import React, {
  useCallback,
  useState,
  useEffect,
  useContext,
  useRef
} from 'react';
import { Alert, TextInput, Platform } from 'react-native';
import { View, Text, Pressable } from 'dripsy';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import useSWRNative from '@nandorojo/swr-react-native';
import * as Haptics from 'expo-haptics';

import { fetchAPI } from 'app/utils/fetch';
import { setSessionId } from 'app/utils/session-id';
import { SessionContext } from 'app/utils/session-context';
import { Button } from 'app/design-system/button';
import { setUserId } from 'app/utils/user-id';
import { useKeyboardDimensions } from 'app/hooks/use-keyboard-dimensions';
import type { OnboardingVerificationCodeScreenProps } from 'app/navigation/types';

export default function OnboardingVerificationCodeScreen({
  navigation,
  route
}: OnboardingVerificationCodeScreenProps) {
  const { sessionId, phoneNumber, age } = route.params;
  const [session, setSession] = useContext(SessionContext);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(false);
  const url = `/api/sessions/${sessionId}`;
  const { data, error } = useSWRNative(shouldFetch ? [url] : null, (url) =>
    fetchAPI({ url, method: 'GET', sessionId })
  );
  const { keyboardHeight } = useKeyboardDimensions();
  const inputRef = useRef(null);

  useEffect(function focusOnMount() {
    inputRef.current?.focus();
  }, []);

  useEffect(
    function getUserForSessionId() {
      const user = data?.included?.[0];
      if (user) {
        const userId = user.id;

        // TODO: POST /api/contacts
        // {"data":[{"type":"contacts","attributes":{"last_name":"","full_name":"Julie","clean_name":"Julie","is_emoji":false,"is_profile_photo":false,"first_name":"Julie","phone_numbers":["+33630381512"]},"id":"9E909A95-6D54-4441-BE6C-880C53C93C16"},

        if (
          user.attributes.invalidated_fields?.length >= 1 ||
          user.attributes.first_name === null
        ) {
          // New user onboarding
          navigation.push('OnboardingFirstName', { sessionId, userId });
        } else if (user.attributes.profile_photo_url === null) {
          navigation.push('OnboardingProfilePicture', {
            sessionId,
            userId,
            profilePhotoUploadUrl: user.attributes.profile_photo_upload_url
          });
        } else {
          // TODO: User is already onboarded, go to invites
          // navigation.push('OnboardingCoordinator', { sessionId, userId });
          setSessionId(sessionId);
          setSession(sessionId);
        }
      }
    },
    [data]
  );

  useEffect(
    function setTitle() {
      navigation.setOptions({ title: phoneNumber });
    },
    [phoneNumber]
  );

  // useEffect(
  //   function autoSubmit() {
  //     if (code.length === 7) {
  //       onSubmit();
  //     }
  //   },
  //   [code]
  // );

  const resendCode = useCallback(async () => {
    const { data, errors } = await fetchAPI({
      url: `/api/sessions/${sessionId}`,
      method: 'PATCH',
      sessionId,
      body: {
        data: {
          id: sessionId,
          type: 'sessions',
          attributes: { age: parseInt(age), phone_number: phoneNumber }
        }
      }
    });
  }, [age, phoneNumber]);

  const onSubmit = useCallback(async () => {
    setLoading(true);
    const { data, errors } = await fetchAPI({
      url: `/api/sessions/${sessionId}`,
      method: 'PATCH',
      sessionId,
      body: {
        data: {
          id: sessionId,
          type: 'sessions',
          attributes: { verification_code: code }
        }
      }
    });
    setLoading(false);

    const userId = data.relationships.user.data.id;
    if (userId) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      setUserId(userId);
      setShouldFetch(true);
    } else if (errors) {
      // TODO: retry alert
      Alert.alert('Error', 'Unable to update session.', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { text: 'Retry', onPress: () => console.log('Retry Pressed') }
      ]);
    }
  }, [sessionId, phoneNumber, code, loading]);

  // TODO: timer to resend code
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{ flex: 1, justifyContent: 'center', backgroundColor: 'blue' }}
      >
        <View sx={{ alignItems: 'center' }}>
          <Text
            sx={{
              color: 'white',
              fontSize: 24,
              fontWeight: 600,
              textAlign: 'center'
            }}
          >
            Enter the{'\n'}confirmation code
          </Text>
        </View>

        <TextInput
          ref={inputRef}
          style={[
            {
              padding: 16,
              paddingBottom: 16 + keyboardHeight,
              fontSize: 24,
              color: 'white',
              textAlign: 'center'
            },
            Platform.OS === 'web' ? { outlineStyle: 'none' } : null
          ]}
          value={code}
          onChangeText={setCode}
          editable={!loading}
          maxLength={7}
          clearButtonMode="while-editing"
          textContentType="oneTimeCode"
          keyboardType="number-pad"
          accessibilityHint="7-digit phone number texted to you"
          returnKeyType="done"
          autoFocus={true}
          selectionColor="#7e7f81"
          placeholderTextColor="#7e7f81"
          textAlign="center"
        />

        <View
          sx={{
            position: 'absolute',
            bottom: 20 + keyboardHeight,
            left: 0,
            right: 0,
            alignItems: 'center'
          }}
        >
          <Pressable onPress={resendCode}>
            <Text sx={{ color: 'white', fontWeight: 500 }}>
              Didn't get a code? Resend
            </Text>
          </Pressable>
          <View sx={{ padding: 12 }} />
          <Button onPress={onSubmit} title="Next" disabled={loading} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
