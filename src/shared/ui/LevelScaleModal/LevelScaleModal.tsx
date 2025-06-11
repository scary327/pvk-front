import React from "react";
import { X, AlertCircle } from "lucide-react";
import { Modal } from "../Modal/Modal";

interface LevelScaleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const levelDescriptions = [
  {
    level: 1,
    title: "Новичок",
    description:
      "Специалист только начинает осваивать направление. Есть общее представление, но пока не хватает уверенности для самостоятельной работы. Требуется поддержка и наставничество",
  },
  {
    level: 2,
    title: "Начинающий",
    description:
      "Понимает ключевые концепции и инструменты. Может выполнять простые задачи с ограниченной зоной ответственности. Опирается на готовые решения и примеры",
  },
  {
    level: 3,
    title: "Компетентный",
    description:
      "Способен уверенно решать типовые задачи в рамках направления. Имеет системное понимание и может самостоятельно организовать рабочий процесс",
  },
  {
    level: 4,
    title: "Профессионал",
    description:
      "Умеет справляться со сложными задачами, оптимизировать процессы, предлагать архитектурные или концептуальные решения. Обладает высоким уровнем автономности",
  },
  {
    level: 5,
    title: "Эксперт",
    description:
      "Глубоко понимает предметную область, способен принимать стратегические решения, наставлять других, развивать направление и внедрять лучшие практики",
  },
];

const getScaleStyle = (level: number) => {
  const colors = {
    1: { borderColor: '#f87171', backgroundColor: '#fef2f2', color: '#b91c1c' },
    2: { borderColor: '#fb923c', backgroundColor: '#fff7ed', color: '#c2410c' },
    3: { borderColor: '#fbbf24', backgroundColor: '#fffbeb', color: '#a16207' },
    4: { borderColor: '#4ade80', backgroundColor: '#f0fdf4', color: '#15803d' },
    5: { borderColor: '#34d399', backgroundColor: '#ecfdf5', color: '#047857' },
  };
  return colors[level as keyof typeof colors] || colors[5];
};

export const LevelScaleModal: React.FC<LevelScaleModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-[70vw] max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                Шкала уровня специалиста
              </h3>
              <p className="text-xs text-gray-500">
                Выберите подходящий уровень от 1 до 5
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
        <div className="p-4 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid grid-cols-1 gap-3 max-w-full">
            {levelDescriptions.map((item) => (
              <div
                key={item.level}
                className="p-4 rounded-lg border-2 transition-all hover:shadow-md"
                style={getScaleStyle(item.level)}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-white rounded-full border-2 border-current flex items-center justify-center">
                    <span className="text-sm font-bold">{item.level}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm mb-2">{item.title}</h4>
                    <p className="text-xs leading-relaxed opacity-80 break-words">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-4 border-t border-gray-100 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Понятно
          </button>
        </div>
      </div>
    </Modal>
  );
};
