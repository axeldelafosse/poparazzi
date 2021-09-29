import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import HomeScreen from 'app/screens/home';
import SearchScreen from 'app/screens/search';
import CameraScreen from 'app/screens/camera';
import TagScreen from 'app/screens/tag';
import ActivityScreen from 'app/screens/activity';
import ProfileScreen from 'app/screens/profile';
import SettingsScreen from 'app/screens/settings';
import PostsScreen from 'app/screens/posts';

import { IconPopCamera } from 'app/design-system/icon/IconPopCamera';
import { IconPopCameraActive } from 'app/design-system/icon/IconPopCameraActive';
import { IconSearch } from 'app/design-system/icon/IconSearch';
import { IconSearchActive } from 'app/design-system/icon/IconSearchActive';
import { IconCamera } from 'app/design-system/icon/IconCamera';
import { IconCameraActive } from 'app/design-system/icon/IconCameraActive';
import { IconActivity } from 'app/design-system/icon/IconActivity';
import { IconActivityActive } from 'app/design-system/icon/IconActivityActive';
import { IconProfile } from 'app/design-system/icon/IconProfile';
import { IconProfileActive } from 'app/design-system/icon/IconProfileActive';
import { Image } from 'app/design-system/image';
import { Pressable } from 'app/design-system/pressable-scale';

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <BottomSheetModalProvider>
      <BottomTab.Navigator
        initialRouteName="CameraTab"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#7e7f81',
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            // zIndex: 1,
            backgroundColor: 'black',
            borderTopColor: 'black'
          },
          lazy: true
        }}
      >
        <BottomTab.Screen
          name="HomeTab"
          component={HomeNavigator}
          options={{
            title: 'Home',
            unmountOnBlur: true,
            tabBarIcon: ({ focused, color }) => (
              <Pressable onPress={() => null} disabled>
                {focused ? (
                  <IconPopCameraActive color={color} width={30} height={30} />
                ) : (
                  <IconPopCamera color={color} width={30} height={30} />
                )}
              </Pressable>
            )
          }}
        />
        <BottomTab.Screen
          name="SearchTab"
          component={SearchNavigator}
          options={{
            title: 'Search',
            unmountOnBlur: true,
            tabBarIcon: ({ focused, color }) => (
              <Pressable onPress={() => null} disabled>
                {focused ? (
                  <IconSearchActive color={color} width={25} height={25} />
                ) : (
                  <IconSearch color={color} width={25} height={25} />
                )}
              </Pressable>
            )
          }}
        />
        <BottomTab.Screen
          name="CameraTab"
          component={CameraNavigator}
          options={{
            title: 'Camera',
            unmountOnBlur: true,
            tabBarIcon: ({ focused, color }) => (
              <Pressable onPress={() => null} disabled>
                {focused ? (
                  <IconCameraActive color={color} width={30} height={30} />
                ) : (
                  <IconCamera color={color} width={30} height={30} />
                )}
              </Pressable>
            )
          }}
        />
        <BottomTab.Screen
          name="ActivityTab"
          component={ActivityNavigator}
          options={{
            title: 'Activity',
            unmountOnBlur: true,
            tabBarIcon: ({ focused, color }) => (
              <Pressable onPress={() => null} disabled>
                {focused ? (
                  <IconActivityActive color={color} width={25} height={25} />
                ) : (
                  <IconActivity color={color} width={25} height={25} />
                )}
              </Pressable>
            )
          }}
        />
        <BottomTab.Screen
          name="ProfileTab"
          component={ProfileNavigator}
          options={{
            title: 'Profile',
            unmountOnBlur: true,
            tabBarIcon: ({ focused, color }) => (
              <Pressable onPress={() => null} disabled>
                {focused ? (
                  <IconProfileActive color={color} width={22} height={22} />
                ) : (
                  <IconProfile color={color} width={22} height={22} />
                )}
              </Pressable>
            )
          }}
        />
      </BottomTab.Navigator>
    </BottomSheetModalProvider>
  );
}

// headerBackImageSource?

const HomeStack = createNativeStackNavigator();

function HomeNavigator() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontFamily: 'NeueHaasGroteskDisplayW02Reg',
          fontWeight: 'bold'
        }
      }}
    >
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: () => <LogoHeader />,
          headerTitleAlign: 'center',
          headerBackVisible: false
        }}
      />
      <HomeStack.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          headerTitle: 'Posts'
        }}
        getId={({ params }) => params?.post?.id}
      />
      <HomeStack.Screen
        name="Profile"
        component={ProfileScreen}
        getId={({ params }) => params?.user?.id}
      />
    </HomeStack.Navigator>
  );
}

const SearchStack = createNativeStackNavigator();

function SearchNavigator() {
  return (
    <SearchStack.Navigator
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontFamily: 'NeueHaasGroteskDisplayW02Reg',
          fontWeight: 'bold'
        }
      }}
    >
      <SearchStack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: false,
          headerTitle: 'Search'
        }}
      />
      <SearchStack.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          headerTitle: 'Posts'
        }}
        getId={({ params }) => params?.post?.id}
      />
      <SearchStack.Screen
        name="Profile"
        component={ProfileScreen}
        getId={({ params }) => params?.user?.id}
      />
    </SearchStack.Navigator>
  );
}

const CameraStack = createNativeStackNavigator();

function CameraNavigator() {
  return (
    <CameraStack.Navigator
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontFamily: 'NeueHaasGroteskDisplayW02Reg',
          fontWeight: 'bold'
        }
      }}
    >
      <CameraStack.Screen
        name="Camera"
        component={CameraScreen}
        options={{
          headerShown: false,
          headerTitle: 'Camera'
        }}
      />
      <CameraStack.Screen
        name="Tag"
        component={TagScreen}
        options={{
          headerTitle: 'Who did you pop?'
        }}
      />
    </CameraStack.Navigator>
  );
}

const ActivityStack = createNativeStackNavigator();

function ActivityNavigator() {
  return (
    <ActivityStack.Navigator
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
        headerTitleStyle: {
          fontFamily: 'NeueHaasGroteskDisplayW02Reg',
          fontWeight: 'bold'
        }
      }}
    >
      <ActivityStack.Screen
        name="Activity"
        component={ActivityScreen}
        options={{
          headerTitle: 'Activity'
        }}
      />
    </ActivityStack.Navigator>
  );
}

const ProfileStack = createNativeStackNavigator();

function ProfileNavigator() {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontFamily: 'NeueHaasGroteskDisplayW02Reg',
          fontWeight: 'bold'
        }
      }}
    >
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        getId={({ params }) => params?.user?.id}
      />
      <ProfileStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerTitle: 'Settings' }}
      />
      <HomeStack.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          headerTitle: 'Posts'
        }}
        getId={({ params }) => params?.post?.id}
      />
    </ProfileStack.Navigator>
  );
}

function LogoHeader() {
  return (
    <Image
      // source={require('@poparazzi/next/public/poparazzi-logo.png')}
      source={{ uri: 'https://poparazzi.vercel.app/poparazzi-logo.png' }}
      height={13}
      width={184}
    />
  );
}
