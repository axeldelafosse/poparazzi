import * as React from 'react';
import Svg, { SvgProps, Defs, ClipPath, Path, G } from 'react-native-svg';

function IconSave(props: SvgProps) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 19 19"
      {...props}
    >
      <Defs>
        <ClipPath id="iconSave_svg__a">
          <Path d="M19 16.629V19H0v-2.371zM10.703 0v10.184l2.754-2.727 1.707 1.684L9.5 14.715 3.836 9.14l1.707-1.684 2.754 2.727V0zm0 0" />
        </ClipPath>
      </Defs>
      <G clipPath="url(#iconSave_svg__a)">
        <Path d="M0 0h19v19H0z" fill={props.color} />
      </G>
    </Svg>
  );
}

export { IconSave };
