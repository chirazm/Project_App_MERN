import React from 'react'

export default function Product(props) {
    const {product}= props;
  return (
    <div key={product._id} className="card">
                <a href={`/product/${product._id}`}>
                  <img class="medium" src={product.image} alt={product.name} />
                </a>
                <div class="card-body">
                  <a href="product.html">
                    <h2>{product.name}</h2>
                  </a>
                  <div class="rating">
                    <span> <i class="fa fa-star"></i> </span>
                    <span> <i class="fa fa-star"></i> </span>
                    <span> <i class="fa fa-star"></i> </span>
                    <span> <i class="fa fa-star"></i> </span>
                    <span> <i class="fa fa-star"></i> </span>
                  </div>
                  <div class="price">{product.price} TND</div>
                </div>
              </div>    
  )
}
