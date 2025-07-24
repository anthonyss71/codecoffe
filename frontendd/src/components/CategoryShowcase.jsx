import React from 'react';

const CategoryShowcase = () => {
  const categories = [
    {
      id: 1,
      name: 'Frappés',
      icon: '🥤',
      products: [
        { name: 'Frappé mocha', price: 'S/ 13.50', description: 'Frappé de café con sabor a chocolate' },
        { name: 'Frappé caramel', price: 'S/ 13.50', description: 'Frappé de café con sabor a caramelo' },
        { name: 'Frappé de café', price: 'S/ 12.50', description: 'Frappé de café, coronado con crema' },
        { name: 'Frappé de cookies', price: 'S/ 13.50', description: 'Frappé con galleta oreo' },
        { name: 'Frappé de algarrobina', price: 'S/ 13.50', description: 'Frappé de café con sabor a algarrobina' },
        { name: 'Frappé de vainilla', price: 'S/ 13.50', description: 'Frappé con sabor a vainilla' },
      ]
    },
    {
      id: 2,
      name: 'Cafés Calientes',
      icon: '☕',
      products: [
        { name: 'Espresso', price: 'S/ 7.50', description: 'Café espresso tradicional' },
        { name: 'Cappuccino', price: 'S/ 9.50', description: 'Espresso con espuma de leche' },
        { name: 'Latte', price: 'S/ 8.50', description: 'Café con leche cremosa' },
      ]
    },
    {
      id: 3,
      name: 'Bebidas Frías',
      icon: '❄',
      products: [
        { name: 'Cold Brew', price: 'S/ 11.50', description: 'Café frío de elaboración lenta' },
        { name: 'Iced Latte', price: 'S/ 10.50', description: 'Café con leche y hielo' },
        { name: 'Limonada', price: 'S/ 8.50', description: 'Limonada fresca natural' },
      ]
    },
    {
      id: 4,
      name: 'Postres',
      icon: '🍰',
      products: [
        { name: 'Cheesecake', price: 'S/ 15.50', description: 'Tarta de queso horneada' },
        { name: 'Brownie', price: 'S/ 12.50', description: 'Brownie de chocolate' },
        { name: 'Tres Leches', price: 'S/ 13.50', description: 'Bizcocho bañado en tres leches' },
      ]
    },
    {
      id: 5,
      name: 'Tés',
      icon: '🍵',
      products: [
        { name: 'Té Verde', price: 'S/ 7.50', description: 'Té verde tradicional' },
        { name: 'Té Chai', price: 'S/ 9.50', description: 'Té con especias' },
        { name: 'Manzanilla', price: 'S/ 6.50', description: 'Infusión de manzanilla' },
      ]
    }
  ];

  return (
    <div className="category-showcase-wrapper py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-2xl font-bold mb-8" style={{ color: '#1e3932' }}>
          Nuestros Productos
        </h2>
        <div className="category-circles-container">
          {categories.map((category) => (
            <div key={category.id} className="category-circle">
              <div className="circle-content">
                <span className="category-icon">{category.icon}</span>
                <p className="category-name">{category.name}</p>
              </div>
              <div className="products-dropdown">
                <div className="products-list">
                  {category.products.map((product, index) => (
                    <div key={index} className="product-item">
                      <div className="product-info">
                        <h3 className="product-title">{product.name}</h3>
                        <p className="product-description">{product.description}</p>
                        <span className="product-price">{product.price}</span>
                      </div>
                      <button className="ver-producto">Ver producto →</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryShowcase;