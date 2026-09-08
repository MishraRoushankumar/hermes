import React from "react";
import { RequestTab } from "../store/useRequestStore";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type RequestEditorAreaProps = {
  tab: RequestTab;
  updateTab: (id: string, data: Partial<RequestTab>) => void;
};

const RequestEditorArea = ({ tab, updateTab }: RequestEditorAreaProps) => {
  return <div></div>;
};

export default RequestEditorArea;
