import React, { useState } from 'react';
import useSWRNative from '@nandorojo/swr-react-native';
import useUnmountSignal from 'use-unmount-signal';

import { fetchAPI } from 'app/utils/fetch';

export default function ActivityScreen() {
  const unmountSignal = useUnmountSignal();
  const [url, setUrl] = useState('/api/activity_items');
  const { data, error } = useSWRNative(
    [url],
    (url) => fetchAPI({ url, method: 'GET', unmountSignal }),
    {
      revalidateOnFocus: true
    }
  );

  // console.log(data);

  return null;
}
