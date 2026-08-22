import { useState } from "react";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  ChevronDown,
  ChevronRight,
  Edit,
  EllipsisVertical,
  FilePlus,
  Folder,
  Trash,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EditCollectionModal from "./edit-collection-modal";
import DeleteCollectionModal from "./delete-collection-modal";

type DateValue = string | Date;

type CollectionFolderProps = {
  collection: {
    id: string;
    name: string;
    workspaceId: string;
    createdAt: DateValue;
    updatedAt: DateValue;
  };
};

const CollectionFolder = ({ collection }: CollectionFolderProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const isMac =
    typeof navigator !== "undefined" &&
    navigator.platform.toUpperCase().indexOf("MAC") >= 0;

  const modifierKey = isMac ? "⌘" : "Ctrl";

  return (
    <>
      <Collapsible
        open={isCollapsed}
        onOpenChange={setIsCollapsed}
        className="w-full"
      >
        <div className="flex flex-col w-full">
          <div className="flex flex-row justify-between items-center p-2 flex-1 w-full hover:bg-zinc-900 rounded-md">
            <CollapsibleTrigger className="flex flex-row justify-start items-center space-x-2 flex-1">
              <div className="flex items-center space-x-1">
                {isCollapsed ? (
                  <ChevronDown className="w-4 h-4 text-zinc-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-zinc-400" />
                )}
                <Folder className="w-5 h-5 text-zinc-400" />
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-zinc-200 capitalize">
                  {collection.name}
                </span>
              </div>
            </CollapsibleTrigger>

            <div className="flex flex-row justify-center items-center space-x-2">
              <FilePlus className="h-4 w-4 text-zinc-400 hover:text-indigo-400" />

              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <button className="p-1 hover:bg-zinc-800 rounded">
                      <EllipsisVertical className="w-4 h-4  text-zinc-400 hover:text-indigo-400" />
                    </button>
                  }
                />
                <DropdownMenuContent className="w-48">
                  <DropdownMenuItem>
                    <div className="flex flex-row justify-between items-center w-full">
                      <div className="font-semibold flex justify-center items-center">
                        <FilePlus className="text-green-400 mr-2 w-4 h-4" />
                        Add Request
                        <div className="p-1 items-center justify-end">
                          <kbd className="px-1 py-0.5 text-xs bg-zinc-700 rounded">
                            {modifierKey}
                          </kbd>
                          <kbd className="px-1 py-0.5 text-xs bg-zinc-700 rounded">
                            R
                          </kbd>
                        </div>
                      </div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setIsEditOpen(true)}>
                    <div className="flex flex-row justify-between items-center w-full">
                      <div className="font-semibold flex justify-center items-center">
                        <Edit className="text-blue-400 mr-2 w-4 h-4" />
                        Edit
                        <div className="p-1 items-center justify-end">
                          <kbd className="px-1 py-0.5 text-xs bg-zinc-700 rounded">
                            {modifierKey}
                          </kbd>
                          <kbd className="px-1 py-0.5 text-xs bg-zinc-700 rounded">
                            E
                          </kbd>
                        </div>
                      </div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setIsDeleteOpen(true)}>
                    <div className="flex flex-row justify-between items-center w-full">
                      <div className="font-semibold flex justify-center items-center">
                        <Trash className="text-red-400 mr-2 w-4 h-4" />
                        Delete
                        <div className="p-1 items-center justify-end">
                          <kbd className="px-1 py-0.5 text-xs bg-zinc-700 rounded">
                            {modifierKey}
                          </kbd>
                          <kbd className="px-1 py-0.5 text-xs bg-zinc-700 rounded">
                            D
                          </kbd>
                        </div>
                      </div>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </Collapsible>

      <EditCollectionModal
        isModalOpen={isEditOpen}
        setIsModalOpen={setIsEditOpen}
        collectionId={collection.id}
        initialName={collection.name}
        workspaceId={collection.workspaceId}
      />

      <DeleteCollectionModal
        isModalOpen={isDeleteOpen}
        setIsModalOpen={setIsDeleteOpen}
        collectionId={collection.id}
        workspaceId={collection.workspaceId}
      />
    </>
  );
};

export default CollectionFolder;
