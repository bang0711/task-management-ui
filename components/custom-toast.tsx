import React from "react";
import { useToast } from "./ui/use-toast";

type Props = {
  title: string;
  successCode: number;
  currentCode: number;
};

function CustomToast({ successCode, title, currentCode }: Props) {
  const { toast } = useToast();

  React.useEffect(() => {
    toast({
      title,
      variant: currentCode === successCode ? "default" : "destructive",
      duration: 1000,
    });
  }, [currentCode, successCode, title, toast]);
  return null;
}

export default CustomToast;
