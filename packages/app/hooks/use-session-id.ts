import { useEffect, useContext } from 'react';

import { getSessionId } from 'app/utils/session-id';
import { SessionContext } from 'app/utils/session-context';

export function useSessionId() {
  const [sessionId, setSessionId] = useContext(SessionContext);

  useEffect(() => {
    setSessionId(getSessionId());
  }, []);

  return sessionId;
}
