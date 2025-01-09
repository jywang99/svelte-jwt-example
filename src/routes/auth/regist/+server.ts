import { db } from "$lib/server/db";
import { user } from "$lib/server/db/schema";
import { hashPassword } from "$lib/server/password";
import type { RequestEvent } from "./$types";

// request body type
type RegistReq = {
  email: string;
  name: string;
  password: string;
}

// handling POST /api/regist
export async function POST({ request }: RequestEvent) {
  const body = await request.json() as RegistReq;

  // validate request
  if (!body.email || !body.password || !body.name) {
    return new Response(JSON.stringify({ error: "Invalid request" }), { status: 400, headers: { "Content-Type": "application/json" } });
  }

  // TODO validate email

  // insert user
  await db.insert(user).values({
    email: body.email,
    password: await hashPassword(body.password),
    name: body.name
  });

  // respond with 201 Created
  return new Response(null, { status: 201 });
}

