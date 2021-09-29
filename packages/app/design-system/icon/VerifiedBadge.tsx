import * as React from 'react';
import Svg, { SvgProps, Defs, ClipPath, Path, G } from 'react-native-svg';

function VerifiedBadge(props: SvgProps) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 13.984 15"
      {...props}
    >
      <Defs>
        <ClipPath id="verifiedBadge_svg__a">
          <Path d="M0 0h13.984v15H0zm0 0" />
        </ClipPath>
      </Defs>
      <G clipPath="url(#verifiedBadge_svg__a)">
        <Path
          d="M6.988 0l1.89 1.555 2.43-.117.645 2.39 2.031 1.387-.863 2.285.863 2.285-2.03 1.38-.645 2.386-2.407-.098L6.988 15l-1.875-1.547-2.441.098-.637-2.387L0 9.785.855 7.5 0 5.215l2.035-1.387.637-2.39 2.441.117zm2.696 4.355l-3.621 3.66-1.77-1.788-1.3 1.312 3.07 3.106 4.921-4.977zm0 0"
          fillRule="evenodd"
        />
      </G>
    </Svg>
  );
}

export { VerifiedBadge };
