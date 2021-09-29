import React from 'react';
import { Image, ImageProps } from 'react-native';
import { styled } from 'dripsy';

function Img({ source, width, height, ...props }: ImageProps) {
  return (
    <Image
      source={source}
      width={width}
      height={height}
      resizeMode="cover" // Default
      cache="force-cache" // iOS
      // resizeMethod="resize" // Android
      progressiveRenderingEnabled={true} // Android
      fadeDuration={0} // Android
      {...props}
    />
  );
}

const StyledImage = styled(Img)(
  ({ width, height }: { width: number; height: number }) => ({
    width,
    height
  })
);

export { StyledImage as Image };
