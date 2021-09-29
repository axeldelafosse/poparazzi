import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function IconCamera(props: SvgProps) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 30 24"
      {...props}
    >
      <Path
        d="M1 23V5.031h6.223L11.219 1h7.562l3.996 4.031H29V23zM15.047 7.863a5.044 5.044 0 100 10.086 5.043 5.043 0 100-10.086zm0 0"
        fill="none"
        strokeWidth={1.8}
        stroke={props.color}
        strokeMiterlimit={10}
      />
    </Svg>
  );
}

export { IconCamera };
