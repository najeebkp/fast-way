import React from "react";
import ProductDetail from "../Components/ProductDetail";
import { useParams } from "react-router-dom";

function ProductDetailPage() {
  const { id } = useParams();
  return (
    <div>
      <ProductDetail id={id} />
    </div>
  );
}

export default ProductDetailPage;
