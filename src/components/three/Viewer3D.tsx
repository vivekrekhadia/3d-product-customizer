import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, Environment } from "@react-three/drei";
import { ProductModel } from "./ProductModel";
import { forwardRef } from "react";

export const Viewer3D = forwardRef<HTMLCanvasElement>((_, ref) => {
  return (
    <div className="w-full h-full bg-slate-950 relative overflow-hidden">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 4], fov: 50 }}
        gl={{ preserveDrawingBuffer: true }} // Important for screenshot
        ref={ref}
      >
        <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.5} />
        <Stage environment="city" intensity={0.6}>
          <ProductModel />
        </Stage>
        <Environment preset="city" />
      </Canvas>
    </div>
  );
});

Viewer3D.displayName = "Viewer3D";
