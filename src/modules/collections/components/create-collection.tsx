import React, { useState } from "react";
import { useCreateCollection } from "../hooks/collection";
import { toast } from "sonner";
import Modal from "@/components/ui/modal";
import { Input } from "@/components/ui/input";

type Props = {
  workspaceId: string;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
};

const CreateCollection = ({
  workspaceId,
  isModalOpen,
  setIsModalOpen,
}: Props) => {
  const [name, setName] = useState("");
  const { mutateAsync, isPending } = useCreateCollection(workspaceId);

  const handleSubmit = async () => {
    if (isPending) return;
    if (!name.trim()) return;
    try {
      await mutateAsync(name);
      toast.success("Collection created successfully");
      setName("");
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to create collection");
      console.error("Failed to create collection:", error);
    }
  };
  return (
<Modal
        title="Add New Collection"
        description="Create a new collection to organize your requests"
        isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onSubmit={handleSubmit}
      submitText={isPending ? "Creating..." : "Create Collection"}
      submitVariant="default"
      submitDisabled={isPending}
    >
      <div className="space-y-4">
        <Input
          className="w-full p-2 border rounded-sm"
          placeholder="Collection Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
    </Modal>
  );
};

export default CreateCollection;
