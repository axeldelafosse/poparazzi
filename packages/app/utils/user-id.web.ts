import { ParsedUrlQuery } from 'querystring';
import { IncomingHttpHeaders } from 'http';

import { setCookie, getCookies, removeCookie } from './cookies';
import { config } from 'app/config';

export function setUserId(userId: string) {
  setCookie(userId, config.user_cookie);
}

export function getUserId(context?: {
  query: ParsedUrlQuery;
  req?: { headers?: IncomingHttpHeaders };
}): string | undefined {
  return getCookies(context)[config.user_cookie];
}

export function deleteUserId() {
  removeCookie(config.user_cookie);
}
