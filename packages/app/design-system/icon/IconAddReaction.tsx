import * as React from 'react';
import Svg, { SvgProps, Defs, ClipPath, Path, G } from 'react-native-svg';

function IconAddReaction(props: SvgProps) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 22 22"
      {...props}
    >
      <Defs>
        <ClipPath id="iconAddReaction_svg__a">
          <Path d="M11 0c6.074 0 11 4.926 11 11 0 .836-.102 1.652-.277 2.438a5.869 5.869 0 00-1.485-.743c-.097-.035-.199-.058-.297-.086a5.913 5.913 0 00-.52-.125c-.089-.015-.179-.035-.269-.046a6.283 6.283 0 00-.82-.063c-.203 0-.402.012-.602.031a5.235 5.235 0 00-.496.074c-.027.004-.058.008-.09.016-.382.074-.75.191-1.101.336H2.961C3.797 16.5 7.082 19.25 11 19.25c.488 0 .969-.043 1.434-.125l.035.219c.023.148.054.289.094.433.015.075.039.145.062.215a4.625 4.625 0 00.266.735c.152.347.328.683.543.992A10.86 10.86 0 0111 22C4.926 22 0 17.074 0 11S4.926 0 11 0zm8.25 14.668v2.75H22v1.832h-2.75V22h-1.832v-2.75h-2.75v-1.832h2.75v-2.75zM7.332 6.418a1.832 1.832 0 000 3.664c1.012 0 1.836-.82 1.836-1.832a1.835 1.835 0 00-1.836-1.832zm7.336 0A1.833 1.833 0 1016.5 8.25c0-1.012-.82-1.832-1.832-1.832zm0 0" />
        </ClipPath>
      </Defs>
      <G clipPath="url(#iconAddReaction_svg__a)">
        <Path d="M0 0h22v22H0z" />
      </G>
    </Svg>
  );
}

export { IconAddReaction };
