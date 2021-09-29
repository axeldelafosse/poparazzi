import React, { useState, useEffect } from 'react';
import { Platform, Image as RNImage } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle
} from 'react-native-reanimated';

import { Image } from 'app/design-system/image';
import { useInterval } from 'app/hooks/use-interval';

type Props = {
  images: [{ uri: string }];
  width: number;
  height: number;
  isViewable: boolean;
};

export function AnimatedImage({ images, width, height, isViewable }: Props) {
  const delay = 420;
  const [index, setIndex] = useState(0);
  const isFocused = useIsFocused();
  const opacity = useSharedValue(
    Platform.OS === 'web' || images.length === 1 ? 1 : 0
  );

  useInterval(
    () => {
      let newIndex = index + 1;
      if (newIndex >= images.length) {
        newIndex = 0;
      }
      setIndex(newIndex);
    },
    images.length !== 1 && isViewable && isFocused ? delay : null
  );

  useEffect(() => {
    const prefetch = async () => {
      for (const image of images) {
        await RNImage.prefetch(image.uri);
      }
      opacity.value = 1;
    };

    if (Platform.OS !== 'web' && images.length !== 1) {
      prefetch();
    }
  }, [images]);

  // useEffect(() => {
  //   const hideIfNotFocused = async () => {
  //     if (isFocused) {
  //       const cache = await RNImage.queryCache(
  //         images.map((image) => image.uri)
  //       );
  //       const isCached = Object.keys(cache).length !== 0;
  //       opacity.value = isCached ? 1 : 0;
  //     } else {
  //       opacity.value = 0;
  //     }
  //   };

  //   if (Platform.OS !== 'web' && images.length !== 1) {
  //     hideIfNotFocused();
  //   }
  // }, [isFocused]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: opacity.value
    };
  });

  return (
    <Animated.View style={animatedStyles ? animatedStyles : null}>
      <Image
        source={images[isFocused ? index : 0]}
        width={width}
        height={height}
      />

      {Platform.OS !== 'web' && isViewable && isFocused && (
        // Performance improvement for native
        <Image
          source={
            images[isFocused ? (index + 1 >= images.length ? 0 : index + 1) : 1]
          }
          width={width}
          height={height}
          style={{ position: 'absolute' }}
        />
      )}
    </Animated.View>
  );
}

export const MemoizedAnimatedImage = React.memo(AnimatedImage);
