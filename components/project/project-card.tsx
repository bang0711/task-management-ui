import { formatDateToVietnamese } from "@/lib/utils";
import { Project } from "@/types";
import { Link } from "next-view-transitions";
import React from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

type Props = {
  project: Project;
};

function ProjectCard({ project }: Props) {
  return (
    <Link href={`/projects/${project.id}/tasks`} className="section">
      <div className="space-y-1">
        <p className="text-base font-semibold">{project.name}</p>
        <p> Created Time: {formatDateToVietnamese(project.createdTime)}</p>
      </div>
      <Badge
        variant={project.status === "Complete" ? "default" : "secondary"}
        className="px-4 py-2"
      >
        {project.status}
      </Badge>
    </Link>
  );
}

export default ProjectCard;
