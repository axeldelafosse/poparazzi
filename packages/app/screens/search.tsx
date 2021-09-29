import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  FlatList,
  TextInput,
  useWindowDimensions,
  Platform
} from 'react-native';
import useSWRNative from '@nandorojo/swr-react-native';
import useUnmountSignal from 'use-unmount-signal';
// import { UpdateMode } from 'realm';
import { styled, View, Text } from 'dripsy';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// import { useRealm } from 'app/hooks/use-realm';
import { fetchAPI } from 'app/utils/fetch';
import { Content } from 'app/schema';
// import { Schema } from 'app/schema';
import { MemoizedPost } from 'app/components/post';
import { useDebounce } from 'app/hooks/use-debounce';
import { Pressable } from 'app/design-system/pressable-scale';
import { SearchUserList } from 'app/components/search-user-list';

export default function SearchScreen() {
  // const realm = useRealm();
  const unmountSignal = useUnmountSignal();
  const [url, setUrl] = useState('/api/contents?filter[q]=*&');
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
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const textInputRef = useRef(null);

  useEffect(() => {
    const newContents = data?.data;
    if (newContents) {
      // realm.write(() => {
      //   contents.forEach((content: any) => {
      //     const contentRealmObject = {
      //       id: content.id,
      //       ...content.attributes
      //     };
      //     realm.create('Content', contentRealmObject, UpdateMode.Modified);
      //   });
      // });

      setContents(
        [
          ...contents,
          ...newContents
            .map((content: any) => ({
              id: content.id,
              ...content.relationships,
              ...content.attributes
            }))
            .filter(
              (newContent: any) =>
                !contents.find((content) => content.id === newContent.id)
            )
        ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      );
      setIsRefreshing(false);
    }
  }, [data]);

  const headerComponent = useCallback(
    () => (
      <>
        {/* <Text
                  sx={{
                    color: 'white',
                    paddingLeft: 24,
                    paddingY: 12,
                    fontWeight: 600,
                    fontSize: 12
                  }}
                >
                  🙋‍♂️💁‍♀️ Suggested Friends
                </Text> */}
        <Text
          sx={{
            color: 'white',
            paddingLeft: 24,
            paddingY: 12,
            fontWeight: 600,
            fontSize: 12
          }}
        >
          🔥 Featured pops
        </Text>
      </>
    ),
    []
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

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{ flex: 1, justifyContent: 'center', backgroundColor: 'black' }}
      >
        <View sx={{ flexDirection: 'row' }}>
          <StyledTextInput
            ref={textInputRef}
            sx={{
              width: showSearch ? windowWidth - 16 - 60 : windowWidth - 16
            }}
            onChangeText={(text) => setSearch(text)}
            value={search}
            autoCorrect={false}
            clearButtonMode="always"
            keyboardAppearance="dark"
            returnKeyType="search"
            placeholder="Search"
            placeholderTextColor="white"
            selectionColor="white"
            underlineColorAndroid="transparent"
            // TODO: inlineImageLeft="search_icon"
            // inlineImagePadding
            onFocus={() => {
              setShowSearch(true);
            }}
            // onBlur={() => {
            //   setShowSearch(false);
            // }}
          />

          {showSearch && (
            <Pressable
              onPress={() => {
                textInputRef.current.blur();
                setSearch('');
                setShowSearch(false);
              }}
              sx={{ width: 60, height: 50, justifyContent: 'center' }}
            >
              <Text sx={{ color: 'white' }}>Cancel</Text>
            </Pressable>
          )}
        </View>

        {showSearch ? (
          // TODO: search history
          <>
            {debouncedSearch === '' ? (
              <View sx={{ flex: 1 }} />
            ) : (
              <SearchUserList
                searchQuery={debouncedSearch}
                onPressType="navigation"
              />
            )}
          </>
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
            ListHeaderComponent={headerComponent}
            onEndReached={() => {
              if (data?.links?.next) {
                setUrl(data.links.next);
              }
            }}
            onEndReachedThreshold={0.5}
            onRefresh={() => {
              if (url !== '/api/contents?filter[q]=*&') setIsRefreshing(true);
              setUrl('/api/contents?filter[q]=*&');
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

const StyledTextInput = styled(TextInput)({
  height: 40,
  color: 'white',
  backgroundColor: '#1E1E1E',
  borderRadius: 14,
  paddingX: 8,
  margin: 8,
  fontFamily: 'GraphikRegular',
  fontWeight: 500
});
