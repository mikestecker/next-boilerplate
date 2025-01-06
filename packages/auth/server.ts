import 'server-only';

import { betterAuth } from 'better-auth';
import { nextCookies } from "better-auth/next-js";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { database } from "@repo/database"
import { organization } from 'better-auth/plugins';

export const auth = betterAuth({
  database: prismaAdapter(database, {
    provider: 'postgresql',
  }),
  plugins: [
    nextCookies(),
    organization()
  ],
  //...add more options here
});
