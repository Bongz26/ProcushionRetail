import React from 'react';
import Products from '../components/Products'; // Import the Products component

function ProductsPage() {
  return (
    <div className="products-page-container">
      <h2>Products</h2>
      <Products /> {/* Render the Products component here */}
    </div>
  );
}

export default ProductsPage;