import React, { useState } from "react";
import poster from "../assets/images/hero1.png"; 
import poster2 from "../assets/images/hero2.jpg"; 
import poster3 from "../assets/images/hero3.png";
import poster4 from "../assets/images/hero4.png";
import poster5 from "../assets/images/hero5.jpg";
import poster6 from "../assets/images/hero6.jpg";
import poster7 from "../assets/images/hero7.jpg";
import poster8 from "../assets/images/hero8.jpg";
import poster9 from "../assets/images/hero9.jpg";
import social1 from "../assets/images/red1.jpg";
import social2 from "../assets/images/red2.jpg";
import social3 from "../assets/images/red3.jpg";
import social4 from "../assets/images/red4.jpg";
import social5 from "../assets/images/red5.jpg";
import social6 from "../assets/images/red6.jpg";

import "./../styles/Hero.css";

const Hero = () => {
  const [activeCategory, setActiveCategory] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const promoData = {
    tienda: {
      title: "¡Promos solo por días!",
      subtitle: "Ofertas especiales de temporada",
      description: "No te pierdas las nuevas bebidas y postres que ingresan a diario en su cafetería favorita.",
      features: [
        "🎉 Nuevos productos cada día",
        "☕ Bebidas de temporada exclusivas",
        "🍰 Postres artesanales frescos",
        "🎁 Promociones sorpresa diarias"
      ],
      highlight: "Visítanos y descubre las sorpresas que tenemos para ti cada día.",
      cta: "Ven a visitarnos",
      image: poster7
    },
    ofertas: {
      title: "¡Descuentos especiales!",
      subtitle: "Hasta 30% de descuento",
      description: "Aprovecha nuestras ofertas exclusivas del mes. Hasta 30% de descuento en bebidas seleccionadas y combos especiales.",
      features: [
        "💰 Hasta 30% de descuento",
        "🥤 Bebidas seleccionadas en oferta",
        "🍽️ Combos especiales disponibles",
        "⏰ Ofertas por tiempo limitado"
      ],
      highlight: "¡No dejes pasar estas increíbles ofertas! Válido solo este mes.",
      cta: "Ver todas las ofertas",
      image: poster3
    },
    novedades: {
      title: "¡Nuevas bebidas de temporada!",
      subtitle: "Sabores únicos y premium",
      description: "Descubre nuestras creaciones más recientes con sabores únicos y ingredientes premium. Perfectas para cualquier momento del día.",
      features: [
        "🌟 Creaciones exclusivas de temporada",
        "🍃 Ingredientes premium seleccionados",
        "🎨 Sabores únicos e innovadores",
        "⭐ Perfectas para cualquier momento"
      ],
      highlight: "Nuestros baristas han creado estas bebidas especialmente para esta temporada.",
      cta: "Prueba las novedades",
      image: poster9
    }
  };

  const categories = [
    {
      id: 1,
      name: "Frappés",
      icon: "🥤",
      color: "#00704A",
      lightColor: "#F0F8F5",
      products: [
        {
          name: "Frappé mocha",
          description: "Frappé de café con sabor a chocolate",
          bestseller: true,
        },
        {
          name: "Frappé caramel",
          description: "Frappé de café con sabor a caramelo",
          bestseller: false,
        },
        {
          name: "Frappé de café",
          description: "Frappé de café, coronado con crema",
          bestseller: false,
        },
        {
          name: "Frappé de cookies",
          description: "Frappé con galleta oreo",
          bestseller: true,
        },
        {
          name: "Frappé de algarrobina",
          description: "Frappé de café con sabor a algarrobina",
          bestseller: false,
        },
        {
          name: "Frappé de vainilla",
          description: "Frappé con sabor a vainilla",
          bestseller: false,
        },
      ],
    },
    {
      id: 2,
      name: "Cafés Calientes",
      icon: "☕",
      color: "#8B4513",
      lightColor: "#F7F3F0",
      products: [
        {
          name: "Espresso",
          description: "Café espresso tradicional",
          bestseller: false,
        },
        {
          name: "Cappuccino",
          description: "Espresso con espuma de leche",
          bestseller: true,
        },
        {
          name: "Latte",
          description: "Café con leche cremosa",
          bestseller: false,
        },
      ],
    },
    {
      id: 3,
      name: "Bebidas Frías",
      icon: "❄️",
      color: "#4A90E2",
      lightColor: "#F0F6FF",
      products: [
        {
          name: "Cold Brew",
          description: "Café frío de elaboración lenta",
          bestseller: true,
        },
        {
          name: "Iced Latte",
          description: "Café con leche y hielo",
          bestseller: false,
        },
        {
          name: "Limonada",
          description: "Limonada fresca natural",
          bestseller: false,
        },
      ],
    },
    {
      id: 4,
      name: "Postres",
      icon: "🍰",
      color: "#D2691E",
      lightColor: "#FFF8F0",
      products: [
        {
          name: "Cheesecake",
          description: "Tarta de queso horneada",
          bestseller: true,
        },
        {
          name: "Brownie",
          description: "Brownie de chocolate",
          bestseller: false,
        },
        {
          name: "Tres Leches",
          description: "Bizcocho bañado en tres leches",
          bestseller: false,
        },
      ],
    },
    {
      id: 5,
      name: "Tés",
      icon: "🍵",
      color: "#228B22",
      lightColor: "#F0FFF0",
      products: [
        {
          name: "Té Verde",
          description: "Té verde tradicional",
          bestseller: false,
        },
        { 
          name: "Té Chai", 
          description: "Té con especias",
          bestseller: true,
        },
        {
          name: "Manzanilla",
          description: "Infusión de manzanilla",
          bestseller: false,
        },
      ],
    },
  ];

  const activeProducts = categories.find(cat => cat.id === activeCategory);

  const openModal = (type) => {
    setModalContent(promoData[type]);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent(null);
  };

  return (
    <>
      {/* Primera sección - Promos */}
      <div className="hero-wrapper">
        <section className="custom-hero">
          <div className="hero-text">
            <h1 className="hero-title">¡Promos solo por días!</h1>
            <p className="hero-description">
              No te pierdas las nuevas bebidas y postres que ingresan a diario
              en su cafetería favorita.
            </p>
            <button 
              onClick={() => openModal('tienda')} 
              className="hero-button"
            >
              Te esperamos en tienda
            </button>
          </div>
          <div className="hero-image-container">
            <img src={poster7} alt="Bebidas Wicked" className="hero-image" />
          </div>
        </section>
      </div>

      {/* Segunda sección - Descuentos */}
      <div className="hero-wrapper">
        <section className="custom-hero">
          <div className="hero-text">
            <h1 className="hero-title">¡Descuentos especiales!</h1>
            <p className="hero-description">
              Aprovecha nuestras ofertas exclusivas del mes. Hasta 30% de descuento
              en bebidas seleccionadas y combos especiales.
            </p>
            <button 
              onClick={() => openModal('ofertas')} 
              className="hero-button"
            >
              Ver ofertas
            </button>
          </div>
          <div className="hero-image-container">
            <img src={poster3} alt="Ofertas especiales" className="hero-image" />
          </div>
        </section>
      </div>

      {/* Tercera sección - Nuevas bebidas */}
      <div className="hero-wrapper">
        <section className="custom-hero">
          <div className="hero-text">
            <h1 className="hero-title">¡Nuevas bebidas de temporada!</h1>
            <p className="hero-description">
              Descubre nuestras creaciones más recientes con sabores únicos
              y ingredientes premium. Perfectas para cualquier momento del día.
            </p>
            <button 
              onClick={() => openModal('novedades')} 
              className="hero-button"
            >
              Descubre más
            </button>
          </div>
          <div className="hero-image-container">
            <img src={poster9} alt="Nuevas bebidas" className="hero-image" />
          </div>
        </section>
      </div>

      {/* Modal */}
      {modalOpen && modalContent && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-header-content">
                <h2 className="modal-title">{modalContent.title}</h2>
                <p className="modal-subtitle">{modalContent.subtitle}</p>
              </div>
              <button className="modal-close" onClick={closeModal}>
                ✕
              </button>
            </div>
            
            <div className="modal-body">
              <div className="modal-content-grid">
                <div className="modal-info">
                  <p className="modal-description">{modalContent.description}</p>
                  
                  <div className="modal-features">
                    <h3 className="features-title">¿Qué incluye?</h3>
                    <ul className="features-list">
                      {modalContent.features.map((feature, index) => (
                        <li key={index} className="feature-item">
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="modal-highlight">
                    <p className="highlight-text">{modalContent.highlight}</p>
                  </div>
                  
                  <div className="modal-actions">
                    <button className="modal-cta-button">
                      {modalContent.cta}
                    </button>
                  </div>
                </div>
                
                <div className="modal-image-container">
                  <img 
                    src={modalContent.image} 
                    alt={modalContent.title}
                    className="modal-image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NUEVA SECCIÓN - GALERÍA DE REDES SOCIALES */}
      <section className="social-gallery-section">
        <div className="social-gallery-container">
          <div className="social-gallery-header">
            <h2 className="social-gallery-title">Síguenos en Redes Sociales</h2>
            <p className="social-gallery-subtitle">
              Descubre los momentos más especiales de nuestra cafetería y únete a nuestra comunidad
            </p>
            <div className="social-links-header">
              <a href="#" className="social-link instagram">
                <span className="social-icon">📷</span>
                @codecoffee
              </a>
              <a href="#" className="social-link facebook">
                <span className="social-icon">👥</span>
                Code Coffee
              </a>
            </div>
          </div>

          <div className="social-gallery-grid">
            <div className="social-gallery-item">
              <img src={social1} alt="Momento especial 1" className="social-gallery-image" />
              <div className="social-gallery-overlay">
                <div className="social-gallery-content">
                  <span className="social-platform">📷</span>
                  <p className="social-caption">El momento perfecto para disfrutar</p>
                </div>
              </div>
            </div>
            
            <div className="social-gallery-item">
              <img src={social2} alt="Momento especial 2" className="social-gallery-image" />
              <div className="social-gallery-overlay">
                <div className="social-gallery-content">
                  <span className="social-platform">📷</span>
                  <p className="social-caption">Sabores que inspiran</p>
                </div>
              </div>
            </div>
            
            <div className="social-gallery-item">
              <img src={social3} alt="Momento especial 3" className="social-gallery-image" />
              <div className="social-gallery-overlay">
                <div className="social-gallery-content">
                  <span className="social-platform">📷</span>
                  <p className="social-caption">Momentos únicos</p>
                </div>
              </div>
            </div>
            
            <div className="social-gallery-item">
              <img src={social4} alt="Momento especial 4" className="social-gallery-image" />
              <div className="social-gallery-overlay">
                <div className="social-gallery-content">
                  <span className="social-platform">📷</span>
                  <p className="social-caption">La tradición del buen café</p>
                </div>
              </div>
            </div>
            
            <div className="social-gallery-item">
              <img src={social5} alt="Momento especial 5" className="social-gallery-image" />
              <div className="social-gallery-overlay">
                <div className="social-gallery-content">
                  <span className="social-platform">📷</span>
                  <p className="social-caption">Compartiendo experiencias</p>
                </div>
              </div>
            </div>
            
            <div className="social-gallery-item">
              <img src={social6} alt="Momento especial 6" className="social-gallery-image" />
              <div className="social-gallery-overlay">
                <div className="social-gallery-content">
                  <span className="social-platform">📷</span>
                  <p className="social-caption">Creaciones artesanales</p>
                </div>
              </div>
            </div>
          </div>

          <div className="social-gallery-footer">
            <button className="follow-us-btn">
              <span className="btn-icon">❤️</span>
              Síguenos para más momentos
            </button>
          </div>
        </div>
      </section>

      {/* SECCIÓN DE PRODUCTOS ACTUALIZADA (SIN PRECIOS) */}
      <section className="products-section">
        <div className="products-container">
          <div className="products-header">
            <h2 className="products-main-title">Nuestros Productos</h2>
            <p className="products-subtitle">
              Descubre nuestra selección de bebidas y postres preparados con los mejores ingredientes
            </p>
          </div>

          {/* Navegación de categorías */}
          <div className="category-navigation">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`category-nav-button ${
                  activeCategory === category.id ? 'active' : ''
                }`}
                style={{
                  backgroundColor: activeCategory === category.id ? category.color : 'transparent',
                  color: activeCategory === category.id ? '#fff' : category.color,
                  borderColor: category.color,
                }}
              >
                <span className="category-nav-icon">{category.icon}</span>
                <span className="category-nav-text">{category.name}</span>
              </button>
            ))}
          </div>

          {/* Grid de productos */}
          <div className="products-grid">
            {activeProducts?.products.map((product, index) => (
              <div
                key={index}
                className="product-card"
                style={{ backgroundColor: activeProducts.lightColor }}
              >
                {product.bestseller && (
                  <div className="bestseller-badge">
                    ⭐ Bestseller
                  </div>
                )}
                
                <div className="product-card-content">
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-desc">{product.description}</p>
                  </div>
                  
                  <div className="product-bottom">
                    <button 
                      className="add-to-cart-btn"
                      style={{ backgroundColor: activeProducts.color }}
                    >
                      <span className="add-icon">+</span>
                      Agregar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Botón para ver todos los productos */}
          <div className="view-all-container">
            <button 
              className="view-all-btn"
              style={{ 
                backgroundColor: activeProducts?.color,
                borderColor: activeProducts?.color 
              }}
            >
              Ver todos los productos
            </button>
          </div>
        </div>
      </section>

      <footer className="custom-footer">
        <div className="footer-sections">
          <div className="footer-column">
            <h5>Sobre Nosotros</h5>
            <ul>
              <li>
                <a href="#">Nuestra compañía</a>
              </li>
              <li>
                <a href="#">Nuestro Café</a>
              </li>
              <li>
                <a href="#">Starbucks Stories</a>
              </li>
              <li>
                <a href="#">Servicio al cliente</a>
              </li>
              <li>
                <a href="#">Línea y ética</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h5>Nuestra Cultura</h5>
            <ul>
              <li>
                <a href="#">Cultura y Valores</a>
              </li>
              <li>
                <a href="#">Trabaja con nosotros</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h5>Impacto Social</h5>
            <ul>
              <li>
                <a href="#">Planeta</a>
              </li>
              <li>
                <a href="#">Personas</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h5>Compras</h5>
            <ul>
              <li>
                <a href="#">Pedidos por la APP</a>
              </li>
              <li>
                <a href="#">Pedidos por la Web</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h5>Políticas</h5>
            <ul>
              <li>
                <a href="#">Política de Privacidad</a>
              </li>
              <li>
                <a href="#">Términos y condiciones</a>
              </li>
              <li>
                <a href="#">Preguntas frecuentes</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h5>Atención al Cliente</h5>
            <ul>
              <li>
                Teléfono Lima: <br /> <a href="tel:015050050">(01)505-0050</a>
              </li>
              <li>
                Teléfono Provincia: <br />{" "}
                <a href="tel:044779009">(044)779-009</a>
              </li>
              <li>
                <a href="#">Comprobantes electrónicos</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="social-links">
            <a href="#">
              <i className="facebook-icon"></i>
            </a>
            <a href="#">
              <i className="instagram-icon"></i>
            </a>
          </div>
          <small>© 2025 Code Coffee Company. All rights reserved.</small>
        </div>
      </footer>
    </>
  );
};

export default Hero;