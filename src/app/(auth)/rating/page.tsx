"use client";

import { useState, useEffect, useMemo } from "react";
import { Filters, SelectedSkillFilter } from "@/page/rating/components/Filters";
import { StudentsTable } from "@/page/rating/components/StudentsTable";
// import { Role, Student } from '@/page/rating/types'; // Старые моковые типы

// Импортируем новые типы и хук
import {
  UserSearchResultItem,
  // SkillCriterion, // Больше не нужен здесь, т.к. selectedSkillTags будет SelectedSkillFilter[]
  // UserSearchRequestBody, // Можно использовать, если хотим типизировать все тело запроса отдельно
  // UserSearchQueryParams, // Аналогично для параметров
} from "@/shared/types/api/users";
import { useUserSearch } from "@/entities/users/hooks/useUserSearch";
import { useSkillSearch } from "@/entities/skills/hooks/useSkillSearch"; // Новый хук
import { Skill } from "@/shared/types/api/profile"; // Нужен для типа availableSkills
import React from "react"; // Добавляем импорт React для useMemo
import { UserSearchResponse } from "@/shared/types/api/users"; // Импортируем UserSearchResponse, чтобы указать тип для data
import { useDebounce } from "@/shared/hooks/useDebounce"; // Обновляем путь к useDebounce
import { StudentCompareModal } from "@/page/rating/components/StudentCompareModal"; // Импортируем модальное окно

// Mock data - УДАЛЯЕМ
// const mockStudents: Student[] = [ ... ];

// Available roles - УДАЛЯЕМ (предполагаем, что роли/категории для фильтрации будут браться иначе или из API)
// const roles: Role[] = [ ... ];

// Rating range - УДАЛЯЕМ (аналогично)
// const ratings = [1, 2, 3, 4, 5];

// All possible skills for search - УДАЛЯЕМ (навыки для фильтра будут браться иначе)
// const allSkills = [ ... ];

export default function StudentsRatingTable() {
  // State variables
  // Заменяем Student на UserSearchResultItem
  const [students, setStudents] = useState<UserSearchResultItem[]>([]);
  // filteredStudents больше не нужен, так как фильтрация на бэкенде.
  // Сортировка будет применяться к students перед передачей в StudentsTable.
  // const [filteredStudents, setFilteredStudents] = useState<UserSearchResultItem[]>([]);

  // Состояния для фильтров остаются, но их обработка изменится
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  // selectedRole - тип Role нужно будет заменить или получать актуальные значения
  const [selectedRole, setSelectedRole] = useState<string | null>(null); // Пока string, потом можно уточнить
  const [selectedRating, setSelectedRating] = useState<number | null>(null); // Это может быть averageSkillRating

  // selectedSkillTags теперь SelectedSkillFilter[]
  const [selectedSkillTags, setSelectedSkillTags] = useState<
    SelectedSkillFilter[]
  >([]);

  const [skillSearchQuery, setSkillSearchQuery] = useState("");
  // availableSkills - будет заполняться из useAllSkills
  const [availableSkills, setAvailableSkills] = useState<Skill[]>([]);

  // Debounce для skillSearchQuery
  const debouncedSkillSearchQuery = useDebounce(skillSearchQuery, 500); // Задержка 500ms

  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: "ascending" | "descending";
  }>({ key: null, direction: "ascending" });

  // TODO: Добавить состояние для пагинации (page, size, totalElements)
  const [page, setPage] = useState(0); // Например, 0-индексированная страница
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [size, _setSize] = useState(10); // _setSize используется для подавления ошибки, если size не меняется

  // Состояние для выбранных студентов для сравнения
  const [selectedStudentsForCompare, setSelectedStudentsForCompare] = useState<
    string[]
  >([]);

  // Состояние для открытия модального окна сравнения
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Загрузка доступных навыков с помощью useSkillSearch и debounced значения
  const { data: skillSearchData, isLoading: isLoadingSkills } = useSkillSearch(
    { query: debouncedSkillSearchQuery, page: 0, size: 30 } // page и size можно сделать настраиваемыми, если нужно
  );

  useEffect(() => {
    if (skillSearchData && skillSearchData.content) {
      setAvailableSkills(skillSearchData.content);
    }
  }, [skillSearchData]);

  const searchMutation = useUserSearch({
    onSuccess: (data: UserSearchResponse) => {
      console.log("Data from useUserSearch:", data);
      if (data && Array.isArray(data.content)) {
        setStudents(data.content);
      } else {
        console.error(
          "Data from useUserSearch does not have a .content array!",
          data
        );
        setStudents([]);
      }
    },
    onError: (error) => {
      console.error("Ошибка поиска пользователей:", error);
      setStudents([]);
    },
  });

  // Функция для выполнения поиска
  const handleSearch = (currentPage = page, currentSize = size) => {
    const queryParams = { page: currentPage, size: currentSize };
    const requestBody = {
      query: searchQuery || undefined,
      skillCriteria: selectedSkillTags.map((tag) => ({
        skillId: tag.skillId,
        minRating: tag.minRating,
      })),
      // TODO: Добавить другие фильтры (course, role, rating) если API их поддерживает
      // Например: course: selectedCourse, category: selectedRole, minAvgRating: selectedRating
    };
    searchMutation.mutate({ params: queryParams, body: requestBody });
  };

  // Вызов поиска при изменении фильтров или пагинации
  // Это нужно делать аккуратно, чтобы не было лишних запросов.
  // Возможно, лучше делать поиск по кнопке или с debounce для текстовых полей.
  useEffect(() => {
    handleSearch();
    // Сбрасываем выбор студентов при каждом новом поиске/фильтрации
    setSelectedStudentsForCompare([]);
  }, [
    searchQuery,
    selectedCourse,
    selectedRole,
    selectedRating,
    selectedSkillTags,
    page,
    size,
  ]); // Обновляем зависимости

  // Filter skills based on search - Эту логику нужно будет переделать
  // Теперь навыки для фильтра (filteredSkills) должны приходить с бэкенда или быть выбраны иначе
  // useEffect(() => { ... });

  // КЛИЕНТСКАЯ ФИЛЬТРАЦИЯ УДАЛЕНА, ТЕПЕРЬ НА БЭКЕНДЕ
  // Сортировка будет производиться с помощью useMemo ниже

  // Используем useMemo для сортировки студентов
  const sortedStudents = useMemo(() => {
    const result = [...students];
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (sortConfig.key === "name") {
          const nameA = `${a.firstName ?? ""} ${a.lastName ?? ""}`
            .toLowerCase()
            .trim();
          const nameB = `${b.firstName ?? ""} ${b.lastName ?? ""}`
            .toLowerCase()
            .trim();
          if (nameA < nameB)
            return sortConfig.direction === "ascending" ? -1 : 1;
          if (nameA > nameB)
            return sortConfig.direction === "ascending" ? 1 : -1;
          return 0;
        }
        if (sortConfig.key === "rating") {
          const ratingA =
            typeof a.averageSkillRating === "number"
              ? a.averageSkillRating
              : -Infinity;
          const ratingB =
            typeof b.averageSkillRating === "number"
              ? b.averageSkillRating
              : -Infinity;
          return sortConfig.direction === "ascending"
            ? ratingA - ratingB
            : ratingB - ratingA;
        }
        if (sortConfig.key === "course") {
          const courseA =
            typeof a.numberCourse === "number" ? a.numberCourse : -Infinity;
          const courseB =
            typeof b.numberCourse === "number" ? b.numberCourse : -Infinity;
          return sortConfig.direction === "ascending"
            ? courseA - courseB
            : courseB - courseA;
        }
        return 0;
      });
    }
    return result;
  }, [students, sortConfig]);

  // Handle sort requests - остается без изменений
  const requestSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Логика добавления/удаления/обновления SkillTags ДОЛЖНА БЫТЬ ПЕРЕДЕЛАНА
  // Теперь selectedSkillTags должен хранить {skillId: number, minRating: number}
  // Для этого нужен доступ к списку всех навыков с их ID.

  const addSkillTagToFilter = (skill: Skill) => {
    // Принимаем объект Skill
    if (!selectedSkillTags.some((tag) => tag.skillId === skill.id)) {
      // Добавляем новый навык в фильтр с дефолтным minRating
      setSelectedSkillTags([
        ...selectedSkillTags,
        { skillId: skill.id, name: skill.name, minRating: 1 },
      ]);
    }
  };

  const removeSkillTagFromFilter = (skillIdToRemove: number) => {
    setSelectedSkillTags(
      selectedSkillTags.filter((tag) => tag.skillId !== skillIdToRemove)
    );
  };

  const updateSkillRatingInFilter = (
    skillIdToUpdate: number,
    newRating: number
  ) => {
    setSelectedSkillTags(
      selectedSkillTags.map((tag) =>
        tag.skillId === skillIdToUpdate ? { ...tag, minRating: newRating } : tag
      )
    );
  };

  const resetFiltersAndSearch = () => {
    setSearchQuery("");
    setSelectedCourse(null);
    setSelectedRole(null);
    setSelectedRating(null);
    setSelectedSkillTags([]);
    setSortConfig({ key: null, direction: "ascending" });
    setPage(0);
    setSkillSearchQuery("");
    // Вызываем поиск с чистыми фильтрами и первой страницей
    // handleSearch(0, size); // Можно сделать так, или useEffect сам среагирует на смену page
  };

  // TODO: Загрузить/определить опции для селектов (роли/категории, диапазоны рейтингов)
  const roleOptions = [
    { value: "frontend", label: "Frontend" },
    { value: "backend", label: "Backend" },
  ]; // Пример
  const ratingOptions = [
    { value: "3", label: "3+" },
    { value: "4", label: "4+" },
  ]; // Пример

  // Обработчик выбора/снятия выбора студента для сравнения
  const handleToggleStudentSelection = (userId: string) => {
    setSelectedStudentsForCompare((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    );
  };

  // Обработчик для кнопки "Сравнить"
  const handleCompareStudents = () => {
    if (selectedStudentsForCompare.length < 2) {
      alert("Выберите как минимум двух студентов для сравнения.");
      return;
    }
    setIsCompareModalOpen(true); // Открываем модальное окно
  };

  return (
    <div className="bg-bg-default min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Рейтинг пользователей
          </h1>{" "}
          {/* Изменено */}
          <p className="mt-2 text-gray-600">
            Просмотр и фильтрация пользователей по различным критериям
          </p>{" "}
          {/* Изменено */}
        </div>

        {/* Filters компонент потребует значительной адаптации */}
        <Filters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCourse={selectedCourse}
          setSelectedCourse={setSelectedCourse}
          // selectedRole, roles, ratings - нужно переделать
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
          roles={roleOptions} // Передаем опции для ролей/категорий
          selectedRating={selectedRating}
          setSelectedRating={setSelectedRating}
          ratingsOptions={ratingOptions} // Передаем опции для рейтинга
          // Логика для skill tags в Filters также потребует переделки
          skillSearchQuery={skillSearchQuery}
          setSkillSearchQuery={setSkillSearchQuery}
          availableSkills={availableSkills} // Передаем загруженные навыки
          addSkillTag={addSkillTagToFilter} // Обновленная функция
          selectedSkillTags={selectedSkillTags} // Теперь это SelectedSkillFilter[]
          removeSkillTag={removeSkillTagFromFilter} // Обновленная функция
          updateSkillLevel={updateSkillRatingInFilter} // Обновленная функция
          resetFilters={resetFiltersAndSearch}
        />

        {(searchMutation.isLoading || isLoadingSkills) && (
          <div>Загрузка данных...</div>
        )}
        {searchMutation.error && (
          <div>Ошибка поиска: {searchMutation.error.message}</div>
        )}

        {/* Кнопка Сравнить */}
        {selectedStudentsForCompare.length > 0 && (
          <div className="my-4 text-right">
            <button
              onClick={handleCompareStudents}
              disabled={
                selectedStudentsForCompare.length < 2 ||
                searchMutation.isLoading
              }
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
            >
              Сравнить{" "}
              {selectedStudentsForCompare.length > 0
                ? `(${selectedStudentsForCompare.length})`
                : ""}
            </button>
          </div>
        )}

        {/* StudentsTable компонент потребует значительной адаптации */}
        <div className="mt-8">
          <StudentsTable
            students={sortedStudents} // Передаем отсортированных пользователей
            sortConfig={sortConfig}
            requestSort={requestSort}
            selectedStudents={selectedStudentsForCompare} // Передаем выбранных студентов
            onToggleStudentSelection={handleToggleStudentSelection} // Передаем обработчик
          />
        </div>
        {/* TODO: Добавить компонент пагинации */}

        <StudentCompareModal
          isOpen={isCompareModalOpen}
          onClose={() => setIsCompareModalOpen(false)}
          studentIds={selectedStudentsForCompare}
        />
      </div>
    </div>
  );
}
// ... остальной код, если есть (комментарии, useEffect для первоначальной загрузки и т.д.)
