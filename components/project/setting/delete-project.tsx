"use client";
import { Project, ResponseFromServer } from "@/types";
import React, { useTransition } from "react";
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
import SubmitButton from "@/components/submit-button";
import { deleteProject } from "@/lib/project";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
type Props = {
  project: Project;
};

function DeleteProject({ project }: Props) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="flex justify-end">
          <Button variant="destructive" className="w-fit">
            Delete Project
          </Button>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete project{" "}
            {""}
            <b>{project.name}</b> and remove the project from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <form
            action={() =>
              startTransition(async () => {
                const res: ResponseFromServer = await deleteProject(project.id);
                toast({
                  title: res.message,
                  variant: res.status === 200 ? "default" : "destructive",
                  duration: 1000,
                });
                if (res.status === 200) {
                  router.push("/projects");
                }
              })
            }
          >
            <SubmitButton isDisabled={isPending} title="Delete Project" />
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteProject;
