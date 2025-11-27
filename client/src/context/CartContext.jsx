import React, { createContext, useState, useContext, useEffect } from 'react';
import { getProductId } from '../utils/productView';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem('carrito');
    if (savedCart) {
      try {
        setCarrito(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error al cargar carrito:', error);
      }
    }
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const addToCart = (product) => {
    const productId = getProductId(product);
    const existingProduct = carrito.find(item => getProductId(item) === productId);
    
    if (existingProduct) {
      // Si ya existe, incrementar la cantidad
      setCarrito(carrito.map(item => 
        getProductId(item) === productId 
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      ));
    } else {
      // Si no existe, agregarlo con cantidad 1
      setCarrito([...carrito, { ...product, cantidad: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCarrito(carrito.filter(item => getProductId(item) !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCarrito(carrito.map(item => 
      getProductId(item) === productId 
        ? { ...item, cantidad: newQuantity }
        : item
    ));
  };

  const clearCart = () => {
    setCarrito([]);
    localStorage.removeItem('carrito');
  };

  const getCartTotal = () => {
    return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  };

  const getCartItemCount = () => {
    return carrito.reduce((count, item) => count + item.cantidad, 0);
  };

  const value = {
    carrito,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
