import { useRef, useEffect } from "react";
import { useCustomizerStore } from "../../state/useCustomizerStore";
import { Mesh, MeshStandardMaterial } from "three";
import { useGLTF } from "@react-three/drei";

// ... (ShoeModel, CubeModel, SphereModel unchanged)

function ShoeModel() {
  const { colors } = useCustomizerStore();
  return (
    <group dispose={null}>
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 1, 4]} />
        <meshStandardMaterial color={colors.base} roughness={0.3} />
      </mesh>
      <mesh position={[1.1, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.2, 0.8, 2]} />
        <meshStandardMaterial color={colors.accent} metalness={0.5} roughness={0.2} />
      </mesh>
      <mesh position={[-1.1, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.2, 0.8, 2]} />
        <meshStandardMaterial color={colors.accent} metalness={0.5} roughness={0.2} />
      </mesh>
      <mesh position={[0, -0.25, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 0.5, 4.2]} />
        <meshStandardMaterial color={colors.sole} roughness={0.8} />
      </mesh>
    </group>
  );
}

function CubeModel() {
  const { colors } = useCustomizerStore();
  return (
    <group dispose={null}>
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color={colors.base} />
      </mesh>
      <mesh position={[0, 0.5, 1.01]} castShadow receiveShadow>
        <planeGeometry args={[1.5, 1.5]} />
        <meshStandardMaterial color={colors.accent} />
      </mesh>
      <mesh position={[0, 1.51, 0]} rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <planeGeometry args={[1.8, 1.8]} />
        <meshStandardMaterial color={colors.sole} />
      </mesh>
    </group>
  );
}

function SphereModel() {
  const { colors } = useCustomizerStore();
  return (
    <group dispose={null}>
      <mesh position={[0, 1, 0]} castShadow receiveShadow>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color={colors.base} />
      </mesh>
      <mesh position={[0, 1, 0]} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.2, 0.1, 16, 100]} />
        <meshStandardMaterial color={colors.accent} />
      </mesh>
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1, 1, 0.2, 32]} />
        <meshStandardMaterial color={colors.sole} />
      </mesh>
    </group>
  );
}

function CustomModel({ url }: { url: string }) {
  const { colors } = useCustomizerStore();
  const { scene } = useGLTF(url);

  // Clone scene to avoid modifying cached GLTF
  const clonedScene = useRef(scene.clone());

  useEffect(() => {
    clonedScene.current = scene.clone();
  }, [scene]);

  // Apply colors to the first 3 meshes found
  useEffect(() => {
    let meshIndex = 0;
    clonedScene.current.traverse((child) => {
      if ((child as Mesh).isMesh) {
        const mesh = child as Mesh;
        if (mesh.material instanceof MeshStandardMaterial) {
          // Clone material to avoid sharing if needed, but for now direct mutation is fine for simple color change
          // Actually, better to clone if we want to be safe, but let's just set color.
          // We need to ensure material is MeshStandardMaterial or similar.
          if (meshIndex === 0) mesh.material.color.set(colors.base);
          else if (meshIndex === 1) mesh.material.color.set(colors.accent);
          else if (meshIndex === 2) mesh.material.color.set(colors.sole);
        }
        meshIndex++;
      }
    });
  }, [colors, clonedScene]);

  return <primitive object={clonedScene.current} />;
}

export function ProductModel() {
  const { currentModel, customModelUrl } = useCustomizerStore();

  switch (currentModel) {
    case "cube":
      return <CubeModel />;
    case "sphere":
      return <SphereModel />;
    case "custom":
      return customModelUrl ? <CustomModel url={customModelUrl} /> : null;
    case "shoe":
    default:
      return <ShoeModel />;
  }
}
