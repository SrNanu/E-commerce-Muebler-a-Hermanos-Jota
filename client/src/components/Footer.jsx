import React from "react"
import '../styles/Footer.css'
import logo from '../assets/logoClaro.svg';

function Footer() {
    return (
        <footer className="footer py-5">
            <div className="container">
                <div className="row justify-content-center align-items-start">

                    <div className="col-md-4 text-center mb-4 mb-md-0">
                        <a href="index.html" className="footer-brand d-block text-decoration-none">
                            <img src={logo} alt="Logo Hermanos Jota" className="footer-logo mb-2" />
                            <span className="footer-title">Mueblería Jota</span>
                        </a>
                    </div>

                    <div className="col-md-8">
                        <div className="row text-center text-md-start">

                            <div className="col-md-6 mb-4 mb-md-0">
                                <h6 className="footer-subtitle">Casa Taller</h6>
                                <p className="footer-text">
                                    Av. San Juan 2847 <br />
                                    C1232AAB — Barrio de San Cristóbal <br />
                                    Ciudad Autónoma de Buenos Aires, Argentina
                                </p>

                                <h6 className="footer-subtitle mt-3">Horarios de atención</h6>
                                <p className="footer-text">
                                    Lunes a Viernes: 10:00 - 19:00 <br />
                                    Sábados: 10:00 - 14:00
                                </p>
                            </div>

                            <div className="col-md-6">
                                <h6 className="footer-subtitle">Contacto</h6>
                                <ul className="list-unstyled footer-contact">
                                    <li>
                                        <i className="bi bi-envelope-fill me-2"></i>
                                        <a href="mailto:info@hermanosjota.com.ar">info@hermanosjota.com.ar</a>
                                    </li>
                                    <li>
                                        <i className="bi bi-envelope-check-fill me-2"></i>
                                        <a href="mailto:ventas@hermanosjota.com.ar">ventas@hermanosjota.com.ar</a>
                                    </li>
                                    <li>
                                        <i className="bi bi-instagram me-2"></i>
                                        <a href="https://instagram.com/hermanosjota_ba" target="_blank">@hermanosjota_ba</a>
                                    </li>
                                    <li>
                                        <i className="bi bi-whatsapp me-2"></i>
                                        <a href="https://wa.me/541145678900" target="_blank">+54 11 4567-8900</a>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </footer>
    )
}

export default Footer;