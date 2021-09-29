import * as React from 'react';
import Svg, { SvgProps, Defs, ClipPath, Path, G, Rect } from 'react-native-svg';

function IconProfileActive(props: SvgProps) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 21 24"
      {...props}
    >
      <Defs>
        <ClipPath id="iconProfileActive_svg__a">
          <Path d="M10.5 13.234c5.785 0 10.5 4.832 10.5 10.762V24H0c0-5.93 4.715-10.766 10.5-10.766zM10.5 0c3.102 0 5.613 2.473 5.613 5.527 0 3.051-2.511 5.547-5.613 5.547-3.102 0-5.613-2.469-5.613-5.523C4.887 2.496 7.398 0 10.5 0zm0 0" />
        </ClipPath>
      </Defs>
      <G clipPath="url(#iconProfileActive_svg__a)" clipRule="evenodd">
        <Path d="M0 0h21v24H0z" />
        <Rect x="0" y="0" width="21" height="24" fill={props.color} />
      </G>
    </Svg>
  );
}

export { IconProfileActive };
