import { useCallback, useEffect, useState } from 'react';
import { BOOKS } from '../data/books';
import { migrateMarks } from '../data/migration';

const STORAGE_KEY = 'booklistpersonal:v2:pedir';
const LEGACY_STORAGE_KEY = 'booklistpersonal:v1:pedir';

function loadOverrides(): Record<string, boolean> {
  try {
    let raw = localStorage.getItem(STORAGE_KEY);
    let legacy = false;
    if (!raw) {
      raw = localStorage.getItem(LEGACY_STORAGE_KEY);
      legacy = !!raw;
    }
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (typeof parsed !== 'object' || parsed === null) return {};
    const out: Record<string, boolean> = {};
    for (const [k, v] of Object.entries(parsed as Record<string, unknown>)) {
      if (typeof v === 'boolean') out[k] = v;
    }
    return legacy ? migrateMarks(out) : out;
  } catch {
    return {};
  }
}

/**
 * Marca "para pedir": libros que te interesan pedir/conseguir.
 * Guarda solo overrides por id estable en localStorage,
 * igual que useTengo, para no perder marcas al crecer la lista.
 */
export function usePedir() {
  const [overrides, setOverrides] = useState<Record<string, boolean>>(loadOverrides);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
    } catch {
      // cuota llena o modo privado: no rompemos la app
    }
  }, [overrides]);

  const getPedir = useCallback((id: string) => overrides[id] ?? false, [overrides]);

  const togglePedir = useCallback((id: string) => {
    setOverrides((prev) => ({ ...prev, [id]: !(prev[id] ?? false) }));
  }, []);

  const resetPedir = useCallback(() => setOverrides({}), []);

  const pedirCount = BOOKS.filter((b) => overrides[b.id] ?? false).length;

  return { overrides, getPedir, togglePedir, resetPedir, pedirCount };
}
