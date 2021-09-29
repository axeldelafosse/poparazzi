import React, { useState, useRef } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { User } from 'app/schema';
import { UserListSheet } from 'app/components/user-list-sheet';
import { ShareSheet } from 'app/components/share-sheet';
import { PopsOfUser } from 'app/components/pops-of-user';
import { PopsByUser } from 'app/components/pops-by-user';
import { PostList } from 'app/components/post-list';
import type { PostsScreenProps } from 'app/navigation/types';

export default function PostsScreen({ route }: PostsScreenProps) {
  const { post, user, tab } = route.params;
  const bottomUserListSheetRef = useRef<BottomSheetModal>(null);
  const bottomShareSheetRef = useRef<BottomSheetModal>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [postToShare, setPostToShare] = useState(null);

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: 'black'
        }}
      >
        {user ? (
          <>
            {tab === 'popsOfUser' ? (
              <PopsOfUser
                user={user}
                post={post}
                isInTab={false}
                isFullscreen={true}
                bottomUserListSheetRef={bottomUserListSheetRef}
                bottomShareSheetRef={bottomShareSheetRef}
                setUsers={setUsers}
                setPostToShare={setPostToShare}
              />
            ) : (
              <PopsByUser
                user={user}
                post={post}
                isInTab={false}
                isFullscreen={true}
                bottomUserListSheetRef={bottomUserListSheetRef}
                bottomShareSheetRef={bottomShareSheetRef}
                setUsers={setUsers}
                setPostToShare={setPostToShare}
              />
            )}
          </>
        ) : (
          <PostList
            post={post}
            bottomUserListSheetRef={bottomUserListSheetRef}
            bottomShareSheetRef={bottomShareSheetRef}
            setUsers={setUsers}
            setPostToShare={setPostToShare}
          />
        )}

        <UserListSheet
          bottomSheetRef={bottomUserListSheetRef}
          title={`${users.length} People`}
          users={users}
        />
        <ShareSheet bottomSheetRef={bottomShareSheetRef} post={postToShare} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
