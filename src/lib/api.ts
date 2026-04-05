export const API_BASE_URL = typeof window !== 'undefined' 
  ? '/api/v1' 
  : (process.env.NEXT_PUBLIC_API_BASE_URL || 'https://green-bangladesh-api.vercel.app/api/v1');

export const getCleanBaseUrl = (url: string) => {
  return url.endsWith("/") ? url.slice(0, -1) : url;
};
