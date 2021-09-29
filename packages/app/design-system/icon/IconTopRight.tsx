import * as React from 'react';
import Svg, { SvgProps, Defs, ClipPath, Path, G, Use } from 'react-native-svg';

function IconTopRight(props: SvgProps) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <Defs>
        <ClipPath id="iconTopRight_svg__b">
          <Path d="M0 0h24v2H0zm22 2h2v22h-2zm0 0" />
        </ClipPath>
        <ClipPath id="iconTopRight_svg__a">
          <Path d="M0 0h24v24H0z" />
        </ClipPath>
        <G clipPath="url(#iconTopRight_svg__a)">
          <G clipPath="url(#iconTopRight_svg__b)" id="iconTopRight_svg__c">
            <Path fill={props.color} d="M0 0h24v24H0z" />
          </G>
        </G>
      </Defs>
      <Use xlinkHref="#iconTopRight_svg__c" />
    </Svg>
  );
}

export { IconTopRight };
