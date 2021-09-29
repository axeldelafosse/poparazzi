import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function IconUntag(props: SvgProps) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 20 20"
      {...props}
    >
      <Path d="M10 0l3.39 3.332h3.786c.98 0 1.34.102 1.695.29.36.19.645.468.836.82.191.351.293.703.293 1.667v11.114c0 .965-.102 1.316-.293 1.668a1.97 1.97 0 01-.836.82c-.355.187-.715.289-1.695.289H2.824c-.98 0-1.34-.102-1.695-.29a1.991 1.991 0 01-.836-.82C.102 18.54 0 18.188 0 17.224V6.109c0-.964.102-1.316.293-1.668.195-.351.477-.628.836-.82.355-.187.715-.289 1.695-.289H6.61zm2.445 7.39L10 9.837 7.555 7.39l-1.47 1.468 2.446 2.446-2.445 2.445 1.469 1.469L10 12.773l2.445 2.446 1.47-1.469-2.446-2.445 2.445-2.446zm0 0" />
    </Svg>
  );
}

export { IconUntag };