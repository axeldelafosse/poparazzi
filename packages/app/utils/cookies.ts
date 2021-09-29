import Cookies from 'universal-cookie';
import { IncomingHttpHeaders } from 'http';

import { isServer } from './is-server';
import { config } from '../config';

const cookieOpts = {
  path: '/',
  domain:
    config.stage !== 'production' &&
    typeof window !== 'undefined' &&
    // Exclude localhost or local domains
    window.location.host.split('.').length > 1
      ? `.${window.location.host.replace(/:[0-9]+$/, '')}`
      : config.cookie_domain
};

export function clearCookies() {
  if (!isServer) {
    const cookies = new Cookies();
    cookies.remove(config.session_cookie, cookieOpts);
  }
}

export function setCookie(value: string, key: string) {
  if (!isServer) {
    const cookies = new Cookies();
    cookies.set(key, value, { expires: new Date('2029-10-18'), ...cookieOpts });
  }
}

export function removeCookie(key: string) {
  if (!isServer) {
    const cookies = new Cookies();
    cookies.remove(key, {
      ...cookieOpts,
      domain: cookieOpts.domain || undefined
    });
  }
}

export function getCookie(
  key: string,
  context?: {
    req?: { headers?: IncomingHttpHeaders };
  }
) {
  const headers = context?.req?.headers || {};
  const cookies = new Cookies(headers.cookie || undefined);

  return cookies.get(key);
}

export function getCookies(context?: {
  req?: { headers?: IncomingHttpHeaders };
}) {
  const headers = context?.req?.headers || {};
  const cookies = new Cookies(headers.cookie || undefined);

  return cookies.getAll();
}
