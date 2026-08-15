import Navbar from './components/Navbar';
import ThreeBackground from './components/ThreeBackground';
import Hero3D from './components/Hero3D';
import Education from './components/Education';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import './index.css';
import './App.css';

function App() {
  return (
    <div className="app-3d">
      <ThreeBackground />
      <Navbar />
      <Hero3D />
      <Experience />
      <Education />
      <Projects />
      <Skills />
      <Contact />
    </div>
  );
}

export default App;
