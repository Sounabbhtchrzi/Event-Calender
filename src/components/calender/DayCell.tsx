import React from 'react';
import { format, isToday } from 'date-fns';

interface DayCellProps {
  date: Date | null;
  events: any[];
  onClick: () => void;
}

// Component for displaying each day cell
const DayCell: React.FC<DayCellProps> = ({ date, events, onClick }) => {
  if (!date) return <div className="p-4" />;

  const isCurrentDay = isToday(date);

  return (
    <div
      onClick={onClick}
      className={`relative p-4 border rounded-lg cursor-pointer transition-all duration-200 ease-in-out ${
        isCurrentDay ? 'bg-blue-200 border-blue-600' : 'bg-gray-50'
      } hover:bg-blue-100 focus:ring-2 focus:ring-blue-400`}
    >
      <div className="text-sm font-semibold text-gray-800">{format(date, 'd')}</div>
      {events.length > 0 && (
        <div className="absolute top-1 right-1 bg-blue-500 text-white text-xs font-semibold rounded-full px-2 py-1">
          {events.length}
        </div>
      )}
    </div>
  );
};

export default DayCell;
