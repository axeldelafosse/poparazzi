import React, { useCallback, useState, useRef, useEffect } from 'react';
import { TextInput, Platform } from 'react-native';
import { Text, View } from 'dripsy';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';

import { Button } from 'app/design-system/button';
import { useKeyboardDimensions } from 'app/hooks/use-keyboard-dimensions';
import type { OnboardingFirstNameScreenProps } from 'app/navigation/types';

export default function OnboardingFirstNameScreen({
  navigation,
  route
}: OnboardingFirstNameScreenProps) {
  const { sessionId, userId } = route.params;
  const [firstName, setFirstName] = useState('');
  const { keyboardHeight } = useKeyboardDimensions();
  const inputRef = useRef(null);

  useEffect(function focusOnMount() {
    inputRef.current?.focus();
  }, []);

  const onSubmit = useCallback(async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    navigation.push('OnboardingLastName', {
      sessionId,
      userId,
      firstName
    });
  }, [sessionId, userId, firstName]);

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
            What's your{'\n'}first name?
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
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          clearButtonMode="while-editing"
          textContentType="givenName"
          accessibilityHint="Your first name"
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
          <Button onPress={onSubmit} title="Next" disabled={firstName === ''} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
