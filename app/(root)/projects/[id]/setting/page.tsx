import Header from "@/components/header";
import ProjectInfo from "@/components/project/setting/project-info";
import { getProject } from "@/lib/project";
import { ResponseFromServer } from "@/types";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

async function ProjectSettingPage({ params: { id } }: Props) {
  const res: ResponseFromServer = await getProject(id);
  const project = res.content.project;
  return (
    <div className="space-y-5">
      <Header title="Setting" description="Change the project properties" />
      <ProjectInfo project={project} />
    </div>
  );
}

export default ProjectSettingPage;
