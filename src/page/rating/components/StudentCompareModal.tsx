import React from "react";
import { useQueries } from "@tanstack/react-query";
import { profileApi } from "@/entities/profile/api/profileApi";
import {
  ProfileResponse,
  ProfileSkillCategory,
} from "@/shared/types/api/profile";
import { XIcon } from "lucide-react";

interface StudentCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentIds: string[];
}

interface ComparisonData {
  profile: ProfileResponse | null;
  skills: ProfileSkillCategory[] | null;
  isLoadingProfile: boolean;
  isLoadingSkills: boolean;
  errorProfile: Error | null;
  errorSkills: Error | null;
  userId: string;
}

export const StudentCompareModal: React.FC<StudentCompareModalProps> = ({
  isOpen,
  onClose,
  studentIds,
}) => {
  const results = useQueries({
    queries: studentIds.flatMap((id) => [
      {
        queryKey: ["userProfile", id],
        queryFn: () => profileApi.getUserProfile(id),
        enabled: isOpen && !!id,
      },
      {
        queryKey: ["userSkillCategories", id],
        queryFn: () => profileApi.getUserSkillCategories(id),
        enabled: isOpen && !!id,
      },
    ]),
  });

  if (!isOpen) return null;

  const comparisonData: ComparisonData[] = studentIds.map((id, index) => {
    const profileResult = results[index * 2];
    const skillsResult = results[index * 2 + 1];
    return {
      userId: id,
      profile: (profileResult?.data as ProfileResponse) || null,
      skills: (skillsResult?.data as ProfileSkillCategory[]) || null,
      isLoadingProfile: profileResult?.isLoading || false,
      isLoadingSkills: skillsResult?.isLoading || false,
      errorProfile: (profileResult?.error as Error) || null,
      errorSkills: (skillsResult?.error as Error) || null,
    };
  });

  const isLoadingAny = comparisonData.some(
    (d) => d.isLoadingProfile || d.isLoadingSkills
  );

  const renderSkillsSimple = (skills: ProfileSkillCategory[] | null) => {
    if (!skills)
      return <p className="text-xs text-gray-500">Нет данных о навыках</p>;
    const allSkillsFlat = skills.flatMap((cat) => cat.skills);
    if (allSkillsFlat.length === 0)
      return <p className="text-xs text-gray-500">Навыки не указаны</p>;

    const topSkills = allSkillsFlat
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 5);

    return (
      <ul className="space-y-0.5 text-xs">
        {topSkills.map((skill) => (
          <li key={skill.id} className="flex justify-between">
            <span>{skill.name}</span>
            <span className="font-medium text-gray-700">{skill.rating}%</span>
          </li>
        ))}
        {allSkillsFlat.length > 5 && (
          <li className="text-center text-gray-400 pt-1">
            ...и еще {allSkillsFlat.length - 5}
          </li>
        )}
      </ul>
    );
  };

  return (
    <div
      className="fixed inset-0 bg-black/10 flex items-center justify-center z-50 p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col p-1"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
          <h2 className="text-xl font-semibold">
            Сравнение пользователей ({studentIds.length})
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
          >
            <XIcon size={20} />
          </button>
        </div>

        {isLoadingAny && (
          <div className="p-6 text-center">
            <p>Загрузка данных для сравнения...</p>
          </div>
        )}

        {!isLoadingAny && (
          <div className="flex-grow overflow-y-auto p-4">
            {comparisonData.length > 0 ? (
              <div
                className={`grid grid-cols-1 ${
                  studentIds.length === 2 ? "md:grid-cols-2" : "lg:grid-cols-3"
                } gap-6`}
              >
                {comparisonData.map((data) => (
                  <div
                    key={data.userId}
                    className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow duration-200 flex flex-col"
                  >
                    {data.isLoadingProfile && (
                      <p className="text-sm text-gray-500">
                        Загрузка профиля...
                      </p>
                    )}
                    {data.errorProfile && (
                      <p className="text-sm text-red-500">
                        Ошибка профиля: {data.errorProfile.message}
                      </p>
                    )}
                    {data.profile && (
                      <div className="mb-4 pb-3 border-b border-gray-200">
                        <h3
                          className="font-semibold text-lg text-gray-800 truncate"
                          title={`${data.profile.firstName} ${data.profile.lastName}`}
                        >
                          {data.profile.firstName} {data.profile.lastName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {data.profile.mainSkillCategory?.name ||
                            "Категория не указана"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Команд:{" "}
                          {data.profile.teams?.map((t) => t.name).join(", ") ||
                            "Нет"}
                        </p>
                      </div>
                    )}

                    <div className="flex-grow">
                      {data.isLoadingSkills && (
                        <p className="text-sm text-gray-500">
                          Загрузка навыков...
                        </p>
                      )}
                      {data.errorSkills && (
                        <p className="text-sm text-red-500">
                          Ошибка навыков: {data.errorSkills.message}
                        </p>
                      )}
                      {data.skills && (
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-medium text-sm text-gray-700 mb-1.5">
                              Ключевые навыки:
                            </h4>
                            {renderSkillsSimple(data.skills)}
                          </div>
                        </div>
                      )}
                    </div>
                    {!data.profile &&
                      !data.isLoadingProfile &&
                      !data.errorProfile && (
                        <p className="text-sm text-gray-500">
                          Нет данных профиля
                        </p>
                      )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-8">
                Нет данных для сравнения.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
