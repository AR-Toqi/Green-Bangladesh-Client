const rawBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://green-bangladesh-api.vercel.app';
const normalizedBaseUrl = rawBaseUrl.endsWith('/') ? rawBaseUrl.slice(0, -1) : rawBaseUrl;

export const API_BASE_URL = typeof window !== 'undefined' 
  ? '/api/v1' 
  : (normalizedBaseUrl.includes('/api/v1') ? normalizedBaseUrl : `${normalizedBaseUrl}/api/v1`);

export const getCleanBaseUrl = (url: string) => {
  return url.endsWith("/") ? url.slice(0, -1) : url;
};
