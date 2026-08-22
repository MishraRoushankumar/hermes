"use server";

import db from "@/lib/db";
import { currentUser } from "@/modules/authentication/actions";

const validateName = (name: string) => {
  const trimmed = name.trim();
  if (!trimmed) {
    throw new Error("Name cannot be empty");
  }
  return trimmed;
};

const getAuthenticatedUser = async () => {
  const user = await currentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }
  return user;
};

const verifyWorkspaceMembership = async (userId: string, workspaceId: string) => {
  const workspace = await db.workspace.findFirst({
    where: {
      id: workspaceId,
      OR: [{ ownerId: userId }, { members: { some: { userId } } }],
    },
  });

  if (!workspace) {
    throw new Error("Forbidden: Not a member of this workspace");
  }

  return workspace;
};

export const createCollection = async (workspaceId: string, name: string) => {
  const user = await getAuthenticatedUser();
  await verifyWorkspaceMembership(user.id, workspaceId);

  const trimmedName = validateName(name);

  const collection = await db.collection.create({
    data: {
      name: trimmedName,
      workspace: {
        connect: {
          id: workspaceId,
        },
      },
    },
  });

  return collection;
};

export const getCollections = async (workspaceId: string) => {
  const user = await getAuthenticatedUser();
  await verifyWorkspaceMembership(user.id, workspaceId);

  const collections = await db.collection.findMany({
    where: {
      workspaceId,
    },
  });

  return collections;
};

export const deleteCollection = async (collectionId: string) => {
  const user = await getAuthenticatedUser();

  const collection = await db.collection.findUnique({
    where: { id: collectionId },
    select: { workspaceId: true },
  });

  if (!collection) {
    throw new Error("Collection not found");
  }

  await verifyWorkspaceMembership(user.id, collection.workspaceId);

  await db.collection.delete({
    where: { id: collectionId },
  });
};

export const editCollection = async (collectionId: string, name: string) => {
  const user = await getAuthenticatedUser();

  const collection = await db.collection.findUnique({
    where: { id: collectionId },
    select: { workspaceId: true },
  });

  if (!collection) {
    throw new Error("Collection not found");
  }

  await verifyWorkspaceMembership(user.id, collection.workspaceId);

  const trimmedName = validateName(name);

  await db.collection.update({
    where: { id: collectionId },
    data: { name: trimmedName },
  });
};
