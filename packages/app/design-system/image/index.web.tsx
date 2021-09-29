// NOTE: replace img with Image to use Next.js image component

import React from 'react';
import { ImageResizeMode, ImageProps, ImageURISource } from 'react-native';
// import Image from 'next/image';
import type { ObjectFitProperty } from 'csstype';
// import { styled } from 'dripsy';

// const resizeModeToObjectFit = (
//   resizeMode: ImageResizeMode
// ): ObjectFitProperty => {
//   switch (resizeMode) {
//     case 'cover':
//       return 'cover';
//     case 'contain':
//       return 'contain';
//     case 'stretch':
//       return 'fill';
//     case 'center':
//       return 'none';
//     default:
//       throw new Error('Unsupported resize mode: ' + resizeMode);
//   }
// };

type Props = ImageProps & {
  source: ImageURISource;
  loading: 'lazy' | 'eager';
  width: number;
  height: number;
  borderRadius: number;
  layout: 'fixed' | 'intrinsic' | 'responsive' | 'fill';
};

function Img({ source, loading = 'lazy', width, height, ...props }: Props) {
  if (source?.uri && typeof source?.uri === 'string') {
    return (
      <img
        src={source.uri}
        loading={loading}
        width={
          props.layout === 'fill'
            ? null
            : typeof width === 'number'
            ? `${width}px`
            : width
        }
        height={
          props.layout === 'fill'
            ? null
            : typeof height === 'number'
            ? `${height}px`
            : height
        }
        layout={props.layout}
        // objectFit={resizeModeToObjectFit(
        //   props.resizeMode ??
        //     // When using intrinsic size use contain to avoid
        //     // rounding errors causing some pixel lost.
        //     (width != null ? 'contain' : 'cover')
        // )}
        {...props}
      />
    );
  }

  return (
    <img
      src={source as string}
      loading={loading}
      width={width}
      height={height}
      {...props}
    />
  );
}

// const StyledImage = styled(Img)(
//   ({ borderRadius }: { borderRadius: number }) => ({
//     borderRadius
//   })
// );

// export StyledImage as Image
export { Img as Image };
