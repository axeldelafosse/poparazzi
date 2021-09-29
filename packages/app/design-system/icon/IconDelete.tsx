import * as React from 'react';
import Svg, { SvgProps, Defs, ClipPath, Path, G } from 'react-native-svg';

function IconDelete(props: SvgProps) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 18 20"
      {...props}
    >
      <Defs>
        <ClipPath id="iconDelete_svg__a">
          <Path d="M12.188 2.656V0H5.538v2.656H0V4.09h1.656L2.836 20h12.101l1.18-15.91H18V2.656zM6.921 1.41h3.906v1.223H6.922zM5.629 16.594L5.086 6.18l1.383-.07.547 10.413zm3.926-.07H8.172V6.132h1.383zm2.543.046l-1.383-.07.543-10.414 1.387.07zm0 0" />
        </ClipPath>
      </Defs>
      <G clipPath="url(#iconDelete_svg__a)">
        <Path d="M0 0h18v20H0z" fill={props.color} />
      </G>
    </Svg>
  );
}

export { IconDelete };
