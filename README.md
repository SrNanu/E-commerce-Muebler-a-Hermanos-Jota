# 🪑 E-commerce Mueblería Hermanos Jota

Proyecto final desarrollado para el curso de MERN Stack en el Instituto Tecnológico de Buenos Aires (ITBA).
Este proyecto implementa un E-commerce funcional para la mueblería ficticia "Hermanos Jota", permitiendo explorar productos, ver detalles, gestionar un carrito y administrar el catálogo desde un panel de administración protegido.

---

## 🌐 Demo desplegada
🔗 [Ver proyecto desplegado](https://e-commerce-muebler-a-hermanos-jota.vercel.app)

---

## 👥 Integrantes del proyecto
- Juan Nogueira  
- Lautaro Smyth  
- Matías Moreno  
- Germán Bermudez  
- Santino Cataldi  

---

## ✨ Funcionalidades principales
- **🛍️ Cliente**
  - 🔎 Exploración de productos con detalles individuales.
  - 🛒 Carrito de compras: agregar, eliminar y modificar cantidades..
  - 💬 Formulario de contacto para comunicarse con la empresa.
- **🧰 Panel de administración**
  - 📦 Listado de productos con acceso restring
  - ➕ Creación de nuevos productos.
  - ✏️ Edición de productos existentes.
  - ❌ Eliminación de productos.
---

## 🛠️ Tecnologías utilizadas
- **Frontend:**  
  - React (con Vite) 
  - React Router DOM  
  - Bootstrap 5  
  - CSS personalizado
- **Backend:** 
  - Node.js
  - Express.js
  - MongoDB Atlas
  - Mongoose
- **Otros recursos:**  
  - GitHub Copilot (asistencia en el desarrollo)
  - CORS y middlewares personalizados

---
##🧱 Arquitectura y estructura
**📁 Monorepo**
```bash
   E-COMMERCE-MUEBLERIA-HERMANOS-JOTA/
│
├── backend/               # Servidor Express + MongoDB
│   ├── src/
│   │   ├── config/        # Conexión a MongoDB Atlas
│   │   ├── controllers/   # Lógica de productos
│   │   ├── middlewares/   # authGuard y logger
│   │   ├── models/        # Modelo Product
│   │   ├── routes/        # Definición de rutas /api/productos
│   │   ├── app.js         # Configuración principal
│   │   └── server.js      # Arranque del servidor
│   └── public/img/        # Imágenes estáticas de productos
│
└── client/                # Frontend con React + Vite
    ├── src/
    │   ├── components/    # Componentes reutilizables
    │   ├── styles/        # Archivos CSS
    │   ├── utils/         # Funciones auxiliares
    │   ├── App.jsx        # Rutas y estructura principal
    │   └── main.jsx       # Punto de entrada
    └── public/

   ```
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
3. Agregar variables locales en .env
   Front:
   Poner el siguiente valor en la variable de entorno para ejecutar de forma local.
   API_BASE_URL = 'https://localhost:5173/api/productos';

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



---
##📸 Rutas principales del frontend
| Ruta                         | Descripción             |
| ---------------------------- | ----------------------- |
| `/`                          | Página de inicio        |
| `/productos`                 | Catálogo general        |
| `/productos/:id`             | Detalle de producto     |
| `/carrito`                   | Carrito de compras      |
| `/contacto`                  | Formulario de contacto  |
| `/admin/productos`           | Panel de administración |
| `/admin/crear-producto`      | Alta de producto        |
| `/admin/editar-producto/:id` | Edición de producto     |
---

## 🧱 Arquitectura y decisiones


### Decisiones claves
- Uso de React Router DOM para navegación completa.
- MongoDB Atlas para alojamiento de datos en la nube.
- Bootstrap para lograr un diseño responsive y rápido.
- Arquitectura modular y limpia, separando backend y frontend.
- Imágenes servidas por backend para evitar rutas relativas en el cliente.

---
