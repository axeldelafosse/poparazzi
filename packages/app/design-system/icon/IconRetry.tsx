import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function IconRetry(props: SvgProps) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 27 23"
      {...props}
    >
      <Path d="M22.988 10.844C22.66 4.797 17.628 0 11.512 0 5.164 0 0 5.16 0 11.5S5.164 23 11.512 23h1.644v-3.285h-1.644c-4.54 0-8.223-3.68-8.223-8.215s3.684-8.215 8.223-8.215c4.273 0 7.824 3.32 8.187 7.492l-1.613-1.609-2.332 2.332 5.621 5.617L27 11.5l-2.336-2.332zm0 0" />
    </Svg>
  );
}

export { IconRetry };
