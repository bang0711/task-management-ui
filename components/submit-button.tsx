import React from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

type Props = {
  title: string;
  isDisabled: boolean;
};

function SubmitButton({ title, isDisabled }: Props) {
  return (
    <Button disabled={isDisabled} type="submit">
      {isDisabled ? (
        <span className="flex items-center gap-1">
          <Loader2 className="animate-spin" size={20} />
          Loading
        </span>
      ) : (
        <span>{title}</span>
      )}
    </Button>
  );
}

export default SubmitButton;
