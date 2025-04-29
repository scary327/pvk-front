import { ChevronUp, ChevronDown } from 'lucide-react';
import { Student, Role } from '../types';
import { getRoleBadgeColor, getOrdinalSuffix } from '../utils';

type StudentsTableProps = {
  students: Student[];
  sortConfig: {
    key: string | null;
    direction: 'ascending' | 'descending';
  };
  requestSort: (key: string) => void;
};

export const StudentsTable = ({ students, sortConfig, requestSort }: StudentsTableProps) => {
  const renderRatingStars = (rating: number) => {
    return (
      <div className="flex items-center">
        <span className="text-yellow-500 mr-1">★</span>
        <span className="font-medium">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200 bg-[#636ae8] text-white">
        <h3 className="text-lg leading-6 font-medium">
          Студенты ({students.length})
        </h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#636ae8]/10">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#636ae8] uppercase tracking-wider">
                Студент
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#636ae8] uppercase tracking-wider">
                Команды
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-[#636ae8] uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('course')}
              >
                <div className="flex items-center">
                  Курс
                  {sortConfig.key === 'course' && (
                    sortConfig.direction === 'ascending' 
                      ? <ChevronUp className="h-4 w-4 ml-1" /> 
                      : <ChevronDown className="h-4 w-4 ml-1" />
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#636ae8] uppercase tracking-wider">
                Роль
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-[#636ae8] uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('rating')}
              >
                <div className="flex items-center">
                  Рейтинг 
                  {sortConfig.key === 'rating' && (
                    sortConfig.direction === 'ascending' 
                      ? <ChevronUp className="h-4 w-4 ml-1" /> 
                      : <ChevronDown className="h-4 w-4 ml-1" />
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#636ae8] uppercase tracking-wider">
                Навыки
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 relative">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                          {student.avatar ? (
                            <img 
                              src="/api/placeholder/40/40" 
                              alt={`${student.firstName} ${student.lastName}`} 
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <span className="text-xl text-gray-600">
                              {student.firstName[0]}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {student.firstName} {student.lastName}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {student.teams.join(', ')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{student.course}{getOrdinalSuffix(student.course)} курс</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor(
                        student.mainRole
                      )}`}
                    >
                      {student.mainRole.charAt(0).toUpperCase() + student.mainRole.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {renderRatingStars(student.rating)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {student.skillTags.map((tag) => (
                        <div
                          key={tag.id}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-800"
                        >
                          <span className="mr-1">{tag.name}</span>
                          <span className="bg-[#636ae8] text-white px-1 rounded text-xs">
                            {tag.level || 0}
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                  Нет студентов, соответствующих критериям фильтрации. Попробуйте изменить фильтры.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}; 