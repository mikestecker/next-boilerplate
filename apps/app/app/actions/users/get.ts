'use server';

import { auth } from '@repo/auth/server';
import { tailwind } from '@repo/tailwind-config';
import { headers } from 'next/headers';

const colors = [
  tailwind.theme.colors.red[500],
  tailwind.theme.colors.orange[500],
  tailwind.theme.colors.amber[500],
  tailwind.theme.colors.yellow[500],
  tailwind.theme.colors.lime[500],
  tailwind.theme.colors.green[500],
  tailwind.theme.colors.emerald[500],
  tailwind.theme.colors.teal[500],
  tailwind.theme.colors.cyan[500],
  tailwind.theme.colors.sky[500],
  tailwind.theme.colors.blue[500],
  tailwind.theme.colors.indigo[500],
  tailwind.theme.colors.violet[500],
  tailwind.theme.colors.purple[500],
  tailwind.theme.colors.fuchsia[500],
  tailwind.theme.colors.pink[500],
  tailwind.theme.colors.rose[500],
];

export const getUsers = async (
  userIds: string[]
): Promise<
  | {
      data: Liveblocks['UserMeta']['info'][];
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

    const data: Liveblocks['UserMeta']['info'][] = members
      .filter(
        ({ user }) =>
          user.id &&
          userIds.includes(user.id)
      )
      .map(({ user }) => ({
        name: user.name ?? 'Unknown user',
        picture: user.image ?? '',
        color: colors[Math.floor(Math.random() * colors.length)],
      }));

    return { data };
  } catch (error) {
    return { error };
  }
};
