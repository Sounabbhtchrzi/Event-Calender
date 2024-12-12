import React from 'react';

interface CalendarHeaderProps {
  currentMonth: string;
  onPrevious: () => void;
  onNext: () => void;
}

//Component for displaying month and year
const CalendarHeader: React.FC<CalendarHeaderProps> = ({ currentMonth, onPrevious, onNext }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700 rounded-t-lg shadow-md">
      <button
        onClick={onPrevious}
        className="p-2 text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        &lt;
      </button>
      <h2 className="text-lg font-semibold text-white">{currentMonth}</h2>
      <button
        onClick={onNext}
        className="p-2 text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        &gt; 
      </button>
    </div>
  );
};

export default CalendarHeader;
