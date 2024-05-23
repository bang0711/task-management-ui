import { ResponseFromServer, Task } from "@/types";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { changeTaskStatus } from "@/lib/task";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

type Props = {
  task: Task;
};

function TaskStatus({ task }: Props) {
  const statuses = ["To Do", "Done"];
  const { toast } = useToast();
  const router = useRouter();

  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="status" className="text-right">
        Status
      </Label>
      <Select
        onValueChange={async (value) => {
          const res: ResponseFromServer = await changeTaskStatus(
            task.id,
            value
          );
          toast({
            title: res.message,
            variant: res.status === 200 ? "default" : "destructive",
            duration: 1000,
          });
          if (res.status === 200) {
            router.refresh();
          }
        }}
      >
        <SelectTrigger className="w-[180px]">
          <p>{task.status}</p>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Status</SelectLabel>
            {statuses
              .filter((status) => status !== task.status)
              .map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default TaskStatus;
