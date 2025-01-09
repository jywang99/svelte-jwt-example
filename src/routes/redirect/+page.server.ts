import { COOKIE } from "$lib/server/cookie";
import { INVALIDATE_LOGIN_PARAM } from "../util";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url, cookies }) => {
  if (url.searchParams.has(INVALIDATE_LOGIN_PARAM)) {
    cookies.delete(COOKIE.ACCESS_TOKEN.key, COOKIE.ACCESS_TOKEN.options);
    cookies.delete(COOKIE.REFRESH_TOKEN.key, COOKIE.REFRESH_TOKEN.options);
  }

  return {};
}

