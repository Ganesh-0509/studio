'use client';

export function Tree(props) {
  // This is a placeholder for a 3D model.
  // You can replace the <mesh> with a call to useGLTF to load a .gltf, .glb, .vrm, or .draco file.
  // For example:
  // const { scene } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/tree-stump/model.gltf');
  // return <primitive object={scene} {...props} />;

  return (
    <mesh {...props}>
      {/* Trunk */}
      <cylinderGeometry args={[0.2, 0.3, 2, 16]} />
      <meshStandardMaterial color="#8B4513" />

      {/* Crown */}
      <mesh position={[0, 2, 0]}>
        <coneGeometry args={[1, 2, 16]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>
       <mesh position={[0, 2.5, 0]}>
        <coneGeometry args={[0.8, 1.5, 16]} />
        <meshStandardMaterial color="#2E8B57" />
      </mesh>
    </mesh>
  );
}
