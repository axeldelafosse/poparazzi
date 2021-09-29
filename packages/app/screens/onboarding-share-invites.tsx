import React, { useCallback } from 'react';
import { Text, View } from 'dripsy';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';

import { Button } from 'app/design-system/button';
import type { OnboardingShareInviteScreenProps } from 'app/navigation/types';

// TODO: skip

// Are you sure? (alert when skipping)
// Poparazzi literally only works with friends
// Cancel
// Skip

export default function OnboardingShareInviteScreen({
  route
}: OnboardingShareInviteScreenProps) {
  const { sessionId } = route.params;

  const onSubmit = useCallback(async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, [sessionId]);

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
            Invite some friends you want to use Poparazzi with
          </Text>
        </View>

        <View
          sx={{
            position: 'absolute',
            bottom: 20,
            left: 0,
            right: 0,
            alignItems: 'center'
          }}
        >
          <Button onPress={onSubmit} title="Share Invites" />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
