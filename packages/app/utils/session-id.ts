import { MMKV } from 'react-native-mmkv';

export function setSessionId(sessionId: string) {
  MMKV.set('sessionId', sessionId);
}

export function getSessionId() {
  return MMKV.getString('sessionId');
}

export function deleteSessionId() {
  MMKV.delete('sessionId');
}
