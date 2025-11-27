const Order = require('../models/Order');
const Product = require('../models/Product');

// Crear un nuevo pedido
const createOrder = async (req, res) => {
  try {
    const { productos } = req.body;
    const userId = req.user.id; // Viene del middleware authGuard

    if (!productos || productos.length === 0) {
      return res.status(400).json({ error: 'El pedido debe contener al menos un producto' });
    }

    // Calcular el total y validar productos
    let total = 0;
    const productosConDetalles = [];

    for (const item of productos) {
      const producto = await Product.findById(item.producto);
      
      if (!producto) {
        return res.status(404).json({ error: `Producto con ID ${item.producto} no encontrado` });
      }

      const subtotal = producto.precio * item.cantidad;
      total += subtotal;

      productosConDetalles.push({
        producto: producto._id,
        nombre: producto.nombre,
        cantidad: item.cantidad,
        precio: producto.precio
      });
    }

    // Crear el pedido
    const newOrder = new Order({
      usuario: userId,
      productos: productosConDetalles,
      total,
      estado: 'pendiente'
    });

    await newOrder.save();

    res.status(201).json({
      message: 'Pedido creado exitosamente',
      order: newOrder
    });
  } catch (error) {
    console.error('Error al crear pedido:', error);
    res.status(500).json({ error: 'Error al crear el pedido' });
  }
};

// Obtener todos los pedidos del usuario autenticado
const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({ usuario: userId })
      .populate('productos.producto', 'nombre imagenUrl')
      .sort({ createdAt: -1 });

    res.json({
      orders,
      total: orders.length
    });
  } catch (error) {
    console.error('Error al obtener pedidos:', error);
    res.status(500).json({ error: 'Error al obtener los pedidos' });
  }
};

// Obtener un pedido específico por ID
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const order = await Order.findOne({ _id: id, usuario: userId })
      .populate('productos.producto', 'nombre imagenUrl precio');

    if (!order) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }

    res.json({ order });
  } catch (error) {
    console.error('Error al obtener pedido:', error);
    res.status(500).json({ error: 'Error al obtener el pedido' });
  }
};

// Obtener todos los pedidos (solo admin)
const getAllOrders = async (req, res) => {
  try {
    // Verificar que el usuario sea admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Acceso denegado. Se requieren permisos de administrador' });
    }

    const orders = await Order.find()
      .populate('usuario', 'nombre email')
      .populate('productos.producto', 'nombre imagenUrl')
      .sort({ createdAt: -1 });

    res.json({
      orders,
      total: orders.length
    });
  } catch (error) {
    console.error('Error al obtener todos los pedidos:', error);
    res.status(500).json({ error: 'Error al obtener los pedidos' });
  }
};

// Actualizar estado de un pedido (solo admin)
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    // Verificar que el usuario sea admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Acceso denegado. Se requieren permisos de administrador' });
    }

    const validStates = ['pendiente', 'procesando', 'enviado', 'entregado', 'cancelado'];
    if (!validStates.includes(estado)) {
      return res.status(400).json({ error: 'Estado inválido' });
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { estado },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }

    res.json({
      message: 'Estado del pedido actualizado',
      order
    });
  } catch (error) {
    console.error('Error al actualizar pedido:', error);
    res.status(500).json({ error: 'Error al actualizar el pedido' });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus
};
