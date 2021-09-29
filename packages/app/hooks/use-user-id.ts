import { useEffect, useState } from 'react';

import { getUserId } from 'app/utils/user-id';

export function useUserId() {
  const [userId, setUserId] = useState(getUserId());

  useEffect(() => {
    //
  }, []);

  return userId;
}
