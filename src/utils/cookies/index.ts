import jwt_decode from "jwt-decode";

export const AUTH_COOKIE = "x-user-auth";
export const GOOGLE_AUTH_COOKIE = "x-google-auth";

export function setCookie(name: string, value: string, days?: number): void {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${value || ''}${expires}; path=/`;
}

export function getCookie(name: string): string | undefined {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    let cookie = parts.pop()!;

    //Checks if there another cookie afterwards.
    let index = cookie.indexOf(";");

    return index > -1 ? cookie.substring(0, cookie.indexOf(";")) : cookie;
  }
  return undefined;
}

export function decodeCookie(cookie: string): string {
  return jwt_decode(cookie)
}

export function deleteCookie(name: string): void {
  setCookie(name, '', -1);
}