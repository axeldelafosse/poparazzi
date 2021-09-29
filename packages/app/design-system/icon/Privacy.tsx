import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function Privacy(props: SvgProps) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 14.1 20"
      {...props}
    >
      <Path d="M14 20V8h-2V5.602C12 2.3 10.2 0 7 0 3.7 0 2 2.3 2 5.602V8H0v12h14.102zm-7-3.398A2.585 2.585 0 014.398 14c0-1.5 1.102-2.602 2.602-2.602 1.5 0 2.602 1.102 2.602 2.602 0 1.5-1.204 2.602-2.602 2.602zM10 8H4V5.602c0-1.602.8-3.5 3-3.5s3 1.796 3 3.5zm0 0" />
    </Svg>
  );
}

export { Privacy };
