import * as React from 'react';
import Svg, { SvgProps, Defs, ClipPath, Path, G } from 'react-native-svg';

function IconPopsOfYou(props: SvgProps) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 21 21"
      {...props}
    >
      <Defs>
        <ClipPath id="iconPopsOfYou_svg__a">
          <Path d="M0 0h3.809v3.809H0zm17.191 0H21v3.809h-3.809zM8.594 0h3.812v3.809H8.594zM0 8.594h3.809v3.812H0zm17.191 0H21v3.812h-3.809zm-8.597 0h3.812v3.812H8.594zM0 17.19h3.809V21H0zm17.191 0H21V21h-3.809zm-8.597 0h3.812V21H8.594zm0 0" />
        </ClipPath>
      </Defs>
      <G clipPath="url(#iconPopsOfYou_svg__a)">
        <Path d="M0 0h21v21H0z" fill={props.color} />
      </G>
    </Svg>
  );
}

export { IconPopsOfYou };
