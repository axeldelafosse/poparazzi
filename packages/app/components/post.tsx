import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, useWindowDimensions } from 'react-native';
import { View, Text } from 'dripsy';
import useSWRNative from '@nandorojo/swr-react-native';
import useUnmountSignal from 'use-unmount-signal';
import { useNavigation } from '@react-navigation/native';

import { fetchAPI } from 'app/utils/fetch';
import { Image } from 'app/design-system/image';
import { MemoizedAnimatedImage } from 'app/components/animated-image';
import { Content, User } from 'app/schema';
import { Pressable } from 'app/design-system/pressable-scale';
import { Avatar } from 'app/design-system/avatar';
import { IconOptions } from 'app/design-system/icon/IconOptions';
import { IconEye } from 'app/design-system/icon/IconEye';
import { IconLike } from 'app/design-system/icon/IconLike';
import { IconLiked } from 'app/design-system/icon/IconLiked';
import { formatLongNumber } from 'app/utils/format-long-number';
import { UsernameList } from 'app/components/username-list';

type Props = {
  post: Content;
  user?: User;
  tab?: 'popsOfUser' | 'popsByUser';
  isFullscreen?: boolean;
  isViewable?: boolean;
  bottomUserListSheetRef?: any;
  bottomShareSheetRef?: any;
  setUsers?: (users: User[]) => void;
  setPostToShare?: (post: Content) => void;
};

function Post({
  post,
  user,
  tab,
  isFullscreen = false,
  isViewable = true,
  bottomUserListSheetRef,
  bottomShareSheetRef,
  setUsers,
  setPostToShare
}: Props) {
  const unmountSignal = useUnmountSignal();
  const navigation = useNavigation();
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const width = isFullscreen ? windowWidth : windowWidth / 3;
  const height = isFullscreen ? windowHeight - 150 : windowWidth / 2.2;

  const [content, setContent] = useState(post);
  const url = `/api/contents/${post.id}`;
  const { data, error } = useSWRNative(
    isFullscreen ? [url] : null,
    (url) => fetchAPI({ url, method: 'GET', unmountSignal }),
    {
      revalidateOnFocus: true
    }
  );

  useEffect(() => {
    const newContent = data?.data;
    if (newContent) {
      setContent({
        id: newContent.id,
        user: {
          id: newContent.relationships.user?.data?.id
        },
        tagged_users: newContent.relationships.tagged_users?.data?.map(
          (user: { id: string }) => ({
            id: user.id
          })
        ),
        ...newContent.attributes
      } as Content);
    }
  }, [data]);

  return (
    <View sx={{ borderColor: 'black', borderWidth: 0.5 }}>
      <Pressable
        disabled={isFullscreen}
        onPress={() =>
          navigation.navigate('Posts', {
            post: content,
            user,
            tab
          })
        }
      >
        {isFullscreen && (
          <Header
            post={content}
            bottomUserListSheetRef={bottomUserListSheetRef}
            setUsers={setUsers}
          />
        )}

        <View
          style={{
            position: 'relative',
            backgroundColor: isViewable ? '#1C1E1F' : 'black'
          }}
        >
          {isFullscreen && (
            <View
              sx={{
                zIndex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                position: 'absolute',
                top: 0,
                right: 0
              }}
            >
              <IconEye color="white" width={13} height={13} />
              <Text sx={{ color: 'white', fontSize: 12, paddingLeft: 4 }}>
                {formatLongNumber(content?.views_count ?? 0).toLowerCase()}{' '}
                views
              </Text>
            </View>
          )}
          {content.remote_media_urls.length > 1 ? (
            <MemoizedAnimatedImage
              images={content.remote_media_urls.map((uri: string) => ({
                uri
              }))}
              width={width}
              height={height}
              isViewable={isViewable}
            />
          ) : (
            <Image
              source={{ uri: content.remote_media_urls[0] }}
              width={width}
              height={height}
            />
          )}
        </View>

        {isFullscreen && (
          <Controls
            post={content}
            bottomShareSheetRef={bottomShareSheetRef}
            setPostToShare={setPostToShare}
          />
        )}
      </Pressable>
    </View>
  );
}

// function getDateAndTimeDifference(date: Date) {
//   const now = new Date();
//   const diff = now.getTime() - date.getTime();
//   const seconds = Math.floor(diff / 1000);
//   const minutes = Math.floor(seconds / 60);
//   const hours = Math.floor(minutes / 60);
//   const days = Math.floor(hours / 24);
//   const months = Math.floor(days / 30);
//   const years = Math.floor(months / 12);
//   const dateDiff = {
//     seconds,
//     minutes,
//     hours,
//     days,
//     months,
//     years
//   };
//   return dateDiff;
// }

function Header({ post, bottomUserListSheetRef, setUsers }: Props) {
  // TODO: check if already following the user
  const isFollowingUser = false;

  return (
    <View
      sx={{ height: 50, flexDirection: 'row', justifyContent: 'space-between' }}
    >
      <HeaderTaggedUsers
        post={post}
        bottomUserListSheetRef={bottomUserListSheetRef}
        setUsers={setUsers}
      />

      {/* <View
        sx={{
          right: 0,
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        {post.tagged_users.length > 1 ? (
          <Text sx={{ color: 'white' }}>{`${
            getDateAndTimeDifference(new Date(post.created_at)).hours
          }h`}</Text>
        ) : (
          <>
            <IconFollowPlus color="blue" width={18} height={18} />
            <Text
              sx={{
                color: 'blue',
                fontSize: 14,
                fontWeight: 600,
                paddingLeft: 8
              }}
            >
              Follow
            </Text>
          </>
        )}
      </View> */}
    </View>
  );
}

function HeaderTaggedUsers({ post, bottomUserListSheetRef, setUsers }: Props) {
  const navigation = useNavigation();
  const unmountSignal = useUnmountSignal();
  const url = `/api/users/${post.tagged_users?.[0]?.id}`;
  const { data, error } = useSWRNative(
    [url],
    (url) => fetchAPI({ url, method: 'GET', unmountSignal }),
    {
      revalidateOnFocus: true
    }
  );
  const [user, setUser] = useState(null);

  useEffect(() => {
    const newUser = data?.data;
    if (newUser) {
      setUser({
        id: newUser.id,
        top_poparazzi: newUser.relationships.top_poparazzi?.data?.map(
          (user: { id: string }) => ({
            id: user.id
          })
        ),
        ...newUser.attributes
      });
    }
  }, [data]);

  if (!user) {
    return null;
  }

  // TODO: multiple users avatar
  return (
    <View sx={{ padding: 8, flexDirection: 'row', alignItems: 'center' }}>
      <View sx={{ paddingRight: 8 }}>
        <Pressable
          onPress={() =>
            navigation.push('Profile', {
              user
            })
          }
        >
          <Avatar user={user} size="small" />
        </Pressable>
      </View>
      <View>
        {post.tagged_users.length > 1 ? (
          <UsernameList
            users={post.tagged_users}
            onOpenBottomSheet={() => {
              setUsers(post.tagged_users);
              bottomUserListSheetRef.current?.present();
            }}
          />
        ) : (
          <Pressable
            onPress={() =>
              navigation.push('Profile', {
                user
              })
            }
          >
            <Text sx={{ color: 'white', fontSize: 12, fontWeight: 500 }}>
              {user?.username}
            </Text>
          </Pressable>
        )}
        <HeaderPoppedBy post={post} />
      </View>
    </View>
  );
}

function HeaderPoppedBy({ post }: Props) {
  const navigation = useNavigation();
  const unmountSignal = useUnmountSignal();
  const url = `/api/users/${post.user.id}`;
  const { data, error } = useSWRNative(
    [url],
    (url) => fetchAPI({ url, method: 'GET', unmountSignal }),
    {
      revalidateOnFocus: true
    }
  );
  const [user, setUser] = useState(null);

  useEffect(() => {
    const newUser = data?.data;
    if (newUser) {
      setUser({
        id: newUser.id,
        top_poparazzi: newUser.relationships.top_poparazzi?.data?.map(
          (user: { id: string }) => ({
            id: user.id
          })
        ),
        ...newUser.attributes
      });
    }
  }, [data]);

  if (!user) {
    return null;
  }

  return (
    <View>
      <Pressable
        onPress={() =>
          navigation.push('Profile', {
            user
          })
        }
      >
        <Text sx={{ color: 'white', fontSize: 10 }}>
          📸 popped by {user?.username}
        </Text>
      </Pressable>
    </View>
  );
}

function sortReactionCounts(reactionCounts) {
  return reactionCounts.sort((a, b) =>
    parseInt(a.split(':').pop()) > parseInt(b.split(':').pop())
      ? -1
      : parseInt(a.split(':').pop()) < parseInt(b.split(':').pop())
      ? 1
      : 0
  );
}

function Controls({ post, bottomShareSheetRef, setPostToShare }: Props) {
  const [reactions, setReactions] = useState(post.reactions ?? []);
  const [reactionCounts, setReactionCounts] = useState(
    sortReactionCounts(post.reaction_counts)
  );
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(reactions?.includes?.('❤️'));
  }, [reactions]);

  const updateReactions = useCallback(
    async (reactions) => {
      setReactions(reactions);
      // TODO: setReactionCounts(reactionsCounts);

      const { data, errors } = await fetchAPI({
        url: `/api/contents/${post.id}`,
        method: 'PATCH',
        body: {
          data: {
            id: post.id,
            type: 'contents',
            attributes: { reactions }
          }
        }
      });

      const reactionsCounts = data?.attributes?.reaction_counts;
      setReactionCounts(sortReactionCounts(reactionsCounts));
    },
    [post]
  );

  const renderItem = useCallback(
    ({ item }: { item: any }) => {
      const reacted = reactions?.includes?.(item.split(':')[0]);

      return (
        <Pressable
          onPress={() => {
            if (reacted) {
              updateReactions(
                reactions.filter((reaction) => reaction !== item.split(':')[0])
              );
            } else {
              updateReactions([...reactions, item.split(':')[0]]);
            }
          }}
        >
          <View
            sx={{
              marginRight: 5.0,
              padding: 5.0,
              backgroundColor: reacted ? '#00007F' : 'transparent',
              borderColor: reacted ? '#2200FB' : 'gray',
              borderWidth: 0.5,
              borderRadius: 99999
            }}
          >
            <Text sx={{ color: 'white', fontSize: 13, fontWeight: 500 }}>
              {item.replace(':', ' ')}
            </Text>
          </View>
        </Pressable>
      );
    },
    [reactions]
  );

  const renderHeader = useCallback(() => {
    return <View sx={{ paddingLeft: 8 }} />;
  }, []);

  return (
    <View sx={{ paddingTop: 8, paddingBottom: 8 }}>
      <View
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingLeft: 8,
          paddingRight: 8,
          paddingBottom: reactionCounts.length > 0 ? 8 : 0
        }}
      >
        <View sx={{ alignItems: 'flex-start' }}>
          <Pressable
            onPress={() => {
              if (isLiked) {
                updateReactions(
                  reactions.filter((reaction) => reaction !== '❤️')
                );
              } else {
                updateReactions([...reactions, '❤️']);
              }
            }}
          >
            {isLiked ? (
              <IconLiked color="white" width={20} height={20} />
            ) : (
              <IconLike color="white" width={20} height={20} />
            )}
          </Pressable>
        </View>

        <View sx={{ alignItems: 'flex-end' }}>
          <Pressable
            onPress={() => {
              setPostToShare(post);
              bottomShareSheetRef.current?.present();
            }}
          >
            <IconOptions color="white" width={20} height={20} />
          </Pressable>
        </View>
      </View>

      <FlatList
        data={reactionCounts}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={renderItem}
        horizontal={true}
        ListHeaderComponent={renderHeader}
      />
    </View>
  );
}

export const MemoizedPost = React.memo(Post);
