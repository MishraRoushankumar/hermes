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

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["requests", collectionId],
      });
      console.log(data);
    },
  });
}

export function useSaveRequest(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (value: Request) => saveRequest(id, value),

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["requests"],
      });
      console.log(data);
    },
  });
}

export function useGetAllRequestFromCollection(collectionId: string) {
  return useQuery({
    queryKey: ["requests", collectionId],
    queryFn: async () => getAllRequestFromCollection(collectionId),
  });
}
