import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FlatList, useWindowDimensions, Platform } from 'react-native';
import { View, Text } from 'dripsy';
import useSWRNative from '@nandorojo/swr-react-native';
import useUnmountSignal from 'use-unmount-signal';
import { Tabs } from 'react-native-collapsible-tab-view';

import { fetchAPI } from 'app/utils/fetch';
import { User } from 'app/schema';
import { useCurrentUser } from 'app/hooks/use-current-user';
import { IconProfileCameraEmpty } from 'app/design-system/icon/IconProfileCameraEmpty';
import { MemoizedPost } from 'app/components/post';
import { Content } from 'app/schema';

type Props = {
  user: User;
  post?: Content;
  isFullscreen?: boolean;
  isInTab?: boolean;
  bottomUserListSheetRef?: any;
  bottomShareSheetRef?: any;
  setUsers?: (users: User[]) => void;
  setPostToShare?: (post: Content) => void;
};

export function PopsByUser({
  user,
  post,
  isFullscreen = false,
  isInTab = true,
  bottomUserListSheetRef,
  bottomShareSheetRef,
  setUsers,
  setPostToShare
}: Props) {
  const unmountSignal = useUnmountSignal();
  const initialUrl = `/api/contents?filter[user_id]=${user?.id}&`;
  const [url, setUrl] = useState(initialUrl);
  const { data, error } = useSWRNative(
    [url],
    (url) => fetchAPI({ url, method: 'GET', unmountSignal }),
    {
      revalidateOnFocus: true
    }
  );
  const [contents, setContents] = useState<Content[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [viewableItems, setViewableItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const currentUser = useCurrentUser();
  const isCurrentUserProfile = user?.id === currentUser?.id;
  const List = isInTab ? Tabs.FlatList : FlatList;

  useEffect(() => {
    const newContents = data?.data;

    if (newContents) {
      setContents(
        [
          ...contents,
          ...newContents
            .map((content: any) => {
              return {
                id: content.id,
                ...[content.relationships]?.map(
                  (relationship: any) => relationship.data?.id
                ),
                ...content.attributes
              };
            })
            .filter(
              (newContent: any) =>
                !contents.find((content) => content.id === newContent.id)
            )
        ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      );
      setIsLoading(false);
    } else if (newContents?.length === 0) {
      setIsLoading(false);
    }
  }, [data]);

  const emptyComponent = useCallback(
    () => (
      <>
        {!isLoading && (
          <View
            sx={{
              padding: 16,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <View sx={{ padding: 8 }}>
              <IconProfileCameraEmpty color="white" width={80} height={80} />
            </View>
            <Text
              sx={{
                color: 'white',
                fontSize: 24,
                fontWeight: 600,
                textAlign: 'center',
                lineHeight: 33
              }}
            >
              {isCurrentUserProfile
                ? `Take a photo\nof a friend`
                : `${user.first_name.trim()} hasn't taken\nphotos yet`}
            </Text>
            <Text
              sx={{
                color: 'white',
                fontWeight: 300,
                textAlign: 'center',
                paddingTop: 12,
                lineHeight: 20
              }}
            >
              {isCurrentUserProfile
                ? `Photos you take of your friends will\nshow up here`
                : `Photos ${user.first_name.trim()} takes of other people will\nshow up here`}
            </Text>
          </View>
        )}
      </>
    ),
    [isLoading, isCurrentUserProfile]
  );

  const windowWidth = useWindowDimensions().width;
  const itemHeight = windowWidth / 2.2;

  const renderItem = useCallback(
    ({ item }) => {
      const isViewable = Boolean(
        viewableItems.find(({ id }) => id === item.id)?.isViewable
      );

      return (
        <MemoizedPost
          post={item}
          user={user}
          tab="popsByUser"
          isViewable={item.remote_media_urls.length > 1 ? isViewable : true}
          isFullscreen={isFullscreen}
          bottomUserListSheetRef={bottomUserListSheetRef}
          bottomShareSheetRef={bottomShareSheetRef}
          setUsers={setUsers}
          setPostToShare={setPostToShare}
        />
      );
    },
    [viewableItems]
  );

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    setViewableItems(
      viewableItems.map((viewableItem) => ({
        id: viewableItem.item.id,
        isViewable: viewableItem.isViewable
      }))
    );
  });

  return (
    <List
      data={contents}
      keyExtractor={(item) => item?.id}
      numColumns={isFullscreen ? 1 : 3}
      renderItem={renderItem}
      getItemLayout={(data, index) => {
        const headerHeight = isFullscreen ? 50 : 0;
        const footerHeight =
          isFullscreen && data[index]?.reaction_counts?.length !== 0 ? 50 : 0;

        return {
          length: itemHeight + headerHeight + footerHeight,
          offset: (itemHeight + headerHeight + footerHeight) * index,
          index
        };
      }}
      windowSize={12}
      ListEmptyComponent={emptyComponent}
      onEndReached={() => {
        if (data?.links?.next) {
          setUrl(data.links.next);
        }
      }}
      onEndReachedThreshold={0.5}
      onRefresh={() => setUrl(initialUrl)}
      refreshing={isRefreshing}
      viewabilityConfig={{
        viewAreaCoveragePercentThreshold: 0
      }}
      onViewableItemsChanged={onViewableItemsChanged.current}
      removeClippedSubviews={Platform.OS !== 'web'}
      initialScrollIndex={
        post ? contents?.findIndex((content) => content.id === post.id) : 0
      }
    />
  );
}
