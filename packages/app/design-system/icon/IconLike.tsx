import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function IconLike(props: SvgProps) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 22"
      {...props}
    >
      <Path
        d="M19.844 2.043C15.086-.984 12 3.543 12 3.543s-3.086-4.527-7.844-1.5C-.605 5.074 1.07 10.445 2.45 12.66 3.832 14.875 5.7 17.254 12 21c6.3-3.746 8.168-6.125 9.55-8.34 1.384-2.215 3.055-7.586-1.706-10.617zm0 0"
        fill="none"
        strokeWidth={1.7}
        stroke={props.color}
        strokeMiterlimit={10}
      />
    </Svg>
  );
}

export { IconLike };
