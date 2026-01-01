import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedParticles() {
  const ref = useRef();
  const particlesCount = 2000;
  
  const particles = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return positions;
  }, []);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    ref.current.rotation.x = time * 0.05;
    ref.current.rotation.y = time * 0.075;
  });
  
  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#4f46e5"
        size={0.15}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
}

function FloatingGeometry({ position, geometry, color }) {
  const ref = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    ref.current.rotation.x = time * 0.3;
    ref.current.rotation.y = time * 0.2;
    ref.current.position.y = position[1] + Math.sin(time + position[0]) * 0.5;
  });
  
  return (
    <mesh ref={ref} position={position}>
      {geometry}
      <meshStandardMaterial
        color={color}
        metalness={0.7}
        roughness={0.2}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

export default function ThreeBackground() {
  return (
    <div className="three-background">
      <Canvas
        camera={{ position: [0, 0, 25], fov: 60 }}
        style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: -1, pointerEvents: 'none' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
        
        <AnimatedParticles />
        
        <FloatingGeometry
          // moved much further left and up to ensure it stays outside the profile frame
          position={[-30, 18, -5]}
          geometry={<torusKnotGeometry args={[1.2, 0.35, 120, 20]} />}
          color="#6366f1"
        />
        <FloatingGeometry
          position={[8, -2, -8]}
          geometry={<octahedronGeometry args={[1.5, 0]} />}
          color="#8b5cf6"
        />
        <FloatingGeometry
          position={[0, -5, -10]}
          geometry={<icosahedronGeometry args={[1.2, 0]} />}
          color="#06b6d4"
        />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}
