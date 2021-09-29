import React from 'react';
import { View, Pressable } from 'dripsy';

import { IconEmptyUploadPreview } from 'app/design-system/icon/IconEmptyUploadPreview';
import { IconCameraActive } from 'app/design-system/icon/IconCameraActive';
import { pickImage } from './pick-image';
import { useCurrentUser } from 'app/hooks/use-current-user';
import { Image } from 'app/design-system/image';
import { Button } from 'app/design-system/button';

export function ImagePickerButton({
  onPick,
  type
}: {
  onPick: (attachment: any) => void;
  type: 'camera' | 'profilePhoto' | 'button';
}) {
  const currentUser = useCurrentUser();

  if (type === 'button') {
    return (
      <Button
        onPress={() => {
          pickImage({
            onPick
          });
        }}
        title="Add a Photo"
      />
    );
  }

  // TODO: show first picture available in image gallery if permissions are OK and is type camera
  return (
    <Pressable
      sx={
        type === 'profilePhoto'
          ? {
              width: 80,
              height: 80,
              backgroundColor: '#1C1E1F',
              borderRadius: 80 / 2,
              justifyContent: 'center',
              alignItems: 'center'
            }
          : {
              width: 45,
              height: 45,
              backgroundColor: '#252628',
              borderRadius: 4,
              justifyContent: 'center',
              alignItems: 'center'
            }
      }
      onPress={() => {
        pickImage({
          onPick
        });
      }}
    >
      {type === 'profilePhoto' && currentUser?.profile_photo_url && (
        <View sx={{ position: 'absolute' }}>
          <Image
            source={{
              uri: `${currentUser.profile_photo_url}?size=s&v=3&quality=80`
            }}
            width={80}
            height={80}
            style={{
              borderRadius: 50
            }}
          />
        </View>
      )}

      {type === 'profilePhoto' ? (
        <IconCameraActive color="white" width={25} height={25} />
      ) : (
        <IconEmptyUploadPreview color="white" width={25} height={25} />
      )}
    </Pressable>
  );
}
