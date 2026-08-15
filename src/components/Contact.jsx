import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import InteractiveSphere from './shared/InteractiveSphere';
import FloatingGeometry from './shared/FloatingGeometry';


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
