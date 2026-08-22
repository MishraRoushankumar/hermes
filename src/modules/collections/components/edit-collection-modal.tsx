"use client";

import { useState, useEffect } from "react";
import { useEditCollection } from "../hooks/collection";
import { toast } from "sonner";
import Modal from "@/components/ui/modal";

type EditCollectionModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  collectionId: string;
  initialName: string;
  workspaceId: string;
};

const EditCollectionModal = ({
  isModalOpen,
  setIsModalOpen,
  collectionId,
  initialName,
  workspaceId,
}: EditCollectionModalProps) => {
  const [name, setName] = useState(initialName);
  const { mutateAsync, isPending } = useEditCollection(collectionId, name, workspaceId);

  useEffect(() => {
    if (isModalOpen) {
      setName(initialName);
    }
  }, [isModalOpen, initialName]);

  const handleSubmit = async () => {
    if (isPending) return;
    if (!name.trim()) return;
    try {
      await mutateAsync();
      toast.success("Collection updated successfully");
      setIsModalOpen(false);
    } catch (err) {
      toast.error("Failed to update collection");
      console.error("Failed to update collection:", err);
    }
  };

  const handleClose = () => {
    setName(initialName);
    setIsModalOpen(false);
  };

  return (
    <Modal
      title="Edit Collection"
      description="Rename your collection"
      isOpen={isModalOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      submitText={isPending ? "Saving..." : "Save Changes"}
      submitVariant="default"
      submitDisabled={isPending}
    >
      <div className="space-y-4">
        <input
          className="w-full p-2 border rounded"
          placeholder="Collection name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
    </Modal>
  );
};

export default EditCollectionModal;
