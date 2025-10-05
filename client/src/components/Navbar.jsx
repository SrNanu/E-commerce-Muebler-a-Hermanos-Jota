import React from 'react';

const Navbar = ({ onNavigate }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a
          className="navbar-brand"
          href="#"
          onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('products'); }}
        >
          Mueblería Jota
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="#"
                onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('products'); }}
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#"
                onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('products'); }}
              >
                Productos
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#"
                onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('contact'); }}
              >
                Contacto
              </a>
            </li>
          </ul>

          
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link position-relative" href="#/carrito" aria-label="Ver carrito">
                
                <span style={{fontSize: '1.2rem'}}>🛒</span>
                <span className="badge bg-danger rounded-pill position-absolute" style={{top: '0px', right: '-10px'}}>0</span>
                <span className="visually-hidden">(0) items en el carrito</span>
              </a>
            </li>
          </ul>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;