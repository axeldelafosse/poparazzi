import React, { useState, useRef, useCallback } from 'react';
import { TextInput, useWindowDimensions, Platform } from 'react-native';
import { styled, View, Text } from 'dripsy';
import uuid from 'react-native-uuid';

import { fetchAPI } from 'app/utils/fetch';
import { MemoizedAnimatedImage } from 'app/components/animated-image';
import { useDebounce } from 'app/hooks/use-debounce';
import { Button } from 'app/design-system/button';
import { SearchUserList } from 'app/components/search-user-list';
import { User } from 'app/schema';
import { useKeyboardDimensions } from 'app/hooks/use-keyboard-dimensions';
import { IconChevron } from 'app/design-system/icon/IconChevron';
import { config } from 'app/config';

// TODO: Custom TextInput / Auto Complete Select
export default function TagScreen({ route, navigation }) {
  const { photos, taggedUser } = route.params;
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const textInputRef = useRef(null);
  const [selectedUsers, setSelectedUsers] = useState(
    taggedUser ? [taggedUser] : []
  );
  const windowWidth = useWindowDimensions().width;
  const { keyboardHeight } = useKeyboardDimensions();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    setIsLoading(true);

    const id = (uuid.v4() as string).toUpperCase();
    const { data, errors } = await fetchAPI({
      url: `/api/contents`,
      method: 'POST',
      body: {
        data: {
          type: 'contents',
          relationships: {
            tagged_users: {
              data: selectedUsers.map((user) => ({
                type: 'users',
                id: user.id
              }))
            },
            tagged_contacts: {
              data: []
            }
          },
          attributes: {
            is_camera_roll: false,
            local_media_paths: photos.map(
              (photo: { uri: string }, index: number) =>
                Platform.OS === 'web' ? `/web/${id}/${index}.jpg` : photo.uri
            ),
            is_client_SMS_sent: false
          },
          id
        }
      }
    });

    let index = 0;
    for await (const url of data?.attributes?.remote_media_upload_urls) {
      const blob = await (await fetch(photos[index].uri)).blob();

      await fetch(
        // Use proxy on web
        Platform.OS === 'web'
          ? url.replace(
              'https://pop-production-data.s3.amazonaws.com',
              `${config.api_url_on_web}/api`
            )
          : url,
        {
          method: 'PUT',
          headers: {
            'User-Agent': `Poparazzi/1.9.15 (TTYL.Inc.Poparazzi; build:90; iOS 14.4.0) Alamofire/5.4.3`
          },
          body: blob
        }
      );

      index++;
    }

    setIsLoading(false);
    navigation.navigate('HomeTab');
  }, [selectedUsers]);

  // TODO: select a contact
  // Léna isn't on Poparazzi yet!
  // We'll send a text to let them know they were popped. Message and data rates may apply.
  // Cancel
  // Send

  return (
    <>
      <View
        sx={{
          flexDirection: 'row',
          padding: 16
          // borderBottomColor: '#666',
          // borderBottomWidth: 0.5,
        }}
      >
        <MemoizedAnimatedImage
          images={photos}
          width={60}
          height={60}
          isViewable
        />

        <View sx={{ paddingRight: 16 }} />

        <Text sx={{ color: 'white' }}>Tag:</Text>

        {selectedUsers.length > 0 && (
          <View sx={{ paddingLeft: 1 }}>
            {selectedUsers.map((user: User) => (
              <View key={user.id}>
                <Text
                  sx={{
                    color: 'white',
                    fontWeight: 400
                  }}
                >
                  {user.username}
                </Text>
              </View>
            ))}
          </View>
        )}

        <StyledTextInput
          ref={textInputRef}
          sx={{ width: windowWidth - 60 - 16 * 5 }}
          onChangeText={(text) => setSearch(text)}
          value={search}
          autoCorrect={false}
          clearButtonMode="always"
          keyboardAppearance="dark"
          returnKeyType="search"
          placeholder=""
          placeholderTextColor="white"
          selectionColor="white"
          underlineColorAndroid="transparent"
          autoFocus={true}
          // multiline={true}
          // textAlignVertical="top"
        />
      </View>

      <SearchUserList
        searchQuery={debouncedSearch}
        onPressType="select"
        selectUser={(user) => {
          setSearch('');
          setSelectedUsers([...selectedUsers, user]);
        }}
      />

      {selectedUsers.length > 0 && (
        <View
          sx={{
            position: 'absolute',
            bottom: 20 + keyboardHeight,
            left: 0,
            right: 0,
            alignItems: 'center'
          }}
        >
          <Button
            onPress={onSubmit}
            title={
              isLoading ? (
                'Posting...'
              ) : (
                <>
                  Post{' '}
                  <View sx={{ paddingLeft: 4 }}>
                    <IconChevron color="white" width={8} height={13} />
                  </View>
                </>
              )
            }
            disabled={selectedUsers.length === 0}
            variant="full-blue"
          />
        </View>
      )}
    </>
  );
}

const StyledTextInput = styled(TextInput)({
  height: 40,
  color: 'white',
  marginTop: -10,
  paddingX: 8,
  fontFamily: 'GraphikRegular',
  fontWeight: 400
});
