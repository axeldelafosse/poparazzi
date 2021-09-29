import React, { useCallback, useState, useEffect, useRef } from 'react';
import { TextInput, Platform } from 'react-native';
import { Text, View } from 'dripsy';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as Contacts from 'expo-contacts';
import * as Haptics from 'expo-haptics';

import { Button } from 'app/design-system/button';
import { useKeyboardDimensions } from 'app/hooks/use-keyboard-dimensions';
import type { OnboardingAgeScreenProps } from 'app/navigation/types';

export default function OnboardingAgeScreen({
  navigation,
  route
}: OnboardingAgeScreenProps) {
  const { sessionId } = route.params;
  const [age, setAge] = useState('');
  const { keyboardHeight } = useKeyboardDimensions();
  const inputRef = useRef(null);

  useEffect(function focusOnMount() {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (Platform.OS !== 'web') {
      const getContacts = async () => {
        const { data } = await Contacts.getContactsAsync({
          fields: [
            Contacts.Fields.ID,
            Contacts.Fields.Name,
            Contacts.Fields.FirstName,
            Contacts.Fields.MiddleName,
            Contacts.Fields.LastName,
            Contacts.Fields.Image,
            Contacts.Fields.PhoneNumbers
          ]
        });
        // TODO: format contacts and store somewhere (Realm)
      };
      getContacts();
    }
  }, []);

  // TODO: add validation for age?
  const onSubmit = useCallback(async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    navigation.push('OnboardingPhoneNumber', {
      sessionId,
      age
    });
  }, [sessionId, age]);

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
            What's your{'\n'}age?
          </Text>
        </View>

        <TextInput
          ref={inputRef}
          style={[
            {
              padding: 16,
              fontSize: 24,
              color: 'white',
              textAlign: 'center',
              paddingBottom: keyboardHeight
            },
            Platform.OS === 'web' ? { outlineStyle: 'none' } : null
          ]}
          value={age}
          onChangeText={(text) => setAge(text)}
          maxLength={3}
          clearButtonMode="while-editing"
          textContentType="none"
          keyboardType="number-pad"
          accessibilityHint="Your age"
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
          <Button onPress={onSubmit} title="Next" disabled={age === ''} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
