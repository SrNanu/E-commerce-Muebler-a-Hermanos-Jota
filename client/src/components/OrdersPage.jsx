import React, { useEffect, useState } from "react";
import { getMisPedidos } from "../utils/productApi";
import { getProductImageSrc } from "../utils/productView";

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
    <div className="container my-5 ">
      <h2 className="fw-bold mb-4">📦 Mis Pedidos</h2>

      {loading && (
        <div className="text-center my-5">
          <div className="spinner-border" role="status"></div>
          <p className="mt-2">Cargando pedidos...</p>
        </div>
      )}

      {!loading && orders.length === 0 && <p>No tenés pedidos registrados.</p>}

      {!loading && orders.length > 0 && (
        <div>
          {orders.map((order) => (
            <div
              key={order._id}
              className="p-4 mb-4 rounded-4 border bg-white shadow-lg"
              style={{
                transition: "0.25s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.01)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <h3 className="fw-bold">Pedido #{order.numero || order._id}</h3>
              <div className="d-flex flex-wrap gap-4 mb-2">
                <h5>
                  <strong>📅 Fecha:</strong>{" "}
                  {new Date(order.createdAt).toLocaleDateString("es-AR")}
                </h5>
                <h5>
                  <strong>📌 Estado:</strong> {order.estado}
                </h5>
                <h5>
                  <strong>💰 Total:</strong> $
                  {order.total?.toLocaleString("es-AR")}
                </h5>
              </div>

              <hr />

              <h4 className="fw-bold mb-2">Productos:</h4>

              <ul className="list-unstyled">
                {order.productos?.map((p, index) => (
                  <li key={index} className="d-flex align-items-center mb-2">
                    {/* Imagen */}
                    <img
                      src={
                        getProductImageSrc(p.producto) ||
                        p.imagen ||
                        "/placeholder.jpg"
                      }
                      width="200"
                      height="200"
                      className="rounded me-2"
                      style={{ objectFit: "cover" }}
                    />

                    {/* Texto */}
                    <h5>
                      {p.titulo || p.nombre}
                      <strong className="ms-1"> × {p.cantidad}</strong>
                    </h5>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
