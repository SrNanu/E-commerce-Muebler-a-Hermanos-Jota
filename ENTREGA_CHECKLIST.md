# Checklist de Consigna — Sprint 3 y 4

## Arquitectura del proyecto
- [x] Monorepo con `/backend` y `/client` (estructura presente)

## Backend (API con Express)
- [x] Servidor Express funcionando (`backend/src/app.js`, `backend/src/server.js`)
- [x] Fuente de datos local `.js` (array de objetos) (`backend/src/data/productos.js`)
- [x] GET `/api/productos` devuelve listado completo (`backend/src/routes/productos.routes.js` + `getAllProducts`)
- [x] GET `/api/productos/:id` devuelve producto por id y 404 si no existe (`getProductById`)
- [x] Middleware global de logging (método y URL) (`backend/src/middlewares/logger.js` + `app.use(logger)`)
- [x] Uso de `express.json()` (`app.use(express.json())`)
- [x] Rutas modularizadas con `express.Router` (`productos.routes.js`)
- [x] Manejador de rutas no encontradas (404) (`app.js`)
- [x] Manejador de errores centralizado (middleware `err, req, res, next`) (`backend/src/app.js`)

Nota: Existe `authGuard` que exige `Authorization: muebles123` en las rutas de productos; el frontend lo usa. No es parte de la consigna pero está implementado.

## Frontend (React SPA)
- Arquitectura de componentes:
  - [x] `Navbar`, `Footer`, `ProductCard`, `ProductList`, `ProductDetail`
  - [x] `ContactForm` componente controlado (`client/src/components/ContactForm.jsx`)
- Página de Catálogo:
  - [x] Fetch a `GET /api/productos` del backend (`client/src/components/ProductList.jsx`)
  - [x] Estados “Cargando...” y “Error” (`ProductList.jsx`)
  - [x] Render de lista con `.map()` y `ProductCard` vía `props` (`ProductList.jsx` → `ProductCard.jsx`)
- Vista de Detalle (sin React Router, condicional):
  - [x] Click en `ProductCard` cambia estado en `App` y muestra `ProductDetail` (`client/src/App.jsx`)
- Carrito de Compras:
  - [ ] Botón “Añadir al Carrito” en `ProductDetail` — PENDIENTE
  - [ ] Estado de carrito (array) en `App.jsx` — PENDIENTE
  - [ ] `Navbar` muestra contador por `prop` — PENDIENTE
- Formulario de Contacto:
  - [x] Inputs controlados con `useState`
  - [x] `console.log` al enviar y mensaje de éxito en la UI

## Entregables
- [ ] Enlace al repositorio GitHub con `/client` y `/backend` — PENDIENTE (no verificado aquí)
- README detallado:
  - [x] Nombre del proyecto e integrantes (en `README.md` raíz)
  - [x] Instrucciones para instalar dependencias y correr ambos servidores
  - [x] Breve descripción de arquitectura y decisiones

## Notas
- Backend sirve estáticos de `public/img`; el frontend usa `http://localhost:4000/...` para imágenes.
- Scripts:
  - Backend: `npm run dev` / `npm start` (en `backend/package.json`)
  - Frontend: `npm run dev` (en `client/package.json`)

## Pendientes resumidos
- Implementar carrito: estado en `App.jsx`, botón en `ProductDetail`, contador en `Navbar`.
- Completar `README.md` raíz con instrucciones para levantar backend y frontend y una breve descripción de arquitectura/decisiones.