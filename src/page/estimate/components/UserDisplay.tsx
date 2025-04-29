import * as Avatar from '@radix-ui/react-avatar';

// Define types
type Role = 'teamlead' | 'frontend' | 'backend' | 'design' | 'analytics';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  role: Role;
}

// Role badge colors
const roleBadgeColors = {
  teamlead: 'bg-blue-600 text-white',
  frontend: 'bg-green-600 text-white',
  backend: 'bg-purple-600 text-white',
  design: 'bg-orange-600 text-white',
  analytics: 'bg-cyan-600 text-white'
};

interface UserDisplayProps {
  user: User;
}

export const UserDisplay = ({ user }: UserDisplayProps) => (
  <div className="flex items-center gap-2">
    <Avatar.Root className="inline-flex h-8 w-8 rounded-full">
      <Avatar.Image 
        className="h-full w-full rounded-full object-cover"
        src={user.avatarUrl} 
        alt={`${user.firstName} ${user.lastName}`} 
      />
      <Avatar.Fallback className="flex h-full w-full items-center justify-center rounded-full bg-gray-100 text-sm font-medium">
        {user.firstName[0]}{user.lastName[0]}
      </Avatar.Fallback>
    </Avatar.Root>
    <div>
      <p className="text-sm font-medium">{user.firstName} {user.lastName}</p>
      <span className={`inline-block px-2 py-1 text-xs rounded-full ${roleBadgeColors[user.role]}`}>
        {user.role}
      </span>
    </div>
  </div>
); 