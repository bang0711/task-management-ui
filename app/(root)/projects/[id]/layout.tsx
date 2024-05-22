import ProjectPageLinks from "@/components/project/project-page-links";
import React from "react";

type Props = {
  children: React.ReactNode;
  params: {
    id: string;
  };
};

function ProjectPageLayout({ children, params: { id } }: Props) {
  return (
    <div className="space-y-2">
      <ProjectPageLinks id={id} />
      {children}
    </div>
  );
}

export default ProjectPageLayout;
