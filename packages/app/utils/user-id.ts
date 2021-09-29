import { MMKV } from 'react-native-mmkv';

export function setUserId(userId: string) {
  MMKV.set('userId', userId);
}

export function getUserId() {
  return MMKV.getString('userId');
}

export function deleteUserId() {
  MMKV.delete('userId');
}
