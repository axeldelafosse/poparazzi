import * as React from 'react';
import Svg, { SvgProps, Defs, ClipPath, Path, G } from 'react-native-svg';

function AddPeople(props: SvgProps) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 13 11.638"
      {...props}
    >
      <Defs>
        <ClipPath id="addPeople_svg__a">
          <Path d="M0 0h13v11.637H0zm0 0" />
        </ClipPath>
      </Defs>
      <G clipPath="url(#addPeople_svg__a)">
        <Path
          d="M3.938 5.133a2.566 2.566 0 100-5.133 2.566 2.566 0 100 5.133zm0 1.027A3.941 3.941 0 000 10.098v1.539h7.871v-1.54A3.94 3.94 0 003.937 6.16zm7.394-3.965v1.668H13v1.489h-1.668v1.664H9.848V5.352H8.18V3.863h1.668V2.195zm0 0"
          fillRule="evenodd"
          fill={props.color}
        />
      </G>
    </Svg>
  );
}

export { AddPeople };
