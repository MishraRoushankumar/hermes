import { currentUser } from "@/modules/authentication/actions";
import Header from "@/modules/layout/components/header";
import { initializeWorkspace } from "@/modules/workspaces/actions";
import { redirect } from "next/navigation";
import React from "react";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const workspaceResult = await initializeWorkspace();
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  if (!workspaceResult.success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Workspace Initialization Failed</h1>
          <p className="text-zinc-400">{workspaceResult.error || "Unknown error"}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header user={user} />

      <main className=" h-[calc(100vh-4rem)] bg-zinc-950 overflow-hidden ">
        <div className="flex h-full w-full">
          <div className="w-12 border-zinc-800 bg-zinc-900 shrink-0 border-r">
            tabbedleft panel
          </div>

          <div className="min-w-0 flex-1">{children}</div>
        </div>
      </main>
    </>
  );
};

export default RootLayout;
