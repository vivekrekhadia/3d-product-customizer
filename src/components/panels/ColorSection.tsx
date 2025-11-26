import { useCustomizerStore, type ColorConfig } from "../../state/useCustomizerStore";
import clsx from "clsx";

const COLORS = [
  { name: "White", value: "#ffffff" },
  { name: "Black", value: "#000000" },
  { name: "Red", value: "#ef4444" },
  { name: "Blue", value: "#3b82f6" },
  { name: "Cyan", value: "#06b6d4" },
  { name: "Green", value: "#22c55e" },
  { name: "Purple", value: "#a855f7" },
  { name: "Orange", value: "#f97316" },
];

interface ColorRowProps {
  label: string;
  part: keyof ColorConfig;
}

function ColorRow({ label, part }: ColorRowProps) {
  const { colors, setColor } = useCustomizerStore();
  const currentColor = colors[part];

  return (
    <div className="mb-6">
      <label className="text-sm font-medium text-slate-400 mb-3 block uppercase tracking-wider">{label}</label>
      <div className="flex flex-wrap gap-3 items-center">
        {COLORS.map((c) => (
          <button
            key={c.value}
            onClick={() => setColor(part, c.value)}
            className={clsx(
              "w-8 h-8 rounded-full border-2 transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900",
              currentColor === c.value ? "border-cyan-400 scale-110" : "border-transparent hover:border-slate-600"
            )}
            style={{ backgroundColor: c.value }}
            aria-label={`Select ${c.name} for ${label}`}
            title={c.name}
          />
        ))}
        <div className="relative group">
          <div
            className={clsx(
              "w-8 h-8 rounded-full border-2 flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-800 transition-all group-hover:scale-110",
              !COLORS.some((c) => c.value === currentColor) ? "border-cyan-400" : "border-slate-600"
            )}
          >
            <span className="text-xs text-slate-400">+</span>
          </div>
          <input
            type="color"
            value={currentColor}
            onChange={(e) => setColor(part, e.target.value)}
            className="w-8 h-8 opacity-0 absolute inset-0 cursor-pointer z-10"
            title="Custom Color"
          />
        </div>
      </div>
    </div>
  );
}

export function ColorSection() {
  return (
    <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
      <h2 className="text-xl font-semibold text-slate-100 mb-6">Colors</h2>
      <ColorRow label="Base" part="base" />
      <ColorRow label="Accent" part="accent" />
      <ColorRow label="Sole" part="sole" />
    </div>
  );
}
