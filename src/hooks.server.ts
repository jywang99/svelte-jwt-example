import { redirect, type Handle } from "@sveltejs/kit";
import { decodeToken } from "$lib/server/jwt";

export const handle: Handle = async ({ event, resolve }) => {
  // if the request is for a secure route
  if (event.url.pathname.startsWith("/secure")) {
    // get the token from the cookies (can be undefined)
    const token = event.cookies.get("access_token");

    // if the token is not set or invalid
    if (!token || !decodeToken(token)) {
      // if the request is for json, return a json response
      if (event.request.headers.get("accept")?.includes("application/json")) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { "Content-Type": "application/json" } });
      }

      // if the request is for html, redirect to the refresh token endpoint
      return redirect(302, `/auth/refresh?redirect_to=${encodeURIComponent(event.url.pathname)}`);
    }

    // decode token
    const payload = decodeToken(token!);

    // for subsequent server-side code to easily access the token payload
    // @ts-ignore
    event.locals.user = payload;
  }

  // continue with the request handling
	return await resolve(event);
}

