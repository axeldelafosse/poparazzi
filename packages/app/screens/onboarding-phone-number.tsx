import React, { useCallback, useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { Text, View } from 'dripsy';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
// import { formatPhoneNumberIntl } from 'react-phone-number-input';

import { PhoneInput } from 'app/components/phone-input';
import { fetchAPI } from 'app/utils/fetch';
import { Button } from 'app/design-system/button';
import { useKeyboardDimensions } from 'app/hooks/use-keyboard-dimensions';
import type { OnboardingPhoneNumberScreenProps } from 'app/navigation/types';

export default function OnboardingPhoneNumberScreen({
  navigation,
  route
}: OnboardingPhoneNumberScreenProps) {
  const { sessionId, age } = route.params;
  const [phoneNumber, setPhoneNumber] = useState('');
  const [valid, setValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { keyboardHeight } = useKeyboardDimensions();

  // useEffect(
  //   function autoSubmit() {
  //     if (valid) onSubmit();
  //   },
  //   [phoneNumber, valid]
  // );

  const onSubmit = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);
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
    setIsLoading(false);

    if (errors) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      // TODO: show alert
      console.error(errors[0].detail);
    } else {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      navigation.push('OnboardingVerificationCode', {
        sessionId,
        phoneNumber,
        age
      });
    }
  }, [sessionId, age, phoneNumber, isLoading, setIsLoading]);

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
            What's your{'\n'}phone number?
          </Text>
        </View>

        <PhoneInput
          value={phoneNumber} // formatPhoneNumberIntl(phoneNumber)
          onChangePhoneNumber={({ phoneNumber, valid }) => {
            setPhoneNumber(phoneNumber);
            setValid(valid);
          }}
          inputProps={{
            ...Platform.select({
              web: {},
              default: {
                selectionColor: '#7e7f81',
                placeholderTextColor: '#7e7f81',
                keyboardAppearance: 'dark'
              }
            }),
            placeholder: 'Phone number',
            autoFocus: true
          }}
          textStyle={{
            fontFamily: 'NeueHaasGroteskDisplayW02Reg',
            fontSize: 24,
            color: 'white',
            // Fixes the bug of text getting vertically cut-off
            height: 'auto'
          }}
          style={{
            padding: 16,
            paddingTop: 24,
            paddingBottom: 24 + keyboardHeight
          }}
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
          <Button
            onPress={onSubmit}
            title="Next"
            disabled={!valid ?? isLoading}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
