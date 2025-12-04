import { CONFIG } from "../config/config";

interface TempEntry {
  data: string;
  expiresAt: number;
}

const tempStore: Record<string, TempEntry> = {};

export function saveTemp(id: string, data: string) {
  tempStore[id] = {
    data,
    expiresAt: Date.now() + CONFIG.EXPIRY_MS,
  };
}

export function getTemp(id: string): string | null {
  const entry = tempStore[id];
  if (!entry) return null;

  if (Date.now() > entry.expiresAt) {
    delete tempStore[id];
    return null;
  }

  return entry.data;
}
