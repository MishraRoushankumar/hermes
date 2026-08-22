import React from "react";
import { useDeleteCollection } from "../hooks/collection";
import { toast } from "sonner";
import Modal from "@/components/ui/modal";

type DeleteCollectionModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  collectionId: string;
  workspaceId: string;
};

const DeleteCollectionModal = ({
  isModalOpen,
  setIsModalOpen,
  collectionId,
  workspaceId,
}: DeleteCollectionModalProps) => {
  const { mutateAsync, isPending } = useDeleteCollection(collectionId, workspaceId);

  const handleDelete = async () => {
    if (isPending) return;
    try {
      await mutateAsync();
      toast.success("Collection deleted successfully");
      setIsModalOpen(false);
    } catch (err) {
      toast.error("Failed to delete collection");
      console.error("Failed to delete collection:", err);
    }
  };

  return (
    <Modal
      title="Delete Collection"
      description="Are you sure you want to delete this collection? This action cannot be undone"
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onSubmit={handleDelete}
      submitText={isPending ? "Deleting..." : "Delete"}
      submitVariant="destructive"
      submitDisabled={isPending}
    >
      <p className="text-sm text-zinc-500">
        Once deleted, all requests and data in this collection will be
        permanently removed.
      </p>
    </Modal>
  );
};

export default DeleteCollectionModal;
