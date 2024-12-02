export function formatDate(isoString: string): string {
  const date = new Date(isoString); // Convert ISO string to Date object
  const month = date.getMonth() + 1; // getMonth() returns 0-indexed month (0 = January)
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
}

export const convertDateToString = (date: Date) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + 1);
  return newDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
