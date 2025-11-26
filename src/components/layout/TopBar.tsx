import { Box } from "lucide-react";

export function TopBar() {
  return (
    <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center px-6 justify-between shrink-0">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-cyan-500/10 rounded-lg">
          <Box className="w-6 h-6 text-cyan-400" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-slate-100 leading-none">3D Product Customizer</h1>
          <p className="text-xs text-slate-400 mt-0.5">Design your own style</p>
        </div>
      </div>
    </div>
  );
}
