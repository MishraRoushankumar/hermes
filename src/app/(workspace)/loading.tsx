import { Loader2 } from "lucide-react";
import React from "react";

const LoadingPage = () => {
  return (
    <div className="flex min-h-screen flex-col justify-center items-center">
      <Loader2 className="animate-spin text-indigo-400" />
    </div>
  );
};

export default LoadingPage;
