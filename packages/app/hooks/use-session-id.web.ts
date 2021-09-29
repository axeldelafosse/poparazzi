import Cookies from 'universal-cookie';
import { useCallback, useEffect, useContext } from 'react';

import { getSessionId } from 'app/utils/session-id';
import { SessionContext } from 'app/utils/session-context';

const cookies = new Cookies();

export function useSessionId() {
  const [sessionId, setSessionId] = useContext(SessionContext);

  useEffect(() => {
    setSessionId(getSessionId());
  }, []);

  const handleCookieChange = useCallback(() => {
    setSessionId(getSessionId());
  }, []);

  useEffect(() => {
    cookies.addChangeListener(handleCookieChange);
    return cookies.removeChangeListener(handleCookieChange);
  }, [handleCookieChange]);

  return sessionId;
}
