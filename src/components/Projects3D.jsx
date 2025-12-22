import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Html, Float, PerspectiveCamera } from '@react-three/drei';

const projects = [
  {
    title: "Data Sense",
    description: "Data Sense is a natural language to SQL system with a modern web interface for the Savoy Ice Cream distribution database.",
    link: "https://github.com/MI-Mahin/DataSense.git",
    image: "/projects/data-sense.svg",
    color: "#818cf8"
  },
  {
    title: "Police Positive",
    description: "Police Positive enhances responsiveness, transparency, and public trust by streamlining communication between civilians, on-duty police operators, and supervisors through innovative technology solutions.",
    link: "https://github.com/MI-Mahin/Police-Positive.git",
    image: "/projects/police-positive.svg",
    color: "#a78bfa"
  },
  {
    title: "Sign All",
    description: "Sign All is designed to enhance communication for individuals with hearing disabilities by translating American Sign Language (ASL) gestures into English text and speech.",
    link: "https://github.com/MI-Mahin/sign-all_DP1.git",
    image: "/projects/sign-all.svg",
    color: "#67e8f9"
  },
  {
    title: "OTA Simulator",
    description: "OTA simulator is an interactive visual lab for comparing OTA update algorithms and concurrency problem's solution. Under development.",
    link: "https://github.com/MI-Mahin/OTA-SimLab.git",
    image: "/projects/ota-sim.svg",
    color: "#f9a8d4"
  },
  {
    title: "Portfolio",
    description: "Portfolio is a responsive portfolio website made for personal use, built with React and Vite.",
    link: "https://github.com/MI-Mahin/Portfolio.git",
    image: "/projects/portfolio.svg",
    color: "#6ee7b7"
  },
  {
    title: "Go Travel",
    description: "Go Travel is an interactive travel itinerary website made for making travel plans easily and quickly.",
    link: "https://github.com/MI-Mahin/GoTravel.git",
    image: "/projects/go-travel.svg",
    color: "#fcd34d"
  },
];

function ProjectCard3D({ project, position, index }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      meshRef.current.rotation.y = Math.sin(time * 0.2 + index) * 0.05;
      meshRef.current.position.y = position[1] + Math.sin(time + index * 0.5) * 0.15;
      
      const targetScale = hovered ? 1.08 : 1;
      meshRef.current.scale.x += (targetScale - meshRef.current.scale.x) * 0.1;
      meshRef.current.scale.y += (targetScale - meshRef.current.scale.y) * 0.1;
      meshRef.current.scale.z += (targetScale - meshRef.current.scale.z) * 0.1;
    }
  });
  
  return (
    <Float speed={1} rotationIntensity={0.15} floatIntensity={0.3}>
      <RoundedBox
        ref={meshRef}
        args={[5, 6.5, 0.3]}
        radius={0.15}
        smoothness={4}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setClicked(!clicked)}
      >
        <meshStandardMaterial
          color={hovered ? "#f8fafc" : "#f1f5f9"}
          metalness={0.1}
          roughness={0.8}
          emissive={project.color}
          emissiveIntensity={hovered ? 0.1 : 0.02}
        />
        <Html
          distanceFactor={6}
          position={[0, 0, 0.2]}
          transform
          occlude
          style={{
            width: '440px',
            pointerEvents: 'none'
          }}
        >
          <div className="project-card-3d-content" style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(248,250,252,0.95) 100%)',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: hovered ? '0 12px 32px rgba(0,0,0,0.18)' : '0 6px 20px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease',
            border: '1px solid rgba(226, 232, 240, 0.8)'
          }}>
            <div style={{
              width: '100%',
              height: '240px',
              background: `linear-gradient(135deg, ${project.color}20 0%, ${project.color}40 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderBottom: `2px solid ${project.color}`,
              position: 'relative',
              overflow: 'hidden'
            }}>
              <img 
                src={project.image} 
                alt={project.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 0.9
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML += `<div style="font-size: 48px; color: ${project.color}; font-weight: 700;">${project.title.split(' ').map(w => w[0]).slice(0,2).join('')}</div>`;
                }}
              />
            </div>
            
            <div style={{ padding: '24px' }}>
              <h3 style={{ 
                color: '#1e293b', 
                marginBottom: '12px', 
                fontSize: '22px',
                fontWeight: '700',
                letterSpacing: '-0.02em'
              }}>
                {project.title}
              </h3>
              
              <p style={{ 
                color: '#64748b', 
                fontSize: '14px', 
                lineHeight: '1.7',
                marginBottom: '18px',
                display: '-webkit-box',
                WebkitLineClamp: '3',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                minHeight: '63px'
              }}>
                {project.description}
              </p>
              
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  padding: '11px 24px',
                  background: project.color,
                  color: '#fff',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  pointerEvents: 'auto',
                  fontSize: '15px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  boxShadow: `0 4px 12px ${project.color}40`
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = `0 6px 16px ${project.color}60`;
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = `0 4px 12px ${project.color}40`;
                }}
              >
                View Project →
              </a>
            </div>
          </div>
        </Html>
      </RoundedBox>
    </Float>
  );
}

export default function Projects3D() {
  const positions = [
    [-10, 5, 0],
    [0, 5, 0],
    [10, 5, 0],
    [-10, -5, 0],
    [0, -5, 0],
    [10, -5, 0]
  ];

  return (
    <section id="projects" className="projects-3d">
      <h2>Projects</h2>
      <div className="projects-canvas-container">
        <Canvas camera={{ position: [0, 0, 28], fov: 55 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1.2} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
          
          {projects.map((project, index) => (
            <ProjectCard3D
              key={project.title}
              project={project}
              position={positions[index]}
              index={index}
            />
          ))}
        </Canvas>
      </div>
      <p className="projects-hint">Hover over cards to see details • Click to expand • Drag to rotate</p>
    </section>
  );
}
