import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import InteractiveSphere from './shared/InteractiveSphere';
import FloatingGeometry from './shared/FloatingGeometry';

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || 'https://formspree.io/f/mzepaepa';


const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    if (!name || !email || !message) {
      setStatus({ type: 'error', message: 'Please fill out all fields.' });
      return;
    }

    if (!isValidEmail(email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    if (!FORMSPREE_ENDPOINT) {
      setStatus({
        type: 'error',
        message: 'Form is not configured yet. Add VITE_FORMSPREE_ENDPOINT in your .env file.'
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          message,
          subject: `Portfolio Contact from ${name}`
        })
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setStatus({
        type: 'success',
        message: 'Message sent successfully. I will get back to you soon.'
      });

      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch {
      setStatus({
        type: 'error',
        message: 'Could not send message right now. Please try again or use the direct email link below.'
      });
    } finally {
      setIsSubmitting(false);
    }
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
          
          <FloatingGeometry
            position={[-5, -3, -4]}
            geometry={<torusKnotGeometry args={[0.6, 0.2, 100, 16]} />}
            color="#4fc3f7"
            speed={0.28}
            floatSpeed={1.3}
          />
          <FloatingGeometry
            position={[5, 3, -4]}
            geometry={<octahedronGeometry args={[0.8]} />}
            color="#7dd3fc"
            speed={0.22}
            floatSpeed={1.1}
          />
          <FloatingGeometry
            position={[0, -4, -5]}
            geometry={<icosahedronGeometry args={[0.7]} />}
            color="#38bdf8"
            speed={0.24}
            floatSpeed={1.2}
          />
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
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send'}
          </button>
        </form>

        {status.message && (
          <p className={`contact-status ${status.type}`} role="status" aria-live="polite">
            {status.message}
          </p>
        )}

      </div>
    </section>
  );
};

export default Contact;
