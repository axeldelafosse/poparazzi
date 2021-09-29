import React, { useCallback, useState, useRef, useEffect } from 'react';
import { TextInput, Platform } from 'react-native';
import { Text, View } from 'dripsy';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';

import { fetchAPI } from 'app/utils/fetch';
import { Button } from 'app/design-system/button';
import { useKeyboardDimensions } from 'app/hooks/use-keyboard-dimensions';
import type { OnboardingLastNameScreenProps } from 'app/navigation/types';

export default function OnboardingLastNameScreen({
  navigation,
  route
}: OnboardingLastNameScreenProps) {
  const { sessionId, userId, firstName } = route.params;
  const [lastName, setLastName] = useState('');
  const { keyboardHeight } = useKeyboardDimensions();
  const inputRef = useRef(null);

  useEffect(function focusOnMount() {
    inputRef.current?.focus();
  }, []);

  const onSubmit = useCallback(async () => {
    const { data, errors } = await fetchAPI({
      url: `/api/users/${userId}`,
      method: 'PATCH',
      sessionId,
      body: {
        data: {
          id: userId,
          type: 'users',
          attributes: { first_name: firstName, last_name: lastName }
        }
      }
    });

    // console.log(data);
    // console.log(errors);

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    navigation.push('OnboardingUsername', {
      sessionId,
      userId
    });
  }, [sessionId, userId, firstName, lastName]);

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
            What's your{'\n'}last name?
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
          value={lastName}
          onChangeText={(text) => setLastName(text)}
          clearButtonMode="while-editing"
          textContentType="familyName"
          accessibilityHint="Your last name"
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
          <Button onPress={onSubmit} title="Next" disabled={lastName === ''} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
