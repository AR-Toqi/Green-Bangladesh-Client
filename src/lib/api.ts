const rawBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:5000';
const normalizedBaseUrl = rawBaseUrl.endsWith('/') ? rawBaseUrl.slice(0, -1) : rawBaseUrl;

// Always ensure the /api/v1 suffix is present and correctly formatted
export const API_BASE_URL = normalizedBaseUrl.includes('/api/v1') 
  ? normalizedBaseUrl 
  : `${normalizedBaseUrl}/api/v1`;

export const getCleanBaseUrl = (url: string) => {
  return url.endsWith("/") ? url.slice(0, -1) : url;
};
