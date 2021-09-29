import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function IconFollowPlus(props: SvgProps) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 15 15"
      {...props}
    >
      <Path
        d="M7.5 15c4.14 0 7.5-3.36 7.5-7.5C15 3.36 11.64 0 7.5 0 3.36 0 0 3.36 0 7.5 0 11.64 3.36 15 7.5 15zM6.316 3.5h2.368v2.816H11.5v2.368H8.684V11.5H6.316V8.684H3.5V6.316h2.816zm0 0"
        fillRule="evenodd"
        fill={props.color}
      />
    </Svg>
  );
}

export { IconFollowPlus };
