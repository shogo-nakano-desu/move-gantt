import { add } from "date-fns";

// dummy data---------------------------------
const moveDate = new Date(2021, 8, 6);
// -------------------------------------------

export const calendarGen = () => {
  const renderStartDate = add(moveDate, { weeks: -6 });
  const renderLastDate = add(renderStartDate, {
    weeks: 9,
  });
  let renderDates: Date[] = [];

  for (let i = renderStartDate; i < renderLastDate; i = add(i, { days: 1 })) {
    renderDates.push(i);
  }
  return renderDates;
};
