import React, { useEffect, useState } from "react";
import { getMisPedidos } from "../utils/productApi";
import OrderCard from "./OrderCard";
import "../styles/ProductList.css";
import "../styles/ProductCard.css";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMisPedidos()
      .then((data) => {
        setOrders(data.orders || []); // <-- FIX 🔥
        console.log("Pedidos cargados:", data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error cargando pedidos:", err);
        setLoading(false);
      });
  }, []);
  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <h1 className="product-list-title">Mis Pedidos</h1>
        <p className="product-list-subtitle">Consulta el estado y detalles de tus compras</p>
      </div>

      <div className="product-list-content">
        {loading ? (
          <div className="loading-spinner-container">
            <div className="loading-spinner"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="no-results">
            <div className="no-results-icon">📭</div>
            <h2 className="no-results-title">Aún no tienes pedidos</h2>
            <p className="no-results-text">Explora el catálogo y realiza tu primera compra</p>
          </div>
        ) : (
          <>
            <div className="product-list-results">
              <span className="results-count">Total de pedidos: <strong>{orders.length}</strong></span>
            </div>
            <div className="list-container">
              {orders.map(order => (
                <div className="list-row" key={order._id}>
                  <div>
                    <div className="list-title">Pedido #{(order.numero || order._id).toString().toUpperCase()}</div>
                    <div className="list-subtitle">Estado: {order.estado}</div>
                  </div>
                  <div className="list-meta">Fecha: {order.createdAt ? new Date(order.createdAt).toLocaleDateString('es-AR') : '—'}</div>
                  <div className="list-meta">Total: ${Number(order.total || 0).toLocaleString('es-AR')}</div>
                  <div className="list-actions" />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
