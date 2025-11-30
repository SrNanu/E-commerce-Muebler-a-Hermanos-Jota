import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../styles/Footer.css';
import logo from '../assets/logo.svg';

function Footer() {
    const [email, setEmail] = useState('');

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        // Lógica para suscripción
        alert('¡Gracias por suscribirte!');
        setEmail('');
    };

    return (
        <footer className="modern-footer">
            <div className="footer-content">
                <div className="footer-grid">
                    <div className="footer-section footer-about">
                        <div className="footer-logo">
                            <img src={logo} alt="Logo Hermanos Jota" />
                            <span className="footer-logo-text">Hermanos Jota</span>
                        </div>
                        <p>
                            Desde 1985, creamos muebles de calidad excepcional que transforman 
                            espacios en hogares. Diseño, confort y durabilidad en cada pieza.
                        </p>
                        <div className="footer-social">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
                                <i className="bi bi-facebook"></i>
                            </a>
                            <a href="https://instagram.com/hermanosjota_ba" target="_blank" rel="noopener noreferrer" className="social-link">
                                <i className="bi bi-instagram"></i>
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
                                <i className="bi bi-twitter"></i>
                            </a>
                            <a href="https://wa.me/541145678900" target="_blank" rel="noopener noreferrer" className="social-link">
                                <i className="bi bi-whatsapp"></i>
                            </a>
                        </div>
                    </div>

                    <div className="footer-section footer-links">
                        <h3>Enlaces Rápidos</h3>
                        <ul>
                            <li><Link to="/"><i className="bi bi-chevron-right"></i>Inicio</Link></li>
                            <li><Link to="/productos"><i className="bi bi-chevron-right"></i>Catálogo</Link></li>
                            <li><Link to="/contacto"><i className="bi bi-chevron-right"></i>Contacto</Link></li>
                            <li><Link to="/sobre-nosotros"><i className="bi bi-chevron-right"></i>Sobre Nosotros</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section footer-contact">
                        <h3>Contacto</h3>
                        <div className="contact-item">
                            <div className="contact-icon">
                                <i className="bi bi-geo-alt-fill"></i>
                            </div>
                            <div className="contact-info">
                                <p>Av. San Juan 2847<br />
                                San Cristóbal, CABA<br />
                                Argentina</p>
                            </div>
                        </div>
                        <div className="contact-item">
                            <div className="contact-icon">
                                <i className="bi bi-telephone-fill"></i>
                            </div>
                            <div className="contact-info">
                                <p>+54 11 4567-8900</p>
                            </div>
                        </div>
                        <div className="contact-item">
                            <div className="contact-icon">
                                <i className="bi bi-envelope-fill"></i>
                            </div>
                            <div className="contact-info">
                                <p>info@hermanosjota.com.ar</p>
                            </div>
                        </div>
                    </div>

                    <div className="footer-section footer-newsletter">
                        <h3>Newsletter</h3>
                        <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
                            <p>Suscríbete para recibir ofertas exclusivas y novedades</p>
                            <div className="newsletter-input-group">
                                <input
                                    type="email"
                                    className="newsletter-input"
                                    placeholder="Tu email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <button type="submit" className="newsletter-btn">
                                    Suscribirse
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="footer-copyright">
                        <i className="bi bi-c-circle"></i>
                        <span>2025 Mueblería Hermanos Jota. Todos los derechos reservados.</span>
                    </div>
                    <div className="footer-payment">
                        <span>Aceptamos:</span>
                        <div className="payment-icon">
                            <i className="bi bi-credit-card"></i>
                        </div>
                        <div className="payment-icon">
                            <i className="bi bi-paypal"></i>
                        </div>
                        <div className="payment-icon">
                            <i className="bi bi-bank"></i>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;