import React from "react";
import { Project } from "../../../data/projectsData";
import { ProjectScrollAccordion } from "../ProjectScrollAccordion";
import { CSKHProjectDetails } from "./CSKHProjectDetails";

interface GenericProjectDetailsProps {
  project: Project;
}

export const GenericProjectDetails: React.FC<GenericProjectDetailsProps> = ({
  project,
}) => {
  const isCSKH = project.title === "1.1 · Xây dựng và vận hành Phòng Dịch vụ Khách hàng";

  return (
    <div className="w-full space-y-8 text-left">
      {isCSKH ? (
        <CSKHProjectDetails />
      ) : (
        <ProjectScrollAccordion project={project} />
      )}
    </div>
  );
};
