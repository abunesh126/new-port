import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import HeroPage from './components/HeroPage';
import TechStack from './components/TechStack';
import GithubStats from './components/GithubStats';
import Projects from './components/Projects';
import ProjectDetails from './components/ProjectDetails';
import Contact from './components/Contact';
import Footer from './components/Footer';

function Home() {
  return (
    <div style={{ paddingTop: 64 }}>
      {/* Hero section */}
      <section id="hero" style={{ scrollMarginTop: 64 }}>
        <HeroPage />
      </section>

      {/* Blog placeholder */}
      <section id="blog" style={{ scrollMarginTop: 64, minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', color: '#64748b', fontSize: '1.1rem' }}>
          Blog — Coming Soon
        </p>
      </section>

      {/* Tech Stack */}
      <TechStack />

      {/* Projects */}
      <section id="projects" style={{ scrollMarginTop: 64 }}>
        <Projects />
      </section>

      {/* Experience placeholder */}
      <section id="experience" style={{ scrollMarginTop: 64, minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', color: '#64748b', fontSize: '1.1rem' }}>
          Experience — Coming Soon
        </p>
      </section>

      {/* GitHub Stats & Achievements */}
      <section id="github-stats" style={{ scrollMarginTop: 64 }}>
        <GithubStats />
      </section>

      {/* Contact */}
      <section id="contact" style={{ scrollMarginTop: 64 }}>
        <Contact />
      </section>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter basename="/Abunesh-RP/">
        {/* Fixed navbar — sits above all content */}
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={
            <div style={{ paddingTop: 64 }}>
              <Projects />
            </div>
          } />
          <Route path="/projects/:projectId" element={
            <div style={{ paddingTop: 64 }}>
              <ProjectDetails />
            </div>
          } />
        </Routes>
        
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
