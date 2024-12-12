import { eachDayOfInterval, endOfMonth, startOfMonth } from 'date-fns';

export const getDaysInMonth = (date: Date): Date[] => {
  return eachDayOfInterval({
    start: startOfMonth(date),
    end: endOfMonth(date),
  });
};

export const getStartOfMonth = (date: Date): Date => {
  const startOfMonth = new Date(date);
  startOfMonth.setDate(1); 
  startOfMonth.setHours(0, 0, 0, 0); 
  return startOfMonth;
};