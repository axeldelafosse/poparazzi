import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { User, Content } from 'app/schema';

type RootStackParamList = {
  Home: undefined;
  Posts: { post: Content; user: User; tab?: 'popsOfUser' | 'popsByUser' };
  Search: undefined;
  Camera: { user: User };
  Tag: { photos: { uri: string }[]; taggedUser?: User };
  Activity: undefined;
  Profile: { user?: User; tabIndex?: number };
  Settings: undefined;
};

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
type PostsScreenProps = NativeStackScreenProps<RootStackParamList, 'Posts'>;
type SearchScreenProps = NativeStackScreenProps<RootStackParamList, 'Search'>;
type CameraScreenProps = NativeStackScreenProps<RootStackParamList, 'Camera'>;
type TagScreenProps = NativeStackScreenProps<RootStackParamList, 'Tag'>;
type ActivityScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Activity'
>;
type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;
type SettingsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Settings'
>;

type OnboardingStackParamList = {
  Login: undefined;
  OnboardingPermissions: { sessionId: string };
  OnboardingAge: { sessionId: string };
  OnboardingFirstName: { sessionId: string; userId: string };
  OnboardingLastName: { sessionId: string; userId: string; firstName: string };
  OnboardingUsername: { sessionId: string; userId: string };
  OnboardingPhoneNumber: { sessionId: string; age: string };
  OnboardingVerificationCode: {
    sessionId: string;
    phoneNumber: string;
    age: string;
  };
  OnboardingCoordinator: undefined;
  OnboardingInvite: undefined;
  OnboardingShareInvite: { sessionId: string };
  OnboardingProfilePicture: {
    sessionId: string;
    userId: string;
    profilePhotoUploadUrl: string;
  };
};

type LoginScreenProps = NativeStackScreenProps<
  OnboardingStackParamList,
  'Login'
>;
type OnboardingPermissionsScreenProps = NativeStackScreenProps<
  OnboardingStackParamList,
  'OnboardingPermissions'
>;
type OnboardingAgeScreenProps = NativeStackScreenProps<
  OnboardingStackParamList,
  'OnboardingAge'
>;
type OnboardingFirstNameScreenProps = NativeStackScreenProps<
  OnboardingStackParamList,
  'OnboardingFirstName'
>;
type OnboardingLastNameScreenProps = NativeStackScreenProps<
  OnboardingStackParamList,
  'OnboardingLastName'
>;
type OnboardingUsernameScreenProps = NativeStackScreenProps<
  OnboardingStackParamList,
  'OnboardingUsername'
>;
type OnboardingPhoneNumberScreenProps = NativeStackScreenProps<
  OnboardingStackParamList,
  'OnboardingPhoneNumber'
>;
type OnboardingVerificationCodeScreenProps = NativeStackScreenProps<
  OnboardingStackParamList,
  'OnboardingVerificationCode'
>;
type OnboardingCoordinatorScreenProps = NativeStackScreenProps<
  OnboardingStackParamList,
  'OnboardingCoordinator'
>;
type OnboardingInviteScreenProps = NativeStackScreenProps<
  OnboardingStackParamList,
  'OnboardingInvite'
>;
type OnboardingShareInviteScreenProps = NativeStackScreenProps<
  OnboardingStackParamList,
  'OnboardingShareInvite'
>;
type OnboardingProfilePictureScreenProps = NativeStackScreenProps<
  OnboardingStackParamList,
  'OnboardingProfilePicture'
>;

export type {
  HomeScreenProps,
  PostsScreenProps,
  SearchScreenProps,
  CameraScreenProps,
  TagScreenProps,
  ActivityScreenProps,
  ProfileScreenProps,
  SettingsScreenProps,
  LoginScreenProps,
  OnboardingPermissionsScreenProps,
  OnboardingAgeScreenProps,
  OnboardingFirstNameScreenProps,
  OnboardingLastNameScreenProps,
  OnboardingUsernameScreenProps,
  OnboardingPhoneNumberScreenProps,
  OnboardingVerificationCodeScreenProps,
  OnboardingCoordinatorScreenProps,
  OnboardingInviteScreenProps,
  OnboardingShareInviteScreenProps,
  OnboardingProfilePictureScreenProps
};
