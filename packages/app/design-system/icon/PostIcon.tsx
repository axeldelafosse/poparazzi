import * as React from 'react';
import Svg, { SvgProps, Defs, ClipPath, Path, G } from 'react-native-svg';

function PostIcon(props: SvgProps) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 9.381 15.45"
      {...props}
    >
      <Defs>
        <ClipPath id="PostIcon_svg__a">
          <Path d="M0 0h9.379v15.45H0zm0 0" />
        </ClipPath>
      </Defs>
      <Path d="M2.023 14.723l6.668-7-6.668-7L.691 2.125l5.332 5.598-5.332 5.601zm0 0" />
      <G clipPath="url(#PostIcon_svg__a)">
        <Path d="M2.023 14.723l.364.347-.364.38-.363-.38zm6.668-7l.36-.344.332.344-.332.347zm-6.668-7L1.66.379 2.023 0l.364.379zM.691 2.125l-.363.344L0 2.125l.328-.344zm5.332 5.598l.364-.344.328.344-.328.347zM.691 13.324l-.363.344L0 13.324l.328-.344zm.97 1.055l6.667-7 .723.691-6.664 7zM8.327 8.07l-6.668-7L2.387.38l6.664 7zm-5.941-7L1.05 2.47.328 1.78 1.66.38zm-1.336.711L6.387 7.38l-.727.691L.328 2.47zm5.336 6.29L1.05 13.667l-.723-.688L5.66 7.38zM1.05 12.98l1.336 1.398-.727.691-1.332-1.402zm0 0" />
      </G>
    </Svg>
  );
}

export { PostIcon };
