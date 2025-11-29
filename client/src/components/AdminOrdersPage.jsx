import React, { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"

const AdminOrdersPage = () => {
    const { token } = useAuth()
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [estadoFiltro, setEstadoFiltro] = useState("pendiente")
    const [ordenFecha, setOrdenFecha] = useState("antiguo") // 'reciente' o 'antiguo'
    const ordersPerPage = 5
    const [totalPages, setTotalPages] = useState(1)
    const API_ORDENES_URL = `${import.meta.env.VITE_API_BASE_URL}/api/orders/admin/all`

    useEffect(() => {
        // cuando cambia filtro, volver a la página 1
        setCurrentPage(1)
    }, [estadoFiltro, ordenFecha])

    useEffect(() => {
        getOrdenes()
    }, [estadoFiltro, currentPage, ordenFecha])

    const getOrdenes = async () => {
        try {
            setLoading(true)
            const params = new URLSearchParams()
            if (estadoFiltro) params.append("estado", estadoFiltro)
            params.append("page", currentPage)
            params.append("limit", ordersPerPage)
            params.append(
                "sort",
                ordenFecha === "reciente" ? "-createdAt" : "createdAt"
            )

            const response = await fetch(`${API_ORDENES_URL}?${params.toString()}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (!response.ok) {
                throw new Error("Error al cargar las órdenes")
            }

            const data = await response.json()
            setOrders(data.orders || [])
            setTotalPages(data.totalPages || 1)
            setError(null)
        } catch (err) {
            console.error("Error:", err)
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const updateOrderStatus = async (orderId, nuevoEstado) => {
        try {
            const res = await fetch(`${API_ORDENES_URL}${orderId}/status`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ estado: nuevoEstado }),
            })

            if (!res.ok) throw new Error("Error al actualizar el estado")

            // refrescar página actual para mantener orden consistente
            getOrdenes()
        } catch (err) {
            console.error(err)
            alert("Error al actualizar el estado")
        }
    }

    const getEstadoBadge = (estado) => {
        const estilos = {
            pendiente: "warning",
            procesando: "info",
            enviado: "primary",
            entregado: "success",
            cancelado: "danger",
        }
        return estilos[estado] || "secondary"
    }

    const toggleOrdenFecha = () => {
        setOrdenFecha(ordenFecha === "reciente" ? "antiguo" : "reciente")
    }

    return (
        <div className="container my-5">
            <h2 className="fw-bold mb-4">📦 Gestión de Órdenes</h2>

            {error && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    {error}
                    <button
                        type="button"
                        className="btn-close"
                        onClick={() => setError(null)}
                    ></button>
                </div>
            )}

            {/* Filtros */}
            <div className="mb-4">
                <div className="d-flex gap-2 flex-wrap mb-3">
                    <button
                        className={`btn ${estadoFiltro === "pendiente" ? "btn-warning" : "btn-outline-warning"}`}
                        onClick={() => setEstadoFiltro("pendiente")}
                    >
                        Pendientes
                    </button>
                    <button
                        className={`btn ${estadoFiltro === "procesando" ? "btn-info" : "btn-outline-info"}`}
                        onClick={() => setEstadoFiltro("procesando")}
                    >
                        Procesando
                    </button>
                    <button
                        className={`btn ${estadoFiltro === "enviado" ? "btn-primary" : "btn-outline-primary"}`}
                        onClick={() => setEstadoFiltro("enviado")}
                    >
                        Enviados
                    </button>
                    <button 
                        className={`btn ${estadoFiltro === "entregado" ? "btn-success" : "btn-outline-success"}`}
                        onClick={() => setEstadoFiltro("entregado")}
                    >
                        Entregados
                    </button>
                    <button className={`btn ${estadoFiltro === "" ? "btn-secondary" : "btn-outline-secondary"}`} onClick={() => setEstadoFiltro("")}>
                        Todas
                    </button>
                </div>

                {/* Ordenamiento */}
                <div className="d-flex gap-2 align-items-center">
                    <span className="fw-bold">Ordenar por fecha:</span>
                    <button className="btn btn-sm btn-dark" onClick={toggleOrdenFecha} title={ 
                            ordenFecha === "reciente" ? "Ordenar por más antiguo" : "Ordenar por más reciente"
                        }
                    >
                        {ordenFecha === "reciente" ? (
                            <>
                                <i className="bi bi-sort-up me-1"></i>
                                Más Antiguo
                            </>
                        ) : (
                            <>
                                <i className="bi bi-sort-down me-1"></i>
                                Más Reciente
                            </>
                        )}
                    </button>
                </div>
            </div>

            {loading && (
                <div className="text-center my-5">
                    <div className="spinner-border" role="status"></div>
                    <p className="mt-2">Cargando órdenes...</p>
                </div>
            )}

            {!loading && orders.length === 0 && (
                <p className="alert alert-info">No hay órdenes con este estado.</p>
            )}

            {!loading && orders.length > 0 && (
                <div>
                    {orders.map((order) => (
                        <div key={order._id} className="p-4 mb-4 rounded-4 border bg-white shadow-lg" style={{ transition: "0.25s", }}>
                            <div className="d-flex justify-content-between align-items-start mb-3">
                                <div>
                                    <h3 className="fw-bold mb-2">
                                        Pedido #{order._id.slice(-8).toUpperCase()}
                                    </h3>
                                    <div className="d-flex flex-wrap gap-3">
                                        <h6>
                                            <strong>📅 Fecha:</strong>{" "}
                                            {new Date(order.createdAt).toLocaleDateString("es-AR")}
                                        </h6>
                                        <h6>
                                            <strong>💰 Total:</strong> $
                                            {order.total?.toLocaleString("es-AR")}
                                        </h6>
                                        <h6>
                                            <strong>👤 Cliente:</strong>{" "}
                                            {order.usuario?.nombre || "N/A"}
                                        </h6>
                                    </div>
                                </div>
                                <span className={`badge bg-${getEstadoBadge(order.estado)} fs-6`}>
                                    {order.estado.toUpperCase()}
                                </span>
                            </div>

                            <hr />

                            <h5 className="fw-bold mb-3">Productos:</h5>
                            <div className="table-responsive">
                                <table className="table table-sm table-hover">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Producto</th>
                                            <th className="text-center">Cantidad</th>
                                            <th className="text-end">Precio</th>
                                            <th className="text-end">Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.productos?.map((p, index) => (
                                            <tr key={index}>
                                                <td>{p.nombre || p.titulo}</td>
                                                <td className="text-center">{p.cantidad}</td>
                                                <td className="text-end">
                                                    ${p.precio?.toLocaleString("es-AR")}
                                                </td>
                                                <td className="text-end">
                                                    ${(p.precio * p.cantidad).toLocaleString("es-AR")}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-3 d-flex gap-2 justify-content-end flex-wrap">
                                {order.estado !== "entregado" &&
                                    order.estado !== "cancelado" && (
                                        <>
                                            {order.estado === "pendiente" && (
                                                <button className="btn btn-info btn-sm"
                                                    onClick={() =>
                                                        updateOrderStatus(order._id, "procesando")
                                                    }>
                                                    Procesar
                                                </button>
                                            )}
                                            {order.estado === "procesando" && (
                                                <button className="btn btn-primary btn-sm"
                                                    onClick={() =>
                                                        updateOrderStatus(order._id, "enviado")
                                                    }>
                                                    Enviar
                                                </button>
                                            )}
                                            {order.estado === "enviado" && (
                                                <button className="btn btn-success btn-sm" 
                                                    onClick={() =>
                                                        updateOrderStatus(order._id, "entregado")
                                                    }>
                                                    Marcar Entregado
                                                </button>
                                            )}
                                            <button className="btn btn-danger btn-sm" 
                                                onClick={() =>
                                                    updateOrderStatus(order._id, "cancelado")
                                                }>
                                                Cancelar
                                            </button>
                                        </>
                                    )}
                            </div>
                        </div>
                    ))}

                    {/* Paginación */}
                    {totalPages > 1 && (
                        <nav aria-label="Paginación" className="mt-4">
                            <ul className="pagination justify-content-center">
                                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                    <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
                                        Anterior
                                    </button>
                                </li>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                                    (page) => (
                                        <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
                                            <button
                                                className="page-link"
                                                onClick={() => setCurrentPage(page)}>
                                                {page}
                                            </button>
                                        </li>
                                    )
                                )}
                                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                                    <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
                                        Siguiente
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    )}
                </div>
            )}
        </div>
    )
}

export default AdminOrdersPage
