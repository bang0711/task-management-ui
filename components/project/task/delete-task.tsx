"use client";
import { ResponseFromServer, Task } from "@/types";
import React, { useState, useTransition } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import SubmitButton from "@/components/submit-button";
import { deleteTask } from "@/lib/task";
import { useRouter } from "next/navigation";
type Props = {
  task: Task;
};

function DeleteTask({ task }: Props) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <AlertDialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <AlertDialogTrigger asChild>
        <Trash size={18} className="text-red-500 cursor-pointer" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete task{" "}
            <span className="font-bold">&quot;{task.title}&quot;</span> and
            remove the data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <form
            action={() =>
              startTransition(async (): Promise<any> => {
                const res: ResponseFromServer = await deleteTask(task.id);
                if (res.status === 200) {
                  router.refresh();
                  setIsOpen(false);
                }
                toast({
                  title: res.message,
                  variant: res.status === 200 ? "default" : "destructive",
                  duration: 100,
                });
              })
            }
          >
            <SubmitButton isDisabled={isPending} title="Confirm" />
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteTask;
