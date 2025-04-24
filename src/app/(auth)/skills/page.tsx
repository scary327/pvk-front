import { Heading } from "@radix-ui/themes";
import { SkillsTable } from "@/page/skills";

export default function SkillsPage() {
  return (
    <div className="flex flex-col gap-[32px]">
      <Heading size="6">Навыки</Heading>
      <SkillsTable />
    </div>
  );
}

export const metadata = {
  title: "Навыки",
};
