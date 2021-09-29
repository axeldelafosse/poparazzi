import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function IconBlocked(props: SvgProps) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 20 20"
      {...props}
    >
      <Path
        d="M18.352 10A8.35 8.35 0 0110 18.352 8.35 8.35 0 011.648 10 8.35 8.35 0 0110 1.648 8.35 8.35 0 0118.352 10zM20 10c0 5.523-4.477 10-10 10S0 15.523 0 10 4.477 0 10 0s10 4.477 10 10zM9.996 8.55l-2.41-2.41L6.14 7.587l2.406 2.41-2.406 2.41 1.445 1.446 2.41-2.41 2.41 2.41 1.446-1.446-2.41-2.41 2.41-2.41-1.446-1.445zm0 0"
        fillRule="evenodd"
      />
    </Svg>
  );
}

export { IconBlocked };
