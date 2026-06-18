const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export class ApiError extends Error {
  constructor(message, status, payload) {
    super(message);
    this.status = status;
    this.payload = payload;
  }
}

export const apiRequest = async (path, { method = 'GET', token, body, headers = {} } = {}) => {
  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new ApiError(payload.message || 'Something went wrong', response.status, payload);
  }

  return payload;
};
