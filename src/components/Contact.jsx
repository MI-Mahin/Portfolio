import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float } from '@react-three/drei';

function InteractiveSphere({ position }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });
  
  return (
    <Sphere
      ref={meshRef}
      position={position}
      args={[1, 64, 64]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <MeshDistortMaterial
        color={hovered ? "#8b5cf6" : "#6366f1"}
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
}

function FloatingGeometry({ position, type }) {
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh position={position}>
        {type === 'torus' && <torusKnotGeometry args={[0.6, 0.2, 100, 16]} />}
        {type === 'octahedron' && <octahedronGeometry args={[0.8]} />}
        {type === 'icosahedron' && <icosahedronGeometry args={[0.7]} />}
        <meshStandardMaterial
          color="#4fc3f7"
          metalness={0.6}
          roughness={0.3}
          emissive="#4fc3f7"
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
}

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="contact-3d">
      <div className="contact-canvas-container">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1.5} />
          <pointLight position={[-5, -5, -5]} color="#3b82f6" intensity={0.5} />
          
          <InteractiveSphere position={[-4, 2, -2]} />
          <InteractiveSphere position={[4, -2, -3]} />
          
          <FloatingGeometry position={[-5, -3, -4]} type="torus" />
          <FloatingGeometry position={[5, 3, -4]} type="octahedron" />
          <FloatingGeometry position={[0, -4, -5]} type="icosahedron" />
        </Canvas>
      </div>
      
      <div className="contact-content-overlay">
        <h2>Contact Me</h2>
        <form onSubmit={handleSubmit} className="contact-form-3d">
          <input 
            type="text" 
            name="name"
            placeholder="Your Name" 
            value={formData.name}
            onChange={handleChange}
            required 
          />
          <input 
            type="email" 
            name="email"
            placeholder="Your Email" 
            value={formData.email}
            onChange={handleChange}
            required 
          />
          <textarea 
            name="message"
            placeholder="Message" 
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit">Send</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
