import { ColorSection } from "./ColorSection";
import { PresetSection } from "./PresetSection";
import { SavedDesignsSection } from "./SavedDesignsSection";
import { ModelSection } from "./ModelSection";

export function ControlPanel() {
  return (
    <div className="h-full overflow-y-auto bg-slate-950 border-l border-slate-800 p-6 custom-scrollbar">
      <div className="max-w-md mx-auto space-y-6">
        <ModelSection />
        <ColorSection />
        <PresetSection />
        <SavedDesignsSection />
      </div>
    </div>
  );
}
