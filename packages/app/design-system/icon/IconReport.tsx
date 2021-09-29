import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function IconReport(props: SvgProps) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 21 18"
      {...props}
    >
      <Path
        d="M20.73 15.941L11.602.671C11.344.247 10.96 0 10.547 0c-.414 0-.797.246-1.055.672l-9.25 15.5c-.281.469-.32.965-.105 1.332.187.32.547.496 1.011.496h18.797c.403 0 .711-.16.89-.469.255-.43.212-1.066-.105-1.59zM11.875 5.203l-.547 7.363H9.672l-.547-7.363zm-1.383 10.992c-.805 0-1.422-.601-1.422-1.363 0-.777.617-1.379 1.422-1.379.801 0 1.438.602 1.438 1.379 0 .762-.637 1.363-1.438 1.363zm0 0"
        fill={props.color}
      />
    </Svg>
  );
}

export { IconReport };
