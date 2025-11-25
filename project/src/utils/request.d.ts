// src/types/request.d.ts
declare module '@/utils/request' {
  export const request: (url: string, options?: RequestInit) => Promise<any>;
}