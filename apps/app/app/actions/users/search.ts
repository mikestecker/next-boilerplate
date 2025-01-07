'use server';

import {
  auth
} from '@repo/auth/server';
import Fuse from 'fuse.js';
import { headers } from 'next/headers';

export const searchUsers = async (
  query: string
): Promise<
  | {
      data: string[];
    }
  | {
      error: unknown;
    }
> => {
  try {
    const h = await headers();
    const authSession = await auth.api.getSession({
      headers: h,
    });

    if (!authSession) {
      throw new Error('Not logged in');
    }

    const orgId = authSession.session.activeOrganizationId ?? undefined;

    const fullOrganization = await auth.api.getFullOrganization({
      headers: h,
      query: { organizationId: orgId },
    });

    if (!orgId || !fullOrganization) {
      throw new Error('Not logged in');
    }

    const { members } = fullOrganization;

    const users = members.map(({ user }) => ({
      id: user.id,
      name: user.name ?? user.email,
      imageUrl: user.image,
    }));

    const fuse = new Fuse(users, {
      keys: ['name'],
      minMatchCharLength: 1,
      threshold: 0.3,
    });

    const results = fuse.search(query);
    const data = results.map((result) => result.item.id);

    return { data };
  } catch (error) {
    return { error };
  }
};
