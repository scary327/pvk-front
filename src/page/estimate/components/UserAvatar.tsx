import * as Avatar from "@radix-ui/react-avatar";

interface User {
  firstName: string;
  lastName: string;
  avatar?: string;
}

interface UserAvatarProps {
  user: User;
}

export const UserAvatar = ({ user }: UserAvatarProps) => {
  return (
    <Avatar.Root className="inline-flex items-center justify-center align-middle overflow-hidden w-12 h-12 rounded-full bg-primary-light">
      {user.avatar && (
        <Avatar.Image
          src={user.avatar}
          alt={`${user.firstName} ${user.lastName}`}
          className="w-full h-full object-cover"
        />
      )}
      <Avatar.Fallback className="w-full h-full flex items-center justify-center bg-primary text-white text-lg font-medium">
        {user.firstName?.charAt(0)}
        {user.lastName?.charAt(0)}
      </Avatar.Fallback>
    </Avatar.Root>
  );
};
