import * as React from 'react';
import Svg, { SvgProps, Defs, ClipPath, Path, G } from 'react-native-svg';

function IconTerms(props: SvgProps) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 16.3 20.242"
      {...props}
    >
      <Defs>
        <ClipPath id="iconTerms_svg__a">
          <Path d="M0 0h16.3v20.242H0zm0 0" />
        </ClipPath>
      </Defs>
      <G clipPath="url(#iconTerms_svg__a)">
        <Path
          d="M0 0h10.484l5.817 5.73v14.512H0zm1.64 18.602h12.997V6.414L9.8 1.641H1.64zm2.364-3.813h8.289v1.64h-8.29zm8.289-3.539h-8.29v1.64h8.29zm-8.29-3.52h8.29v1.645h-8.29zm0 0"
          fillRule="evenodd"
        />
      </G>
    </Svg>
  );
}

export { IconTerms };
