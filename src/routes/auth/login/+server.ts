import { db } from "$lib/server/db";
import { user } from "$lib/server/db/schema";
import { eq } from 'drizzle-orm';
import type { RequestEvent } from "./$types";
import { signToken } from "$lib/server/jwt";
import { COOKIE, setAccessCookie } from "$lib/server/cookie";
import { verifyPassword } from "$lib/server/password";

type LoginReq = {
  email: string;
  password: string;
}

export async function POST({ cookies, request }: RequestEvent) {
  const body = await request.json() as LoginReq;

  // get user by email
  const dbUsers = await db.select()
    .from(user)
    .where(eq(user.email, body.email))
    .limit(1);
  if (dbUsers.length === 0) {
    return new Response(null, { status: 401 });
  }
  const dbUser = dbUsers[0];

  // compare hashed passwords
  if (await verifyPassword(body.password, dbUser.password) === false) {
    return new Response(null, { status: 401 });
  }

  // set access token and refresh token
  setAccessCookie(cookies, dbUser.id);
  cookies.set(COOKIE.REFRESH_TOKEN.key, signToken(dbUser.id, "30d"), COOKIE.REFRESH_TOKEN.options);

  return new Response(JSON.stringify({
    name: dbUser.name,
    email: dbUser.email
  }), { status: 200 });
}

