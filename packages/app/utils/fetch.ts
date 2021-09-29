import { Platform } from 'react-native';

import { config } from 'app/config';
import { getSessionId } from 'app/utils/session-id';

// Use proxy on web
const API_URL = Platform.OS === 'web' ? config.api_url_on_web : config.api_url;

export const fetchAPI = async ({
  url,
  method,
  sessionId,
  body,
  unmountSignal
}: {
  url: string;
  method: string;
  sessionId?: string;
  body?: object;
  unmountSignal?: AbortSignal;
}) => {
  if (!sessionId) {
    sessionId = getSessionId();
  }

  try {
    const response = await fetch(`${API_URL}${url}`, {
      method: method,
      headers: {
        Accept: 'application/vnd.api+json, application/json',
        'Content-Type': 'application/vnd.api+json',
        'User-Agent': 'Poparazzi/90 CFNetwork/1220.1 Darwin/20.3.0',
        Authorization: sessionId ? `Bearer ${sessionId}` : null,
        Version: '1.9.15#90',
        'Accept-Language': 'en-us',
        'Accept-Encoding': 'gzip, deflate'
      },
      body: body ? JSON.stringify(body) : null,
      signal: unmountSignal
    });

    return await response.json();
  } catch (error) {
    // console.error(error);
  }
};
