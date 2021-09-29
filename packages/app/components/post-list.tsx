import React, { useEffect, useState, useRef, useCallback } from 'react';
import { FlatList, useWindowDimensions, Platform } from 'react-native';
import useSWRNative from '@nandorojo/swr-react-native';
import useUnmountSignal from 'use-unmount-signal';

import { fetchAPI } from 'app/utils/fetch';
import { MemoizedPost } from 'app/components/post';
import { Content, User } from 'app/schema';

type Props = {
  post: Content;
  bottomUserListSheetRef?: any;
  bottomShareSheetRef?: any;
  setUsers?: (users: User[]) => void;
  setPostToShare?: (post: Content) => void;
};

export function PostList({
  post,
  bottomUserListSheetRef,
  bottomShareSheetRef,
  setUsers,
  setPostToShare
}: Props) {
  const unmountSignal = useUnmountSignal();
  const [url, setUrl] = useState(`/api/contents?filter[q]=content:${post.id}&`);
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

  useEffect(() => {
    const newContents = data?.data;
    if (newContents) {
      setContents([
        ...contents,
        ...newContents
          .map((content: any) => {
            return {
              id: content.id,
              user: {
                id: content.relationships.user?.data?.id
              },
              tagged_users: content.relationships.tagged_users?.data?.map(
                (user: { id: string }) => ({
                  id: user.id
                })
              ),
              ...content.attributes
            } as Content;
          })
          .filter(
            (newContent: any) =>
              !contents.find((content) => content.id === newContent.id)
          )
      ]);
    }
  }, [data]);

  const windowHeight = useWindowDimensions().height;
  const itemHeight = windowHeight - 150;

  const renderItem = useCallback(
    ({ item }) => {
      const isViewable = Boolean(
        viewableItems.find(({ id }) => id === item.id)?.isViewable
      );

      return (
        <MemoizedPost
          post={item}
          isViewable={item.remote_media_urls.length > 1 ? isViewable : true}
          isFullscreen={true}
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
    <FlatList
      data={contents}
      keyExtractor={(item) => item?.id}
      numColumns={1}
      renderItem={renderItem}
      getItemLayout={(data, index) => {
        const headerHeight = 50;
        const footerHeight =
          data[index]?.reaction_counts?.length !== 0 ? 50 : 0;

        return {
          length: itemHeight + headerHeight + footerHeight,
          offset: (itemHeight + headerHeight + footerHeight) * index,
          index
        };
      }}
      windowSize={6}
      initialNumToRender={2}
      onEndReached={() => {
        if (data?.links?.next) {
          setUrl(data.links.next);
        }
      }}
      onEndReachedThreshold={0.4}
      onRefresh={() => setUrl(`/api/contents?filter[q]=content:${post.id}&`)}
      refreshing={isRefreshing}
      viewabilityConfig={{
        viewAreaCoveragePercentThreshold: 0
      }}
      onViewableItemsChanged={onViewableItemsChanged.current}
      removeClippedSubviews={Platform.OS !== 'web'}
    />
  );
}
