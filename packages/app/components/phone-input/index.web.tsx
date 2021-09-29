import React, { useRef, useEffect, useCallback, CSSProperties } from 'react';
import { PhoneInputProps, PhoneInputRef } from './types';
import PhoneInputForm, {
  isPossiblePhoneNumber
} from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';

import styles from './style.module.css';
import 'react-phone-number-input/style.css';

type Props = PhoneInputProps;

export function PhoneInput(props: Props) {
  const {
    onChangePhoneNumber,
    value,
    disabled,
    textStyle = {} as object,
    style = {},
    inputRef,
    inputProps
  } = props;

  const ref = useRef<PhoneInputRef>(null);

  useEffect(() => {
    if (inputRef?.current) inputRef.current = ref.current;
  });

  const onChangeText = useCallback(
    (phoneNumber: string) => {
      onChangePhoneNumber({
        phoneNumber,
        valid: phoneNumber ? isPossiblePhoneNumber(phoneNumber) : false
      });
    },
    [onChangePhoneNumber]
  );

  return (
    <PhoneInputForm
      international={false}
      defaultCountry="US"
      useNationalFormatForDefaultCountryValue
      {...(inputProps as any)}
      style={{
        ...(style as CSSProperties),
        ...textStyle
      }}
      value={value}
      onChange={onChangeText}
      flags={flags}
      disabled={disabled}
      autoFocus={true}
      color="white"
      className={styles.phone}
    />
  );
}
