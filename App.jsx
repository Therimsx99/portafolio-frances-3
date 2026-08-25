import { useState, useMemo } from "react";
import {
  X, ExternalLink, Search, Flame, CalendarDays, FileText,
  GraduationCap, Github, Pencil, RefreshCw, ArrowRight,
} from "lucide-react";
import { devoirs } from "./data.js";

const CATEGORIES = [
  { id: "gramatica", label: "Gramática", color: "#8B7CF6" },
  { id: "conjugacion", label: "Conjugación", color: "#46E0B0" },
  { id: "vocabulario", label: "Vocabulario", color: "#F5A65B" },
  { id: "expresion-escrita", label: "Expresión escrita", color: "#60A5FA" },
  { id: "comprension-oral", label: "Comprensión oral", color: "#F472B6" },
  { id: "lectura", label: "Lectura", color: "#FACC15" },
  { id: "cultura", label: "Cultura", color: "#34D399" },
];

const catInfo = (id) => CATEGORIES.find((c) => c.id === id) || CATEGORIES[0];

function formatDateES(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("es-CO", { day: "numeric", month: "short", year: "numeric" });
}

export default function App() {
  const [showHelp, setShowHelp] = useState(false);
  const [activeCategory, setActiveCategory] = useState("todas");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return devoirs
      .filter((d) => activeCategory === "todas" || d.categorie === activeCategory)
      .filter((d) =>
        search.trim() === ""
          ? true
          : (d.titre + d.description).toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [activeCategory, search]);

  const stats = useMemo(() => {
    const total = devoirs.length;
    const diasActivos = new Set(devoirs.map((d) => d.date)).size;
    const ultima = devoirs.length
      ? devoirs.reduce((max, d) => (d.date > max ? d.date : max), devoirs[0].date)
      : null;
    return { total, diasActivos, ultima };
  }, []);

  const heatmap = useMemo(() => buildHeatmap(devoirs), []);

  return (
    <div className="min-h-screen bg-[#0B0E14] text-[#E7E9EE]" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-[#1C2230] bg-[#0B0E14]/90 backdrop-blur">
        <div className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-[#8B7CF6] to-[#46E0B0] flex items-center justify-center shrink-0">
              <GraduationCap size={16} className="text-[#0B0E14]" strokeWidth={2.5} />
            </div>
            <div className="leading-tight">
              <div className="text-[13px] font-semibold">Viviana López Chaves</div>
              <div className="mono text-[10px] text-[#8891A6] tracking-wide">FRANCÉS 3</div>
            </div>
          </div>
          <button
            onClick={() => setShowHelp(true)}
            className="flex items-center gap-1.5 text-xs font-medium px-3.5 py-2 rounded-md border border-[#2C3346] text-[#E7E9EE] hover:border-[#8B7CF6] hover:text-[#8B7CF6] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B7CF6]"
          >
            <Pencil size={13} />
            Cómo agregar una tarea
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-5 pt-14 pb-10 border-b border-[#1C2230]">
        <div className="mono text-[11px] tracking-[0.15em] text-[#8B7CF6] mb-4 flex items-center gap-2 uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#46E0B0]" />
          Portafolio académico
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold leading-[1.1] max-w-2xl tracking-tight">
          Registro de trabajos de francés
        </h1>
        <p className="mt-4 text-[#8891A6] max-w-xl text-[15px] leading-relaxed">
          Evidencia de tareas, ejercicios y proyectos entregados a lo largo del
          curso de Francés 3, organizada como respaldo del trabajo realizado.
        </p>

        <div className="mt-9 grid grid-cols-3 gap-3 sm:gap-6 max-w-lg">
          <Stat label="trabajos registrados" value={stats.total} />
          <Stat label="días activos" value={stats.diasActivos} />
          <Stat
            label="última entrada"
            value={stats.ultima ? formatDateES(stats.ultima) : "—"}
            small
          />
        </div>
      </section>

      {/* Heatmap — signature element */}
      <section className="max-w-5xl mx-auto px-5 py-10 border-b border-[#1C2230]">
        <div className="flex items-center gap-2 mb-5">
          <Flame size={15} className="text-[#F5A65B]" />
          <h2 className="mono text-xs uppercase tracking-wider text-[#8891A6]">
            Actividad — últimas 14 semanas
          </h2>
        </div>
        <div className="overflow-x-auto pb-2">
          <div className="flex gap-[3px] min-w-max">
            {heatmap.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.map((day, di) => (
                  <div
                    key={di}
                    title={`${formatDateES(day.date)} — ${day.count} trabajo${day.count !== 1 ? "s" : ""}`}
                    className="w-3 h-3 rounded-[2px]"
                    style={{ background: intensityColor(day.count) }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4 mono text-[10px] text-[#8891A6]">
          <span>menos</span>
          {[0, 1, 2, 3].map((n) => (
            <div key={n} className="w-3 h-3 rounded-[2px]" style={{ background: intensityColor(n) }} />
          ))}
          <span>más</span>
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-5xl mx-auto px-5 pt-8 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
          <div className="flex flex-wrap gap-2">
            <Chip active={activeCategory === "todas"} onClick={() => setActiveCategory("todas")}>
              Todas
            </Chip>
            {CATEGORIES.map((c) => (
              <Chip
                key={c.id}
                active={activeCategory === c.id}
                onClick={() => setActiveCategory(c.id)}
                dot={c.color}
              >
                {c.label}
              </Chip>
            ))}
          </div>
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8891A6]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar..."
              className="text-xs bg-[#12161F] border border-[#1C2230] rounded-md pl-8 pr-3 py-2 w-full sm:w-52 text-[#E7E9EE] placeholder:text-[#5A6376] focus:outline-none focus:border-[#8B7CF6]"
            />
          </div>
        </div>
      </section>

      {/* List */}
      <section className="max-w-5xl mx-auto px-5 pb-24">
        {filtered.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-[#1C2230] rounded-lg">
            <FileText size={22} className="mx-auto text-[#5A6376] mb-3" />
            <p className="text-[#8891A6] text-sm">
              No hay entradas que coincidan con este filtro.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3 mt-2">
            {filtered.map((d) => {
              const c = catInfo(d.categorie);
              return (
                <article
                  key={d.id}
                  className="bg-[#12161F] border border-[#1C2230] rounded-lg p-4 sm:p-5 flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-5 hover:border-[#2C3346] transition-colors"
                >
                  <div className="flex items-center gap-2 mono text-[11px] text-[#5A6376] sm:w-28 shrink-0 sm:pt-0.5">
                    <CalendarDays size={12} />
                    {formatDateES(d.date)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1.5">
                      <span
                        className="text-[10px] font-medium px-2 py-0.5 rounded-full border"
                        style={{ color: c.color, borderColor: c.color + "55", background: c.color + "14" }}
                      >
                        {c.label}
                      </span>
                      <span
                        className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                          d.statut === "entregado"
                            ? "text-[#46E0B0] bg-[#46E0B014] border border-[#46E0B055]"
                            : "text-[#F5A65B] bg-[#F5A65B14] border border-[#F5A65B55]"
                        }`}
                      >
                        {d.statut === "entregado" ? "Entregado" : "Borrador"}
                      </span>
                    </div>
                    <h3 className="font-semibold text-[15px] text-[#E7E9EE]">{d.titre}</h3>
                    {d.description && (
                      <p className="text-[13px] text-[#8891A6] mt-1 leading-relaxed">{d.description}</p>
                    )}
                    {d.lien && (
                      <a
                        href={d.lien}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-[#8B7CF6] hover:underline inline-flex items-center gap-1 mt-2"
                      >
                        Ver archivo <ExternalLink size={11} />
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <footer className="border-t border-[#1C2230] py-8 text-center">
        <p className="mono text-[11px] text-[#5A6376]">
          Portafolio de Francés 3 — Viviana López Chaves
        </p>
      </footer>

      {/* Help modal: how to add a new entry via GitHub */}
      {showHelp && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-5">
          <div className="bg-[#12161F] border border-[#1C2230] rounded-t-xl sm:rounded-xl w-full sm:max-w-lg max-h-[90vh] overflow-y-auto p-5 sm:p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-semibold flex items-center gap-2">
                <Github size={16} />
                Cómo agregar una tarea nueva
              </h2>
              <button
                onClick={() => setShowHelp(false)}
                aria-label="Cerrar"
                className="text-[#8891A6] hover:text-[#E7E9EE] p-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8B7CF6] rounded"
              >
                <X size={18} />
              </button>
            </div>

            <ol className="flex flex-col gap-4">
              <HelpStep n={1} title="Abre tu repositorio en GitHub">
                Entra a github.com, inicia sesión y abre el repositorio de este proyecto.
              </HelpStep>
              <HelpStep n={2} title="Abre el archivo src/data.js">
                Navega a la carpeta <code className="text-[#8B7CF6]">src</code> y haz clic en{" "}
                <code className="text-[#8B7CF6]">data.js</code>.
              </HelpStep>
              <HelpStep n={3} title="Haz clic en el ícono de lápiz">
                Arriba a la derecha del archivo, para entrar en modo edición.
              </HelpStep>
              <HelpStep n={4} title="Copia un bloque y cámbialo">
                Copia uno de los bloques <code className="text-[#8B7CF6]">{"{ ... }"}</code> que
                ya existen, pégalo antes del cierre <code className="text-[#8B7CF6]">];</code> y
                cambia el título, la categoría, la fecha y la descripción por los de tu nueva tarea.
              </HelpStep>
              <HelpStep n={5} title="Guarda los cambios">
                Baja al final de la página y haz clic en{" "}
                <span className="text-[#E7E9EE] font-medium">"Commit changes"</span>.
              </HelpStep>
              <HelpStep n={6} title="Espera un minuto" icon={<RefreshCw size={13} />}>
                Vercel detecta el cambio automáticamente y actualiza tu página en línea sin que
                tengas que hacer nada más.
              </HelpStep>
            </ol>

            <div className="mt-6 pt-5 border-t border-[#1C2230] text-[12px] text-[#8891A6] leading-relaxed">
              Categorías válidas: gramatica, conjugacion, vocabulario, expresion-escrita,
              comprension-oral, lectura, cultura. Estado: entregado o borrador.
            </div>

            <button
              onClick={() => setShowHelp(false)}
              className="text-xs font-medium w-full mt-6 py-2.5 rounded-md bg-[#8B7CF6] text-[#0B0E14] hover:bg-[#a196f8] transition-colors flex items-center justify-center gap-1.5"
            >
              Entendido <ArrowRight size={13} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, small }) {
  return (
    <div>
      <div className={`mono font-bold text-[#E7E9EE] ${small ? "text-sm sm:text-base" : "text-xl sm:text-2xl"}`}>
        {value}
      </div>
      <div className="text-[10px] text-[#5A6376] mt-1 leading-tight">{label}</div>
    </div>
  );
}

function HelpStep({ n, title, children, icon }) {
  return (
    <li className="flex gap-3">
      <div className="mono text-[11px] w-6 h-6 rounded-full bg-[#1C2230] text-[#8B7CF6] flex items-center justify-center shrink-0 mt-0.5">
        {n}
      </div>
      <div>
        <div className="text-[13px] font-medium text-[#E7E9EE] flex items-center gap-1.5">
          {title} {icon}
        </div>
        <p className="text-[12px] text-[#8891A6] mt-0.5 leading-relaxed">{children}</p>
      </div>
    </li>
  );
}

function Chip({ active, onClick, children, dot }) {
  return (
    <button
      onClick={onClick}
      className={`text-[11px] px-3 py-1.5 rounded-full border transition-colors flex items-center gap-1.5 ${
        active
          ? "bg-[#8B7CF6] border-[#8B7CF6] text-[#0B0E14]"
          : "border-[#1C2230] text-[#8891A6] hover:border-[#8B7CF6] hover:text-[#E7E9EE]"
      }`}
    >
      {dot && <span className="w-1.5 h-1.5 rounded-full" style={{ background: active ? "#0B0E14" : dot }} />}
      {children}
    </button>
  );
}

function intensityColor(count) {
  if (count === 0) return "#171B25";
  if (count === 1) return "#3D3480";
  if (count === 2) return "#5C4FC0";
  return "#8B7CF6";
}

function buildHeatmap(devoirs) {
  const counts = {};
  devoirs.forEach((d) => {
    counts[d.date] = (counts[d.date] || 0) + 1;
  });
  const today = new Date();
  const totalDays = 14 * 7;
  const days = [];
  for (let i = totalDays - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const iso = d.toISOString().slice(0, 10);
    days.push({ date: iso, count: counts[iso] || 0 });
  }
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks;
}
