import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { COOKIE, setAccessCookie } from "$lib/server/cookie";
import { decodeToken } from "$lib/server/jwt";

export const load: PageServerLoad = async ({ url, cookies }) => {
  // validate refresh token
  const refreshToken = cookies.get(COOKIE.REFRESH_TOKEN.key);
  const payload = refreshToken ? decodeToken(refreshToken) : null;

  // if the refresh token is not set or invalid, redirect to top page
  if (!refreshToken || !payload) {
    throw redirect(302, '/auth/logout');
  }

  // valid refresh token, set access token
  setAccessCookie(cookies, payload.userId);

  // redirect to the original page
  throw redirect(302, `/redirect?${url.searchParams.toString()}`);
}

