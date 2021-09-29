import * as Linking from 'expo-linking';

// TODO: linking for web https://reactnavigation.org/docs/navigation-container/
export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        initialRouteName: 'CameraTab',
        screens: {
          HomeTab: {
            screens: {
              Home: 'home',
              Posts: 'posts/:id'
            }
          },
          SearchTab: {
            screens: {
              Search: 'search'
              // Posts: 'posts',
              // Profile: 'profile'
            }
          },
          CameraTab: {
            screens: {
              Camera: 'camera',
              Tag: 'tag'
            }
          },
          ActivityTab: {
            screens: {
              Activity: 'activity'
            }
          },
          ProfileTab: {
            screens: {
              Profile: 'users/:id',
              Settings: 'settings'
              // Posts: 'posts',
            }
          }
        }
      },
      Onboarding: {
        screens: {
          Login: 'login',
          OnboardingAge: 'onboarding/age',
          OnboardingPhoneNumber: 'onboarding/phone-number',
          OnboardingVerificationCode: 'onboarding/verification-code',
          OnboardingCoordinator: 'onboarding/coordinator',
          OnboardingFirstName: 'onboarding/first-name',
          OnboardingLastName: 'onboarding/last-name',
          OnboardingPermissions: 'onboarding/permissions',
          OnboardingProfilePicture: 'onboarding/profile-picture',
          OnboardingShareInvites: 'onboarding/share-invites',
          OnboardingUsername: 'onboarding/username'
        }
      },
      NotFound: '*'
    }
  }
};
