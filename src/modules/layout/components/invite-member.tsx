import { Button } from "@/components/ui/button";
import { Hint } from "@/components/ui/hint";
import { UserPlus } from "lucide-react";

const InviteMember = () => {
  return (
    <Hint label="Invite Members">
      <Button
        disabled
        className="border border-emerald-400 bg-emerald-400/10 text-emerald-400/50 cursor-not-allowed"
      >
        <UserPlus className="size-4 text-emerald-400/50" />
      </Button>
    </Hint>
  );
};

export default InviteMember;
