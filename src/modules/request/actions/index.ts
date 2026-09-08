"use server";

import db from "@/lib/db";
import { REST_METHOD, MEMBER_ROLE } from "../../../../generated/prisma/client";
import { currentUser } from "@/modules/authentication/actions";

export type Request = {
  name: string;
  method: REST_METHOD;
  url: string;

  body?: string;
  headers?: string;
  parameters?: string;
};

const getAuthenticatedUser = async () => {
  const user = await currentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }
  return user;
};

const verifyWorkspaceMembership = async (
  userId: string,
  workspaceId: string,
  requiredRoles?: MEMBER_ROLE[],
) => {
  const membership = await db.workspaceMember.findFirst({
    where: {
      userId,
      workspaceId,
      role: requiredRoles ? { in: requiredRoles } : undefined,
    },
  });

  if (!membership) {
    throw new Error("Forbidden: Not a member of this workspace or insufficient permissions");
  }

  return membership;
};

const parseJsonField = (value?: string) => {
  if (value == null) return undefined;
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  try {
    const parsed = JSON.parse(trimmed);
    if (typeof parsed === "object" && parsed !== null) {
      return parsed;
    }
    return value;
  } catch {
    return value;
  }
};

export const addRequestToCollection = async (
  collectionId: string,
  value: Request,
) => {
  const user = await getAuthenticatedUser();

  const collection = await db.collection.findUnique({
    where: { id: collectionId },
    select: { workspaceId: true },
  });

  if (!collection) {
    throw new Error("Collection not found");
  }

  await verifyWorkspaceMembership(user.id, collection.workspaceId, ["ADMIN", "EDITOR"]);

  const request = await db.request.create({
    data: {
      collectionId,
      name: value.name,
      method: value.method,
      url: value.url,
      body: parseJsonField(value.body),
      headers: parseJsonField(value.headers),
      parameters: parseJsonField(value.parameters),
    },
  });

  return request;
};

export const saveRequest = async (id: string, value: Request) => {
  const user = await getAuthenticatedUser();

  const request = await db.request.findUnique({
    where: { id },
    select: { collection: { select: { workspaceId: true } } },
  });

  if (!request) {
    throw new Error("Request not found");
  }

  await verifyWorkspaceMembership(user.id, request.collection.workspaceId, ["ADMIN", "EDITOR"]);

  const updatedRequest = await db.request.update({
    where: {
      id: id,
    },
    data: {
      name: value.name,
      method: value.method,
      url: value.url,
      body: parseJsonField(value.body),
      headers: parseJsonField(value.headers),
      parameters: parseJsonField(value.parameters),
    },
  });

  return updatedRequest;
};

export const getAllRequestFromCollection = async (collectionId: string) => {
  const user = await getAuthenticatedUser();

  const collection = await db.collection.findUnique({
    where: { id: collectionId },
    select: { workspaceId: true },
  });

  if (!collection) {
    throw new Error("Collection not found");
  }

  await verifyWorkspaceMembership(user.id, collection.workspaceId);

  const requests = await db.request.findMany({
    where: { collectionId: collectionId },
  });

  return requests;
};
