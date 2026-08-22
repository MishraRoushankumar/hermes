import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCollection,
  deleteCollection,
  editCollection,
  getCollections,
} from "../actions";

const collectionQueryKey = (workspaceId: string) => ["collections", workspaceId];

export function useCollections(workspaceId: string) {
  return useQuery({
    queryKey: collectionQueryKey(workspaceId),
    queryFn: async () => getCollections(workspaceId),
  });
}

export function useCreateCollection(workspaceId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (name: string) => createCollection(workspaceId, name),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: collectionQueryKey(workspaceId),
      });
    },
  });
}

export function useDeleteCollection(collectionId: string, workspaceId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => deleteCollection(collectionId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: collectionQueryKey(workspaceId),
      });
    },
  });
}

export function useEditCollection(collectionId: string, name: string, workspaceId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => editCollection(collectionId, name),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: collectionQueryKey(workspaceId),
      });
    },
  });
}
