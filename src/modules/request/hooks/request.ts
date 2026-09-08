import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  type Request,
  addRequestToCollection,
  getAllRequestFromCollection,
  saveRequest,
} from "../actions";

export function useAddRequestToCollection(collectionId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (value: Request) =>
      addRequestToCollection(collectionId, value),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["requests", collectionId],
      });
    },
  });
}

export function useSaveRequest(requestId?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (value: Request) => {
      if (!requestId) {
        throw new Error("No active request selected");
      }

      return saveRequest(requestId, value);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["requests"],
      });
    },
  });
}

export function useGetAllRequestFromCollection(collectionId: string) {
  return useQuery({
    queryKey: ["requests", collectionId],
    queryFn: async () => getAllRequestFromCollection(collectionId),
  });
}
