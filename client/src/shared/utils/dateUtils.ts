/**
 * Formats a date into a relative time string (e.g., "just now", "5m ago", "2 days ago")
 * @param isoDate ISO date string to format
 * @returns Formatted relative time string
 */
export const formatRelativeTime = (isoDate: string): string => {
  if (!isoDate) return "unknown";

  // Parse the ISO date string
  const inputDate = new Date(isoDate);
  const now = new Date();

  // Calculate the time difference in milliseconds
  const diffMs = now.getTime() - inputDate.getTime();

  // Convert to time units
  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  // Return appropriate relative time string
  if (seconds < 60) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return "1 day ago";
  return `${days} days ago`;
};
