import { Canvas } from "@react-three/fiber"
import { OrbitControls, Html } from "@react-three/drei"
import { LANDMARKS } from "../data/landmarks"

export default function MapScene({ onSelectLandmark }) {
  return (
    <Canvas camera={{ position: [10, 10, 10], fov: 45 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 15, 10]} intensity={1} />
      <OrbitControls makeDefault maxPolarAngle={Math.PI / 2.2} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[3, 0, 5]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>

      {LANDMARKS.map((item) => (
        <group key={item.id} position={item.position}>
          <mesh onClick={() => onSelectLandmark && onSelectLandmark(item)}>
            <boxGeometry args={[0.8, item.position[1] * 2, 0.8]} />
            <meshStandardMaterial color={item.color} />
          </mesh>
          <Html position={[0, item.position[1] + 0.6, 0]} center>
            <div className="bg-slate-900/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap border border-slate-700">
              {item.name}
            </div>
          </Html>
        </group>
      ))}
    </Canvas>
  )
}