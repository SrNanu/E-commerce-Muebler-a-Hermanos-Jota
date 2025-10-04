import React from 'react';

const ProductCard = ({ product }) => {
  if (!product) {
    return null;
  }

  const { imagen, titulo, texto } = product;



  return (
    <div className="col">
      <div className="card h-100 shadow-sm">
        <img src={`http://localhost:4000/${imagen}`} className="card-img-top" alt={titulo} />
        <div className="card-body">
          <h5 className="card-title">{titulo}</h5>
          <p className="card-text">{texto}</p>
        </div>
        <div className="card-footer">
            <a href="#" className="btn btn-primary">Ver detalle</a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;