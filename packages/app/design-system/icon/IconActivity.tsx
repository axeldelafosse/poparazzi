import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function IconActivity(props: SvgProps) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 25 22"
      {...props}
    >
      <Path
        d="M20.703 2.043c-4.976-3.027-8.203 1.5-8.203 1.5s-3.227-4.527-8.203-1.5C-.676 5.074 1.07 10.445 2.516 12.66 3.96 14.875 5.91 17.254 12.5 21c6.59-3.746 8.54-6.125 9.984-8.34 1.446-2.215 3.192-7.586-1.78-10.617zm0 0"
        fill="none"
        strokeWidth={1.8}
        stroke={props.color}
        strokeMiterlimit={10}
      />
    </Svg>
  );
}

export { IconActivity };
