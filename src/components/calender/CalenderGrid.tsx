import React from 'react';
import { getDaysInMonth } from '../../utils/dateUtils';
import DayCell from './DayCell';

interface CalendarGridProps {
  selectedDate: Date;
  events: Record<string, any[]>;
  onDayClick: (date: Date) => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ selectedDate, events, onDayClick }) => {
  const days = getDaysInMonth(selectedDate);

  return (
    <div className="grid grid-cols-7 gap-2 p-4 bg-white">
      {days.map((day) => (
        <DayCell
          key={day.toISOString()}
          date={day}
          events={events[day.toISOString()] || []}
          onClick={() => onDayClick(day)}
        />
      ))}
    </div>
  );
};

export default CalendarGrid;
