export function formatDate(isoString: string): string {
  const date = new Date(isoString); // Convert ISO string to Date object
  const month = date.getMonth() + 1; // getMonth() returns 0-indexed month (0 = January)
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
}
