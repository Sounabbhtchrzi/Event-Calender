import React from 'react';
import { getDaysInMonth, startOfMonth, getDay, addDays } from 'date-fns'; 
import DayCell from './DayCell';

interface CalendarGridProps {
  selectedDate: Date;
  events: Record<string, any[]>;
  onDayClick: (date: Date) => void; 
}


//Component to create the Calender grid
const CalendarGrid: React.FC<CalendarGridProps> = ({ selectedDate, events, onDayClick }) => {
 
  const daysInMonth = getDaysInMonth(selectedDate);
  const firstDayOfMonth = startOfMonth(selectedDate);
  const startDayOfWeek = getDay(firstDayOfMonth);

  const days: (Date | null)[] = [];

 
  for (let i = 0; i < startDayOfWeek; i++) {
    days.push(null);
  }
  

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(addDays(firstDayOfMonth, i - 1));
  }


  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="flex flex-col">
  
      <div className="grid grid-cols-7 gap-2 p-2 text-center font-bold bg-gray-100 rounded-t-lg">
        {weekDays.map((day) => (
          <div 
            key={day} 
            className="py-2 text-gray-800 bg-blue-200 rounded-lg shadow-md"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 p-4 bg-white">
        {days.map((day, index) => (
          <DayCell
            key={index}
            date={day || null} 
            events={events[day?.toISOString() || ''] || []}
            onClick={() => day && onDayClick(day)} 
          />
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;
