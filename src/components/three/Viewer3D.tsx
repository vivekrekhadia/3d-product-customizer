import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, Environment, useProgress } from "@react-three/drei";
import { ProductModel } from "./ProductModel";
import { forwardRef, Suspense } from "react";

function Loader() {
  const { progress } = useProgress();
  if (progress === 100) return null;
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-slate-950 z-50">
      <div className="text-white text-xl font-medium">{progress.toFixed(0)}% loaded</div>
    </div>
  );
}

export const Viewer3D = forwardRef<HTMLCanvasElement>((_, ref) => {
  return (
    <div className="w-full h-full bg-slate-950 relative overflow-hidden">
      <Loader />
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 4], fov: 50 }}
        gl={{ preserveDrawingBuffer: true }} // Important for screenshot
        ref={ref}
      >
        <Suspense fallback={null}>
          <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.5} />
          <Stage environment="city" intensity={0.6}>
            <ProductModel />
          </Stage>
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
});

Viewer3D.displayName = "Viewer3D";
