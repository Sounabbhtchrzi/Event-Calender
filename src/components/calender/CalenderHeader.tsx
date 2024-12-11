import React from 'react';

interface CalendarHeaderProps {
  currentMonth: string;
  onPrevious: () => void;
  onNext: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ currentMonth, onPrevious, onNext }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-100 border-b">
      <button
        onClick={onPrevious}
        className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Previous
      </button>
      <h2 className="text-lg font-bold">{currentMonth}</h2>
      <button
        onClick={onNext}
        className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Next
      </button>
    </div>
  );
};

export default CalendarHeader;
