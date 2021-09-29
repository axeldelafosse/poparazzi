import React, { ComponentProps } from 'react';
import { View, Text } from 'dripsy';

import { Pressable } from 'app/design-system/pressable-scale';

type Props = ComponentProps<typeof Pressable> & {
  title: string | JSX.Element;
  size?: 'small' | 'medium' | 'large';
  variant?: 'full' | 'full-blue' | 'outline' | 'outline-blue';
  accessibilityRole?: 'button' | 'link';
};

function getSize(size: 'small' | 'medium' | 'large') {
  switch (size) {
    case 'small':
      return { width: '100%', height: 30, fontSize: 13 };
    case 'medium':
      return { width: '80%', height: 50, fontSize: 18 };
    case 'large':
      return { width: '80%', height: 50, fontSize: 18 };
    default:
      return { width: '80%', height: 50, fontSize: 18 };
  }
}

function getVariant(
  variant: 'full' | 'full-blue' | 'outline' | 'outline-blue'
) {
  switch (variant) {
    case 'full':
      return { color: 'black', backgroundColor: 'white' };
    case 'full-blue':
      return { color: 'white', backgroundColor: 'blue' };
    case 'outline':
      return {
        color: 'white',
        backgroundColor: 'black',
        borderWidth: 1,
        borderColor: 'white'
      };
    case 'outline-blue':
      return {
        color: 'blue',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'blue'
      };
    default:
      return { color: 'black', backgroundColor: 'white' };
  }
}

export function Button({ onPress, title, size, variant, ...rest }: Props) {
  const { width, height, fontSize } = getSize(size);
  const { color, backgroundColor, borderColor, borderWidth } =
    getVariant(variant);

  return (
    <View sx={{ width }}>
      <Pressable
        onPress={onPress}
        sx={{
          backgroundColor,
          height,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 50,
          borderColor,
          borderWidth,
          cursor: 'pointer'
        }}
        accessibilityRole="button"
        {...rest}
      >
        <Text sx={{ color, fontSize, fontWeight: 600 }}>{title}</Text>
      </Pressable>
    </View>
  );
}
