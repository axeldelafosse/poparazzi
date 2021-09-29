import * as React from 'react';
import Svg, { SvgProps, Defs, ClipPath, Path, G, Use } from 'react-native-svg';

function IconCenter(props: SvgProps) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="1em"
      height="1em"
      viewBox="0 0 25 25"
      {...props}
    >
      <Defs>
        <ClipPath id="iconCenter_svg__b">
          <Path d="M11.5 0h2v11.5h-2zM0 11.5h25v2H0zm11.5 2h2V25h-2zm0 0" />
        </ClipPath>
        <ClipPath id="iconCenter_svg__a">
          <Path d="M0 0h25v25H0z" />
        </ClipPath>
        <G clipPath="url(#iconCenter_svg__a)">
          <G clipPath="url(#iconCenter_svg__b)" id="iconCenter_svg__c">
            <Path fill="#d8d8d8" d="M0 0h25v25H0z" />
          </G>
        </G>
      </Defs>
      <Use xlinkHref="#iconCenter_svg__c" />
    </Svg>
  );
}

export { IconCenter };
