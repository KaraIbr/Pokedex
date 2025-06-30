import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, 
  Sparkles, 
  Star, 
  ArrowRight, 
  Github, 
  Twitter, 
  Instagram, 
  Mail,
  Heart,
  Code,
  Coffee
} from 'lucide-react';
import logopokemon from '../assets/logopokemon.png'; 

const LandingPage = () => {
  const navigate = useNavigate();

  const handleFindPokemon = () => {
    navigate('/finder');
  };

  const handleEnhancedFinder = () => {
    navigate('/enhanced');
  };

  return (
    <div className="landing-container">
      <nav className="landing-navbar">
        <img src={logopokemon} alt="Logo de Pokémon" />
      </nav>
      
      <main className="center-content">
        <motion.div
          className="hero-section"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="hero-title">
            Descubre el mundo de
            <span className="gradient-text"> Pokémon</span>
          </h1>
          
          <p className="hero-subtitle">
            Explora, filtra y colecciona tus Pokémon favoritos en nuestro sitio.
          </p>

          <div className="cta-buttons">
          

            <motion.button 
              className="cta-btn secondary"
              onClick={handleFindPokemon}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
             Iniciar Busqueda
                            <ArrowRight size={18} />

            </motion.button>
          </div>

          <div className="features-grid">
            <motion.div 
              className="feature-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="feature-icon">
                <Search size={24} />
              </div>
              <h3>Filtros Avanzados</h3>
              <p>Busca por tipo, generación, estadísticas y más</p>
            </motion.div>

            <motion.div 
              className="feature-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className="feature-icon">
                <Star size={24} />
              </div>
              <h3>Colecciones</h3>
              <p>Guarda y organiza tus Pokémon favoritos</p>
            </motion.div>

          
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <motion.footer 
        className="landing-footer"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-brand">
              <img src={logopokemon} alt="Logo de Pokémon" className="footer-logo" />
              <h3>PokéDex Pro</h3>
              <p>Tu guía definitiva para explorar el mundo Pokémon</p>
            </div>
          </div>

          <div className="footer-section">
            <h4>Navegación</h4>
            <ul className="footer-links">
              <li><a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Inicio</a></li>
              <li><a href="/finder" onClick={(e) => { e.preventDefault(); handleFindPokemon(); }}>Buscador</a></li>
              <li><a href="/features" onClick={(e) => { e.preventDefault(); navigate('/features'); }}>Características</a></li>
              <li><a href="/about" onClick={(e) => { e.preventDefault(); navigate('/about'); }}>Acerca de</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Recursos</h4>
            <ul className="footer-links">
              <li><a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer">PokéAPI</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Síguenos</h4>
            <div className="social-links">
              <motion.a 
                href="https://github.com/Karaibr"
                className="social-link"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github size={20} />
              </motion.a>
            </div>
            
            <div className="newsletter">
              <h5>Correo electronico(by FormSubmit)</h5>
              <div className="newsletter-input">
                <input 
                  type="email" 
                  placeholder="ejemplo@gmail.com"
                  required  
                  className="email-input"
                />
                <motion.button 
                  className="subscribe-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowRight size={16} />
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>© 2025 PokéDex Pro. Hecho con <Heart size={16} className="heart-icon" /> por MilKshakes para Dari </p>
            </div>
            <div className="footer-badges">
              <span className="badge">
                <Code size={14} />
                React
              </span>
              <span className="badge">
                <Coffee size={14} />
                Powered by Coffee
              </span>
              <span className="badge">
                <Star size={14} />
                Open Source
              </span>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default LandingPage;