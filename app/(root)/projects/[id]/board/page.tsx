import BoardDragAndDrop from "@/components/project/board/board-drag-and-drop";
import { getTasks } from "@/lib/task";
import { ResponseFromServer } from "@/types";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

async function ProjectBoardPage({ params: { id } }: Props) {
  const res: ResponseFromServer = await getTasks(id);
  const tasks = res.content.tasks;
  console.log(tasks);
  return (
    <div>
      <BoardDragAndDrop tasks={tasks} />
    </div>
  );
}

export default ProjectBoardPage;
