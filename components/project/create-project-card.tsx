"use client";
import React, { useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { createProject } from "@/lib/project";
import { ResponseFromServer } from "@/types";
import { useToast } from "../ui/use-toast";
import { redirect } from "next/navigation";
import SubmitButton from "../submit-button";

type Props = {};

function CreateProjectCard({}: Props) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className="px-5 py-10 border-primary border-dashed border-2 cursor-pointer select-none text-lg
         rounded-lg hover:scale-105 transition-all duration-300 flex items-center justify-center font-semibold"
        >
          + Create new project
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription>
            Create a new project and invite your friends. Click create when you
            are done.
          </DialogDescription>
        </DialogHeader>
        <form
          action={async (data: FormData) =>
            startTransition(async (): Promise<any> => {
              const name = data.get("name");
              if (!name) {
                return toast({
                  title: "Please enter a name",
                  variant: "destructive",
                  duration: 1000,
                });
              }
              const res: ResponseFromServer = await createProject(
                data.get("name") as string
              );
              toast({
                title: res.message,
                variant: res.status === 201 ? "default" : "destructive",
                duration: 1000,
              });
              if (res.status === 201) {
                redirect(`/projects/${res.id}/tasks`);
              }
            })
          }
        >
          <div className="grid gap-4 py-4">
            <div className="grid items-center gap-4">
              <Label htmlFor="name">Name</Label>
              <Input
                name="name"
                placeholder="Enter project name"
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

export default CreateProjectCard;
