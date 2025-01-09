import { db } from "$lib/server/db";
import { user } from "$lib/server/db/schema";
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

  // TODO validation

  // insert user
  await db.insert(user).values({
    email: body.email,
    password: body.password,
    name: body.name
  });

  // respond with 201 Created
  return new Response(null, { status: 201 });
}

