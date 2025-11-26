import { useRef } from "react";
import { useCustomizerStore, type ModelType } from "../../state/useCustomizerStore";
import { Box, Circle, Upload, Footprints, type LucideIcon } from "lucide-react";
import clsx from "clsx";

const MODELS: { id: ModelType; name: string; icon: LucideIcon }[] = [
  { id: "shoe", name: "Shoe", icon: Footprints },
  { id: "cube", name: "Cube", icon: Box },
  { id: "sphere", name: "Sphere", icon: Circle },
];

export function ModelSection() {
  const { currentModel, setModel, setCustomModel } = useCustomizerStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomModel(url);
    }
  };

  return (
    <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 mb-6">
      <h2 className="text-xl font-semibold text-slate-100 mb-4">Model</h2>
      <div className="grid grid-cols-2 gap-3 mb-4">
        {MODELS.map((model) => (
          <button
            key={model.id}
            onClick={() => setModel(model.id)}
            className={clsx(
              "flex items-center gap-2 px-4 py-3 rounded-lg border transition-all",
              currentModel === model.id
                ? "bg-cyan-500/10 border-cyan-500 text-cyan-400"
                : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-200"
            )}
          >
            <model.icon size={18} />
            <span className="text-sm font-medium">{model.name}</span>
          </button>
        ))}
      </div>

      <div className="relative">
        <input type="file" accept=".glb,.gltf" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
        <button
          onClick={() => fileInputRef.current?.click()}
          className={clsx(
            "w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-dashed transition-all",
            currentModel === "custom"
              ? "bg-cyan-500/10 border-cyan-500 text-cyan-400"
              : "bg-slate-800/50 border-slate-700 text-slate-400 hover:border-cyan-500/50 hover:text-cyan-400"
          )}
        >
          <Upload size={18} />
          <span className="text-sm font-medium">Upload Custom (GLB)</span>
        </button>
      </div>
    </div>
  );
}
