import { useCallback, useEffect, useState } from 'react';
import Cookies from 'universal-cookie';

import { getUserId } from 'app/utils/user-id';

const cookies = new Cookies();

export function useUserId() {
  const [userId, setUserId] = useState(getUserId());

  const handleCookieChange = useCallback(() => {
    setUserId(getUserId());
  }, []);

  useEffect(() => {
    cookies.addChangeListener(handleCookieChange);
    return cookies.removeChangeListener(handleCookieChange);
  }, [handleCookieChange]);

  return userId;
}
