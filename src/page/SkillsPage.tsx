"use client";

import { memo } from "react";
import { SkillsTable } from "@/widgets/SkillsTable/SkillsTable";
import { FileUploader } from "@/widgets/FileUploader/FileUploader";
import { mockSkillsData } from "@/shared/api/mocks/skillsData";

export const SkillsPage = memo(() => {
  return (
    <div>
      <SkillsTable skills={mockSkillsData} />
      <FileUploader />
    </div>
  );
});

SkillsPage.displayName = "SkillsPage";

export default SkillsPage;
