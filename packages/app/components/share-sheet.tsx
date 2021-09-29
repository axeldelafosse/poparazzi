import React, { useCallback, useMemo, useState } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { View, Text } from 'dripsy';

import {
  customHandle,
  bottomSheetModalStyle
} from 'app/design-system/bottom-sheet';
import { Pressable } from 'app/design-system/pressable-scale';
import { fetchAPI } from 'app/utils/fetch';
import { Content } from 'app/schema';
import { useCurrentUser } from 'app/hooks/use-current-user';
import { IconSnapchat } from 'app/design-system/icon/IconSnapchat';
import { IconStories } from 'app/design-system/icon/IconStories';
import { IconInstagram } from 'app/design-system/icon/IconInstagram';
import { IconLinks } from 'app/design-system/icon/IconLinks';
import { IconSave } from 'app/design-system/icon/IconSave';
import { IconReport } from 'app/design-system/icon/IconReport';
import { IconDelete } from 'app/design-system/icon/IconDelete';

type Props = {
  bottomSheetRef: any;
  post: Content;
};

export function ShareSheet({ bottomSheetRef, post }: Props) {
  const currentUser = useCurrentUser();
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const snapPoints = useMemo(() => ['42%'], []);

  const handleClosePress = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const deletePop = useCallback(async () => {
    setIsLoadingDelete(true);

    const { meta } = await fetchAPI({
      url: `/api/contents/${post?.id}`,
      method: 'DELETE',
      body: {
        data: {
          type: 'contents',
          id: post?.id
        }
      }
    });

    setIsLoadingDelete(false);
    bottomSheetRef.current?.close();
    // TODO: redirect somewhere?
  }, [post]);

  const canDelete =
    post?.user?.id === currentUser?.id ||
    post?.tagged_users?.includes(currentUser?.id) ||
    post?.pending_tagged_users?.includes(currentUser?.id);

  return (
    <BottomSheetModal
      name="UserList"
      ref={bottomSheetRef}
      stackBehavior="push"
      index={0}
      snapPoints={snapPoints}
      handleComponent={(props) =>
        customHandle({ title: 'Share to', handleClosePress, ...props })
      }
      style={bottomSheetModalStyle}
    >
      <View sx={{ flex: 1, padding: 8 }}>
        <View sx={{ flexDirection: 'row' }}>
          <Action
            text="Snapchat"
            Icon={IconSnapchat}
            onPress={() => null}
            backgroundColor="yellow"
          />
          <Action
            text="Stories"
            Icon={IconStories}
            onPress={() => null}
            backgroundColor="purple"
          />
          <Action
            text="Posts"
            Icon={IconInstagram}
            onPress={() => null}
            backgroundColor="purple"
          />
        </View>

        <View sx={{ height: 20 }} />

        <View sx={{ flexDirection: 'row' }}>
          <Action text="Copy Link" Icon={IconLinks} onPress={() => null} />
          <Action text="Save Photo" Icon={IconSave} onPress={() => null} />
          <Action text="Report" Icon={IconReport} onPress={() => null} />
          {canDelete && (
            <Action
              text="Delete"
              Icon={IconDelete}
              onPress={deletePop}
              isLoading={isLoadingDelete}
            />
          )}
        </View>
      </View>
    </BottomSheetModal>
  );
}

function Action({
  Icon,
  text,
  onPress,
  backgroundColor = 'black',
  isLoading = false
}) {
  return (
    <Pressable onPress={onPress}>
      <View
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: 8,
          width: 80
        }}
      >
        <View
          sx={{
            backgroundColor,
            width: 45,
            height: 45,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 45 / 2
          }}
        >
          <Icon width={20} height={20} color="white" />
        </View>
        <Text
          sx={{
            color: 'black',
            fontSize: 11,
            fontWeight: 500,
            paddingTop: 4
          }}
        >
          {text}
        </Text>
      </View>
    </Pressable>
  );
}
