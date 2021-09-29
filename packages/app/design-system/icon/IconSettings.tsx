import * as React from 'react';
import Svg, { SvgProps, Defs, ClipPath, Path, G } from 'react-native-svg';

function IconSettings(props: SvgProps) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 19 19"
      {...props}
    >
      <Defs>
        <ClipPath id="iconSettings_svg__a">
          <Path d="M7.844 0h3.449l.05.645c.079.48.216.882.419 1.203.629.988 1.761.906 3.398-.239.043.04.094.09.152.149l2.114 2.265-.414.497c-.293.394-.48.78-.555 1.152-.27 1.137.578 1.894 2.543 2.266v3.316l-.64.05c-.489.075-.887.216-1.2.419-.988.632-.91 1.77.242 3.418a.934.934 0 00-.152.152l-2.254 2.137-.492-.43c-.395-.297-.774-.48-1.145-.559-1.132-.27-1.882.582-2.254 2.559H8.02c-.368-1.977-1.13-2.828-2.278-2.559-.387.079-.773.262-1.16.559l-.516.43-2.277-2.137a2.776 2.776 0 00-.152-.152c1.168-1.649 1.242-2.786.226-3.418-.32-.203-.722-.344-1.207-.418L0 11.254V8.125v-.188c1.996-.37 2.863-1.128 2.594-2.265-.082-.371-.278-.758-.578-1.152l-.418-.497 2.156-2.265c.058-.059.105-.11.148-.149 1.672 1.145 2.825 1.227 3.465.239.2-.32.344-.723.426-1.203zm6.496 9.43c0 1.324-.469 2.457-1.41 3.394-.93.946-2.055 1.418-3.371 1.418-1.32 0-2.45-.472-3.391-1.418-.93-.937-1.395-2.07-1.395-3.394 0-1.325.465-2.461 1.395-3.407.941-.933 2.07-1.402 3.39-1.402 1.317 0 2.442.469 3.372 1.402.941.946 1.41 2.082 1.41 3.407zm0 0" />
        </ClipPath>
      </Defs>
      <G clipPath="url(#iconSettings_svg__a)" clipRule="evenodd">
        <Path d="M0 0h19v19H0z" fill={props.color} />
      </G>
    </Svg>
  );
}

export { IconSettings };
