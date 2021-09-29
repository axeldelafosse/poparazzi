import React, { useRef, useEffect, useCallback } from 'react';
import Input from 'react-native-phone-input';
import { PhoneInputRef, PhoneInputProps } from './types';

type Props = PhoneInputProps;

export function PhoneInput(props: Props) {
  const {
    inputRef,
    value,
    onChangePhoneNumber,
    inputProps = {},
    textStyle,
    style
  } = props;

  const ref = useRef<PhoneInputRef>(null);

  useEffect(() => {
    if (inputRef?.current) inputRef.current = ref.current;
  });

  const onChangeText = useCallback(
    (phoneNumber: string) => {
      onChangePhoneNumber({
        phoneNumber:
          phoneNumber && phoneNumber[0] === '+'
            ? phoneNumber
            : `+${phoneNumber}`,
        valid: !!ref.current?.isValidNumber()
      });
    },
    [onChangePhoneNumber]
  );

  return (
    <Input
      textStyle={textStyle}
      style={style}
      ref={ref}
      onChangePhoneNumber={onChangeText}
      value={value}
      textProps={inputProps}
    />
  );
}
