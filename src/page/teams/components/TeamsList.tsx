import { memo } from "react";
import { MyTeamsResponse } from "@/shared/types/api/teams";

interface TeamsListProps {
  teams: MyTeamsResponse[];
  onTeamSelect: (teamId: number) => void;
  selectedTeamId?: number;
  isLoading?: boolean;
}

export const TeamsList = memo(
  ({ teams, onTeamSelect, selectedTeamId, isLoading }: TeamsListProps) => {
    if (isLoading) {
      return (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Мои команды</h2>
          <div className="text-center text-gray-500">Загрузка команд...</div>
        </div>
      );
    }

    if (!teams || teams.length === 0) {
      return (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Мои команды</h2>
          <div className="text-center text-gray-500">У вас пока нет команд</div>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Мои команды</h2>
        <div className="space-y-2">
          {teams.map((team, index) => (
            <button
              key={team.teamId || index}
              onClick={() => onTeamSelect(team.teamId || index)}
              className={`w-full text-left p-4 rounded-lg border transition-colors ${
                selectedTeamId === team.teamId
                  ? "border-primary bg-primary-light text-primary"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <div className="font-medium">
                {team.teamName || `Команда ${index + 1}`}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                Направление:{" "}
                <span
                  className="px-2 py-1 rounded text-white font-bold"
                  style={{ backgroundColor: team.skillCategoryColor }}
                >
                  {team.skillCategoryName}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }
);

TeamsList.displayName = "TeamsList";
