import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ThemeContext } from '../context/ThemeContext';
import { IoArrowBack } from 'react-icons/io5';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setSelectedImage(res.data.imageUrl);
      })
      .catch(err => console.error('Error fetching product:', err));
  }, [id]);

  const handleAddToCart = () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item._id === product._id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart');
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className={`product-detail-container ${isDark ? 'dark' : 'light'}`}>
      {/* 🔙 Back Button */}
      <div className="top-row">
        <button
          onClick={() => navigate(-1)}
          className="custom-back-btn"
          title="Go back"
        >
          <IoArrowBack size={18} style={{ marginRight: '4px' }} />
          Back
        </button>
      </div>

      {/* 🖼️ Product Image with Floating Icons */}
      <div className="product-detail-left">
        <div className="image-wrapper">
          <img
            src={`/images/${selectedImage}`}
            alt={product.name}
            className="product-image"
          />
          <div className="image-icons">
            <button
              title="Add to Wishlist"
              onClick={() => {
                const token = localStorage.getItem('token');
                if (!token) return alert('Please log in to add to wishlist');
                const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
                if (!wishlist.find(item => item._id === product._id)) {
                  wishlist.push(product);
                  localStorage.setItem('wishlist', JSON.stringify(wishlist));
                  alert('Added to wishlist!');
                } else {
                  alert('Already in wishlist!');
                }
              }}
            >
              <i className="fa fa-heart" style={{ color: 'red' }}></i>
            </button>
            <button
              title="Share"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: product.name,
                    text: 'Check out this beautiful product!',
                    url: window.location.href,
                  });
                } else {
                  alert('Sharing not supported in your browser');
                }
              }}
            >
              <i className="fa fa-share-alt"></i>
            </button>
          </div>
        </div>

        {/* 📷 Thumbnails */}
        <div className="thumbnail-row">
          {[product.imageUrl, product.image2, product.image3].map((img, index) => (
            img && (
              <img
                key={index}
                src={`/images/${img}`}
                alt={`thumb-${index}`}
                className={`thumbnail ${selectedImage === img ? 'active' : ''}`}
                onClick={() => setSelectedImage(img)}
              />
            )
          ))}
        </div>
      </div>

      {/* ℹ️ Product Info */}
      <div className="product-detail-right">
        <h2>{product.name}</h2>
        <p className="price">₹{product.price}</p>
        <p className="desc">{product.description}</p>

        {/* 📦 Pincode Check */}
        <div className="pincode-check">
          <h5>Check Delivery Availability</h5>
          <input
            type="text"
            placeholder="Enter your pincode"
            maxLength="6"
            className="pincode-input"
          />
          <button className="pincode-btn">Check</button>
        </div>

        {/* 🚚 Delivery Info */}
        <div className="delivery-box">
          <h5>Delivery</h5>
          <p>Free delivery within 3–5 business days</p>
          <p>Cash on Delivery available</p>
        </div>

        {/* 🛒 Cart Buttons */}
        <div className="buttons">
          <button className="add-btn" onClick={handleAddToCart}>Add to Cart</button>
          <button className="buy-btn" onClick={handleBuyNow}>Buy Now</button>
        </div>

        {/* 🧾 Product Specs */}
        <div className="specs-box">
          <h4>Product Specifications</h4>
          <table className="specs-table">
            <tbody>
              <tr><td>Material</td><td>Gold-plated alloy</td></tr>
              <tr><td>Gemstones</td><td>American Diamonds</td></tr>
              <tr><td>Weight</td><td>85g</td></tr>
              <tr><td>Length</td><td>18 inches (adjustable)</td></tr>
              <tr><td>Closure</td><td>Hook</td></tr>
              <tr><td>Finish</td><td>Antique Matte</td></tr>
            </tbody>
          </table>
        </div>

        {/* 🎯 Related Products */}
        <div className="related-products">
          <h4>You May Also Like</h4>
          <div className="related-slider">
            {[
              { name: "Elegant Pearl Necklace", price: 1999, image: "/images/pearl_necklace.jpg" },
              { name: "Kundan Bridal Set", price: 4999, image: "/images/kundan_set.jpg" },
              { name: "Minimalist Gold Chain", price: 999, image: "/images/gold_chain.jpg" },
            ].map((prod, idx) => (
              <div className="related-card" key={idx}>
                <img src={prod.image} alt={prod.name} />
                <p>{prod.name}</p>
                <strong>₹{prod.price}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
