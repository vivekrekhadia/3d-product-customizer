import { TopBar } from "./components/layout/TopBar";
import { Viewer3D } from "./components/three/Viewer3D";
import { ControlPanel } from "./components/panels/ControlPanel";
import { Download } from "lucide-react";

function App() {
  // We need a way to access the canvas for screenshots.
  // Since Viewer3D wraps Canvas, we can try to get the canvas ref from it if we forwarded it,
  // or we can use a simpler approach: get the canvas by selector when clicking download.
  // Or better, pass a ref to Viewer3D.

  // Actually, R3F's gl.domElement is the canvas.
  // Let's use a simple querySelector approach for simplicity and robustness if ref forwarding is tricky with R3F Canvas.
  // But I added forwardRef to Viewer3D. Let's try to use it.
  // Wait, Viewer3D renders a div wrapping Canvas. The ref on Viewer3D goes to the div?
  // In my implementation: <div ...><Canvas ref={ref} ...></div>
  // R3F Canvas ref usually gives the container or the canvas?
  // It gives the container div by default in some versions, or the canvas in others.
  // Let's assume we can find the canvas inside the wrapper.

  const handleDownload = () => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      const link = document.createElement("a");
      link.setAttribute("download", "my-sneaker-design.png");
      link.setAttribute("href", canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
      link.click();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30">
      <TopBar />

      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* 3D Viewer Area */}
        <div className="flex-1 relative min-h-[50vh] lg:min-h-0 bg-slate-900/20">
          <Viewer3D />

          {/* Floating Action Buttons */}
          <div className="absolute bottom-6 right-6 flex gap-4">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900/80 backdrop-blur-md border border-slate-700 hover:border-cyan-500/50 text-slate-200 rounded-lg shadow-lg transition-all hover:bg-slate-800"
            >
              <Download size={18} />
              <span className="text-sm font-medium">Download Snapshot</span>
            </button>
          </div>
        </div>

        {/* Control Panel Area */}
        <div className="w-full lg:w-[400px] xl:w-[450px] shrink-0 h-[50vh] lg:h-auto border-t lg:border-t-0 lg:border-l border-slate-800 z-10 bg-slate-950">
          <ControlPanel />
        </div>
      </main>
    </div>
  );
}

export default App;
