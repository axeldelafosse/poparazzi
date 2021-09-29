import * as React from 'react';
import Svg, { SvgProps, Defs, ClipPath, Path, G } from 'react-native-svg';

function IconCloseEmojiKeyboard(props: SvgProps) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 17.062 17.021"
      {...props}
    >
      <Defs>
        <ClipPath id="iconCloseEmojiKeyboard_svg__a">
          <Path d="M0 0h17.063v17.02H0zm0 0" />
        </ClipPath>
      </Defs>
      <G clipPath="url(#iconCloseEmojiKeyboard_svg__a)">
        <Path
          d="M10.57 8.523l6.051-6.054c.742-.742.41-1.59-.008-2.008-.414-.418-1.265-.75-2.008-.008l-6.05 6.055L2.508.46C1.73-.32.918.039.492.46c-.422.422-.855 1.156 0 2.016L6.54 8.523.5 14.563c-.742.738-.422 1.605-.008 2.019.418.418 1.281.734 2.024-.008l6.039-6.039 6.047 6.047c.738.738 1.605.41 2.02-.008.417-.414.733-1.27-.009-2.008zm0 0"
          fillRule="evenodd"
        />
      </G>
    </Svg>
  );
}

export { IconCloseEmojiKeyboard };
