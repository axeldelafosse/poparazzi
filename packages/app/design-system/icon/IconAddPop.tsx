import * as React from 'react';
import Svg, { SvgProps, Defs, ClipPath, Path, G } from 'react-native-svg';

function IconAddPop(props: SvgProps) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 23 23"
      {...props}
    >
      <Defs>
        <ClipPath id="iconAddPop_svg__a">
          <Path d="M18.41.375a4.761 4.761 0 014.215 4.215c.5 4.594.5 9.226 0 13.82a4.761 4.761 0 01-4.215 4.215c-4.594.5-9.226.5-13.82 0A4.761 4.761 0 01.375 18.41c-.5-4.594-.5-9.226 0-13.82A4.761 4.761 0 014.59.375c4.594-.5 9.226-.5 13.82 0zM5.73 2.211a3.98 3.98 0 00-3.52 3.52 53.25 53.25 0 000 11.539 3.98 3.98 0 003.52 3.52 53.25 53.25 0 0011.54 0 3.98 3.98 0 003.52-3.52 53.25 53.25 0 000-11.54 3.98 3.98 0 00-3.52-3.52 53.25 53.25 0 00-11.54 0zm6.801 2.754v5.531h5.531v2.035h-5.53v5.531h-2.036v-5.53H4.965v-2.036h5.531V4.965zm0 0" />
        </ClipPath>
      </Defs>
      <G clipPath="url(#iconAddPop_svg__a)">
        <Path d="M0 0h23v23H0z" fill={props.color} />
      </G>
    </Svg>
  );
}

export { IconAddPop };
