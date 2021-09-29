import React, { useState, useCallback } from 'react';

import { fetchAPI } from 'app/utils/fetch';
import { User } from 'app/schema';
import { useCurrentUser } from 'app/hooks/use-current-user';
import { IconCheck } from 'app/design-system/icon/IconCheck';
import { Button } from 'app/design-system/button';

type Props = {
  user: User;
  variant?: 'full' | 'full-blue';
  variantWhenFollowing?: 'outline' | 'outline-blue';
  showIconCheck?: boolean;
};

export function FollowButton({
  user,
  variant = 'full',
  variantWhenFollowing = 'outline',
  showIconCheck = false
}: Props) {
  const currentUser = useCurrentUser();
  const isCurrentUserProfile = user?.id === currentUser?.id;
  const [isFollowing, setIsFollowing] = useState(user.is_following);
  const title = isFollowing ? (
    <>
      {showIconCheck && (
        <>
          <IconCheck color="white" width={13} height={10} />{' '}
        </>
      )}
      Following
    </>
  ) : user.is_followed_by ? (
    'Follow Back'
  ) : (
    'Follow'
  );

  const follow = useCallback(async () => {
    setIsFollowing(!isFollowing);

    const { data, errors } = await fetchAPI({
      url: `/api/users/${user.id}`,
      method: 'PATCH',
      body: {
        data: {
          id: user.id,
          type: 'users',
          attributes: { is_following: !isFollowing }
        }
      }
    });
  }, [user, isFollowing]);

  if (isCurrentUserProfile) {
    return null;
  }

  return (
    <Button
      title={title}
      size="small"
      variant={isFollowing ? variantWhenFollowing : variant}
      onPress={follow}
    />
  );
}
