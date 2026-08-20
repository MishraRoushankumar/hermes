"use client";

import { Button } from "@/components/ui/button";
import { Hint } from "@/components/ui/hint";
import { Select } from "@/components/ui/select";
import { User } from "lucide-react";
import React from "react";

const Workspace = () => {
  return (
    <>
      <Hint label="Change worspace">
        <Select>
          <Button className="border border-indigo-400 bg-indigo-400/10 hover:bg-indigo-400/20 text-indigo-400 hover:text-indigo-300 flex flex-row items-center space-x-1">
            <User className="size-4 text-indigo-400" />
            <span className="text-indigo-400 text-sm font-semibold">
              Personal Workspace
            </span>
          </Button>
        </Select>
      </Hint>
    </>
  );
};

export default Workspace;
