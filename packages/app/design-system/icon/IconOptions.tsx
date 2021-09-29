import * as React from 'react';
import Svg, { SvgProps, Defs, ClipPath, Path, G } from 'react-native-svg';

function IconOptions(props: SvgProps) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 23 5"
      {...props}
    >
      <Defs>
        <ClipPath id="iconOptions_svg__a">
          <Path d="M2.5 0C3.879 0 5 1.121 5 2.5S3.879 5 2.5 5A2.502 2.502 0 010 2.5C0 1.121 1.121 0 2.5 0zm9 0C12.879 0 14 1.121 14 2.5S12.879 5 11.5 5A2.502 2.502 0 019 2.5C9 1.121 10.121 0 11.5 0zm9 0C21.879 0 23 1.121 23 2.5S21.879 5 20.5 5A2.502 2.502 0 0118 2.5C18 1.121 19.121 0 20.5 0zm0 0" />
        </ClipPath>
      </Defs>
      <G clipPath="url(#iconOptions_svg__a)" clipRule="evenodd">
        <Path d="M0 0h23v5H0z" fill={props.color} />
      </G>
    </Svg>
  );
}

export { IconOptions };
