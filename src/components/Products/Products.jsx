import "./Products.css";
import ProductCard from "./ProductCard";

const Products = ({ products }) => {
  return (
    <div className="products-container" id="products">
      <h2 className="section-title">Products & Colour Lines</h2>
      <div className="products-text">
        We take our environment, hair, and color care very seriously. Therefore,
        most of the product and color lines that we offer and utilize are gentle
        to your hair and environmentally friendly. Most of our shampoos,
        conditioners, and hair treatments are organic and/or 100% vegan. Some of
        our hair color lines are ammonia-free with conditioning agents.
      </div>
      <div className="products-grid">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
