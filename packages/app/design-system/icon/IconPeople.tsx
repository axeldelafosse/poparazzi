import * as React from 'react';
import Svg, { SvgProps, Defs, ClipPath, Path, G } from 'react-native-svg';

function IconPeople(props: SvgProps) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24.8 23.689"
      {...props}
    >
      <Defs>
        <ClipPath id="iconPeople_svg__a">
          <Path d="M0 0h24.8v23.688H0zm0 0" />
        </ClipPath>
      </Defs>
      <G clipPath="url(#iconPeople_svg__a)">
        <Path
          d="M16 8v.05a9.957 9.957 0 00-6.234 3.048 5.648 5.648 0 00-6.836 3.09A8 8 0 1116 8zM8.098 9.035a3.01 3.01 0 100-6.023 3.01 3.01 0 100 6.023zM24.8 17.5a7.982 7.982 0 01-2.809 6.086 5.644 5.644 0 00-10.262.102A8 8 0 1124.8 17.5zm-4.89-1.977a3.01 3.01 0 11-6.024 0 3.01 3.01 0 116.023 0zm0 0"
          fillRule="evenodd"
        />
      </G>
    </Svg>
  );
}

export { IconPeople };
