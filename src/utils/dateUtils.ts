import { eachDayOfInterval, endOfMonth, startOfMonth } from 'date-fns';

export const getDaysInMonth = (date: Date): Date[] => {
  return eachDayOfInterval({
    start: startOfMonth(date),
    end: endOfMonth(date),
  });
};
