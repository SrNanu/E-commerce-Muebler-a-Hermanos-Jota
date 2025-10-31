import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';

const Navbar = ({ cartItemCount = 0 }) => {
  const navigate = useNavigate();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark shadow-sm" style={{
      background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)',
      borderBottom: '3px solid #D4A437'
    }}>
      <div className="container">
        <Link
          className="navbar-brand d-flex align-items-center fw-bold"
          to="/"
          style={{ 
            fontSize: '1.5rem',
            letterSpacing: '1px',
            textDecoration: 'none'
          }}
        >
          <img 
            src={logo} 
            alt="Mueblería Jota Logo" 
            style={{ 
              height: '40px', 
              width: 'auto',
              marginRight: '12px',
            }} 
          />
          <span className="d-none d-md-inline">Mueblería Jota</span>
          <span className="d-inline d-md-none">M. Jota</span>
        </Link>
        
        <button 
          className="navbar-toggler border-0" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
          style={{ boxShadow: 'none' }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link
                className="nav-link px-3 py-2 rounded-3 fw-semibold"
                to="/"
                style={{ 
                  transition: 'all 0.3s ease',
                  color: 'rgba(255, 255, 255, 0.9)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = 'rgba(255, 255, 255, 0.9)';
                }}
              >
                <i className="bi bi-house-door me-1"></i>
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link px-3 py-2 rounded-3 fw-semibold"
                to="/productos"
                style={{ 
                  transition: 'all 0.3s ease',
                  color: 'rgba(255, 255, 255, 0.9)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = 'rgba(255, 255, 255, 0.9)';
                }}
              >
                <i className="bi bi-grid me-1"></i>
                Catálogo
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link px-3 py-2 rounded-3 fw-semibold"
                to="/contacto"
                style={{ 
                  transition: 'all 0.3s ease',
                  color: 'rgba(255, 255, 255, 0.9)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = 'rgba(255, 255, 255, 0.9)';
                }}
              >
                <i className="bi bi-envelope me-1"></i>
                Contacto
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <button 
                className="btn position-relative px-3 py-2 rounded-3"
                onClick={() => navigate('/carrito')}
                aria-label="Ver carrito"
                style={{
                  backgroundColor: '#D4A437',
                  border: 'none',
                  color: '#fff',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#E5B547';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#D4A437';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
                }}
              >
                <i className="bi bi-cart3" style={{ fontSize: '1.2rem' }}></i>
                <span className="ms-2 d-none d-lg-inline">Carrito</span>
                {cartItemCount > 0 && (
                  <span 
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{
                      fontSize: '0.7rem',
                      padding: '0.25rem 0.5rem'
                    }}
                  >
                    {cartItemCount}
                    <span className="visually-hidden">productos en el carrito</span>
                  </span>
                )}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;