import * as React from 'react';
import Svg, { SvgProps, Defs, ClipPath, Path, G } from 'react-native-svg';

function IconShare(props: SvgProps) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 23 19"
      {...props}
    >
      <Defs>
        <ClipPath id="iconShare_svg__a">
          <Path d="M13.785 19v-4.918S4.57 11.879 0 19C0 11.148 6.184 4.98 13.785 4.98V0L23 9.52zm0 0" />
        </ClipPath>
      </Defs>
      <G clipPath="url(#iconShare_svg__a)" clipRule="evenodd">
        <Path d="M0 0h23v19H0z" fill={props.color} />
      </G>
    </Svg>
  );
}

export { IconShare };
