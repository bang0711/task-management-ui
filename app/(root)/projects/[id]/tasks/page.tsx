import Header from "@/components/header";
import CreateTask from "@/components/project/task/create-task";
import TaskCard from "@/components/project/task/task-card";
import { Separator } from "@/components/ui/separator";
import { getTasks } from "@/lib/task";
import { ResponseFromServer } from "@/types";
import { Link } from "next-view-transitions";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

async function ProjectTasksPage({ params: { id } }: Props) {
  const res: ResponseFromServer = await getTasks(id);
  const tasks = res.content.tasks;
  return (
    <div className="space-y-5">
      <div className="flex justify-between">
        <Header
          title="All Tasks"
          description="All of the task within the project"
        />
        <CreateTask projectId={id} />
      </div>

      <div className="grid grid-cols-4 gap-3">
        {tasks.map((task) => (
          <TaskCard task={task} key={task.id} />
        ))}
      </div>
    </div>
  );
}

export default ProjectTasksPage;
