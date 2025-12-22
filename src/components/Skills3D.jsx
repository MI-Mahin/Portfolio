import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Html, Float } from '@react-three/drei';
import * as THREE from 'three';

const skillCategories = [
  {
    category: "Programming Languages",
    skills: [
      { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg", color: "#A8B9CC" },
      { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", color: "#00599C" },
      { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", color: "#007396" },
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", color: "#3776AB" },
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", color: "#F7DF1E" }
    ]
  },
  {
    category: "Frontend",
    skills: [
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", color: "#61DAFB" },
      { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", color: "#000000" },
      { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", color: "#06B6D4" }
    ]
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", color: "#339933" },
      { name: "Flask", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg", color: "#000000" },
      { name: "Django", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg", color: "#092E20" }
    ]
  },
  {
    category: "Database",
    skills: [
      { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", color: "#4169E1" },
      { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", color: "#4479A1" },
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", color: "#47A248" }
    ]
  }
];

function SkillSphere({ skill, position, index }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      meshRef.current.rotation.y = time * 0.5 + index * 0.2;
      meshRef.current.position.y = position[1] + Math.sin(time + index) * 0.3;
    }
  });
  
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere
        ref={meshRef}
        position={position}
        args={[0.8, 32, 32]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial
          color={hovered ? skill.color : "#6366f1"}
          metalness={0.7}
          roughness={0.2}
          emissive={hovered ? skill.color : "#000000"}
          emissiveIntensity={hovered ? 0.5 : 0}
        />
        <Html distanceFactor={10} position={[0, 0, 0]} center>
          <div className="skill-sphere-label">
            <img src={skill.icon} alt={skill.name} style={{ width: '40px', height: '40px' }} />
            {hovered && <span className="skill-name">{skill.name}</span>}
          </div>
        </Html>
      </Sphere>
    </Float>
  );
}

export default function Skills3D() {
  const allSkills = skillCategories.flatMap(cat => cat.skills);
  
  // Arrange skills in a spherical layout
  const positions = allSkills.map((_, i) => {
    const phi = Math.acos(-1 + (2 * i) / allSkills.length);
    const theta = Math.sqrt(allSkills.length * Math.PI) * phi;
    const radius = 6;
    
    return [
      radius * Math.cos(theta) * Math.sin(phi),
      radius * Math.sin(theta) * Math.sin(phi),
      radius * Math.cos(phi)
    ];
  });

  return (
    <section id="skills" className="skills-3d">
      <h2>Skills</h2>
      <div className="skills-canvas-container">
        <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
          
          {allSkills.map((skill, index) => (
            <SkillSphere
              key={skill.name}
              skill={skill}
              position={positions[index]}
              index={index}
            />
          ))}
        </Canvas>
      </div>
    </section>
  );
}
