import React from 'react';

interface EventListProps {
  events: { name: string; startTime: string; endTime: string; description?: string }[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

// Component for list of events for a day
const EventList: React.FC<EventListProps> = ({ events, onEdit, onDelete }) => {
  return (
    <div className="p-4 bg-gray-50 border rounded">
      <h3 className="mb-4 text-lg font-bold">Events</h3>
      {events.length === 0 ? (
        <p>No events for this day.</p>
      ) : (
        <ul className="space-y-4">
          {events.map((event, index) => (
            <li key={index} className="p-3 bg-white border rounded shadow">
              <h4 className="font-bold">{event.name}</h4>
              <p>
                {event.startTime} - {event.endTime}
              </p>
              {event.description && <p className="text-sm">{event.description}</p>}
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => onEdit(index)}
                  className="px-3 py-1 text-white bg-green-500 rounded hover:bg-green-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(index)}
                  className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventList;
