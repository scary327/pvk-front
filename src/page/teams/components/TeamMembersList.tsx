import { memo } from "react";
import { TeamMemberStatsResponse } from "@/shared/types/api/teams";

interface TeamMembersListProps {
  members: TeamMemberStatsResponse[];
  onMemberSelect: (evaluatorId: number, evaluatedId: number) => void;
  isLoading?: boolean;
  teamName?: string;
}

export const TeamMembersList = memo(
  ({ members, onMemberSelect, isLoading, teamName }: TeamMembersListProps) => {
    if (isLoading) {
      return (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">
            Участники команды {teamName && `"${teamName}"`}
          </h2>
          <div className="text-center text-gray-500">
            Загрузка участников...
          </div>
        </div>
      );
    }

    if (!members || members.length === 0) {
      return (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">
            Участники команды {teamName && `"${teamName}"`}
          </h2>
          <div className="text-center text-gray-500">
            В команде пока нет участников
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">
          Участники команды {teamName && `"${teamName}"`}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {members.map((member, index) => (
            <div
              key={member.userId || index}
              className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex flex-col gap-y-[8px] items-start">
                  <div className="font-medium">
                    {member.firstName} {member.lastName}
                    {member.currentUser && (
                      <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        Это вы
                      </span>
                    )}
                  </div>
                  <div
                    className="text-sm px-2 py-1 rounded text-white font-bold"
                    style={{
                      backgroundColor: member.skillCategoryColor,
                    }}
                  >
                    {member.skillCategoryName}
                  </div>
                </div>
              </div>

              <div className="text-sm text-gray-600 mb-3">
                Средний рейтинг: {member.averageRating.toFixed(1)}
              </div>

              {!member.currentUser && (
                <button
                  onClick={() => onMemberSelect(member.userId, member.userId)}
                  className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                >
                  Выбрать для оценки
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
);

TeamMembersList.displayName = "TeamMembersList";
