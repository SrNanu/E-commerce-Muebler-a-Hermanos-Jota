# 🪑 E-commerce Mueblería Hermanos Jota

Proyecto final desarrollado para el curso de **MERN Stack** en el **Instituto Tecnológico de Buenos Aires (ITBA)**.  
Este proyecto consiste en el desarrollo de un **E-commerce** para la empresa ficticia de la mueblería **"Hermanos Jota"**, ofreciendo una plataforma intuitiva para explorar productos, ver detalles y realizar compras en línea.

---

## 🌐 Demo desplegada
🔗 [Ver proyecto desplegado](https://juan-nogueira.github.io/Muebleria-Hermanos-Jota)

---

## 👥 Integrantes del proyecto
- Juan Nogueira  
- Lautaro Smyth  
- Matías Moreno  
- Germán Bermudez  
- Santino Cataldi  

---

## ✨ Funcionalidades principales
- 🔎 **Búsqueda de productos** dentro del catálogo.  
- 📄 **Visualización de detalles** de cada producto seleccionado.  
- 💬 **Contacto con empleados** de la tienda.  
- 🛒 **Carrito de compras** para agregar productos.  

---

## 🛠️ Tecnologías utilizadas
- **Frontend:**  
  - HTML  
  - CSS  
  - JavaScript  
  - Bootstrap  

- **Otros recursos:**  
  - GitHub Copilot (asistencia en el desarrollo)  

---

## 🚀 Instalación y uso
1. Clonar este repositorio:  
   ```bash
   git clone https://github.com/SrNanu/E-commerce-Muebler-a-Hermanos-Jota
   ```

2. Instalar dependencias de ambos proyectos:
   ```bash
   # En la carpeta /backend
   cd backend
   npm install

   # En la carpeta /client
   cd ../client
   npm install
   ```

3. Correr los servidores en desarrollo:
   ```bash
   # Backend (Express en puerto 4000)
   cd backend
   npm run dev
   # Alternativa sin nodemon: npm start

   # Frontend (Vite en puerto 5173)
   cd ../client
   npm run dev
   ```

4. Acceder a la aplicación:
   - Frontend: `http://localhost:5173/`
   - API REST: `http://localhost:4000/api/productos`

5. Notas de ejecución:
   - El backend sirve imágenes estáticas desde `backend/public/img`.
   - Algunas peticiones del frontend incluyen el header `Authorization: muebles123` (guard simple). No es requerido por la consigna, pero está implementado.

---

## 🧱 Arquitectura y decisiones

### Monorepo
- Estructura raíz con dos proyectos: `/backend` (Node/Express) y `/client` (React + Vite).

### Backend (Express)
- `src/app.js`: configuración de middlewares (`cors`, `express.json`, `logger`), rutas y manejadores de 404 y errores.
- `src/routes/productos.routes.js`: rutas `GET /api/productos` y `GET /api/productos/:id`.
- `src/data/productos.js`: fuente de datos local (array de objetos).
- `src/middlewares/logger.js`: logging de método y URL.
- `src/server.js`: arranque del servidor (puerto 4000).

### Frontend (React)
- `src/App.jsx`: estado de vista (`catalog`, `detail`, `contact`) sin React Router; renderizado condicional.
- Componentes: `Navbar`, `Footer`, `ProductCard`, `ProductList`, `ProductDetail`, `ContactForm`.
- `ProductList` hace `fetch` a la API y maneja estados de carga y error.
- `ContactForm` es controlado con `useState`, registra datos en consola y muestra mensaje de éxito.

### Decisiones claves
- Sin React Router por consigna: navegación basada en estado en `App.jsx`.
- Bootstrap via CDN para estilos rápidos y consistentes.
- Autenticación sencilla por header (`Authorization: muebles123`) solo para simular guard.
- Imágenes servidas por backend para evitar rutas relativas en el cliente.

---