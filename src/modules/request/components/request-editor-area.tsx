"use client";

import React, { useState } from "react";
import { RequestTab } from "../store/useRequestStore";
import { Textarea } from "@/components/ui/textarea";

type RequestEditorAreaProps = {
  tab: RequestTab;
  updateTab: (id: string, data: Partial<RequestTab>) => void;
};

type SubTab = "parameters" | "headers" | "body";

const RequestEditorArea = ({ tab, updateTab }: RequestEditorAreaProps) => {
  const [activeSubTab, setActiveSubTab] = useState<SubTab>("parameters");

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex border-b border-zinc-800 gap-4 text-sm font-medium">
        <button
          type="button"
          onClick={() => setActiveSubTab("parameters")}
          className={`pb-2 transition-colors cursor-pointer ${
            activeSubTab === "parameters"
              ? "text-indigo-400 border-b-2 border-indigo-500 font-semibold"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          Parameters
        </button>
        <button
          type="button"
          onClick={() => setActiveSubTab("headers")}
          className={`pb-2 transition-colors cursor-pointer ${
            activeSubTab === "headers"
              ? "text-indigo-400 border-b-2 border-indigo-500 font-semibold"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          Headers
        </button>
        <button
          type="button"
          onClick={() => setActiveSubTab("body")}
          className={`pb-2 transition-colors cursor-pointer ${
            activeSubTab === "body"
              ? "text-indigo-400 border-b-2 border-indigo-500 font-semibold"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          Body
        </button>
      </div>

      <div className="w-full">
        {activeSubTab === "parameters" && (
          <Textarea
            value={tab.parameters || ""}
            onChange={(e) =>
              updateTab(tab.id, { parameters: e.target.value })
            }
            placeholder="Parameters (JSON or key-value text)"
            className="w-full min-h-[220px] font-mono text-sm bg-zinc-900 border-zinc-800 text-zinc-100 placeholder-zinc-500"
          />
        )}
        {activeSubTab === "headers" && (
          <Textarea
            value={tab.headers || ""}
            onChange={(e) => updateTab(tab.id, { headers: e.target.value })}
            placeholder="Headers (JSON or key-value text)"
            className="w-full min-h-[220px] font-mono text-sm bg-zinc-900 border-zinc-800 text-zinc-100 placeholder-zinc-500"
          />
        )}
        {activeSubTab === "body" && (
          <Textarea
            value={tab.body || ""}
            onChange={(e) => updateTab(tab.id, { body: e.target.value })}
            placeholder="Request Body (JSON or raw content)"
            className="w-full min-h-[220px] font-mono text-sm bg-zinc-900 border-zinc-800 text-zinc-100 placeholder-zinc-500"
          />
        )}
      </div>
    </div>
  );
};

export default RequestEditorArea;
