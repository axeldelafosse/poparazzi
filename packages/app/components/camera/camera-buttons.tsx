import React, { useCallback } from 'react';
import { View } from 'dripsy';
import { useNavigation } from '@react-navigation/native';
import Animated, {
  // SlideInDown,
  // SlideOutUp,
  useDerivedValue,
  withTiming
} from 'react-native-reanimated';

import { ImagePickerButton } from 'app/design-system/image-picker';
import { CircularProgress } from 'app/components/circular-progress';
import { IconFlashBoltActive } from 'app/design-system/icon/IconFlashBoltActive';
import { IconFlashBoltInactive } from 'app/design-system/icon/IconFlashBoltInactive';
import { IconClose } from 'app/design-system/icon/IconClose';
import { IconCheck } from 'app/design-system/icon/IconCheck';
import { Pressable } from 'app/design-system/pressable-scale';
import { Avatar } from 'app/design-system/avatar';
import { User } from 'app/schema';

type Props = {
  photos: { uri: string }[];
  setPhotos: (photos: { uri: string }[]) => void;
  isPopping: boolean;
  setIsPopping: (isPopping: boolean) => void;
  canPop: boolean;
  nbPop: Animated.SharedValue<number>;
  taggedUser?: User;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  flash: 'auto' | 'on' | 'off';
  setFlash: (flash: 'auto' | 'on' | 'off') => void;
  takePhoto: () => void;
};

export function CameraButtons({
  photos,
  setPhotos,
  isPopping,
  setIsPopping,
  canPop,
  nbPop,
  taggedUser,
  isLoading,
  setIsLoading,
  flash,
  setFlash,
  takePhoto
}: Props) {
  const navigation = useNavigation();

  const onFlashPressed = useCallback(() => {
    if (flash === 'auto') setFlash('on');
    if (flash === 'on') setFlash('off');
    if (flash === 'off') setFlash('auto');
  }, [flash]);

  const progress = useDerivedValue(() => {
    return withTiming(nbPop.value * 0.111, { duration: 50 });
  });

  const loading = useDerivedValue(() => {
    return withTiming(isLoading ? 0 : 1, {
      duration: isPopping && isLoading ? 6000 : 0
    });
  });

  return (
    <View
      sx={{
        paddingY: 32,
        paddingX: 24,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
      }}
    >
      {isPopping ? (
        // <Animated.View
        //   entering={SlideInDown}
        //   exiting={SlideOutUp}
        // />
        <Pressable
          sx={{
            width: 45,
            height: 45,
            backgroundColor: '#252628',
            borderRadius: 45 / 2,
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onPress={() => {
            setPhotos([]);
            nbPop.value = withTiming(0, { duration: 500 });
            setIsPopping(false);
            setIsLoading(false);
          }}
        >
          <IconClose color="white" width={15} height={15} />
        </Pressable>
      ) : (
        // </Animated.View>
        <ImagePickerButton
          onPick={(photo) => {
            navigation.navigate('Tag', {
              photos: [...photos, photo],
              taggedUser
            });
          }}
          type="camera"
        />
      )}

      <View
        sx={{
          width: 83,
          height: 83,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <View sx={{ position: 'absolute' }}>
          <CircularProgress
            size={83}
            strokeWidth={3}
            progress={progress}
            showOverlay={true}
          />
        </View>

        <Pressable
          sx={{
            width: 70,
            height: 70,
            borderRadius: 70 / 2,
            backgroundColor: taggedUser ? 'transparent' : 'white'
          }}
          onPress={takePhoto}
          disabled={!canPop && photos.length < 9}
        >
          {taggedUser && <Avatar user={taggedUser} size="large" />}
        </Pressable>
      </View>

      {isPopping ? (
        <View
          sx={{
            width: 45,
            height: 45,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <View sx={{ position: 'absolute' }}>
            <CircularProgress
              size={50}
              strokeWidth={1.5}
              progress={loading}
              showOverlay={false}
              strokeColor="black"
            />
          </View>
          <Pressable
            sx={{
              width: 45,
              height: 45,
              backgroundColor: '#252628',
              borderRadius: 45 / 2,
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onPress={() => {
              navigation.navigate('Tag', {
                photos,
                taggedUser
              });
              nbPop.value = withTiming(0, { duration: 500 });
              setIsPopping(false);
            }}
          >
            <IconCheck color="white" width={18} height={18} />
          </Pressable>
        </View>
      ) : (
        <Pressable
          sx={{
            width: 45,
            height: 45,
            backgroundColor: flash === 'on' ? '#ff6300' : '#252628',
            borderRadius: 45 / 2,
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onPress={onFlashPressed}
        >
          {flash === 'off' ? (
            <IconFlashBoltInactive color="white" width={24} height={24} />
          ) : (
            <IconFlashBoltActive color="white" width={20} height={20} />
          )}
        </Pressable>
      )}
    </View>
  );
}
