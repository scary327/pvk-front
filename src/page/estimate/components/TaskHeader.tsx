import { UserAvatar } from './UserAvatar';

interface User {
  firstName: string;
  lastName: string;
  role: string;
  avatar: string;
}

interface TaskHeaderProps {
  title: string;
  description: string;
  implementer: User;
  responsible: User;
  deadline: string;
}

export const TaskHeader = ({ title, description, implementer, responsible, deadline }: TaskHeaderProps) => {
  return (
    <div className="p-6 border-b border-gray-200">
      <h1 className="text-2xl font-bold text-default-text mb-4">{title}</h1>
      <p className="text-gray-600 mb-4">{description}</p>
      
      <div className="flex justify-between items-center mt-6">
        <div className="flex gap-6">
          {/* Implementer info */}
          <div className="flex items-center">
            <UserAvatar user={implementer} />
            <div className="ml-3">
              <p className="font-medium text-sm text-default-text">Исполнитель</p>
              <p className="text-default-text">{`${implementer.firstName} ${implementer.lastName}`}</p>
              <p className="text-sm text-gray-500">{implementer.role}</p>
            </div>
          </div>
          
          {/* Responsible info */}
          <div className="flex items-center">
            <UserAvatar user={responsible} />
            <div className="ml-3">
              <p className="font-medium text-sm text-default-text">Ответственный</p>
              <p className="text-default-text">{`${responsible.firstName} ${responsible.lastName}`}</p>
              <p className="text-sm text-gray-500">{responsible.role}</p>
            </div>
          </div>
        </div>
        
        {/* Deadline */}
        <div className="text-right">
          <p className="text-sm text-gray-500">Срок выполнения</p>
          <p className="text-primary font-medium">{deadline}</p>
        </div>
      </div>
    </div>
  );
}; 