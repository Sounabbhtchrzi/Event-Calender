import React, { useState, useEffect } from 'react';
import { format, addMonths, subMonths, startOfToday } from 'date-fns';
import CalendarHeader from './components/calender/CalenderHeader';
import CalendarGrid from './components/calender/CalenderGrid';
import EventList from './components/calender/EventList';

interface Event {
  name: string;
  startTime: string;
  endTime: string;
  description?: string;
}

const App: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(startOfToday());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [events, setEvents] = useState<Record<string, Event[]>>({});

  useEffect(() => {
    const storedEvents = localStorage.getItem('calendarEvents');
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  }, [events]);

  const handlePreviousMonth = () => {
    setCurrentMonth((prev) => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => addMonths(prev, 1));
  };

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleAddEvent = (newEvent: Event) => {
    if (!selectedDate) return;

    const dateKey = selectedDate.toISOString();
    setEvents((prev) => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), newEvent],
    }));
  };

  const handleEditEvent = (index: number, updatedEvent: Event) => {
    if (!selectedDate) return;

    const dateKey = selectedDate.toISOString();
    setEvents((prev) => {
      const updatedEvents = [...(prev[dateKey] || [])];
      updatedEvents[index] = updatedEvent;
      return { ...prev, [dateKey]: updatedEvents };
    });
  };

  const handleDeleteEvent = (index: number) => {
    if (!selectedDate) return;

    const dateKey = selectedDate.toISOString();
    setEvents((prev) => {
      const updatedEvents = [...(prev[dateKey] || [])];
      updatedEvents.splice(index, 1);
      return { ...prev, [dateKey]: updatedEvents };
    });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <CalendarHeader
        currentMonth={format(currentMonth, 'MMMM yyyy')}
        onPrevious={handlePreviousMonth}
        onNext={handleNextMonth}
      />

      <CalendarGrid
        selectedDate={currentMonth}
        events={events}
        onDayClick={handleDayClick}
      />

      {selectedDate && (
        <div className="mt-6">
          <h2 className="text-lg font-bold mb-4">
            Events for {format(selectedDate, 'MMMM dd, yyyy')}
          </h2>
          <EventList
            events={events[selectedDate.toISOString()] || []}
            onEdit={(index) => {
              const eventToEdit = events[selectedDate.toISOString()]?.[index];
              if (eventToEdit) {
                const updatedEvent = { ...eventToEdit, name: prompt('Edit event name:', eventToEdit.name) || eventToEdit.name };
                handleEditEvent(index, updatedEvent);
              }
            }}
            onDelete={handleDeleteEvent}
          />

          <button
            onClick={() => {
              const name = prompt('Event name:');
              const startTime = prompt('Start time (e.g., 10:00 AM):');
              const endTime = prompt('End time (e.g., 11:00 AM):');
              const description = prompt('Description (optional):') || undefined;


              if (name && startTime && endTime) {
                handleAddEvent({ name, startTime, endTime, description });
              } else {
                alert('Please provide all required event details.');
              }
            }}
            className="mt-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Add Event
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
