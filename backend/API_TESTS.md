# GUÍA DE PRUEBAS - API BACKEND MUEBLERÍA HERMANOS JOTA
# Usa esta guía con Thunder Client o Postman

## 1. REGISTRO DE USUARIO
POST http://localhost:4000/api/auth/register
Content-Type: application/json

{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "password": "123456"
}

### Respuesta esperada:
# - Status: 201
# - Body: { token, user: { id, nombre, email, role } }
# - GUARDA EL TOKEN para usarlo en las siguientes peticiones

---

## 2. LOGIN DE USUARIO
POST http://localhost:4000/api/auth/login
Content-Type: application/json

{
  "email": "juan@example.com",
  "password": "123456"
}

### Respuesta esperada:
# - Status: 200
# - Body: { token, user }

---

## 3. OBTENER PERFIL (Requiere autenticación)
GET http://localhost:4000/api/auth/profile
Authorization: Bearer TU_TOKEN_AQUI

### Respuesta esperada:
# - Status: 200
# - Body: { user: { id, nombre, email, role, createdAt } }

---

## 4. CREAR USUARIO ADMIN (Para pruebas de administración)
POST http://localhost:4000/api/auth/register
Content-Type: application/json

{
  "nombre": "Admin User",
  "email": "admin@muebleria.com",
  "password": "admin123",
  "role": "admin"
}

---

## 5. OBTENER TODOS LOS PRODUCTOS (Sin autenticación - si quieres probar)
GET http://localhost:4000/api/productos
Authorization: Bearer TU_TOKEN_AQUI

---

## 6. CREAR PEDIDO (Requiere autenticación)
POST http://localhost:4000/api/orders
Authorization: Bearer TU_TOKEN_AQUI
Content-Type: application/json

{
  "productos": [
    {
      "producto": "ID_DEL_PRODUCTO_1",
      "cantidad": 2
    },
    {
      "producto": "ID_DEL_PRODUCTO_2",
      "cantidad": 1
    }
  ]
}

### Nota: Reemplaza ID_DEL_PRODUCTO con IDs reales de tu base de datos

---

## 7. OBTENER MIS PEDIDOS (Requiere autenticación)
GET http://localhost:4000/api/orders/mis-pedidos
Authorization: Bearer TU_TOKEN_AQUI

---

## 8. OBTENER PEDIDO ESPECÍFICO (Requiere autenticación)
GET http://localhost:4000/api/orders/mis-pedidos/ID_DEL_PEDIDO
Authorization: Bearer TU_TOKEN_AQUI

---

## 9. OBTENER TODOS LOS PEDIDOS - ADMIN (Requiere token de admin)
GET http://localhost:4000/api/orders/admin/all
Authorization: Bearer TOKEN_DE_ADMIN

---

## 10. ACTUALIZAR ESTADO DE PEDIDO - ADMIN (Requiere token de admin)
PATCH http://localhost:4000/api/orders/admin/ID_DEL_PEDIDO/status
Authorization: Bearer TOKEN_DE_ADMIN
Content-Type: application/json

{
  "estado": "procesando"
}

### Estados válidos: "pendiente", "procesando", "enviado", "entregado", "cancelado"

---

# ERRORES COMUNES Y SOLUCIONES

## Error: "No se proporcionó token de autenticación"
# Solución: Asegúrate de incluir el header Authorization con el formato:
# Authorization: Bearer TU_TOKEN_AQUI

## Error: "Token inválido" o "Token expirado"
# Solución: Haz login nuevamente para obtener un token nuevo

## Error: "Credenciales inválidas"
# Solución: Verifica que el email y password sean correctos

## Error: "El email ya está registrado"
# Solución: Usa un email diferente o haz login con el existente
