import React, { useState, useEffect } from 'react';
import { format, addMonths, subMonths, startOfToday } from 'date-fns';
import CalendarHeader from './components/calender/CalenderHeader';
import CalendarGrid from './components/calender/CalenderGrid';
import EventList from './components/calender/EventList';
import AddEventModal from './components/modals/AddEventModal';

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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Load events from localStorage on mount
  useEffect(() => {
    const storedEvents = localStorage.getItem('calendarEvents');
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  // Save events to localStorage on changes
  useEffect(() => {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  }, [events]);

  const handlePreviousMonth = () => setCurrentMonth((prev) => subMonths(prev, 1));
  const handleNextMonth = () => setCurrentMonth((prev) => addMonths(prev, 1));
  const handleDayClick = (date: Date) => setSelectedDate(date);

  const handleAddEvent = (event: Event) => {
    if (!selectedDate) return;

    const dateKey = selectedDate.toISOString();
    setEvents((prev) => {
      const updatedEvents = [...(prev[dateKey] || [])];
      if (editingIndex !== null) {
        // Edit the existing event
        updatedEvents[editingIndex] = event;
      } else {
        // Add a new event
        updatedEvents.push(event);
      }
      return { ...prev, [dateKey]: updatedEvents };
    });

    // Reset states
    setIsModalOpen(false);
    setCurrentEvent(null);
    setEditingIndex(null);
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

  const handleEditEvent = (index: number) => {
    if (!selectedDate) return;

    const dateKey = selectedDate.toISOString();
    const eventToEdit = events[dateKey]?.[index];
    if (eventToEdit) {
      setCurrentEvent(eventToEdit);
      setEditingIndex(index);
      setIsModalOpen(true);
    }
  };

  return (
    <div
      className="w-full h-full bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: "url('/home-bg.png')", 
      }}
    >
      <div className="bg-black bg-opacity-50 w-full h-full p-6 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto mt-10 p-4 min-h-screen">
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
              <h2 className="text-lg font-bold mb-4 text-white">
                Events for {format(selectedDate, 'MMMM dd, yyyy')}
              </h2>
              <EventList
                events={events[selectedDate.toISOString()] || []}
                onEdit={handleEditEvent}
                onDelete={handleDeleteEvent}
              />

              <button
                onClick={() => {
                  setCurrentEvent(null);
                  setEditingIndex(null);
                  setIsModalOpen(true);
                }}
                className="mt-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Add Event
              </button>
            </div>
          )}

          {isModalOpen && (
            <AddEventModal
              isOpen={isModalOpen}
              onClose={() => {
                setIsModalOpen(false);
                setCurrentEvent(null);
                setEditingIndex(null);
              }}
              onAddEvent={handleAddEvent}
              initialEvent={currentEvent || undefined}
              title={currentEvent ? 'Edit Event' : 'Add Event'}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
