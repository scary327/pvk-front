"use client";

import { Table, Avatar } from "@radix-ui/themes";
import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";
import Link from "next/link";

interface Skill {
  id: string;
  name: string;
  avatarUrl?: string;
  role: string;
  rating: number;
}

const mockData: Skill[] = [
  {
    id: "1",
    name: "Александр Петров",
    avatarUrl: "https://avatars.githubusercontent.com/u/1",
    role: "Frontend Developer",
    rating: 5,
  },
  {
    id: "2",
    name: "Мария Иванова",
    avatarUrl: "https://avatars.githubusercontent.com/u/2",
    role: "Backend Developer",
    rating: 4,
  },
  {
    id: "3",
    name: "Дмитрий Сидоров",
    avatarUrl: "https://avatars.githubusercontent.com/u/3",
    role: "Full Stack Developer",
    rating: 5,
  },
  {
    id: "4",
    name: "Анна Козлова",
    role: "UI/UX Designer",
    rating: 4,
  },
];

const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, index) =>
        index < rating ? (
          <StarFilledIcon
            key={index}
            className="text-[color:var(--color-primary)]"
            width={16}
            height={16}
          />
        ) : (
          <StarIcon
            key={index}
            className="text-[color:var(--color-gray-300)]"
            width={16}
            height={16}
          />
        )
      )}
    </div>
  );
};

export const SkillsTable = () => {
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
        {mockData.map((skill) => (
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
};
