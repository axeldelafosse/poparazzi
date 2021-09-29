import React, { useEffect, useState, useRef, useCallback } from 'react';
import { FlatList, useWindowDimensions, Platform } from 'react-native';
import { View, Text } from 'dripsy';
import useSWRNative from '@nandorojo/swr-react-native';
import useUnmountSignal from 'use-unmount-signal';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { fetchAPI } from 'app/utils/fetch';
import { MemoizedPost } from 'app/components/post';
import { Content } from 'app/schema';

export default function HomeScreen() {
  const unmountSignal = useUnmountSignal();
  const [url, setUrl] = useState('/api/contents');
  const { data, error, mutate } = useSWRNative(
    [url],
    (url) => fetchAPI({ url, method: 'GET', unmountSignal }),
    {
      revalidateOnFocus: true,
      refreshInterval: 1000
    }
  );
  const [contents, setContents] = useState<Content[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [viewableItems, setViewableItems] = useState([]);

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
      setIsRefreshing(false);
    }
  }, [data]);

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
          isViewable={item.remote_media_urls.length > 1 ? isViewable : true}
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

  // TODO: share invites small screen
  // Invite some friends you want to use Poparazzi with
  // Share Invites button
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{ flex: 1, justifyContent: 'center', backgroundColor: 'black' }}
      >
        {!isLoading && contents.length === 0 ? (
          <View>
            <Text
              sx={{
                color: 'white',
                fontSize: 24,
                fontWeight: 600,
                textAlign: 'center',
                lineHeight: 33
              }}
            >
              Welcome to{'\n'}Poparazzi!
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
              When you follow people, you'll see{'\n'}the pops people take of
              them!
            </Text>
          </View>
        ) : (
          <FlatList
            data={contents}
            keyExtractor={(item) => item?.id}
            numColumns={3}
            renderItem={renderItem}
            getItemLayout={(data, index) => ({
              length: itemHeight,
              offset: itemHeight * index,
              index
            })}
            windowSize={12}
            onEndReached={() => {
              if (data?.links?.next) {
                setUrl(data.links.next);
              }
            }}
            onEndReachedThreshold={0.5}
            onRefresh={() => {
              if (url !== '/api/contents') setIsRefreshing(true);
              setUrl('/api/contents');
              mutate();
            }}
            refreshing={isRefreshing}
            viewabilityConfig={{
              viewAreaCoveragePercentThreshold: 0
            }}
            onViewableItemsChanged={onViewableItemsChanged.current}
            removeClippedSubviews={Platform.OS !== 'web'}
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
