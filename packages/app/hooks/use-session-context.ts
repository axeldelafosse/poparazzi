import { useContext } from 'react';
import { SessionContext } from 'app/utils/session-context';

export const useSession = () => {
  const context = useContext(SessionContext);

  return context;
};
