import { MemberType, Post, PrismaClient, Profile } from '@prisma/client';
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

    profileList.forEach((p) => map.set(p.userId, p));

    return keys.map((key) => map.get(key));
  })
};

export const postLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (keys: Readonly<string[]>): Promise<Array<Post[]>> => {
    const map = new Map();
    const postList: Array<Post> = await prisma.post.findMany({
      where: {
        authorId: { in: keys as string[] | undefined }
      }
    });

    postList.forEach(p => {
      const authorArray = map.get(p.authorId) ? map.get(p.authorId) : [];
      authorArray.push(p);
      map.set(p.authorId, authorArray);
    });

    return keys.map((k) => map.get(k));
  });
};

export const userSubscribedToLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (keys: Readonly<string[]>) => {
    const map = new Map();
    const userSubscribedToList = await prisma.subscribersOnAuthors.findMany({
      where: { subscriberId: { in: keys as string[] | undefined } },
      select: { author: true, subscriberId: true },
    });

    userSubscribedToList.forEach((u) => {
      const subscriptionArray = map.get(u) ? map.get(u) : [];
      subscriptionArray.push(u.author);

      map.set(u.subscriberId, subscriptionArray);
    });

    return keys.map((k) => map.get(k));
  });
};

export const subscribedToUserLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (keys: Readonly<string[]>) => {
    const map = new Map();
    const subscribedToUserList = await prisma.subscribersOnAuthors.findMany({
      where: { authorId: { in: keys as string[] | undefined } },
      select: { subscriber: true, authorId: true }
    });

    subscribedToUserList.forEach((u) => {
      const subscriptionsArr = map.get(u.authorId) ? map.get(u) : [];
      subscriptionsArr.push(u.subscriber);

      map.set(u.authorId, subscriptionsArr);
    });

    return keys.map((k) => map.get(k));
  });
};
