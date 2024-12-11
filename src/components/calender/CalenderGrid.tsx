import React from 'react';
import { getDaysInMonth, startOfMonth, getDay, addDays } from 'date-fns'; // Import necessary date functions
import DayCell from './DayCell';

interface CalendarGridProps {
  selectedDate: Date;
  events: Record<string, any[]>; // events object that maps dates to events
  onDayClick: (date: Date) => void; // onClick handler for each day
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ selectedDate, events, onDayClick }) => {
  // Get the number of days in the current month
  const daysInMonth = getDaysInMonth(selectedDate);
  
  // Get the first day of the month and its weekday
  const firstDayOfMonth = startOfMonth(selectedDate);
  const startDayOfWeek = getDay(firstDayOfMonth); // 0 = Sunday, 1 = Monday, etc.
  
  // Create an array for the days, starting with padding for the previous month's days
  const days: (Date | null)[] = [];

  // Add empty cells for the padding days (for days before the first day of the month)
  for (let i = 0; i < startDayOfWeek; i++) {
    days.push(null); // These are placeholder days for the previous month
  }
  
  // Add the actual days for the current month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(addDays(firstDayOfMonth, i - 1)); // Add each day of the current month
  }

  // Weekdays header
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="flex flex-col">
      {/* Weekdays Header */}
      <div className="grid grid-cols-7 gap-2 p-2 text-center font-bold">
        {weekDays.map((day) => (
          <div key={day} className="text-gray-700">{day}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 p-4 bg-white">
        {days.map((day, index) => (
          <DayCell
            key={index}
            date={day || new Date(0)} // Use a fallback date (invalid) if the day is null (empty cell)
            events={events[day?.toISOString() || ''] || []}
            onClick={() => day && onDayClick(day)} // Only allow click if the day is valid
          />
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;
