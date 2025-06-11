import React from "react";
import { X, AlertCircle } from "lucide-react";
import { Modal } from "../Modal/Modal";

interface RatingScaleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ratingDescriptions = [
  {
    level: 1,
    title: "Новичок",
    description: "Не знаком с темой",
  },
  {
    level: 2,
    title: "Начинающий",
    description: "Знает термины, нужна помощь",
  },
  {
    level: 3,
    title: "Базовый",
    description: "Решает простые задачи по примерам",
  },
  {
    level: 4,
    title: "Развивающийся",
    description: "Работает самостоятельно",
  },
  {
    level: 5,
    title: "Компетентный",
    description: "Уверенно выполняет типовые задачи",
  },
  {
    level: 6,
    title: "Продвинутый",
    description: "Решает сложные задачи",
  },
  {
    level: 7,
    title: "Профессионал",
    description: "Использует лучшие практики",
  },
  {
    level: 8,
    title: "Эксперт",
    description: "Может обучать других",
  },
  {
    level: 9,
    title: "Мастер",
    description: "Находит нестандартные решения",
  },
  {
    level: 10,
    title: "Гуру",
    description: "Создает новые подходы",
  },
];

const getScaleColor = (level: number): string => {
  if (level <= 2) return "border-red-300 bg-red-100 text-red-800";
  if (level <= 4) return "border-orange-300 bg-orange-100 text-orange-800";
  if (level <= 6) return "border-yellow-300 bg-yellow-100 text-yellow-800";
  if (level <= 8) return "border-green-300 bg-green-100 text-green-800";
  return "border-blue-300 bg-blue-100 text-blue-800";
};

export const RatingScaleModal: React.FC<RatingScaleModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Шкала оценки навыков
              </h3>
              <p className="text-sm text-gray-500">
                Выберите подходящий уровень от 1 до 10
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="grid grid-cols-2 gap-4">
            {ratingDescriptions.map((item) => (
              <div
                key={item.level}
                className={`relative p-4 rounded-lg border-2 transition-all hover:shadow-md ${getScaleColor(
                  item.level
                )}`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-white rounded-full border-2 border-current flex items-center justify-center">
                    <span className="text-sm font-bold">{item.level}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                    <p className="text-xs leading-relaxed text-current opacity-80">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-gray-100 bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Понятно
          </button>
        </div>
      </div>
    </Modal>
  );
};
