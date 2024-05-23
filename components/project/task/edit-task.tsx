"use client";
import { ResponseFromServer, Task } from "@/types";
import React, { useState, useTransition } from "react";
import { Pen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TaskStatus from "./task-status";
import { useToast } from "@/components/ui/use-toast";
import { changeTaskName } from "@/lib/task";
import SubmitButton from "@/components/submit-button";
import { useRouter } from "next/navigation";
type Props = {
  task: Task;
};

function EditTask({ task }: Props) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogTrigger asChild>
        <Pen size={18} className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>
            Make changes to your task here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form
          action={(data: FormData) =>
            startTransition(async (): Promise<any> => {
              const title = data.get("title") as string;
              if (!title) {
                return toast({
                  title: "Please enter a title",
                });
              }
              const res: ResponseFromServer = await changeTaskName(
                task.id,
                title
              );
              toast({
                title: res.message,
                variant: res.status === 200 ? "default" : "destructive",
                duration: 1000,
              });
              if (res.status === 200) {
                setIsOpen(false);
                router.refresh();
              }
            })
          }
        >
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                title
              </Label>
              <Input
                name="title"
                defaultValue={task.title}
                className="col-span-3"
              />
            </div>
            <TaskStatus task={task} />
          </div>
          <DialogFooter>
            <SubmitButton isDisabled={isPending} title="Save Changes" />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditTask;
