import React, { useState } from 'react';
import './Products.css'; // Make sure you have this CSS file

const products = [
  {
    id: 1,
    name: 'Premium Auto Primer',
    brand: 'Carvello',
    description: 'High-quality primer suitable for all metal surfaces',
    price: 299.99,
    category: 'Primers',
    features: [
      'Excellent adhesion',
      'Fast drying',
      'Easy to sand',
      'Superior coverage'
    ],
    image: '/images/products/primer.jpg'
  },
  {
    id: 2,
    name: '2K Acrylic Paint',
    brand: 'Nexa Autocolor',
    description: 'Professional-grade automotive paint',
    price: 499.99,
    category: 'Paints',
    features: [
      'High gloss finish',
      'UV resistant',
      'Long-lasting durability',
      'Easy application'
    ],
    image: '/images/products/paint.jpg'
  },
  {
    id: 3,
    name: 'Premium Body Filler',
    brand: 'Krema',
    description: 'Professional-grade body filler',
    price: 149.99,
    category: 'Fillers',
    features: [
      'Easy to mix',
      'Quick hardening',
      'Minimal shrinkage',
      'Smooth finish'
    ],
    image: '/images/products/filler.jpg'
  },
  {
    id: 4,
    name: 'Fast-Acting Hardener',
    brand: 'Luxor',
    description: 'Professional-grade paint hardener',
    price: 89.99,
    category: 'Hardeners',
    features: [
      'Quick drying',
      'Perfect mixing ratio',
      'Consistent results',
      'Weather resistant'
    ],
    image: '/images/products/hardener.jpg'
  },
  {
    id: 5,
    name: 'Premium Clear Coat',
    brand: 'Esdee',
    description: 'High-gloss clear coat for final finish',
    price: 299.99,
    category: 'Clear Coats',
    features: [
      'Mirror finish',
      'UV protection',
      'Scratch resistant',
      'Long-lasting shine'
    ],
    image: '/images/products/clear-coat.jpg'
  }
];

function Products() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');

  // Extract unique categories and brands
  const uniqueCategories = ['All', ...new Set(products.map(product => product.category))];
  const uniqueBrands = ['All', ...new Set(products.map(product => product.brand))];

  // Filter products by category and brand
  const filteredProducts = products
    .filter(product => selectedCategory === 'All' || product.category === selectedCategory)
    .filter(product => selectedBrand === 'All' || product.brand === selectedBrand);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleBrandClick = (brand) => {
    setSelectedBrand(brand);
  };

  return (
    <section className="products-section">
      <div className="products-container">
        <div className="products-header">
          <h2>Our Products</h2>
          <p className="products-subtitle">Professional-grade automotive paint products</p>
        </div>

        <div className="filters">
          <div className="filter-group">
            <h3>Categories</h3>
            <ul className="filter-list">
              {uniqueCategories.map(category => (
                <li
                  key={category}
                  className={`filter-item ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>

          <div className="filter-group">
            <h3>Brands</h3>
            <ul className="filter-list">
              {uniqueBrands.map(brand => (
                <li
                  key={brand}
                  className={`filter-item ${selectedBrand === brand ? 'active' : ''}`}
                  onClick={() => handleBrandClick(brand)}
                >
                  {brand}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="products-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-info">
                <h3 className="product-title">{product.name}</h3>
                <p className="product-brand">{product.brand}</p>
                <p className="product-description">{product.description}</p>
                <ul className="product-features">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <div className="product-footer">
                  <span className="product-price">R{product.price.toLocaleString()}</span>
                  <button className="add-to-cart">Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
          {filteredProducts.length === 0 && <p>No products available for the selected category and brand.</p>}
        </div>
      </div>
    </section>
  );
}

export default Products;