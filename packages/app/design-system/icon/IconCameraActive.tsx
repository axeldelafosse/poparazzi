import * as React from 'react';
import Svg, { SvgProps, Defs, ClipPath, Path, G, Rect } from 'react-native-svg';

function IconCameraActive(props: SvgProps) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 30 24"
      {...props}
    >
      <Defs>
        <ClipPath id="iconCameraActive_svg__a">
          <Path d="M19.05 0l3.997 4.11H30V24H0V4.11h6.953L10.95 0zM15 6.914c-3.313 0-6 2.691-6 6.012 0 3.32 2.688 6.015 6 6.015 3.313 0 6-2.695 6-6.015s-2.688-6.012-6-6.012zm0 1.906a4.102 4.102 0 014.102 4.106c0 2.27-1.836 4.11-4.102 4.11a4.105 4.105 0 01-4.102-4.11A4.102 4.102 0 0115 8.82zm0 0" />
        </ClipPath>
      </Defs>
      <G clipPath="url(#iconCameraActive_svg__a)" clipRule="evenodd">
        <Path d="M0 0h30v24H0z" />
        <Rect x="0" y="0" width="30" height="24" fill={props.color} />
      </G>
    </Svg>
  );
}

export { IconCameraActive };
