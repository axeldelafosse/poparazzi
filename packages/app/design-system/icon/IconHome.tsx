import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function IconHome(props: SvgProps) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 23 24"
      {...props}
    >
      <Path
        d="M11.5 2L1 9.875V23h7.086v-5.512a3.408 3.408 0 013.414-3.414 3.408 3.408 0 013.414 3.414V23H22V9.875zm0 0"
        fill="none"
        strokeWidth={1.8}
        stroke={props.color}
        strokeMiterlimit={10}
      />
    </Svg>
  );
}

export { IconHome };
