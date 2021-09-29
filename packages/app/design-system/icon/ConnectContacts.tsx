import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function ConnectContacts(props: SvgProps) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 56 56"
      {...props}
    >
      <Path
        d="M56 28c0 15.465-12.535 28-28 28S0 43.465 0 28 12.535 0 28 0s28 12.535 28 28zm-2 0c0 14.36-11.64 26-26 26S2 42.36 2 28 13.64 2 28 2s26 11.64 26 26zm-13.828-5.36v-3.218h-1.61v-2.453c.012-.653-.011-2.469-.011-2.469H17.492v23.531c-.012.649 0 2.469 0 2.469h21.059v-4.898h1.613v-3.223h-1.613V29.12h1.613v-3.23h-1.613v-3.25zM27.98 26.743c-1.59 0-2.878-1.328-2.878-2.972 0-1.641 1.289-2.985 2.878-2.985 1.594 0 2.883 1.332 2.883 2.973 0 1.644-1.289 2.984-2.883 2.984zm0 1.164c2.973 0 5.391 2.602 5.391 5.79H22.594c0-3.188 2.418-5.79 5.386-5.79zm0 0"
        fillRule="evenodd"
      />
    </Svg>
  );
}

export { ConnectContacts };
