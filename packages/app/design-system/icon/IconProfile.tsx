import * as React from 'react';
import Svg, { SvgProps, Defs, ClipPath, Path, G } from 'react-native-svg';

function IconProfile(props: SvgProps) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 20.58 23.836"
      {...props}
    >
      <Defs>
        <ClipPath id="iconProfile_svg__a">
          <Path d="M0 0h20.582v23.836H0zm0 0" />
        </ClipPath>
      </Defs>
      <G clipPath="url(#iconProfile_svg__a)">
        <Path
          d="M10.29 11c-3.04 0-5.5-2.457-5.5-5.488C4.79 2.48 7.25 0 10.29 0c3.038 0 5.5 2.457 5.5 5.488 0 3.032-2.462 5.512-5.5 5.512zm0-9c-1.935 0-3.5 1.57-3.5 3.512A3.484 3.484 0 0010.29 9c1.933 0 3.5-1.57 3.5-3.512A3.484 3.484 0 0010.29 2zm8.269 21.836h2.02c0-5.89-4.618-10.691-10.29-10.691C4.621 13.145 0 17.945 0 23.835h2.02c0-4.745 3.703-8.589 8.27-8.589 4.57 0 8.269 3.844 8.269 8.59zm0 0"
          fillRule="evenodd"
          fill={props.color}
        />
      </G>
    </Svg>
  );
}

export { IconProfile };
