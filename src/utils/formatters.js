export const formatDate = (value, options = {}) => {
  if (!value) {
    return 'Not available';
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    ...options,
  }).format(new Date(value));
};

export const formatDateTime = (value) => {
  if (!value) {
    return 'Not available';
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value));
};

export const formatDistance = (value) => `${Number(value).toFixed(1)} km`;

export const relativeTime = (value) => {
  const now = Date.now();
  const target = new Date(value).getTime();
  const diffMinutes = Math.round((target - now) / (1000 * 60));

  if (Number.isNaN(diffMinutes)) {
    return 'Just now';
  }

  const abs = Math.abs(diffMinutes);
  const formatter = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  if (abs < 60) {
    return formatter.format(diffMinutes, 'minute');
  }

  const diffHours = Math.round(diffMinutes / 60);
  if (Math.abs(diffHours) < 24) {
    return formatter.format(diffHours, 'hour');
  }

  const diffDays = Math.round(diffHours / 24);
  return formatter.format(diffDays, 'day');
};
