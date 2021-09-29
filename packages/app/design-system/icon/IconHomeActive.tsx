import * as React from 'react';
import Svg, { SvgProps, Defs, ClipPath, Path, G } from 'react-native-svg';

function IconHomeActive(props: SvgProps) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 22 22"
      {...props}
    >
      <Defs>
        <ClipPath id="iconHomeActive_svg__a">
          <Path d="M11 0L0 8.25V22h7.426v-5.773A3.57 3.57 0 0111 12.648a3.57 3.57 0 013.574 3.579V22H22V8.25zm0 0" />
        </ClipPath>
      </Defs>
      <G clipPath="url(#iconHomeActive_svg__a)">
        <Path d="M0 0h22v22H0z" />
      </G>
    </Svg>
  );
}

export { IconHomeActive };
