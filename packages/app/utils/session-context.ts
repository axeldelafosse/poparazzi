import { createContext } from 'react';

export const SessionContext = createContext<
  [string, React.Dispatch<React.SetStateAction<string>>] | null
>(null);
