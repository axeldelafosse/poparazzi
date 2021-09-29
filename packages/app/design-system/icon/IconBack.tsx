import * as React from 'react';
import Svg, { SvgProps, Defs, ClipPath, Path, G } from 'react-native-svg';

function IconBack(props: SvgProps) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 11 18"
      {...props}
    >
      <Defs>
        <ClipPath id="iconBack_svg__a">
          <Path d="M9.168 18L0 9l9.168-9L11 1.8 3.668 9 11 16.2zm0 0" />
        </ClipPath>
      </Defs>
      <G clipPath="url(#iconBack_svg__a)">
        <Path d="M0 0h11v18H0z" fill={props.color} />
      </G>
    </Svg>
  );
}

export { IconBack };
