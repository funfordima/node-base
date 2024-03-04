import { MemberType, PrismaClient, Profile } from '@prisma/client';
import DataLoader from 'dataloader';

export const memberLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (keys: Readonly<string[]>): Promise<Array<MemberType>> => {
    const map = new Map();
    const membersList = await prisma.memberType.findMany({
      where: { id: { in: keys as string[] | undefined } },
    });

    membersList.forEach((m) => map.set(m.id, m));

    return keys.map((key) => map.get(key));
  });
};

export const profileLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (keys: Readonly<string[]>): Promise<Array<Profile>> => {
    const map = new Map();
    const profileList = (await prisma.profile.findMany({
      where: { userId: { in: keys as string[] } }
    })) as Profile[];

    profileList.forEach(p => map.set(p.userId, p));

    return keys.map((key) => map.get(key));
  })
};