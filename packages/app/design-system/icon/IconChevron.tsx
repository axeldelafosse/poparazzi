import * as React from 'react';
import Svg, { SvgProps, Defs, ClipPath, Path, G } from 'react-native-svg';

function IconChevron(props: SvgProps) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 8 13"
      {...props}
    >
      <Defs>
        <ClipPath id="iconChevron_svg__a">
          <Path d="M0 1.25L1.29 0 8 6.5 1.29 13 0 11.75 5.418 6.5zm0 0" />
        </ClipPath>
      </Defs>
      <G clipPath="url(#iconChevron_svg__a)" clipRule="evenodd">
        <Path d="M0 0h8v13H0z" fill={props.color} />
      </G>
    </Svg>
  );
}

export { IconChevron };
