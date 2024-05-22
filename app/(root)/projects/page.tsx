import CreateProjectCard from "@/components/project/create-project-card";
import ProjectCard from "@/components/project/project-card";
import { getProjects } from "@/lib/project";
import { ResponseFromServer } from "@/types";
import React from "react";

type Props = {};

async function ProjectsPage({}: Props) {
  const res: ResponseFromServer = await getProjects();
  const projects = res.content.projects;
  return (
    <div className="grid grid-cols-3 gap-5">
      {projects.map((project) => (
        <ProjectCard project={project} key={project.id} />
      ))}
      <CreateProjectCard />
    </div>
  );
}

export default ProjectsPage;
