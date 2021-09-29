import * as React from 'react';
import Svg, { SvgProps, Defs, ClipPath, Path, G } from 'react-native-svg';

function IconSearch(props: SvgProps) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 25 24"
      {...props}
    >
      <Defs>
        <ClipPath id="iconSearch_svg__a">
          <Path d="M1 1h23v23H1zm0 0" />
        </ClipPath>
        <ClipPath id="iconSearch_svg__b">
          <Path d="M11.2 21.395a10.167 10.167 0 006.609-2.426L22.836 24 24 22.836l-5.031-5.027c3.41-4.004 3.226-10.043-.555-13.825-3.98-3.98-10.453-3.98-14.43 0-3.98 3.977-3.98 10.45 0 14.43a10.153 10.153 0 007.215 2.98zM5.144 5.145c3.347-3.336 8.761-3.336 12.105 0 3.336 3.34 3.336 8.77 0 12.105-3.344 3.336-8.758 3.336-12.105 0-3.336-3.336-3.336-8.766 0-12.105zm0 0" />
        </ClipPath>
      </Defs>
      <G clipPath="url(#iconSearch_svg__a)">
        <G clipPath="url(#iconSearch_svg__b)">
          <Path d="M0 0h25v24H0z" />
        </G>
      </G>
      <Path
        d="M11.2 21.395a10.167 10.167 0 006.609-2.426L22.836 24 24 22.836l-5.031-5.027c3.41-4.004 3.226-10.043-.555-13.825-3.98-3.98-10.453-3.98-14.43 0-3.98 3.977-3.98 10.45 0 14.43a10.153 10.153 0 007.215 2.98zM5.144 5.145c3.347-3.336 8.761-3.336 12.105 0 3.336 3.34 3.336 8.77 0 12.105-3.344 3.336-8.758 3.336-12.105 0-3.336-3.336-3.336-8.766 0-12.105zm0 0"
        fill={props.color}
        strokeWidth={0.5}
        stroke={props.color}
        strokeMiterlimit={10}
      />
    </Svg>
  );
}

export { IconSearch };
