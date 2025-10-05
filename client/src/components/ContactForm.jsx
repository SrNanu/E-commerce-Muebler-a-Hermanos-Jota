import React, { useState } from "react";

const initialForm = { name: "", email: "", message: "" };

const ContactForm = () => {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;

    const keyMap = {
      inputName: "name",
      inputEmail: "email",
      inputMessage: "message",
    };
    const key = keyMap[id] || id;
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos de contacto:", form);
    setSubmitted(true);
    setForm(initialForm);
  };

  return (
    <div className="container mt-4" style={{ maxWidth: 600 }}>
      <h2 className="mb-3">Contacto</h2>
      {submitted && (
        <div className="alert alert-success" role="alert">
          ¡Gracias por tu mensaje! Te contactaremos pronto.
        </div>
      )}
      <form id="contactForm" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="inputName" className="form-label">Nombre</label>
          <input
            type="text"
            id="inputName"
            aria-describedby="nameHelp"
            className="form-control"
            value={form.name}
            onChange={handleChange}
            placeholder="Tu nombre"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="inputEmail" className="form-label">Correo</label>
          <input
            type="email"
            id="inputEmail"
            aria-describedby="emailHelp"
            className="form-control"
            value={form.email}
            onChange={handleChange}
            placeholder="tu@email.com"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="inputMessage" className="form-label">Mensaje</label>
          <textarea
            id="inputMessage"
            rows={4}
            aria-describedby="messageHelp"
            className="form-control"
            value={form.message}
            onChange={handleChange}
            placeholder="¿En qué podemos ayudarte?"
            required
          />
        </div>

        <button type="submit" id="confirmButton" className="btn btn-primary">
          Confirmar
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
