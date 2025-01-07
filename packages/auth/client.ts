import { adminClient, inferAdditionalFields, organizationClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';
import { auth } from './server';

export const { signIn, signOut, signUp, useSession } = createAuthClient({
  plugins: [
    adminClient(),
    organizationClient(),
    inferAdditionalFields<typeof auth>()
  ]
});
