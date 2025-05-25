import React, { useState, useEffect, useRef } from "react";
import { GetSkillCategoriesQueryParams } from "@/shared/types/api/skillCategories";
import { useSkillCategories } from "@/entities/skillCategories/hooks/useSkillCategories";
import { useUpdateMainSkillCategory } from "@/entities/profile/hooks/useUpdateMainSkillCategory";
import { getContrastColor } from "@/shared/utils/colorUtils";
import { XIcon } from "lucide-react";

interface SelectMainCategoryPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  currentCategoryId?: number;
  anchorElement: HTMLElement | null;
}

export const SelectMainCategoryPopover = ({
  isOpen,
  onClose,
  currentCategoryId,
  anchorElement,
}: SelectMainCategoryPopoverProps) => {
  const [page, setPage] = useState(0);
  const pageSize = 10;
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        anchorElement &&
        !anchorElement.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, anchorElement]);

  const queryParams: GetSkillCategoriesQueryParams = {
    page,
    size: pageSize,
  };

  const {
    data: categoriesResponse,
    isLoading: isLoadingCategories,
    isError,
    error,
  } = useSkillCategories(queryParams, {
    keepPreviousData: true,
    enabled: isOpen,
  });

  const updateCategoryMutation = useUpdateMainSkillCategory({
    onSuccess: () => {
      onClose();
    },
    onError: (err) => {
      console.error("Failed to update main skill category", err);
      alert(`Ошибка обновления категории: ${err.message}`);
    },
  });

  const handleSelectCategory = (categoryId: number) => {
    updateCategoryMutation.mutate({ skillCategoryId: categoryId });
  };

  if (!isOpen || !anchorElement) return null;

  const categories = categoriesResponse?.content || [];
  const totalPages = categoriesResponse?.totalPages || 0;
  const hasCategories = categories.length > 0;

  const rect = anchorElement.getBoundingClientRect();
  const popoverStyle: React.CSSProperties = {
    position: "absolute",
    top: rect.bottom + window.scrollY + 8,
    left: rect.left + window.scrollX,
    zIndex: 50,
  };

  return (
    <div
      ref={popoverRef}
      style={popoverStyle}
      className="bg-white rounded-lg shadow-xl p-4 w-72 max-h-[350px] flex flex-col border border-gray-200"
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-md font-semibold text-gray-800">
          Сменить категорию
        </h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
        >
          <XIcon size={18} />
        </button>
      </div>

      {isLoadingCategories && (
        <div className="text-sm text-center py-4 text-gray-500">
          Загрузка...
        </div>
      )}
      {isError && (
        <div className="text-sm text-red-500 text-center py-4">
          Ошибка: {error?.message}
        </div>
      )}

      {!isLoadingCategories && !isError && (
        <>
          <ul className="space-y-1 flex-grow overflow-y-auto mb-3 pr-1 text-sm">
            {categories.map((category) => (
              <li key={category.id}>
                <button
                  onClick={() => handleSelectCategory(category.id)}
                  disabled={
                    updateCategoryMutation.isLoading ||
                    category.id === currentCategoryId
                  }
                  className={`w-full text-left p-2 rounded transition-colors
                    hover:bg-gray-100 
                    disabled:opacity-60 disabled:cursor-not-allowed 
                    ${
                      category.id === currentCategoryId
                        ? "bg-blue-500 text-white font-semibold focus:outline-none focus:ring-1 focus:ring-blue-400"
                        : "text-gray-700 hover:text-gray-900"
                    }`}
                  style={
                    category.id !== currentCategoryId && category.color
                      ? {
                          backgroundColor: category.color,
                          color: getContrastColor(category.color),
                        }
                      : {}
                  }
                >
                  {category.name}
                  {category.id === currentCategoryId && " ✓"}
                </button>
              </li>
            ))}
            {!hasCategories && (
              <p className="text-xs text-gray-500 text-center py-3">
                Категории не найдены.
              </p>
            )}
          </ul>

          {totalPages > 1 && (
            <div className="flex justify-between items-center pt-3 border-t border-gray-200">
              <button
                onClick={() => setPage((prev) => Math.max(0, prev - 1))}
                disabled={
                  page === 0 ||
                  isLoadingCategories ||
                  updateCategoryMutation.isLoading
                }
                className="px-3 py-1.5 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50 transition-colors"
              >
                Назад
              </button>
              <span className="text-xs text-gray-500">
                Стр. {page + 1}/{totalPages}
              </span>
              <button
                onClick={() =>
                  setPage((prev) => Math.min(totalPages - 1, prev + 1))
                }
                disabled={
                  page === totalPages - 1 ||
                  isLoadingCategories ||
                  updateCategoryMutation.isLoading
                }
                className="px-3 py-1.5 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50 transition-colors"
              >
                Вперед
              </button>
            </div>
          )}
        </>
      )}
      {updateCategoryMutation.isLoading && (
        <p className="mt-2 text-xs text-center text-blue-500">Обновление...</p>
      )}
    </div>
  );
};
