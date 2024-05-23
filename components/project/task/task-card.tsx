import { Badge } from "@/components/ui/badge";
import { formatDateToVietnamese } from "@/lib/utils";
import { Task } from "@/types";
import React from "react";
import DeleteTask from "./delete-task";
import EditTask from "./edit-task";

type Props = {
  task: Task;
};

function TaskCard({ task }: Props) {
  return (
    <div className="shadow-lg px-4 py-2 border-2 border-primary rounded-lg space-y-3">
      <h1 className="text-lg font-semibold">{task.title}</h1>
      <p>Created time: {formatDateToVietnamese(task.createdTime)}</p>
      <div className="flex items-center justify-between">
        <Badge variant={task.status === "To Do" ? "secondary" : "default"}>
          {task.status}
        </Badge>
        <div className="flex items-center gap-2">
          <DeleteTask task={task} />
          <EditTask task={task} />
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
