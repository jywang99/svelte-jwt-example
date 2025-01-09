import { env  } from '$env/dynamic/private';
import jwt from 'jsonwebtoken';

// make sure the secret is set
if (!env.TOKEN_SECRET) throw new Error('TOKEN_SECRET is not set');

// payload of the token
export type TokenPayload = { userId: number  };

type ExpireIn = "1h" | "1d" | "30d";

// sign a new token
export function signToken(userId: number, expiresIn: ExpireIn = "1h") {
  const payload: TokenPayload = { userId  };
  const opts = { expiresIn  };

  return jwt.sign(payload, env.TOKEN_SECRET!, opts);
}

// get token payload from token
// no return value for invalid token
export function decodeToken(token: string) {
  try {
    return jwt.verify(token, env.TOKEN_SECRET!) as TokenPayload;
  } catch (e) {}
}

