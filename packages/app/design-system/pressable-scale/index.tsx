import React, { ComponentProps, useMemo } from 'react';
import { MotiPressable } from '@motify/interactions';
import { styled } from 'dripsy';

const StyledMotiPressable = styled(MotiPressable)();

type Props = ComponentProps<typeof StyledMotiPressable> & {
  scaleTo?: number;
};

export function Pressable({ animate, scaleTo = 0.95, ...props }: Props) {
  return (
    <StyledMotiPressable
      animate={useMemo(
        () => (interaction) => {
          'worklet';

          return {
            scale: interaction.pressed || interaction.hovered ? scaleTo : 1
          };
        },
        [animate]
      )}
      {...props}
    />
  );
}
