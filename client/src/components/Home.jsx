import React, { useState, useEffect } from 'react';

const Home = ({ onProductSelect, onNavigate }) => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:4000/api/productos', { 
      headers: { "Authorization": "muebles123" } 
    })
      .then(res => res.json())
      .then(data => {
        // Filtrar solo productos destacados
        const destacados = data.filter(p => p.destacado);
        setFeaturedProducts(destacados);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error cargando productos destacados:', err);
        setLoading(false);
      });
  }, []);

  const carouselImages = [
    {
      url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920&q=80',
      title: 'Muebles de Calidad',
      subtitle: 'Diseños exclusivos para tu hogar'
    },
    {
      url: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=1920&q=80',
      title: 'Estilo y Confort',
      subtitle: 'Cada pieza cuenta una historia'
    },
    {
      url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&q=80',
      title: 'Elegancia Atemporal',
      subtitle: 'Muebles que perduran en el tiempo'
    }
  ];

  return (
    <div>
      {/* Carrusel Hero */}
      <div id="heroCarousel" className="carousel slide mb-5" data-bs-ride="carousel">
        <div className="carousel-indicators">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#heroCarousel"
              data-bs-slide-to={index}
              className={index === 0 ? 'active' : ''}
              aria-current={index === 0 ? 'true' : 'false'}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>
        
        <div className="carousel-inner">
          {carouselImages.map((image, index) => (
            <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
              <div 
                className="d-block w-100" 
                style={{
                  height: '500px',
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${image.url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="carousel-caption d-flex flex-column justify-content-center h-100">
                  <h1 className="display-3 fw-bold mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                    {image.title}
                  </h1>
                  <p className="lead fs-4 mb-4" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                    {image.subtitle}
                  </p>
                  <div>
                    <button 
                      className="btn btn-lg px-5 py-3 fw-bold"
                      onClick={() => onNavigate('products')}
                      style={{
                        backgroundColor: '#D4A437',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '50px',
                        boxShadow: '0 4px 15px rgba(212, 164, 55, 0.4)',
                        transition: 'all 0.3s'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#E5B547';
                        e.target.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#D4A437';
                        e.target.style.transform = 'scale(1)';
                      }}
                    >
                      Ver Catálogo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Anterior</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>

      <div className="container mb-5">
        <div className="row g-4 text-center">
          <div className="col-md-4">
            <div className="p-4">
              <div className="mb-3" style={{ fontSize: '3rem' }}>🚚</div>
              <h4 className="fw-bold">Envío a Todo el País</h4>
              <p className="text-muted">Llevamos tus muebles hasta tu hogar con el máximo cuidado</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4">
              <div className="mb-3" style={{ fontSize: '3rem' }}>🛡️</div>
              <h4 className="fw-bold">Garantía de Calidad</h4>
              <p className="text-muted">Todos nuestros productos tienen garantía de fábrica</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4">
              <div className="mb-3" style={{ fontSize: '3rem' }}>💳</div>
              <h4 className="fw-bold">Múltiples Pagos</h4>
              <p className="text-muted">Aceptamos todas las formas de pago y financiación</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mb-5">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold mb-3" style={{ color: '#8B4513' }}>
            Productos Destacados
          </h2>
          <p className="lead text-muted">Descubre nuestra selección especial de muebles premium</p>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border" style={{ color: '#8B4513' }} role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {featuredProducts.map(product => (
              <div key={product.id} className="col">
                <div 
                  className="card h-100 shadow-sm border-0" 
                  style={{ 
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    cursor: 'pointer'
                  }}
                  onClick={() => onProductSelect(product.id)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                  }}
                >
                  <div style={{ position: 'relative', overflow: 'hidden' }}>
                    <img 
                      src={`http://localhost:4000/${product.imagen}`} 
                      className="card-img-top" 
                      alt={product.titulo}
                      style={{ 
                        height: '250px', 
                        objectFit: 'cover',
                        transition: 'transform 0.3s'
                      }}
                      onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                      onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                    />
                    <span 
                      className="badge position-absolute top-0 end-0 m-3"
                      style={{ backgroundColor: '#D4A437', fontSize: '0.9rem' }}
                    >
                      Destacado
                    </span>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title fw-bold">{product.titulo}</h5>
                    <p className="card-text text-muted small">
                      {product.texto.substring(0, 100)}...
                    </p>
                    {product.precio && (
                      <h4 className="fw-bold mt-3 mb-0" style={{ color: '#D4A437' }}>
                        ${product.precio.toLocaleString('es-AR')}
                      </h4>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-5">
          <button 
            className="btn btn-lg px-5 py-3"
            onClick={() => onNavigate('products')}
            style={{
              backgroundColor: '#8B4513',
              color: 'white',
              fontWeight: '600',
              borderRadius: '50px',
              border: 'none',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#A0522D';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#8B4513';
              e.target.style.transform = 'scale(1)';
            }}
          >
            Ver Todo el Catálogo
          </button>
        </div>
      </div>

      <div className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <h2 className="display-6 fw-bold mb-4" style={{ color: '#8B4513' }}>
                Sobre Mueblería Jota
              </h2>
              <p className="lead text-muted mb-4">
                Desde 1985, creamos muebles de calidad excepcional que transforman espacios en hogares. 
                Cada pieza es cuidadosamente seleccionada y diseñada para ofrecer elegancia, confort y durabilidad.
              </p>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill me-2" style={{ color: '#D4A437' }}></i>
                  Más de 35 años de experiencia
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill me-2" style={{ color: '#D4A437' }}></i>
                  Materiales sostenibles certificados
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill me-2" style={{ color: '#D4A437' }}></i>
                  Diseños únicos y atemporales
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill me-2" style={{ color: '#D4A437' }}></i>
                  Atención personalizada
                </li>
              </ul>
            </div>
            <div className="col-md-6">
              <img 
                src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80"
                alt="Showroom Mueblería"
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
