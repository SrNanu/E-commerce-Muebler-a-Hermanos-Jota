import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import logo from "../assets/logo.svg";
import "../styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const { getCartItemCount } = useCart();
  const cartItemCount = getCartItemCount();
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
    setDropdownOpen(false);
  };

  return (
    <nav className={`modern-navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <Link to="/" className="brand-section">
          <img
            src={logo}
            alt="logo"
            className="brand-logo"
          />
          <span className="brand-text">Hermanos Jota</span>
        </Link>

        <button className="mobile-toggle">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className="nav-center">
          <li>
            <Link to="/" className="nav-link-modern">
              <i className="bi bi-house-door"></i>
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/productos" className="nav-link-modern">
              <i className="bi bi-grid"></i>
              Catálogo
            </Link>
          </li>
          <li>
            <Link to="/contacto" className="nav-link-modern">
              <i className="bi bi-envelope"></i>
              Contacto
            </Link>
          </li>
          {user?.role === 'admin' && (
            <>
              <li>
                <Link to="/admin/productos" className="nav-link-modern">
                  <i className="bi bi-box-seam"></i>
                  Productos
                </Link>
              </li>
              <li>
                <Link to="/admin/usuarios" className="nav-link-modern">
                  <i className="bi bi-people"></i>
                  Usuarios
                </Link>
              </li>
              <li>
                <Link to="/admin/ordenes" className="nav-link-modern">
                  <i className="bi bi-receipt"></i>
                  Pedidos
                </Link>
              </li>
            </>
          )}
        </ul>

        <div className="nav-actions">
          <button 
            onClick={() => navigate("/carrito")} 
            className="btn-modern btn-cart"
            aria-label="Ver carrito"
          >
            <i className="bi bi-cart3"></i>
            {cartItemCount > 0 && (
              <span className="cart-badge">{cartItemCount}</span>
            )}
          </button>

          {isAuthenticated ? (
            <div className="user-menu">
              <div
                className="user-avatar"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {user?.nombre?.charAt(0).toUpperCase() || "U"}
              </div>
              <div className={`dropdown-menu-modern ${dropdownOpen ? "show" : ""}`}>
                <Link
                  to="/perfil"
                  className="dropdown-item-modern"
                  onClick={() => setDropdownOpen(false)}
                >
                  <i className="bi bi-person-circle"></i>
                  Mi Perfil
                </Link>
                <Link
                  to="/mis-pedidos"
                  className="dropdown-item-modern"
                  onClick={() => setDropdownOpen(false)}
                >
                  <i className="bi bi-bag-check"></i>
                  Mis Pedidos
                </Link>
                <div className="dropdown-item-modern" onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right"></i>
                  Cerrar Sesión
                </div>
              </div>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn-modern btn-outline-modern">
                Ingresar
              </Link>
              <Link to="/register" className="btn-modern btn-primary-modern">
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
