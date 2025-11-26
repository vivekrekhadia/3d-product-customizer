import { useEffect, useMemo } from "react";
import { useCustomizerStore } from "../../state/useCustomizerStore";
import { Mesh, MeshStandardMaterial } from "three";
import { useGLTF } from "@react-three/drei";

// ... (ShoeModel, CubeModel, SphereModel unchanged)

function ShoeModel() {
  const { colors } = useCustomizerStore();
  const { scene } = useGLTF(
    "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb"
  );

  const clone = useMemo(() => {
    const clonedScene = scene.clone();
    clonedScene.traverse((child) => {
      if ((child as Mesh).isMesh) {
        const mesh = child as Mesh;
        if (mesh.material) {
          // Clone material to avoid side-effects
          if (Array.isArray(mesh.material)) {
            mesh.material = mesh.material.map((m) => m.clone());
          } else {
            mesh.material = mesh.material.clone();
          }
        }
      }
    });
    return clonedScene;
  }, [scene]);

  useEffect(() => {
    clone.traverse((child) => {
      if ((child as Mesh).isMesh) {
        const mesh = child as Mesh;
        const material = mesh.material as MeshStandardMaterial;
        const materialName = material.name?.toLowerCase() || "";
        const meshName = mesh.name?.toLowerCase() || "";

        // console.log("Mesh:", meshName, "Material:", materialName);

        if (meshName.includes("laces") || materialName.includes("laces")) {
          material.color.set(colors.accent);
        } else if (meshName.includes("sole") || materialName.includes("sole")) {
          material.color.set(colors.sole);
        } else {
          material.color.set(colors.base);
        }
      }
    });
  }, [colors, clone]);

  return <primitive object={clone} />;
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

  const clone = useMemo(() => {
    const clonedScene = scene.clone();
    clonedScene.traverse((child) => {
      if ((child as Mesh).isMesh) {
        const mesh = child as Mesh;
        if (mesh.material) {
          if (Array.isArray(mesh.material)) {
            mesh.material = mesh.material.map((m) => m.clone());
          } else {
            mesh.material = mesh.material.clone();
          }
        }
      }
    });
    return clonedScene;
  }, [scene]);

  // Apply colors to the first 3 meshes found
  useEffect(() => {
    let meshIndex = 0;
    clone.traverse((child) => {
      if ((child as Mesh).isMesh) {
        const mesh = child as Mesh;
        if (mesh.material instanceof MeshStandardMaterial) {
          if (meshIndex === 0) mesh.material.color.set(colors.base);
          else if (meshIndex === 1) mesh.material.color.set(colors.accent);
          else if (meshIndex === 2) mesh.material.color.set(colors.sole);
        }
        meshIndex++;
      }
    });
  }, [colors, clone]);

  return <primitive object={clone} />;
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

useGLTF.preload(
  "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb"
);
