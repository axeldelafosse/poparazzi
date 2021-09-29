import React from 'react';
import { View, Text } from 'dripsy';

import { IconClose } from 'app/design-system/icon/IconClose';
import { Pressable } from 'app/design-system/pressable-scale';

type Props = {
  title: string;
  handleClosePress: () => void;
};

export function customHandle({ title, handleClosePress }: Props) {
  return (
    <View
      sx={{
        height: 42,
        backgroundColor: 'white',
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Text sx={{ color: 'black', fontSize: 18, fontWeight: 600, padding: 4 }}>
        {title}
      </Text>
      <View sx={{ position: 'absolute', top: 15, right: 15 }}>
        <Pressable onPress={handleClosePress}>
          <IconClose color="black" width={15} height={15} />
        </Pressable>
      </View>
    </View>
  );
}

export const bottomSheetModalStyle = {
  shadowColor: 'black',
  shadowOffset: {
    width: 0,
    height: -12
  },
  shadowOpacity: 0.58,
  shadowRadius: 16.0,
  elevation: 16
};
