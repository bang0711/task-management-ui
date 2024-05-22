import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDateToVietnamese } from "@/lib/utils";
import { ProjectDetail } from "@/types";
import React from "react";
import UpdateProjectName from "./update-project-name";
import DeleteProject from "./delete-project";

type Props = {
  project: ProjectDetail;
};

function ProjectInfo({ project }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <div className="border-2 border-primary px-3 space-y-2 py-5 w-full mx-auto">
        <div className="flex items-center">
          <p className="font-bold w-32">Project Owner:</p>
          <p>{project.user.name}</p>
        </div>

        <div className="flex items-center">
          <p className="font-bold w-32">Project Name:</p>
          <p>{project.name}</p>
          <UpdateProjectName project={project} />
        </div>

        <div className="flex items-center">
          <p className="font-bold w-32">Create Time:</p>
          <p>{formatDateToVietnamese(project.createdTime)}</p>
        </div>

        <div className="flex items-center">
          <p className="font-bold w-32">Project Status:</p>
          <Badge
            variant={project.status === "Complete" ? "default" : "secondary"}
            className="px-4 py-2"
          >
            {project.status}
          </Badge>
        </div>
      </div>

      <DeleteProject project={project} />
    </div>
  );
}

export default ProjectInfo;
