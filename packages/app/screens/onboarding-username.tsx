import React, {
  useCallback,
  useState,
  useContext,
  useRef,
  useEffect
} from 'react';
import { TextInput, Platform } from 'react-native';
import { Text, View } from 'dripsy';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';

import { fetchAPI } from 'app/utils/fetch';
import { Button } from 'app/design-system/button';
import { useKeyboardDimensions } from 'app/hooks/use-keyboard-dimensions';
import type { OnboardingUsernameScreenProps } from 'app/navigation/types';

export default function OnboardingUsernameScreen({
  navigation,
  route
}: OnboardingUsernameScreenProps) {
  const { sessionId, userId } = route.params;
  const [username, setUsername] = useState('');
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
          attributes: { username }
        }
      }
    });

    if (data) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      navigation.push('OnboardingProfilePicture', {
        sessionId,
        userId,
        profilePhotoUploadUrl: data.attributes.profile_photo_upload_url
      });
    } else if (errors) {
      // TODO: show alert
      console.error(errors[0].detail);
    }
  }, [sessionId, userId, username]);

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
            Create a{'\n'}username!
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
          value={username}
          onChangeText={(text) => setUsername(text)}
          clearButtonMode="while-editing"
          textContentType="username"
          accessibilityHint="Your username"
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
          <Button onPress={onSubmit} title="Next" disabled={username === ''} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
