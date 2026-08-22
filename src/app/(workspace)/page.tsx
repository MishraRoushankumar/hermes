"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useWorkspaceStore } from "@/modules/layout/store";
import TabbedSidebar from "@/modules/collections/components/sidebar";
import { useGetWorkspace } from "@/modules/workspaces/hooks/workspace";
import { Loader } from "lucide-react";

const Page = () => {
  const { selectedWorkspace } = useWorkspaceStore();
  const { data: currentWorkspace, isPending } = useGetWorkspace(
    selectedWorkspace?.id,
  );

  if (!selectedWorkspace) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-zinc-400">No workspace selected</p>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Loader className="animate-spin h-6 w-6 text-indigo-500" />
      </div>
    );
  }

  if (!currentWorkspace) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-zinc-400">Workspace not found</p>
      </div>
    );
  }

  return (
    <ResizablePanelGroup orientation="horizontal">
      <ResizablePanel defaultSize="65" minSize="40">
        <h1>Request Playground</h1>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel
        defaultSize="35"
        maxSize="40"
        minSize="25"
        className="flex"
      >
        <div className="flex-1">
          <TabbedSidebar currentWorkspace={currentWorkspace} />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Page;
