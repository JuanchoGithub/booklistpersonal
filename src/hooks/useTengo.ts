import { useCallback, useEffect, useState } from 'react';
import { BOOKS } from '../data/books';

const STORAGE_KEY = 'booklistpersonal:v1:tengo';

function loadOverrides(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (typeof parsed !== 'object' || parsed === null) return {};
    const out: Record<string, boolean> = {};
    for (const [k, v] of Object.entries(parsed as Record<string, unknown>)) {
      if (typeof v === 'boolean') out[k] = v;
    }
    return out;
  } catch {
    return {};
  }
}

/**
 * Guarda solo los overrides de "tengo" por id estable.
 * Así futuras listas (nuevos libros en el seed) no borran tus marcas.
 */
export function useTengo() {
  const [overrides, setOverrides] = useState<Record<string, boolean>>(loadOverrides);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
    } catch {
      // cuota llena o modo privado: no rompemos la app
    }
  }, [overrides]);

  const getTengo = useCallback(
    (id: string, tengoDefault: boolean) => overrides[id] ?? tengoDefault,
    [overrides],
  );

  const toggle = useCallback((id: string, tengoDefault: boolean) => {
    setOverrides((prev) => {
      const current = prev[id] ?? tengoDefault;
      return { ...prev, [id]: !current };
    });
  }, []);

  const setAll = useCallback((value: boolean) => {
    setOverrides(() => {
      const next: Record<string, boolean> = {};
      for (const b of BOOKS) next[b.id] = value;
      return next;
    });
  }, []);

  const reset = useCallback(() => setOverrides({}), []);

  const count = BOOKS.filter((b) => overrides[b.id] ?? b.tengoDefault).length;

  return { overrides, getTengo, toggle, setAll, reset, count, total: BOOKS.length };
}
