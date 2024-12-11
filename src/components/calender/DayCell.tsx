import React from 'react';
import { format, isToday } from 'date-fns';

interface DayCellProps {
  date: Date;
  events: any[];
  onClick: () => void;
}

const DayCell: React.FC<DayCellProps> = ({ date, events, onClick }) => {
  const isCurrentDay = isToday(date);

  return (
    <div
      onClick={onClick}
      className={`p-4 border rounded cursor-pointer ${
        isCurrentDay ? 'bg-blue-100 border-blue-500' : 'bg-gray-50'
      } hover:bg-blue-50`}
    >
      <div className="text-sm font-bold">{format(date, 'd')}</div>
      {events.length > 0 && (
        <div className="mt-2 text-xs text-white bg-blue-500 rounded-full px-2 py-1">
          {events.length} events
        </div>
      )}
    </div>
  );
};

export default DayCell;
