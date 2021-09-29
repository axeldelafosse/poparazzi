import { MMKV } from 'react-native-mmkv';

export function deleteCache() {
  MMKV.delete('app-cache');
}
