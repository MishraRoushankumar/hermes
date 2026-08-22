import { currentUser } from "@/modules/authentication/actions";
import Header from "@/modules/layout/components/header";
import { initializeWorkspace } from "@/modules/workspaces/actions";
import TabbedLeftPanel from "@/modules/workspaces/components/tabbed-left-panel";
import { redirect } from "next/navigation";
import React from "react";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const workspace = await initializeWorkspace();

  if (!workspace?.success) {
    return (
      <main className="max-h-[calc(100vh-4rem)] h-[calc(100vh-4rem)] flex flex-1 overflow-hidden">
        <div className="flex h-full w-full items-center justify-center bg-zinc-950 text-zinc-100">
          <div className="text-center p-8">
            <h1 className="text-xl font-semibold mb-2">Failed to initialize workspace</h1>
            <p className="text-zinc-400">{workspace?.error || "Unknown error"}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <>
      <Header user={user} />
      <main className="max-h-[calc(100vh-4rem)] h-[calc(100vh-4rem)] flex flex-1 overflow-hidden">
        <div className="flex h-full w-full">
          <div className="w-12 border-r border-zinc-800 bg-zinc-900">
            <TabbedLeftPanel />
          </div>
          <div className="flex-1 bg-zinc-950">{children}</div>
        </div>
      </main>
    </>
  );
};

export default RootLayout;
