import React, { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import OrderCard from "./OrderCard"
import "../styles/ProductList.css"
import "../styles/ProductCard.css"

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
    const [searchTerm, setSearchTerm] = useState("")
    const [searchQuery, setSearchQuery] = useState("")
    const API_BASE = import.meta.env.VITE_API_BASE_URL
    const API_ORDENES_LIST = `${API_BASE}/api/orders/admin/all`

    useEffect(() => {
        setCurrentPage(1)
    }, [estadoFiltro, ordenFecha])

    useEffect(() => {
        const getOrdenes = async () => {
            try {
                setLoading(true)
                const params = new URLSearchParams()
                if (estadoFiltro) params.append("estado", estadoFiltro)
                params.append("page", currentPage)
                params.append("limit", ordersPerPage)
                params.append("sort", ordenFecha === "reciente" ? "-createdAt" : "createdAt")

                const response = await fetch(`${API_ORDENES_LIST}?${params.toString()}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })

                if (!response.ok) throw new Error("Error al cargar las órdenes")

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

        getOrdenes()
    }, [estadoFiltro, currentPage, ordenFecha, token])

    const updateOrderStatus = async (orderId, nuevoEstado) => {
        try {
            const res = await fetch(`${API_BASE}/api/orders/admin/${orderId}/status`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ estado: nuevoEstado }),
            })

            if (!res.ok) throw new Error("Error al actualizar el estado")

            // refrescar página actual
            const params = new URLSearchParams()
            if (estadoFiltro) params.append("estado", estadoFiltro)
            params.append("page", currentPage)
            params.append("limit", ordersPerPage)
            params.append("sort", ordenFecha === "reciente" ? "-createdAt" : "createdAt")
            const response = await fetch(`${API_ORDENES_LIST}?${params.toString()}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            const data = await response.json()
            setOrders(data.orders || [])
            setTotalPages(data.totalPages || 1)
        } catch (err) {
            console.error(err)
            alert("Error al actualizar el estado")
        }
    }

    const filteredOrders = orders.filter(order =>
        (order._id || "").toLowerCase().includes(searchQuery.toLowerCase())
    )
    return (
        <div className="product-list-container">
            <div className="product-list-header">
                <h1 className="product-list-title">Gestión de Órdenes</h1>
                <p className="product-list-subtitle">Administrador de órdenes</p>
            </div>

            {error && (
                <div className="product-list-content" style={{ paddingTop: 0 }}>
                    <div className="no-results" style={{ paddingTop: 0 }}>
                        <div className="no-results-icon">⚠️</div>
                        <h2 className="no-results-title">{error}</h2>
                        <button className="no-results-btn" onClick={() => setError(null)}>
                            Ocultar <i className="bi bi-x-circle"></i>
                        </button>
                    </div>
                </div>
            )}

            <div className="product-list-content">
                <div className="product-list-filters">
                    <div className="filters-row">
                        <div className="filter-group" style={{ maxWidth: '220px' }}>
                            <label className="filter-label">Estado</label>
                            <select className="filter-select" value={estadoFiltro}
                                onChange={(e) => setEstadoFiltro(e.target.value)}>
                                <option value="pendiente">Pendiente</option>
                                <option value="procesando">Procesando</option>
                                <option value="enviado">Enviado</option>
                                <option value="entregado">Entregado</option>
                                <option value="">Todas</option>
                            </select>
                        </div>

                        <div className="filter-group" style={{ maxWidth: '220px' }}>
                            <label className="filter-label">Fecha</label>
                            <select className="filter-select" value={ordenFecha}
                                onChange={(e) => setOrdenFecha(e.target.value)}>
                                <option value="reciente">Más reciente</option>
                                <option value="antiguo">Más antiguo</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label className="filter-label">Buscar por ID</label>
                            <input type="text" className="filter-input" placeholder="Ej: 65F…"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); setSearchQuery(searchTerm); } }}
                            />
                        </div>

                        <button className="filter-btn" onClick={() => setSearchQuery(searchTerm)}>
                            <i className="bi bi-search"></i>
                            Buscar
                        </button>

                        {(searchQuery || estadoFiltro || ordenFecha) && (
                            <button className="filter-btn filter-btn-clear" onClick={() => { setSearchTerm(''); setSearchQuery(''); setEstadoFiltro('pendiente'); setOrdenFecha('antiguo'); }}>
                                <i className="bi bi-x-circle"></i>
                                Limpiar
                            </button>
                        )}
                    </div>
                </div>

                {loading ? (
                    <div className="loading-spinner-container">
                        <div className="loading-spinner"></div>
                    </div>
                ) : (
                    <>
                        <div className="product-list-results">
                            <span className="results-count">Mostrando <strong>{filteredOrders.length}</strong> de <strong>{orders.length}</strong> órdenes</span>
                        </div>

                        {filteredOrders.length === 0 ? (
                            <div className="no-results">
                                <div className="no-results-icon">📭</div>
                                <h2 className="no-results-title">No hay órdenes para los filtros aplicados</h2>
                                <p className="no-results-text">Ajusta el estado, fecha o búsqueda</p>
                                <button className="no-results-btn" onClick={() => { setSearchTerm(''); setSearchQuery(''); setEstadoFiltro('pendiente'); setOrdenFecha('antiguo'); }}>
                                    <i className="bi bi-arrow-counterclockwise"></i>
                                    Limpiar filtros
                                </button>
                            </div>
                        ) : (
                            <div className="list-container">
                                {filteredOrders.map((order) => (
                                    <div className="list-row" key={order._id}>
                                        <div>
                                            <div className="list-title">Pedido #{(order.numero || order._id).toString().toUpperCase()}</div>
                                            <div className="list-subtitle">Cliente: {order.usuario?.nombre || 'N/A'}</div>
                                        </div>
                                        <div className="list-meta">Fecha: {order.createdAt ? new Date(order.createdAt).toLocaleDateString('es-AR') : '—'}</div>
                                        <div className="list-meta">Total: ${Number(order.total || 0).toLocaleString('es-AR')}</div>
                                        <div className="list-actions">
                                            {order.estado === 'pendiente' && (
                                                <button className="product-card-btn" onClick={() => updateOrderStatus(order._id, 'procesando')}>Procesar<i className="bi bi-gear"></i></button>
                                            )}
                                            {order.estado === 'procesando' && (
                                                <button className="product-card-btn" onClick={() => updateOrderStatus(order._id, 'enviado')}>Enviar<i className="bi bi-truck"></i></button>
                                            )}
                                            {order.estado === 'enviado' && (
                                                <button className="product-card-btn" onClick={() => updateOrderStatus(order._id, 'entregado')}>Entregar<i className="bi bi-check2-circle"></i></button>
                                            )}
                                            {order.estado !== 'cancelado' && order.estado !== 'entregado' && (
                                                <button className="product-card-btn" onClick={() => updateOrderStatus(order._id, 'cancelado')}>Cancelar<i className="bi bi-x-circle"></i></button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {totalPages > 1 && (
                            <div className="pagination-container">
                                <ul className="pagination">
                                    <li>
                                        <button className="pagination-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Anterior</button>
                                    </li>
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                        <li key={page}>
                                            <button className={`pagination-btn ${currentPage === page ? 'active' : ''}`} onClick={() => setCurrentPage(page)}>{page}</button>
                                        </li>
                                    ))}
                                    <li>
                                        <button className="pagination-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Siguiente</button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default AdminOrdersPage
