import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

export default function FloatingGeometry({ position, geometry, color = '#4fc3f7', speed = 0.3, floatSpeed = 1.5 }) {
  const ref = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.x = t * (speed * 1.2);
      ref.current.rotation.y = t * speed;
      ref.current.position.y = position[1] + Math.sin(t + position[0]) * 0.5 * floatSpeed;
    }
  });

  return (
    <Float speed={floatSpeed} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh ref={ref} position={position}>
        {geometry}
        <meshStandardMaterial
          color={color}
          metalness={0.6}
          roughness={0.3}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
}
