import { useState, useEffect } from 'react';
import { useUserId } from 'app/hooks/use-user-id';
import useSWRNative from '@nandorojo/swr-react-native';

import { fetchAPI } from 'app/utils/fetch';

export function useCurrentUser(sessionId?: string) {
  const userId = useUserId();
  const [currentUser, setCurrentUser] = useState(null);
  const url = `/api/users/${userId}`;
  const { data, error } = useSWRNative(userId ? [url] : null, (url) =>
    fetchAPI({ url, method: 'GET', sessionId })
  );

  useEffect(() => {
    const user = data?.data;
    if (user) {
      setCurrentUser({
        id: user.id,
        top_poparazzi: user.relationships.top_poparazzi?.data?.map(
          (user: { id: string }) => ({
            id: user.id
          })
        ),
        ...user.attributes
      });
    }
  }, [data]);

  return currentUser;
}
