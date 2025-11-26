import { useCustomizerStore, type ColorConfig } from "../../state/useCustomizerStore";

const PRESETS: { name: string; colors: ColorConfig }[] = [
  {
    name: "Classic",
    colors: { base: "#ffffff", accent: "#000000", sole: "#ffffff" },
  },
  {
    name: "Neon",
    colors: { base: "#000000", accent: "#22c55e", sole: "#a855f7" },
  },
  {
    name: "Stealth",
    colors: { base: "#1e293b", accent: "#334155", sole: "#0f172a" },
  },
  {
    name: "Sunset",
    colors: { base: "#f97316", accent: "#a855f7", sole: "#facc15" },
  },
];

export function PresetSection() {
  const { setColors } = useCustomizerStore();

  return (
    <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 mt-6">
      <h2 className="text-xl font-semibold text-slate-100 mb-4">Themes</h2>
      <div className="grid grid-cols-2 gap-3">
        {PRESETS.map((preset) => (
          <button
            key={preset.name}
            onClick={() => setColors(preset.colors)}
            className="px-4 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-medium text-slate-200 transition-colors border border-slate-700 hover:border-cyan-500/50 text-left flex items-center gap-2 group"
          >
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: preset.colors.base }} />
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: preset.colors.accent }} />
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: preset.colors.sole }} />
            </div>
            <span className="group-hover:text-cyan-400 transition-colors">{preset.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
