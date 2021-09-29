import React, { useEffect, useState, useCallback } from 'react';
import { FlatList } from 'react-native';
import useSWRNative from '@nandorojo/swr-react-native';
import useUnmountSignal from 'use-unmount-signal';
import { View, Text } from 'dripsy';
import { useNavigation } from '@react-navigation/native';

import { fetchAPI } from 'app/utils/fetch';
import { User } from 'app/schema';
import { Avatar } from 'app/design-system/avatar';
import { Pressable } from 'app/design-system/pressable-scale';

type Props = {
  searchQuery: string;
  onPressType: 'navigation' | 'select';
  selectUser?: (user: User) => void;
};

export function SearchUserList({
  searchQuery,
  onPressType,
  selectUser
}: Props) {
  const navigation = useNavigation();
  const unmountSignal = useUnmountSignal();
  const url = `/api/users?filter[q]=${searchQuery}&filter[excluded_user_ids]=&filter[excluded_phone_numbers]=&`;
  const { data, error } = useSWRNative(
    [url],
    (url) => fetchAPI({ url, method: 'GET', unmountSignal }),
    {
      revalidateOnFocus: true,
      dedupingInterval: 2000
    }
  );
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const newUsers = data?.data;
    if (newUsers) {
      setUsers(
        newUsers.map((newUser: any) => ({
          id: newUser.id,
          mutual_users: newUser.relationships.mutual_users?.data?.map(
            (user: { id: string }) => ({
              id: user.id
            })
          ),
          ...newUser.attributes
        }))
      );
    }
  }, [data]);

  const renderItem = useCallback(({ item }: { item: User }) => {
    const user = item;

    return (
      <Pressable
        onPress={() => {
          if (onPressType === 'navigation') {
            navigation.push('Profile', {
              user
            });
          } else if (onPressType === 'select') {
            selectUser(user);
          }
        }}
      >
        <View sx={{ flexDirection: 'row', padding: 12 }}>
          <Avatar user={user} size="medium" />
          <View sx={{ justifyContent: 'center', paddingLeft: 12 }}>
            <Text sx={{ color: 'white', fontWeight: 500 }}>
              {user?.first_name} {user?.last_name}
            </Text>
            <Text sx={{ color: '#7E7F80', fontSize: 13 }}>{user.username}</Text>
          </View>
        </View>
      </Pressable>
    );
  }, []);

  return (
    <View sx={{ flex: 1 }}>
      <FlatList
        data={users}
        keyExtractor={(item) => item?.id}
        renderItem={renderItem}
        windowSize={10}
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="on-drag"
      />
    </View>
  );
}
