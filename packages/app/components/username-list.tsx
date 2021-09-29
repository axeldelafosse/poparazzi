import React, { useEffect, useState } from 'react';
import { View, Text } from 'dripsy';
import useSWRNative from '@nandorojo/swr-react-native';
import useUnmountSignal from 'use-unmount-signal';
import { useNavigation } from '@react-navigation/native';

import { fetchAPI } from 'app/utils/fetch';
import { Pressable } from 'app/design-system/pressable-scale';
import { User } from 'app/schema';

type Props = {
  users: User[];
  onOpenBottomSheet: () => void;
};

export function UsernameList({ users, onOpenBottomSheet }: Props) {
  return (
    <Pressable onPress={onOpenBottomSheet}>
      <View sx={{ flexDirection: 'row' }}>
        {users.map((user, index) => (
          <View key={user.id}>
            <Username
              userId={user.id}
              isFirst={index === 0}
              isLast={index === users.length - 1}
              numberOfPeople={users.length}
            />
          </View>
        ))}
      </View>
    </Pressable>
  );
}

export function Username({
  userId,
  isFirst,
  isLast,
  numberOfPeople
}: {
  userId: string;
  isFirst: boolean;
  isLast: boolean;
  numberOfPeople: number;
}) {
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
    <Text sx={{ color: 'white', fontSize: 12, fontWeight: 500 }}>
      {isFirst && numberOfPeople > 3 && (
        <>
          {user?.username} and {numberOfPeople} others
        </>
      )}
      {numberOfPeople <= 3 && (
        <>
          {isFirst || isLast ? '' : ', '}
          {isLast ? ' and ' : ''}
          {user?.username}
        </>
      )}
    </Text>
  );
}
