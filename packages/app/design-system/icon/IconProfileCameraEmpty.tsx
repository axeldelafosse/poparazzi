import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function IconProfileCameraEmpty(props: SvgProps) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 80 80"
      {...props}
    >
      <Path
        d="M77.5 40c0 20.71-16.79 37.5-37.5 37.5S2.5 60.71 2.5 40 19.29 2.5 40 2.5 77.5 19.29 77.5 40zm2.5 0c0 22.09-17.91 40-40 40S0 62.09 0 40 17.91 0 40 0s40 17.91 40 40zM35.273 23.3h-.5l-.351.356-4.645 4.68h-8.476v24.863h37.398V28.336h-8.476l-4.645-4.68-.351-.355zm-4.144 7.083l4.644-4.684h8.454l4.644 4.684.352.355H56.3v20.063H23.699V30.738h7.078zm8.926 1.496a7.504 7.504 0 100 15.008 7.504 7.504 0 100-15.008zm-5.106 7.504a5.108 5.108 0 0110.215 0 5.108 5.108 0 01-10.215 0zm0 0"
        fillRule="evenodd"
        fill={props.color}
      />
    </Svg>
  );
}

export { IconProfileCameraEmpty };
