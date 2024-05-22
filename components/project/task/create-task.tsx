"use client";
import React, { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResponseFromServer } from "@/types";
import SubmitButton from "@/components/submit-button";
import { useToast } from "@/components/ui/use-toast";
import { createTask } from "@/lib/task";
type Props = {
  projectId: string;
};

function CreateTask({ projectId }: Props) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogTrigger asChild>
        <Button>Create Task</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
          <DialogDescription>
            Create a new task here. You can update the task whenever you want.
          </DialogDescription>
        </DialogHeader>
        <form
          action={async (data: FormData) =>
            startTransition(async (): Promise<any> => {
              const name = data.get("name") as string;
              if (!name) {
                return toast({
                  title: "Please enter a name",
                  variant: "destructive",
                  duration: 1000,
                });
              }
              const res: ResponseFromServer = await createTask(
                data.get("name") as string,
                projectId
              );
              toast({
                title: res.message,
                variant: res.status === 201 ? "default" : "destructive",
                duration: 1000,
              });
              if (res.status === 201) {
                setIsOpen(false);
              }
            })
          }
        >
          <div className="grid gap-4 py-4">
            <div className="grid items-center gap-4">
              <Label htmlFor="name">Name</Label>
              <Input
                name="name"
                placeholder="Enter task title"
                className="col-span-3"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 justify-end">
            <SubmitButton isDisabled={isPending} title="Create Project" />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateTask;
