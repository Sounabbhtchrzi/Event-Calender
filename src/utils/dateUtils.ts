import { eachDayOfInterval, endOfMonth, startOfMonth } from 'date-fns';

export const getDaysInMonth = (date: Date): Date[] => {
  return eachDayOfInterval({
    start: startOfMonth(date),
    end: endOfMonth(date),
  });
};

export const getStartOfMonth = (date: Date): Date => {
  const startOfMonth = new Date(date);
  startOfMonth.setDate(1); // Set the date to the 1st of the month
  startOfMonth.setHours(0, 0, 0, 0); // Set to the start of the day
  return startOfMonth;
};