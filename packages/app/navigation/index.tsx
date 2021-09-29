import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BottomTabNavigator from './bottom-tab-navigator';
import OnboardingNavigator from './onboarding-navigator';
import NotFoundScreen from 'app/screens/not-found';
import LinkingConfiguration from './linking';
import { useSessionId } from 'app/hooks/use-session-id';

export default function Navigation() {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={{
        dark: true,
        colors: {
          primary: 'rgb(255, 255, 255)',
          background: 'rgb(0, 0, 0)',
          card: 'rgb(0, 0, 0)',
          text: 'rgb(255, 255, 255)',
          border: 'rgb(39, 39, 41)',
          notification: 'rgb(255, 69, 58)'
        }
      }}
      documentTitle={{
        enabled: true,
        formatter: (options) =>
          options?.title ? `${options.title} - Poparazzi` : 'Poparazzi'
      }}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const sessionId = useSessionId();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {sessionId ? (
        <Stack.Screen name="Root" component={BottomTabNavigator} />
      ) : (
        <Stack.Screen
          name="Onboarding"
          component={OnboardingNavigator}
          options={{
            headerStyle: {
              backgroundColor: 'blue'
            }
          }}
        />
      )}
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
    </Stack.Navigator>
  );
}
