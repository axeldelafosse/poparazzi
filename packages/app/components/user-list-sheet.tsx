import React, { useCallback, useMemo, useEffect, useState } from 'react';
import { BottomSheetModal, BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { View, Text } from 'dripsy';
import useSWRNative from '@nandorojo/swr-react-native';
import useUnmountSignal from 'use-unmount-signal';
import { useNavigation } from '@react-navigation/native';

import { fetchAPI } from 'app/utils/fetch';
import {
  customHandle,
  bottomSheetModalStyle
} from 'app/design-system/bottom-sheet';
import { Pressable } from 'app/design-system/pressable-scale';
import { User } from 'app/schema';
import { Avatar } from 'app/design-system/avatar';
import { FollowButton } from 'app/components/follow-button';

type Props = {
  userId: string;
  handleClosePress: () => void;
};

function UserContent({ userId, handleClosePress }: Props) {
  const navigation = useNavigation();
  const unmountSignal = useUnmountSignal();
  const url = `/api/users/${userId}`;
  const { data, error } = useSWRNative(
    [url],
    (url) => fetchAPI({ url, method: 'GET', unmountSignal }),
    {
      revalidateOnFocus: true
    }
  );
  const [user, setUser] = useState(null);

  useEffect(() => {
    const newUser = data?.data;
    if (newUser) {
      setUser({
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

  if (!user) {
    return null;
  }

  return (
    <Pressable
      onPress={() => {
        navigation.push('Profile', {
          user
        });
        handleClosePress();
      }}
    >
      <View
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 12
        }}
      >
        <View
          sx={{
            flexDirection: 'row'
          }}
        >
          <Avatar user={user} size="medium" />
          <View sx={{ justifyContent: 'center', paddingLeft: 12 }}>
            <Text sx={{ color: 'black', fontWeight: 500 }}>
              {user?.first_name} {user?.last_name}
            </Text>
            <Text sx={{ color: '#7E7F80', fontSize: 13 }}>{user.username}</Text>
          </View>
        </View>
        <View sx={{ width: 100, justifyContent: 'center' }}>
          <FollowButton
            user={user}
            variant="full-blue"
            variantWhenFollowing="outline-blue"
          />
        </View>
      </View>
    </Pressable>
  );
}

export function UserListSheet({
  title,
  users,
  bottomSheetRef
}: {
  title: string;
  users: User[];
  bottomSheetRef: any;
}) {
  const snapPoints = useMemo(() => ['42%'], []);
  const handleClosePress = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const renderItem = useCallback(({ item }: { item: User }) => {
    return <UserContent userId={item.id} handleClosePress={handleClosePress} />;
  }, []);

  const renderFooter = useCallback(
    () => <View sx={{ paddingBottom: users.length >= 3 ? 42 : 0 }} />,
    [users]
  );

  return (
    <BottomSheetModal
      name="UserList"
      ref={bottomSheetRef}
      stackBehavior="push"
      index={0}
      snapPoints={snapPoints}
      handleComponent={(props) =>
        customHandle({ title, handleClosePress, ...props })
      }
      style={bottomSheetModalStyle}
    >
      <BottomSheetFlatList
        data={users}
        keyExtractor={(item) => item?.id}
        renderItem={renderItem}
        windowSize={10}
        ListFooterComponent={renderFooter}
      />
    </BottomSheetModal>
  );
}
