// src/components/FeaturesPage.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Database,     
  Zap, 
  Filter, 
  Search, 
  RefreshCw,
  Code,
  Layers,
  Globe,
  Cpu,
  Shield,
  Box
} from 'lucide-react';
import Footer from './Footer.jsx';
import './FeaturesPage.css';

const FeaturesPage = () => {
  const navigate = useNavigate();

  const frontendFeatures = [
    {
      icon: <Code size={32} />,
      title: "React 19.1.0",
      description: "Framework principal con JSX para componentes modulares",
      tech: "Frontend"
    },
    {
      icon: <Zap size={32} />,
      title: "Framer Motion",
      description: "Animaciones fluidas y transiciones interactivas",
      tech: "UI/UX"
    },
    {
      icon: <Search size={32} />,
      title: "React Router DOM 7.6.2",
      description: "Navegación SPA con rutas: / y /finder",
      tech: "Routing"
    },
    {
      icon: <Filter size={32} />,
      title: "React Select 5.10.1",
      description: "Selectores avanzados para filtros de tipos y generaciones",
      tech: "Components"
    }
  ];

  const backendFeatures = [
    {
      icon: <Database size={32} />,
      title: "PokéAPI Integration",
      description: "Conexión a https://pokeapi.co/api/v2 con axios 1.10.0",
      tech: "API"
    },
    {
      icon: <Shield size={32} />,
      title: "Error Handling",
      description: "Interceptores de axios y manejo robusto de errores",
      tech: "Reliability"
    },
    {
      icon: <RefreshCw size={32} />,
      title: "Cache System",
      description: "Map() cache para evitar llamadas API repetidas",
      tech: "Performance"
    },
    {
      icon: <Cpu size={32} />,
      title: "Timeout Configuration",
      description: "Timeout de 10 segundos para todas las peticiones",
      tech: "Network"
    }
  ];

  const architectureFeatures = [
    {
      icon: <Layers size={32} />,
      title: "Custom Hooks",
      description: "usePokemon.js y useModal.js para lógica separada",
      tech: "Architecture"
    },
    {
      icon: <Box size={32} />,
      title: "Service Layer",
      description: "pokemonService.js centraliza todas las llamadas API",
      tech: "Services"
    },
    {
      icon: <Globe size={32} />,
      title: "Utility Functions",
      description: "pokemonUtils.js con helpers para formateo y filtros",
      tech: "Utils"
    },
    {
      icon: <Filter size={32} />,
      title: "Constants Management",
      description: "pokemonConstants.js con configuraciones centralizadas",
      tech: "Config"
    }
  ];

  const dataFeatures = [
    {
      title: "1,025 Pokémon",
      description: "Soporte completo hasta Generación IX (Paldea)",
      value: "1025"
    },
    {
      title: "9 Generaciones",
      description: "Desde Kanto hasta Paldea con mapeo automático",
      value: "9"
    },
    {
      title: "18 Tipos",
      description: "Todos los tipos con colores personalizados",
      value: "18"
    },
    {
      title: "30 por página",
      description: "Paginación optimizada para mejor rendimiento",
      value: "30"
    }
  ];

  const techStack = [
    { name: "React", version: "19.1.0", type: "Framework" },
    { name: "React Router", version: "7.6.2", type: "Routing" },
    { name: "Framer Motion", version: "12.20.1", type: "Animation" },
    { name: "Axios", version: "1.10.0", type: "HTTP Client" },
    { name: "React Select", version: "5.10.1", type: "UI Component" },
    { name: "React Icons", version: "5.5.0", type: "Icons" },
    { name: "Lucide React", version: "0.525.0", type: "Icons" },
  ];

  return (
    <div className="features-page">
      {/* Header */}
      <header className="features-header">
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
          <h1>Características Técnicas</h1>
          <p>Documentación completa de las funcionalidades implementadas en la PokéDex</p>
        </motion.div>
      </header>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          {dataFeatures.map((stat, index) => (
            <motion.div 
              key={index}
              className="stat-card"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="stat-value">{stat.value}</div>
              <div className="stat-title">{stat.title}</div>
              <div className="stat-description">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Frontend Features */}
      <section className="feature-section">
        <h2>Frontend & UI/UX</h2>
        <div className="features-grid">
          {frontendFeatures.map((feature, index) => (
            <motion.div 
              key={index}
              className="feature-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <div className="feature-content">
                <span className="feature-tech">{feature.tech}</span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Backend Features */}
      <section className="feature-section">
        <h2>Backend & API Integration</h2>
        <div className="features-grid">
          {backendFeatures.map((feature, index) => (
            <motion.div 
              key={index}
              className="feature-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <div className="feature-content">
                <span className="feature-tech">{feature.tech}</span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Architecture Features */}
      <section className="feature-section">
        <h2>Arquitectura & Organización</h2>
        <div className="features-grid">
          {architectureFeatures.map((feature, index) => (
            <motion.div 
              key={index}
              className="feature-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <div className="feature-content">
                <span className="feature-tech">{feature.tech}</span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="tech-stack-section">
        <h2>Stack Tecnológico</h2>
        <div className="tech-stack-grid">
          {techStack.map((tech, index) => (
            <motion.div 
              key={index}
              className="tech-item"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
            >
              <div className="tech-name">{tech.name}</div>
              <div className="tech-version">v{tech.version}</div>
              <div className="tech-type">{tech.type}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Implementation Details */}
      <section className="implementation-section">
        <h2>Detalles de Implementación</h2>
        <div className="implementation-grid">
          <div className="implementation-card">
            <h3>Estructura de Componentes</h3>
            <ul>
              <li><code>App.jsx</code> - Componente raíz con React Router</li>
              <li><code>LandingPage.jsx</code> - Página de inicio con hero section</li>
              <li><code>PokemonFinder.jsx</code> - Buscador principal</li>
              <li><code>FilterBar.jsx</code> - Barra de filtros avanzados</li>
              <li><code>PokemonCard.jsx</code> - Tarjeta individual de Pokémon</li>
              <li><code>PokemonModal.jsx</code> - Modal de detalles</li>
              <li><code>Pagination.jsx</code> - Componente de paginación</li>
            </ul>
          </div>

          <div className="implementation-card">
            <h3>Gestión de Estado</h3>
            <ul>
              <li><strong>useState</strong> - Estados locales de componentes</li>
              <li><strong>useEffect</strong> - Efectos secundarios y ciclo de vida</li>
              <li><strong>usePokemon</strong> - Hook personalizado para lógica Pokémon</li>
              <li><strong>useModal</strong> - Hook para manejo de modales</li>
              <li><strong>Cache Map</strong> - Cache en memoria para optimización</li>
            </ul>
          </div>

          <div className="implementation-card">
            <h3>Funcionalidades API</h3>
            <ul>
              <li><code>getAllPokemonReferences()</code> - Lista completa</li>
              <li><code>getPokemonById()</code> - Detalles específicos</li>
              <li><code>getRandomPokemon()</code> - Pokémon aleatorios</li>
              <li><code>searchPokemonByName()</code> - Búsqueda por nombre</li>
              <li><strong>Timeout</strong> - 10 segundos por petición</li>
              <li><strong>Error Handling</strong> - Interceptores de axios</li>
            </ul>
          </div>

          <div className="implementation-card">
            <h3>Filtros y Utilidades</h3>
            <ul>
              <li><strong>Tipos</strong> - 18 tipos con colores personalizados</li>
              <li><strong>Generaciones</strong> - Mapeo automático I-IX</li>
              <li><strong>Ordenamiento</strong> - Por ID, nombre, altura, peso</li>
              <li><strong>Paginación</strong> - 30 elementos por página</li>
              <li><strong>Búsqueda</strong> - Por nombre e ID</li>
              <li><strong>Cache</strong> - Evita llamadas repetidas</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default FeaturesPage;
