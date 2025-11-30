import React, { useState } from "react";
import '../styles/ContactForm.css';

const initialForm = { name: "", email: "", phone: "", message: "" };

const ContactForm = () => {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simular envío
    setTimeout(() => {
      console.log("Datos de contacto:", form);
      setSubmitted(true);
      setLoading(false);
      setForm(initialForm);
      
      // Ocultar mensaje después de 5 segundos
      setTimeout(() => setSubmitted(false), 5000);
    }, 1000);
  };

  return (
    <div className="contact-container">
      <div className="contact-content">
        <div className="contact-header">
          <h1 className="contact-title">Contáctanos</h1>
          <p className="contact-subtitle">
            Estamos aquí para ayudarte. Envíanos tu consulta y te responderemos a la brevedad
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-info-section">
            <h2 className="contact-info-title">Hablemos</h2>
            <p className="contact-info-text">
              ¿Tienes alguna pregunta sobre nuestros productos o servicios? 
              No dudes en contactarnos. Nuestro equipo está listo para ayudarte.
            </p>

            <div className="contact-info-cards">
              <div className="contact-info-card">
                <div className="contact-card-icon">
                  <i className="bi bi-geo-alt-fill"></i>
                </div>
                <div className="contact-card-content">
                  <h4>Dirección</h4>
                  <p>Av. San Juan 2847<br />
                  San Cristóbal, CABA<br />
                  Argentina</p>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="contact-card-icon">
                  <i className="bi bi-telephone-fill"></i>
                </div>
                <div className="contact-card-content">
                  <h4>Teléfono</h4>
                  <p><a href="tel:+541145678900">+54 11 4567-8900</a></p>
                  <p><a href="https://wa.me/541145678900" target="_blank" rel="noopener noreferrer">
                    WhatsApp <i className="bi bi-whatsapp"></i>
                  </a></p>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="contact-card-icon">
                  <i className="bi bi-envelope-fill"></i>
                </div>
                <div className="contact-card-content">
                  <h4>Email</h4>
                  <p><a href="mailto:info@hermanosjota.com.ar">info@hermanosjota.com.ar</a></p>
                  <p><a href="mailto:ventas@hermanosjota.com.ar">ventas@hermanosjota.com.ar</a></p>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="contact-card-icon">
                  <i className="bi bi-clock-fill"></i>
                </div>
                <div className="contact-card-content">
                  <h4>Horarios</h4>
                  <p>Lunes a Viernes: 10:00 - 19:00<br />
                  Sábados: 10:00 - 14:00<br />
                  Domingos: Cerrado</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-section">
            <div className="contact-form-card">
              <h2 className="contact-form-title">Envíanos un Mensaje</h2>
              <p className="contact-form-description">
                Completa el formulario y nos pondremos en contacto contigo lo antes posible
              </p>

              {submitted && (
                <div className="form-success">
                  <i className="bi bi-check-circle me-2"></i>
                  ¡Gracias por tu mensaje! Te contactaremos pronto.
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Nombre completo <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-input"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Juan Pérez"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Correo electrónico <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="juan@ejemplo.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="form-input"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+54 11 1234-5678"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Mensaje <span className="required">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-textarea"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="¿En qué podemos ayudarte?"
                    required
                  />
                </div>

                <button type="submit" className="form-btn" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-send"></i>
                      Enviar Mensaje
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="contact-map">
          <h2 className="contact-map-title">Encuéntranos</h2>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.0168936164385!2d-58.39909668477056!3d-34.60373778045943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccacfb1f3545b%3A0x8b7a6f1b5e3d3c9d!2sAv.%20San%20Juan%202847%2C%20C1232%20CABA!5e0!3m2!1ses-419!2sar!4v1635456789012!5m2!1ses-419!2sar"
              allowFullScreen=""
              loading="lazy"
              title="Ubicación Mueblería Hermanos Jota"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
