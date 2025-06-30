// src/components/AboutPage.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Heart, 
  Code, 
  Coffee, 
  Star, 
  Github,
  Calendar,
  Target,
  Lightbulb,
  Users,
  Zap,
  Database
} from 'lucide-react';
import logopokemon from '../assets/logopokemon.png';
import Footer from './Footer.jsx';
import './AboutPage.css';

const AboutPage = () => {
  const navigate = useNavigate();

  const projectStats = [
    {
      icon: <Code size={24} />,
      label: "Líneas de Código",
      value: "2,500+",
      description: "JSX, CSS y JavaScript"
    },
    {
      icon: <Database size={24} />,
      label: "Pokémon Disponibles",
      value: "1,025",
      description: "Hasta Generación IX"
    },
    {
      icon: <Zap size={24} />,
      label: "Componentes React",
      value: "7",
      description: "Modulares y reutilizables"
    },
    {
      icon: <Star size={24} />,
      label: "Dependencias",
      value: "14",
      description: "Librerías especializadas"
    }
  ];

  const developmentTimeline = [
    {
      phase: "Arquitectura Base",
      description: "Configuración inicial con React Router y estructura de carpetas",
      features: ["React 19.1.0", "Router DOM", "Estructura modular"]
    },
    {
      phase: "Integración API",
      description: "Conexión con PokéAPI y sistema de cache",
      features: ["Axios configuration", "Error handling", "Cache system"]
    },
    {
      phase: "Componentes UI",
      description: "Desarrollo de componentes principales",
      features: ["PokemonCard", "FilterBar", "Pagination", "Modal"]
    },
    {
      phase: "Hooks Personalizados",
      description: "Lógica de negocio separada en hooks",
      features: ["usePokemon", "useModal", "Estado centralizado"]
    },
    {
      phase: "UX/UI Avanzada",
      description: "Animaciones y mejoras visuales",
      features: ["Framer Motion", "Responsive design", "Loading states"]
    }
  ];

  const technologies = [
    {
      category: "Frontend",
      items: [
        { name: "React", purpose: "Framework principal para UI" },
        { name: "JSX", purpose: "Sintaxis declarativa para componentes" },
        { name: "CSS3", purpose: "Estilos y animaciones" },
        { name: "Framer Motion", purpose: "Animaciones fluidas" }
      ]
    },
    {
      category: "Routing & Navigation",
      items: [
        { name: "React Router", purpose: "Navegación SPA" },
        { name: "useNavigate", purpose: "Navegación programática" },
        { name: "Routes/Route", purpose: "Definición de rutas" }
      ]
    },
    {
      category: "Data & API",
      items: [
        { name: "Axios", purpose: "Cliente HTTP para PokéAPI" },
        { name: "PokéAPI", purpose: "Fuente de datos Pokémon" },
        { name: "Map Cache", purpose: "Optimización de consultas" },
        { name: "Error Handling", purpose: "Manejo robusto de errores" }
      ]
    },
    {
      category: "State Management",
      items: [
        { name: "useState", purpose: "Estado local de componentes" },
        { name: "useEffect", purpose: "Efectos secundarios" },
        { name: "Custom Hooks", purpose: "Lógica reutilizable" },
        { name: "Prop Drilling", purpose: "Comunicación entre componentes" }
      ]
    }
  ];

  return (
    <div className="about-page">
      {/* Header */}
      <header className="about-header">
        <button 
          onClick={() => navigate('/')} 
          className="back-btn"
        >
          <ArrowLeft size={20} />
          Volver al Inicio
        </button>
        
        <motion.div 
          className="header-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img src={logopokemon} alt="Logo Pokémon" className="about-logo" />
          <h1>Acerca de PokéDex Pro</h1>
          <p>Una aplicación React moderna para explorar el mundo Pokémon</p>
        </motion.div>
      </header>

      {/* Project Overview */}
      <section className="overview-section">
        <motion.div 
          className="overview-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <h2>Descripción del Proyecto</h2>
          <p>
            PokéDex Pro es una aplicación web desarrollada con React que permite explorar 
            y buscar información detallada sobre Pokémon. Utilizando la PokéAPI como fuente 
            de datos, la aplicación ofrece una interfaz moderna con filtros avanzados, 
            animaciones fluidas y un diseño responsive.
          </p>
          <p>
            El proyecto implementa las mejores prácticas de desarrollo React, incluyendo 
            componentes modulares, hooks personalizados, manejo de estado eficiente y 
            una arquitectura escalable que separa la lógica de negocio de la presentación.
          </p>
        </motion.div>
      </section>

      {/* Project Stats */}
      <section className="stats-section">
        <h2>Estadísticas del Proyecto</h2>
        <div className="stats-grid">
          {projectStats.map((stat, index) => (
            <motion.div 
              key={index}
              className="stat-card"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-description">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Development Timeline */}
      <section className="timeline-section">
        <h2>Proceso de Desarrollo</h2>
        <div className="timeline">
          {developmentTimeline.map((phase, index) => (
            <motion.div 
              key={index}
              className="timeline-item"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3>{phase.phase}</h3>
                <p>{phase.description}</p>
                <ul className="timeline-features">
                  {phase.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Technologies */}
      <section className="tech-section">
        <h2>Tecnologías Implementadas</h2>
        <div className="tech-categories">
          {technologies.map((category, index) => (
            <motion.div 
              key={index}
              className="tech-category"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <h3>{category.category}</h3>
              <div className="tech-items">
                {category.items.map((item, idx) => (
                  <div key={idx} className="tech-item">
                    <div className="tech-name">{item.name}</div>
                    <div className="tech-purpose">{item.purpose}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Project Structure */}
      <section className="structure-section">
        <h2>Estructura del Proyecto</h2>
        <div className="structure-grid">
          <div className="structure-card">
            <h3>src/components/</h3>
            <ul>
              <li><code>App.jsx</code> - Componente raíz</li>
              <li><code>LandingPage.jsx</code> - Página principal</li>
              <li><code>PokemonFinder.jsx</code> - Buscador</li>
              <li><code>FilterBar.jsx</code> - Filtros</li>
              <li><code>PokemonCard.jsx</code> - Tarjetas</li>
              <li><code>PokemonModal.jsx</code> - Detalles</li>
              <li><code>Pagination.jsx</code> - Paginación</li>
            </ul>
          </div>

          <div className="structure-card">
            <h3>src/hooks/</h3>
            <ul>
              <li><code>usePokemon.js</code> - Lógica principal</li>
              <li><code>useModal.js</code> - Manejo de modales</li>
            </ul>
          </div>

          <div className="structure-card">
            <h3>src/services/</h3>
            <ul>
              <li><code>pokemonService.js</code> - API calls</li>
            </ul>
          </div>

          <div className="structure-card">
            <h3>src/utils/</h3>
            <ul>
              <li><code>pokemonUtils.js</code> - Funciones helper</li>
            </ul>
          </div>

          <div className="structure-card">
            <h3>src/constants/</h3>
            <ul>
              <li><code>pokemonConstants.js</code> - Configuraciones</li>
            </ul>
          </div>

          <div className="structure-card">
            <h3>src/assets/</h3>
            <ul>
              <li>Imágenes y recursos estáticos</li>
              <li>Logos y iconos</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Features Highlight */}
      <section className="features-highlight">
        <h2>Características Principales</h2>
        <div className="features-list">
          <div className="feature-item">
            <Target size={20} />
            <div>
              <h4>Búsqueda Avanzada</h4>
              <p>Filtros por tipo, generación, nombre e ID con React Select</p>
            </div>
          </div>
          
          <div className="feature-item">
            <Zap size={20} />
            <div>
              <h4>Animaciones Fluidas</h4>
              <p>Framer Motion para transiciones y micro-interacciones</p>
            </div>
          </div>
          
          <div className="feature-item">
            <Database size={20} />
            <div>
              <h4>Cache Inteligente</h4>
              <p>Sistema de cache para optimizar consultas API</p>
            </div>
          </div>
          
          <div className="feature-item">
            <Users size={20} />
            <div>
              <h4>Responsive Design</h4>
              <p>Adaptable a móviles, tablets y desktop</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutPage;
