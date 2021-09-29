import * as React from 'react';
import Svg, { SvgProps, Defs, ClipPath, Path, G } from 'react-native-svg';

function IconMessage(props: SvgProps) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24.225 21.692"
      {...props}
    >
      <Defs>
        <ClipPath id="iconMessage_svg__a">
          <Path d="M0 0h24.227v21.691H0zm0 0" />
        </ClipPath>
      </Defs>
      <G clipPath="url(#iconMessage_svg__a)">
        <Path
          d="M12.113 0C8.898 0 5.82 1.063 3.547 2.953 1.277 4.848 0 7.414 0 10.09c.004 1.738.547 3.45 1.578 4.965 1.031 1.511 2.516 2.777 4.305 3.672-.477 1.07-1.192 2.07-2.117 2.964a12.955 12.955 0 004.921-1.933c1.11.277 2.266.418 3.426.418 3.211 0 6.293-1.063 8.563-2.953 2.273-1.891 3.547-4.457 3.547-7.133s-1.274-5.242-3.547-7.137C18.406 1.063 15.324 0 12.113 0zm0 0"
          fill={props.color}
        />
      </G>
    </Svg>
  );
}

export { IconMessage };
