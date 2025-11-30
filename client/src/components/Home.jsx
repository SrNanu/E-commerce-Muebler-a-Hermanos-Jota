import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import '../styles/Home.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/productos/destacados`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setFeaturedProducts(data.slice(0, 6));
        } else {
          setFeaturedProducts([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error cargando productos destacados:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="modern-home">
      {/* Hero Section */}
      <section className="hero-section">
        <img 
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920&q=80" 
          alt="Hero" 
          className="hero-background"
        />
        <div className="hero-content">
          <h1 className="hero-title">Muebles que Transforman Espacios</h1>
          <p className="hero-subtitle">
            Descubre nuestra colección exclusiva de muebles de alta calidad, 
            diseñados para elevar el estilo y confort de tu hogar
          </p>
          <Link to="/productos" className="hero-cta">
            Explorar Catálogo
            <i className="bi bi-arrow-right"></i>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <i className="bi bi-truck"></i>
            </div>
            <h3 className="feature-title">Envío a Todo el País</h3>
            <p className="feature-description">
              Entregamos tus muebles con el máximo cuidado hasta la puerta de tu hogar
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <i className="bi bi-shield-check"></i>
            </div>
            <h3 className="feature-title">Garantía de Calidad</h3>
            <p className="feature-description">
              Todos nuestros productos cuentan con garantía de fábrica y respaldo total
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <i className="bi bi-credit-card"></i>
            </div>
            <h3 className="feature-title">Múltiples Formas de Pago</h3>
            <p className="feature-description">
              Aceptamos todas las tarjetas, transferencias y financiación sin interés
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <i className="bi bi-star"></i>
            </div>
            <h3 className="feature-title">Diseño Exclusivo</h3>
            <p className="feature-description">
              Piezas únicas seleccionadas por expertos en decoración de interiores
            </p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products-section">
        <div className="section-header">
          <p className="section-subtitle">Productos Premium</p>
          <h2 className="section-title">Nuestra Selección Destacada</h2>
          <p className="section-description">
            Explora los muebles más populares de nuestra colección, 
            elegidos especialmente para ti
          </p>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
          </div>
        ) : (
          <>
            <div className="products-grid">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
            
            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <Link to="/productos" className="hero-cta">
                Ver Todos los Productos
                <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </>
        )}
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">¿Listo para Transformar tu Hogar?</h2>
          <p className="cta-text">
            Contáctanos hoy y descubre cómo nuestros muebles pueden hacer de tu espacio 
            un lugar único y acogedor
          </p>
          <Link to="/contacto" className="cta-button">
            Contáctanos Ahora
            <i className="bi bi-chat-dots"></i>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
