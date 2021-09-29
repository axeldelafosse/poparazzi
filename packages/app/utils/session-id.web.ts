import { ParsedUrlQuery } from 'querystring';
import { IncomingHttpHeaders } from 'http';

import { setCookie, getCookies, removeCookie } from './cookies';
import { config } from 'app/config';

export function setSessionId(sessionId: string) {
  setCookie(sessionId, config.session_cookie);
}

export function getSessionId(context?: {
  query: ParsedUrlQuery;
  req?: { headers?: IncomingHttpHeaders };
}): string | undefined {
  return getCookies(context)[config.session_cookie];
}

export function deleteSessionId() {
  removeCookie(config.session_cookie);
}
