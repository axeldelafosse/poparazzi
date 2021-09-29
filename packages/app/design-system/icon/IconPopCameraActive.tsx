import * as React from 'react';
import Svg, { SvgProps, Defs, ClipPath, Path, G } from 'react-native-svg';

function IconPopCameraActive(props: SvgProps) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 32.3 19.458"
      {...props}
    >
      <Defs>
        <ClipPath id="iconPopCameraActive_svg__a">
          <Path d="M0 0h32.3v19.457H0zm0 0" />
        </ClipPath>
      </Defs>
      <G clipPath="url(#iconPopCameraActive_svg__a)">
        <Path
          d="M13.621 13.98l-.973 5.477H0L3.445 0h26.02c.926 0 1.629.215 2.113.64.48.426.723 1.047.723 1.86 0 .242-.028.52-.086.836l-1.305 7.309c-.203 1.093-.64 1.925-1.305 2.488-.668.566-1.539.847-2.613.847zm1-5.668h2c.262 0 .48-.074.656-.222a.95.95 0 00.32-.613l.165-.946a.69.69 0 00.027-.222c0-.407-.23-.61-.695-.61h-2zm0 0"
          fillRule="evenodd"
          fill={props.color}
        />
      </G>
    </Svg>
  );
}

export { IconPopCameraActive };
