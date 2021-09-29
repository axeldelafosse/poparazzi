import React, { useState, useEffect, useRef } from 'react';
import { View, Text } from 'dripsy';
import useSWRNative from '@nandorojo/swr-react-native';
import useUnmountSignal from 'use-unmount-signal';
import { useNavigation } from '@react-navigation/native';
import { Tabs } from 'react-native-collapsible-tab-view';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { fetchAPI } from 'app/utils/fetch';
import { Avatar } from 'app/design-system/avatar';
import { User } from 'app/schema';
import { useCurrentUser } from 'app/hooks/use-current-user';
import { IconSettings } from 'app/design-system/icon/IconSettings';
import { IconOptions } from 'app/design-system/icon/IconOptions';
import { IconPopsOfYou } from 'app/design-system/icon/IconPopsOfYou';
import { IconCameraActive } from 'app/design-system/icon/IconCameraActive';
import { Pressable } from 'app/design-system/pressable-scale';
import { MaterialTabBar } from 'app/components/material-tab-bar';
import { formatLongNumber } from 'app/utils/format-long-number';
import { UserListSheet } from 'app/components/user-list-sheet';
import { UsernameList } from 'app/components/username-list';
import { FollowButton } from 'app/components/follow-button';
import { PopsOfUser } from 'app/components/pops-of-user';
import { PopsByUser } from 'app/components/pops-by-user';
import type { ProfileScreenProps } from 'app/navigation/types';

// TODO: not claimed yet user profile (send invite)
export default function ProfileScreen({
  route,
  navigation
}: ProfileScreenProps) {
  const user = route?.params?.user;
  const [fullUserProfile, setFullUserProfile] = useState(null);
  const currentUser = useCurrentUser();
  const unmountSignal = useUnmountSignal();
  const url = `/api/users/${user?.id}`;
  const { data, error } = useSWRNative(user?.id ? [url] : null, (url) =>
    fetchAPI({ url, method: 'GET', unmountSignal })
  );
  const bottomUserListSheetRef = useRef<BottomSheetModal>(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const user = data?.data;
    if (user) {
      setFullUserProfile({
        id: user.id,
        top_poparazzi: user.relationships.top_poparazzi?.data?.map(
          (user: { id: string }) => ({
            id: user.id
          })
        ),
        ...user.attributes
      });
    }
  }, [data]);

  useEffect(
    function setTitle() {
      const username = user?.username ?? currentUser?.username;
      navigation.setOptions({
        title: username ? `@${username}` : '',
        headerRight: () =>
          user ? (
            // TODO: open context menu
            <Pressable onPress={() => null}>
              <IconOptions color="white" width={20} height={20} />
            </Pressable>
          ) : (
            <Pressable onPress={() => navigation.push('Settings')}>
              <IconSettings color="white" width={20} height={20} />
            </Pressable>
          )
      });
    },
    [user, currentUser]
  );

  const displayUser = fullUserProfile ?? user ?? currentUser;

  if (!currentUser || !displayUser) {
    return null;
  }

  return (
    <>
      <Tabs.Container
        lazy={true}
        renderTabBar={renderTabBar}
        renderHeader={() => {
          return (
            <View
              sx={{ padding: 8, backgroundColor: 'black' }}
              pointerEvents="box-none"
            >
              <View
                sx={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 8
                }}
              >
                <Avatar user={displayUser} size="xlarge" />
                <Stats user={displayUser} />
              </View>
              <Text
                sx={{
                  color: 'white',
                  fontWeight: 600,
                  paddingTop: 8,
                  paddingBottom: 16,
                  paddingLeft: 8
                }}
              >
                {displayUser?.first_name} {displayUser?.last_name}
              </Text>
              <FollowButton user={displayUser} showIconCheck={true} />
              <TopPoparazzi
                user={displayUser}
                setUsers={setUsers}
                bottomUserListSheetRef={bottomUserListSheetRef}
              />
            </View>
          );
        }}
      >
        <Tabs.Tab name="Pops Of User">
          <PopsOfUser user={displayUser} />
        </Tabs.Tab>
        <Tabs.Tab name="Pops By User">
          <PopsByUser user={displayUser} />
        </Tabs.Tab>
      </Tabs.Container>

      <UserListSheet
        bottomSheetRef={bottomUserListSheetRef}
        title="Top Poparazzi"
        users={users}
      />
    </>
  );
}

const renderTabBar = (props) => (
  <MaterialTabBar
    {...props}
    activeColor="white"
    inactiveColor="gray"
    pressColor="white"
    style={{ backgroundColor: 'black' }}
    labelStyle={{ color: 'white' }}
    indicatorStyle={{ backgroundColor: 'white' }}
    renderIcon={({ index, color }) => {
      if (index === 0) {
        return <IconPopsOfYou color={color} width={20} height={20} />;
      } else if (index === 1) {
        return <IconCameraActive color={color} width={25} height={25} />;
      }
    }}
  />
);

function Stats({ user }: { user: User }) {
  return (
    <View sx={{ display: 'flex', flexDirection: 'row' }}>
      <View
        sx={{
          display: 'flex',
          alignItems: 'center',
          paddingX: 8,
          minWidth: 80
        }}
      >
        <View>
          <Text sx={{ color: 'white', fontWeight: 500 }}>
            {formatLongNumber(user?.posts_count ?? 0)}
          </Text>
        </View>
        <View>
          <Text sx={{ color: 'white' }}>Posts</Text>
        </View>
      </View>
      <View
        sx={{
          display: 'flex',
          alignItems: 'center',
          paddingX: 8,
          minWidth: 80
        }}
      >
        <View>
          <Text sx={{ color: 'white', fontWeight: 500 }}>
            {formatLongNumber(user?.views_count ?? 0)}
          </Text>
        </View>
        <View>
          <Text sx={{ color: 'white' }}>Views</Text>
        </View>
      </View>
      <View
        sx={{
          display: 'flex',
          alignItems: 'center',
          paddingX: 8,
          minWidth: 80
        }}
      >
        <View>
          <Text sx={{ color: 'white', fontWeight: 500 }}>
            {formatLongNumber(user?.reactions_count ?? 0)}
          </Text>
        </View>
        <View>
          <Text sx={{ color: 'white' }}>Reacts</Text>
        </View>
      </View>
    </View>
  );
}

function TopPoparazzi({
  user,
  setUsers,
  bottomUserListSheetRef
}: {
  user: User;
  setUsers: (users: User[]) => void;
  bottomUserListSheetRef: any;
}) {
  const navigation = useNavigation();
  const [topPoparazzi, setTopPoparazzi] = useState(null);
  const unmountSignal = useUnmountSignal();
  const url = `/api/users/${user?.top_poparazzi?.[0]?.id}`;
  const { data, error } = useSWRNative(
    user ? [url] : null,
    (url) => fetchAPI({ url, method: 'GET', unmountSignal }),
    {
      revalidateOnFocus: true
    }
  );

  useEffect(() => {
    const newUser = data?.data;
    if (newUser) {
      setTopPoparazzi({
        id: newUser.id,
        top_poparazzi: newUser.relationships.top_poparazzi?.data?.map(
          (user: { id: string }) => ({
            id: user.id
          })
        ),
        ...newUser.attributes
      });
    }
  }, [data]);

  if (user?.top_poparazzi?.length === 0) {
    return null;
  }

  return (
    <View sx={{ flexDirection: 'row', alignItems: 'center', paddingTop: 16 }}>
      <Text sx={{ color: 'white', paddingRight: 8, fontSize: 18 }}>🔥</Text>
      <View>
        <Text sx={{ color: 'white', fontSize: 13 }}>Top Poparazzi:</Text>
        {user?.top_poparazzi?.length > 1 ? (
          <UsernameList
            users={user?.top_poparazzi?.slice(0, 3)}
            onOpenBottomSheet={() => {
              setUsers(user?.top_poparazzi?.slice(0, 3));
              bottomUserListSheetRef.current?.present();
            }}
          />
        ) : (
          <Pressable
            onPress={() =>
              navigation.push('Profile', {
                user: topPoparazzi
              })
            }
          >
            <Text sx={{ color: 'white', fontWeight: 600, fontSize: 13 }}>
              {topPoparazzi?.username}
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}
