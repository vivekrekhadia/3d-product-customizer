import { useState } from "react";
import { useCustomizerStore } from "../../state/useCustomizerStore";
import { Trash2, Upload, Save } from "lucide-react";

export function SavedDesignsSection() {
  const { designs, saveDesign, loadDesign, deleteDesign } = useCustomizerStore();
  const [newDesignName, setNewDesignName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    if (!newDesignName.trim()) return;
    saveDesign(newDesignName);
    setNewDesignName("");
    setIsSaving(false);
  };

  return (
    <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 mt-6">
      <h2 className="text-xl font-semibold text-slate-100 mb-4">Saved Designs</h2>

      {/* Save New Design */}
      <div className="mb-6">
        {!isSaving ? (
          <button
            onClick={() => setIsSaving(true)}
            className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-900/20"
          >
            <Save size={18} />
            Save Current Design
          </button>
        ) : (
          <div className="flex gap-2">
            <input
              type="text"
              value={newDesignName}
              onChange={(e) => setNewDesignName(e.target.value)}
              placeholder="Design Name"
              className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
            />
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-sm font-medium"
            >
              Save
            </button>
            <button
              onClick={() => setIsSaving(false)}
              className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* List of Designs */}
      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
        {designs.length === 0 ? (
          <p className="text-slate-500 text-sm text-center py-4">No saved designs yet.</p>
        ) : (
          designs.map((design) => (
            <div
              key={design.id}
              className="flex items-center justify-between p-3 bg-slate-800 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors group"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="flex flex-col gap-0.5 shrink-0">
                  <div
                    className="w-3 h-3 rounded-full border border-slate-600"
                    style={{ backgroundColor: design.colors.base }}
                  />
                  <div className="flex gap-0.5">
                    <div
                      className="w-3 h-3 rounded-full border border-slate-600"
                      style={{ backgroundColor: design.colors.accent }}
                    />
                    <div
                      className="w-3 h-3 rounded-full border border-slate-600"
                      style={{ backgroundColor: design.colors.sole }}
                    />
                  </div>
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-medium text-slate-200 truncate">{design.name}</h3>
                  <p className="text-xs text-slate-500">{new Date(design.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => loadDesign(design.id)}
                  className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-700 rounded-md transition-colors"
                  title="Load Design"
                >
                  <Upload size={16} />
                </button>
                <button
                  onClick={() => deleteDesign(design.id)}
                  className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-md transition-colors"
                  title="Delete Design"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
