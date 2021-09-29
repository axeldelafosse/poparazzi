import React from 'react';
import { View, Text } from 'dripsy';

import { Image } from 'app/design-system/image';
import { User } from 'app/schema';

function getAvatarSize(size: 'small' | 'medium' | 'large' | 'xlarge') {
  if (size === 'small') {
    return {
      width: 30,
      height: 30,
      fontSize: 14
    };
  }
  if (size === 'medium') {
    return {
      width: 50,
      height: 50,
      fontSize: 24
    };
  }
  if (size === 'large') {
    return {
      width: 70,
      height: 70,
      fontSize: 32
    };
  }
  if (size === 'xlarge') {
    return {
      width: 80,
      height: 80,
      fontSize: 36
    };
  }
}

type Props = {
  user: User;
  size: 'small' | 'medium' | 'large' | 'xlarge';
};

export function Avatar({ user, size = 'medium' }: Props) {
  const { width, height, fontSize } = getAvatarSize(size);
  const initials = `${
    user?.first_name ? user.first_name.toUpperCase().charAt(0) : ''
  }${user?.last_name ? user.last_name.toUpperCase().charAt(0) : ''}`;

  return (
    <View
      sx={{
        width,
        height,
        backgroundColor: '#1C1E1F',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      style={{ borderRadius: 50 }}
    >
      {user?.profile_photo_url ? (
        <Image
          source={{ uri: `${user.profile_photo_url}?size=s&v=3&quality=80` }}
          width={width}
          height={height}
          style={{
            borderRadius: 50
          }}
        />
      ) : (
        <Text
          sx={{
            color: 'white',
            fontSize,
            fontWeight: 600
          }}
        >
          {initials}
        </Text>
      )}
    </View>
  );
}
