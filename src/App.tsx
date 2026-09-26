import { useMemo, useState } from 'react';
import { BOOKS, CATEGORIAS, COLECCIONES, norm, type Book } from './data/books';
import { useTengo } from './hooks/useTengo';
import { useTheme } from './hooks/useTheme';

type SortKey = 'nro' | 'titulo' | 'categoria';
type Tri = 'todos' | 'si' | 'no';

function nextTri(t: Tri): Tri {
  return t === 'todos' ? 'si' : t === 'si' ? 'no' : 'todos';
}

function triLabel(base: string, t: Tri): string {
  if (t === 'todos') return base;
  return `${base}: ${t === 'si' ? 'Sí' : 'No'}`;
}

function badgeColor(cat: string): string {
  if (cat.startsWith('Nivel S')) return 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-800';
  if (cat.startsWith('Nivel A')) return 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-200 dark:border-emerald-800';
  if (cat.startsWith('Nivel B')) return 'bg-sky-100 text-sky-900 border-sky-300 dark:bg-sky-950 dark:text-sky-200 dark:border-sky-800';
  return 'bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700';
}

function shortCat(cat: string): string {
  const m = cat.match(/Nivel\s+([A-Z])/);
  return m ? `Nivel ${m[1]}` : cat;
}

export default function App() {
  const { getTengo, toggle, reset, count, total } = useTengo();
  const { theme, toggleTheme } = useTheme();
  const [query, setQuery] = useState('');
  const [coleccion, setColeccion] = useState('');
  const [categoria, setCategoria] = useState('');
  const [tengoFiltro, setTengoFiltro] = useState<Tri>('todos');
  const [mustBuy, setMustBuy] = useState<Tri>('todos');
  const [chicos, setChicos] = useState<Tri>('todos');
  const [mujeres, setMujeres] = useState<Tri>('todos');
  const [sortKey, setSortKey] = useState<SortKey>('nro');
  const [sortDir, setSortDir] = useState<1 | -1>(1);

  const libros: (Book & { tengo: boolean })[] = useMemo(
    () => BOOKS.map((b) => ({ ...b, tengo: getTengo(b.id, b.tengoDefault) })),
    [getTengo],
  );

  const filtrados = useMemo(() => {
    const q = norm(query.trim());
    const list = libros.filter((b) => {
      if (coleccion && b.coleccion !== coleccion) return false;
      if (categoria && b.categoria !== categoria) return false;
      if (tengoFiltro !== 'todos' && b.tengo !== (tengoFiltro === 'si')) return false;
      if (mustBuy !== 'todos' && b.mustBuy !== (mustBuy === 'si')) return false;
      if (chicos !== 'todos' && b.chicos !== (chicos === 'si')) return false;
      if (mujeres !== 'todos' && b.mujeres !== (mujeres === 'si')) return false;
      if (q) {
        const hay = norm(`${b.nro} ${b.titulo} ${b.resenia} ${b.categoria}`);
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    const sorted = [...list].sort((a, c) => {
      let v = 0;
      if (sortKey === 'nro') v = a.nro - c.nro;
      else if (sortKey === 'titulo') v = a.titulo.localeCompare(c.titulo, 'es');
      else v = a.categoria.localeCompare(c.categoria, 'es') || a.nro - c.nro;
      return v * sortDir;
    });
    return sorted;
  }, [libros, query, coleccion, categoria, tengoFiltro, mustBuy, chicos, mujeres, sortKey, sortDir]);

  const hayFiltros =
    query.trim() !== '' || coleccion !== '' || categoria !== '' || tengoFiltro !== 'todos' ||
    mustBuy !== 'todos' || chicos !== 'todos' || mujeres !== 'todos';

  const limpiar = () => {
    setQuery('');
    setColeccion('');
    setCategoria('');
    setTengoFiltro('todos');
    setMustBuy('todos');
    setChicos('todos');
    setMujeres('todos');
    setSortKey('nro');
    setSortDir(1);
  };

  const cambiarOrden = (k: SortKey) => {
    if (k === sortKey) setSortDir((d) => (d === 1 ? -1 : 1));
    else {
      setSortKey(k);
      setSortDir(1);
    }
  };

  const flecha = (k: SortKey) => (sortKey === k ? (sortDir === 1 ? ' ▲' : ' ▼') : '');

  const chip = (active: boolean) =>
    `min-h-[44px] px-3 py-2 rounded-full border text-sm font-medium transition-colors ${
      active
        ? 'bg-slate-900 text-white border-slate-900 dark:bg-slate-100 dark:text-slate-900 dark:border-slate-100'
        : 'bg-white text-slate-700 border-slate-300 hover:border-slate-500 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-700 dark:hover:border-slate-500'
    }`;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <header className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-slate-200 dark:bg-slate-900/95 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 py-3 flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold leading-tight">📚 Mis Libros</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">{COLECCIONES.length} colecciones · Tengo {count}/{total}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
                title={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
                className="min-h-[44px] min-w-[44px] px-3 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-base"
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
              {hayFiltros && (
                <button onClick={limpiar} className="min-h-[44px] px-4 rounded-full bg-slate-100 text-sm font-medium hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700">
                  Limpiar
                </button>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por título, nro o reseña…"
              className="flex-1 min-h-[48px] px-4 rounded-xl border border-slate-300 bg-white text-base outline-none focus:border-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:[color-scheme:dark]"
              type="search"
              aria-label="Buscar libros"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
            <select
              value={coleccion}
              onChange={(e) => setColeccion(e.target.value)}
              className="min-h-[44px] px-3 rounded-full border border-slate-300 bg-white text-sm font-medium max-w-[220px] dark:border-slate-700 dark:bg-slate-900 dark:[color-scheme:dark]"
              aria-label="Filtrar por colección"
            >
              <option value="">Todas las colecciones</option>
              {COLECCIONES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="min-h-[44px] px-3 rounded-full border border-slate-300 bg-white text-sm font-medium dark:border-slate-700 dark:bg-slate-900 dark:[color-scheme:dark]"
              aria-label="Filtrar por categoría"
            >
              <option value="">Todas las categorías</option>
              {CATEGORIAS.map((c) => (
                <option key={c} value={c}>{shortCat(c)}</option>
              ))}
            </select>
            <button className={chip(tengoFiltro !== 'todos')} onClick={() => setTengoFiltro(nextTri(tengoFiltro))} title="Filtrar por Tengo">
              {triLabel('Tengo', tengoFiltro)}
            </button>
            <button className={chip(mustBuy !== 'todos')} onClick={() => setMustBuy(nextTri(mustBuy))} title="Filtrar por MustBuy">
              ★ {triLabel('MustBuy', mustBuy)}
            </button>
            <button className={chip(chicos !== 'todos')} onClick={() => setChicos(nextTri(chicos))} title="Filtrar por Chicos">
              {triLabel('Chicos', chicos)}
            </button>
            <button className={chip(mujeres !== 'todos')} onClick={() => setMujeres(nextTri(mujeres))} title="Filtrar por Mujeres">
              {triLabel('Mujeres', mujeres)}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-4">
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-3" role="status">
          Mostrando {filtrados.length} de {total} · orden: {sortKey === 'nro' ? 'Nro' : sortKey === 'titulo' ? 'Título' : 'Categoría'} {sortDir === 1 ? '↑' : '↓'}
        </p>

        {filtrados.length === 0 ? (
          <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-10 text-center dark:bg-slate-900 dark:border-slate-700">
            <p className="text-lg font-semibold">Sin resultados</p>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Ajusta la búsqueda o limpia los filtros.</p>
            <button onClick={limpiar} className="mt-4 min-h-[44px] px-5 rounded-full bg-slate-900 text-white text-sm font-medium dark:bg-slate-100 dark:text-slate-900">
              Limpiar filtros
            </button>
          </div>
        ) : (
          <>
            {/* Tabla desktop */}
            <div className="hidden md:block bg-white border border-slate-200 rounded-2xl overflow-hidden dark:bg-slate-900 dark:border-slate-800">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-100 text-left dark:bg-slate-800">
                    <th className="p-0">
                      <button onClick={() => cambiarOrden('nro')} className="w-full text-left px-4 py-3 font-semibold hover:bg-slate-200 dark:hover:bg-slate-700">
                        Nro{flecha('nro')}
                      </button>
                    </th>
                    <th className="p-0">
                      <button onClick={() => cambiarOrden('titulo')} className="w-full text-left px-4 py-3 font-semibold hover:bg-slate-200 dark:hover:bg-slate-700">
                        Título{flecha('titulo')}
                      </button>
                    </th>
                    <th className="p-0">
                      <button onClick={() => cambiarOrden('categoria')} className="w-full text-left px-4 py-3 font-semibold hover:bg-slate-200 dark:hover:bg-slate-700">
                        Categoría{flecha('categoria')}
                      </button>
                    </th>
                    <th className="px-4 py-3 font-semibold">Flags</th>
                    <th className="px-4 py-3 font-semibold">Reseña</th>
                    <th className="px-4 py-3 font-semibold text-center">Tengo</th>
                  </tr>
                </thead>
                <tbody>
                  {filtrados.map((b) => (
                    <tr key={b.id} className={`border-t border-slate-100 dark:border-slate-800 ${b.tengo ? 'bg-emerald-50/50 dark:bg-emerald-950/40' : ''}`}>
                      <td className="px-4 py-3 tabular-nums text-slate-500 dark:text-slate-400">{b.nro}</td>
                      <td className="px-4 py-3 font-medium">
                        {b.titulo}
                        {b.mustBuy && <span className="ml-1 text-amber-500 dark:text-amber-400" title="MustBuy">★</span>}
                        <div className="text-xs font-normal text-slate-400 dark:text-slate-500">{b.coleccion}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2 py-0.5 rounded-full border text-xs ${badgeColor(b.categoria)}`} title={b.categoria}>
                          {shortCat(b.categoria)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                        {b.chicos ? 'Chicos ✓' : '—'}{' · '}{b.mujeres ? 'Mujeres ✓' : '—'}
                      </td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300 max-w-xs">{b.resenia}</td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => toggle(b.id, b.tengoDefault)}
                          aria-pressed={b.tengo}
                          aria-label={`Marcar ${b.titulo} como ${b.tengo ? 'no tengo' : 'tengo'}`}
                          className={`min-w-[64px] min-h-[40px] px-4 rounded-full border font-semibold transition-colors ${
                            b.tengo ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-600 border-slate-300 hover:border-emerald-500 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-700'
                          }`}
                        >
                          {b.tengo ? 'Sí' : 'No'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cards móvil */}
            <ul className="md:hidden flex flex-col gap-3">
              {filtrados.map((b) => (
                <li key={b.id} className={`bg-white border rounded-2xl p-4 flex gap-3 dark:bg-slate-900 ${b.tengo ? 'border-emerald-400 dark:border-emerald-600' : 'border-slate-200 dark:border-slate-800'}`}>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2">
                      <span className="text-xs text-slate-400 dark:text-slate-500 tabular-nums mt-0.5">#{b.nro}</span>
                      <h2 className="font-semibold leading-snug flex-1">
                        {b.titulo}
                        {b.mustBuy && <span className="ml-1 text-amber-500 dark:text-amber-400">★</span>}
                      </h2>
                    </div>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{b.coleccion}</p>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      <span className={`px-2 py-0.5 rounded-full border text-xs ${badgeColor(b.categoria)}`}>{shortCat(b.categoria)}</span>
                      {(b.chicos || b.mujeres) && (
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs dark:bg-slate-800 dark:text-slate-300">
                          {[b.chicos && 'Chicos', b.mujeres && 'Mujeres'].filter(Boolean).join(' · ')}
                        </span>
                      )}
                    </div>
                    <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300 leading-snug">{b.resenia}</p>
                  </div>
                  <button
                    onClick={() => toggle(b.id, b.tengoDefault)}
                    aria-pressed={b.tengo}
                    aria-label={`Marcar ${b.titulo} como ${b.tengo ? 'no tengo' : 'tengo'}`}
                    className={`shrink-0 self-start min-w-[64px] min-h-[48px] px-4 rounded-2xl border font-bold transition-colors ${
                      b.tengo ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-500 border-slate-300 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-700'
                    }`}
                  >
                    {b.tengo ? '✓ Sí' : 'No'}
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}

        <footer className="mt-8 text-center pb-8">
          <p className="text-xs text-slate-400 dark:text-slate-500">Tus marcas se guardan solo en este navegador (localStorage).</p>
          <button
            onClick={() => { if (window.confirm('¿Borrar todas tus marcas de Tengo?')) reset(); }}
            className="mt-2 text-xs text-slate-400 underline underline-offset-2 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 min-h-[44px] px-4"
          >
            Borrar todas mis marcas
          </button>
        </footer>
      </main>
    </div>
  );
}
