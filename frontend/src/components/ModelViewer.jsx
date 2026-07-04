import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1.5} />;
}

function ModelViewer({ url }) {
  return (
    <Canvas
      style={{ height: "500px", width: "100%" }}
      camera={{ position: [3, 3, 3], fov: 60 }}
    >
      <ambientLight intensity={1.5} />
      <directionalLight position={[2, 2, 2]} />

      <Suspense fallback={null}>
        <Model url={url} />
      </Suspense>

      <OrbitControls
  enableRotate={true}
  enableZoom={true}
  enablePan={true}
/>
    </Canvas>
  );
}

export default ModelViewer;