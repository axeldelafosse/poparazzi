import * as React from 'react';
import Svg, { SvgProps, Defs, ClipPath, Path, G } from 'react-native-svg';

function IconSwipeUp(props: SvgProps) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 29 8.274"
      {...props}
    >
      <Defs>
        <ClipPath id="iconSwipeUp_svg__a">
          <Path d="M0 0h29v8.273H0zm0 0" />
        </ClipPath>
      </Defs>
      <G clipPath="url(#iconSwipeUp_svg__a)">
        <Path d="M26.688 8.16a1.7 1.7 0 002.199-.988 1.703 1.703 0 00-.989-2.2L15.105.11a1.745 1.745 0 00-1.21 0L1.102 4.973a1.703 1.703 0 00-.989 2.199 1.7 1.7 0 002.2.988L14.5 3.531zm0 0" />
      </G>
    </Svg>
  );
}

export { IconSwipeUp };
