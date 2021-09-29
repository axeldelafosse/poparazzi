import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from 'app/screens/login';
import OnboardingPermissionsScreen from 'app/screens/onboarding-permissions';
import OnboardingAgeScreen from 'app/screens/onboarding-age';
import OnboardingFirstNameScreen from 'app/screens/onboarding-first-name';
import OnboardingLastNameScreen from 'app/screens/onboarding-last-name';
import OnboardingUsernameScreen from 'app/screens/onboarding-username';
import OnboardingPhoneNumberScreen from 'app/screens/onboarding-phone-number';
import OnboardingVerificationCodeScreen from 'app/screens/onboarding-verification-code';
import OnboardingCoordinatorScreen from 'app/screens/onboarding-coordinator';
import OnboardingInviteScreen from 'app/screens/onboarding-invite';
import OnboardingShareInviteScreen from 'app/screens/onboarding-share-invites';
import OnboardingProfilePictureScreen from 'app/screens/onboarding-profile-picture';

const OnboardingStack = createNativeStackNavigator();

export default function OnboardingNavigator() {
  return (
    <OnboardingStack.Navigator
      screenOptions={{
        headerShown: true,
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontFamily: 'NeueHaasGroteskDisplayW02Reg',
          fontWeight: 'bold'
        }
      }}
    >
      <OnboardingStack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false
        }}
      />
      <OnboardingStack.Screen
        name="OnboardingPermissions"
        component={OnboardingPermissionsScreen}
        options={{
          headerTitle: 'Permissions',
          headerTitleStyle: {
            color: 'black'
          },
          headerStyle: {
            backgroundColor: 'white'
          },
          headerShadowVisible: false
        }}
      />
      <OnboardingStack.Screen
        name="OnboardingAge"
        component={OnboardingAgeScreen}
        options={{
          headerShown: false
        }}
      />
      <OnboardingStack.Screen
        name="OnboardingFirstName"
        component={OnboardingFirstNameScreen}
        options={{
          headerShown: false
        }}
      />
      <OnboardingStack.Screen
        name="OnboardingLastName"
        component={OnboardingLastNameScreen}
        options={{
          headerShown: false
        }}
      />
      <OnboardingStack.Screen
        name="OnboardingUsername"
        component={OnboardingUsernameScreen}
        options={{
          headerShown: false
        }}
      />
      <OnboardingStack.Screen
        name="OnboardingPhoneNumber"
        component={OnboardingPhoneNumberScreen}
        options={{ headerShown: false }}
      />
      <OnboardingStack.Screen
        name="OnboardingVerificationCode"
        component={OnboardingVerificationCodeScreen}
        options={{
          headerStyle: {
            backgroundColor: 'blue'
          },
          headerShadowVisible: false,
          headerTitleAlign: 'left'
          // headerBackImageSource?
        }}
      />
      <OnboardingStack.Screen
        name="OnboardingCoordinator"
        component={OnboardingCoordinatorScreen}
        options={{ headerShown: false }}
      />
      <OnboardingStack.Screen
        name="OnboardingInvite"
        component={OnboardingInviteScreen}
        options={{ headerShown: false }}
      />
      <OnboardingStack.Screen
        name="OnboardingShareInvite"
        component={OnboardingShareInviteScreen}
        options={{ headerShown: false }}
      />
      <OnboardingStack.Screen
        name="OnboardingProfilePicture"
        component={OnboardingProfilePictureScreen}
        options={{ headerShown: false }}
      />
    </OnboardingStack.Navigator>
  );
}
