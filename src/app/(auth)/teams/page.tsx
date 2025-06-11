"use client";

import { useState } from "react";
import { TeamsList } from "@/page/teams/components/TeamsList";
import { TeamMembersList } from "@/page/teams/components/TeamMembersList";
import { useMyTeams } from "@/entities/teams/hooks/useMyTeams";
import { useTeamMemberStats } from "@/entities/teams/hooks/useTeamMemberStats";
import { useUserSkillCategories } from "@/entities/teams/hooks/useUserSkillCategories";
import { useUserSkillCategoryById } from "@/entities/teams/hooks/useUserSkillCategoryById";
import { useCreateBatchTasks } from "@/entities/teams/hooks/useCreateBatchTasks";
import { SkillCategorySelector } from "@/page/teams/components/SkillCategorySelector";
import { Task } from "@/shared/types/api/teams";

// Состояния этапов страницы
type PageStep = "teams" | "members" | "skills";

interface SelectedEvaluation {
  evaluatorId: number;
  evaluatedId: number;
  evaluatedUserName?: string;
}

function TeamsPage() {
  const [currentStep, setCurrentStep] = useState<PageStep>("teams");
  const [selectedTeamId, setSelectedTeamId] = useState<number | undefined>();
  const [selectedEvaluation, setSelectedEvaluation] = useState<
    SelectedEvaluation | undefined
  >();
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    number | undefined
  >();

  // API хуки
  const { data: teams = [], isLoading: isLoadingTeams } = useMyTeams();

  const { data: teamMembers = [], isLoading: isLoadingMembers } =
    useTeamMemberStats(selectedTeamId || 0);

  const { data: userSkillCategories, isLoading: isLoadingSkillCategories } =
    useUserSkillCategories(selectedEvaluation?.evaluatedId || 0);

  const { data: categorySkills, isLoading: isLoadingCategorySkills } =
    useUserSkillCategoryById(
      selectedEvaluation?.evaluatedId || 0,
      selectedCategoryId || 0
    );

  const createBatchTasksMutation = useCreateBatchTasks({
    onSuccess: () => {
      ("Задачи успешно созданы!");
      setCurrentStep("teams");
      setSelectedTeamId(undefined);
      setSelectedEvaluation(undefined);
      setSelectedCategoryId(undefined);
    },
    onError: (error) => {
      alert(`Ошибка при создании задач: ${error.message}`);
    },
  });

  // Обработчики событий
  const handleTeamSelect = (teamId: number) => {
    setSelectedTeamId(teamId);
    setCurrentStep("members");
  };

  const handleMemberSelect = (evaluatorId: number, evaluatedId: number) => {
    // В реальном приложении здесь будет логика выбора оценивающего и оцениваемого
    const evaluatedMember = teamMembers.find(
      (member) => member.userId === evaluatedId
    );

    setSelectedEvaluation({
      evaluatorId,
      evaluatedId,
      evaluatedUserName: evaluatedMember
        ? `${evaluatedMember.firstName} ${evaluatedMember.lastName}`
        : undefined,
    });
    setCurrentStep("skills");
  };

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
  };

  const handleCreateBatchTasks = (params: {
    selectedSkillIds: number[];
    selectedEvaluatorIds: number[];
    title: string;
    description: string;
  }) => {
    if (!selectedEvaluation) return;

    const { selectedSkillIds, selectedEvaluatorIds, title, description } =
      params;

    // Создаем задачи для каждого выбранного оценщика
    const tasks: Task[] = selectedEvaluatorIds.map((evaluatorId) => ({
      evaluatorMemberId: evaluatorId,
      assigneeMemberId: selectedEvaluation.evaluatedId,
      leadMemberId:
        teamMembers.find((member) => member.skillCategoryId === 6)?.userId || 0,
      title,
      description,
      deadlineCompletion: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      ).toISOString(), // 7 дней
      status: "IN_WAITING",
      userSkillIds: selectedSkillIds,
    }));

    const batchTasksRequest = { tasks };
    createBatchTasksMutation.mutate(batchTasksRequest);
  };

  const handleBackToTeams = () => {
    setCurrentStep("teams");
    setSelectedTeamId(undefined);
    setSelectedEvaluation(undefined);
    setSelectedCategoryId(undefined);
  };

  const handleBackToMembers = () => {
    setCurrentStep("members");
    setSelectedEvaluation(undefined);
    setSelectedCategoryId(undefined);
  };

  const selectedTeam = teams.find((team) => team.teamId === selectedTeamId);

  return (
    <div className="min-h-screen bg-bg-default">
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-default-text">
            Управление командами
          </h1>

          {/* Навигационные крошки */}
          <div className="flex items-center space-x-2 text-sm">
            <button
              onClick={handleBackToTeams}
              className={`px-3 py-1 rounded ${
                currentStep === "teams"
                  ? "bg-primary text-white"
                  : "text-primary hover:bg-primary-light"
              }`}
            >
              Команды
            </button>
            {selectedTeamId && (
              <>
                <span className="text-gray-400">/</span>
                <button
                  onClick={handleBackToMembers}
                  className={`px-3 py-1 rounded ${
                    currentStep === "members"
                      ? "bg-primary text-white"
                      : "text-primary hover:bg-primary-light"
                  }`}
                >
                  Участники
                </button>
              </>
            )}
            {selectedEvaluation && (
              <>
                <span className="text-gray-400">/</span>
                <span className="px-3 py-1 bg-primary text-white rounded">
                  Навыки
                </span>
              </>
            )}
          </div>
        </div>

        {/* Отображение текущего этапа */}
        {currentStep === "teams" && (
          <TeamsList
            teams={teams}
            onTeamSelect={handleTeamSelect}
            selectedTeamId={selectedTeamId}
            isLoading={isLoadingTeams}
          />
        )}

        {currentStep === "members" && selectedTeamId && (
          <TeamMembersList
            members={teamMembers}
            onMemberSelect={handleMemberSelect}
            isLoading={isLoadingMembers}
            teamName={selectedTeam?.teamName}
          />
        )}

        {currentStep === "skills" &&
          selectedEvaluation &&
          userSkillCategories && (
            <SkillCategorySelector
              skillCategories={userSkillCategories}
              categorySkills={categorySkills}
              isLoadingCategories={isLoadingSkillCategories}
              isLoadingCategorySkills={isLoadingCategorySkills}
              evaluatedUserName={selectedEvaluation.evaluatedUserName}
              evaluatedUserId={selectedEvaluation.evaluatedId}
              teamMembers={teamMembers}
              onCreateBatchTasks={handleCreateBatchTasks}
              onCategorySelect={handleCategorySelect}
            />
          )}
      </div>
    </div>
  );
}

export default TeamsPage;
