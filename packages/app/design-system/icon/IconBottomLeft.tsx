import * as React from 'react';
import Svg, { SvgProps, Defs, ClipPath, Path, G, Use } from 'react-native-svg';

function IconBottomLeft(props: SvgProps) {
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
        <ClipPath id="iconBottomLeft_svg__b">
          <Path d="M0 0h2v22H0zm0 22h24v2H0zm0 0" />
        </ClipPath>
        <ClipPath id="iconBottomLeft_svg__a">
          <Path d="M0 0h24v24H0z" />
        </ClipPath>
        <G clipPath="url(#iconBottomLeft_svg__a)">
          <G clipPath="url(#iconBottomLeft_svg__b)" id="iconBottomLeft_svg__c">
            <Path fill={props.color} d="M0 0h24v24H0z" />
          </G>
        </G>
      </Defs>
      <Use xlinkHref="#iconBottomLeft_svg__c" />
    </Svg>
  );
}

export { IconBottomLeft };
