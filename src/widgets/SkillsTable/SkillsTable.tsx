import { memo } from "react";
import { Table, Avatar } from "@radix-ui/themes";
import Link from "next/link";
import { Skill } from "@/shared/types/skills";
import { RatingStars } from "@/shared/ui/RatingStars/RatingStars";

interface SkillsTableProps {
  skills: Skill[];
}

export const SkillsTable = memo(({ skills }: SkillsTableProps) => {
  return (
    <Table.Root
      variant="surface"
      className="[--table-cell-padding:0] [--table-row-height:48px]"
    >
      <Table.Header className="bg-primary-light">
        <Table.Row>
          <Table.ColumnHeaderCell>
            <div className="flex items-center px-4">Имя</div>
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>
            <div className="flex items-center px-4">Навыки</div>
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>
            <div className="flex items-center px-4">Рейтинг</div>
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>
            <div className="flex items-center px-4">Профиль</div>
          </Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {skills.map((skill) => (
          <Table.Row key={skill.id}>
            <Table.Cell>
              <div className="flex items-center gap-2 px-4">
                <Avatar
                  size="2"
                  src={skill.avatarUrl}
                  fallback={skill.name[0]}
                  radius="full"
                  className="border border-[color:var(--color-gray-300)]"
                />
                <span className="font-medium">{skill.name}</span>
              </div>
            </Table.Cell>
            <Table.Cell>
              <div className="flex items-center px-4">
                <span className="px-2 py-1 bg-[color:var(--color-primary)] bg-opacity-10 rounded-full text-sm font-medium text-white">
                  {skill.role}
                </span>
              </div>
            </Table.Cell>
            <Table.Cell>
              <div className="flex items-center px-4">
                <RatingStars rating={skill.rating} />
              </div>
            </Table.Cell>
            <Table.Cell>
              <div className="flex items-center px-4">
                <Link
                  href={`/profile/${skill.id}`}
                  className="text-[color:var(--color-primary)] hover:underline"
                >
                  Открыть профиль
                </Link>
              </div>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
});

SkillsTable.displayName = "SkillsTable";
