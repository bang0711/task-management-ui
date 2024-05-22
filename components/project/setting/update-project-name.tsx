"use client";
import { Project, ResponseFromServer } from "@/types";
import React, { useState, useTransition } from "react";
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
import { Loader2, Pen } from "lucide-react";
import { updateProject } from "@/lib/project";
import { useToast } from "@/components/ui/use-toast";
import SubmitButton from "@/components/submit-button";
type Props = {
  project: Project;
};
function UpdateProjectName({ project }: Props) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogTrigger asChild>
        <Pen size={20} className="cursor-pointer ml-3" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit project</DialogTitle>
          <DialogDescription>
            Make changes to your project here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form
          action={(data: FormData) =>
            startTransition(async (): Promise<any> => {
              const name = data.get("name") as string;
              if (!name) {
                return toast({
                  title: "Please enter a name",
                  variant: "destructive",
                  duration: 1000,
                });
              }
              if (name === project.name) {
                return toast({
                  title: "New name cannot be the same with the old one.",
                  variant: "destructive",
                  duration: 1000,
                });
              }
              const res: ResponseFromServer = await updateProject(
                project.id,
                name
              );
              toast({
                title: res.message,
                variant: res.status === 200 ? "default" : "destructive",
                duration: 1000,
              });
              if (res.status === 200) {
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
                defaultValue={project.name}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <SubmitButton isDisabled={isPending} title="Save changes" />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
export default UpdateProjectName;
