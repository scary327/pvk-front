import * as Avatar from "@radix-ui/react-avatar";
// import { getRoleBadgeColor } from '@/page/rating/utils'; // Эта функция, вероятно, не подходит для skillCategoryName
// import { Role } from '@/shared/types/profile'; // Role больше не используется напрямую
import { EvaluationTaskUser } from "@/shared/types/api/evaluations"; // Импортируем новый тип
import { getContrastColor } from "@/shared/utils/colorUtils"; // Импортируем новую функцию

// Старый интерфейс User удаляем или комментируем
// interface User {
//   id: string;
//   firstName: string;
//   lastName: string;
//   avatarUrl: string;
//   role: Role;
// }

interface UserDisplayProps {
  user: EvaluationTaskUser; // Используем EvaluationTaskUser
}

export const UserDisplay = ({ user }: UserDisplayProps) => {
  const badgeStyle = user.skillCategoryColor
    ? {
        backgroundColor: user.skillCategoryColor,
        color: getContrastColor(user.skillCategoryColor),
      }
    : {}; // Пустой объект, если цвет не задан, будут применяться стили из className

  return (
    <div className="flex items-center gap-2">
      <Avatar.Root className="inline-flex h-8 w-8 select-none items-center justify-center overflow-hidden rounded-full align-middle">
        {/* Avatar.Image больше не используется, так как avatarUrl отсутствует в EvaluationTaskUser */}
        {/* <Avatar.Image 
          className="h-full w-full rounded-full object-cover"
          src={user.avatarUrl} 
          alt={`${user.firstName} ${user.lastName}`} 
        /> */}
        <Avatar.Fallback
          className="flex h-full w-full items-center justify-center rounded-full bg-gray-200 text-sm font-medium text-gray-700"
          delayMs={600}
        >
          {user.firstName?.[0]?.toUpperCase()}
          {user.lastName?.[0]?.toUpperCase()}
        </Avatar.Fallback>
      </Avatar.Root>
      <div>
        <p className="text-sm font-medium text-gray-900">
          {user.firstName} {user.middleName || ""} {user.lastName}
        </p>
        {/* Отображаем skillCategoryName вместо role. Стилизацию бейджа можно будет добавить позже. */}
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
            !user.skillCategoryColor ? "bg-gray-100 text-gray-800" : ""
          }`}
          style={badgeStyle}
        >
          {user.skillCategoryName}
        </span>
      </div>
    </div>
  );
};
