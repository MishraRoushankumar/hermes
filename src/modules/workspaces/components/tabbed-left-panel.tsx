"use client";

import { Hint } from "@/components/ui/hint";
import { Globe, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const TabbedLeftPanel = () => {
  const pathname = usePathname();
  const activeTab = pathname.split("/")[1] || "rest";

  const sidebarItems = [
    { icon: LinkIcon, label: "rest", link: "/" },
    { icon: Globe, label: "realtime", link: "/realtime" },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Sidebar */}
      <div className="w-12 flex flex-col items-center py-4 space-y-4">
        {sidebarItems.map((item) => (
          <Hint key={item.label} label={item.label} side="right">
            <Link
              href={item.link}
              className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
                activeTab === item.label
                  ? "bg-indigo-600 text-white"
                  : "text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800"
              }`}
            >
              <item.icon className="w-4 h-4" />
            </Link>
          </Hint>
        ))}
      </div>
    </div>
  );
};

export default TabbedLeftPanel;
