import React, { useEffect, useState } from "react";
import Rating from "./Rating";
import Modal from "./Modal";
import { ShoppingCart } from "@styled-icons/zondicons/ShoppingCart";
import { GlobalContext } from "./Context/GlobalContextProvider";

function ProductDetail({ id }) {
  const { globalState, globalDispatch } = React.useContext(GlobalContext);
  const [data, setData] = useState([]);
  const [showStock, setShowStock] = useState(false);
  const [show, setShow] = useState(false);
  const modalData = {
    heading: "Congratulations !!!",
    body: "Item successfully added to cart. go to cart for checkout.",
  };
  const modalStockData = {
    heading: "Hurry !!!",
    body: "Only a few items left.",
  };

  const getProduct = (id) => {
    fetch("https://dummyjson.com/products?limit=100")
      .then((response) => response.json())
      .then((res) => res.products.filter((item) => item.id == id)[0])
      .then((res) => {
        setData(res);
        if (res.stock < 50) {
          setShowStock(true);
        }
      });
  };

  // Add to cart
  const handleAddToCart = () => {
    let newQuantity = 1;
    globalDispatch({
      type: "TOTAL_CART_COUNT",
      payload: 1 + globalState.cartCount,
    });
    updateCart(newQuantity);
    setShow(true);
  };

  const updateCart = (newQuantity) => {
    let newItem = { count: newQuantity, item: data };
    let cartItems = globalState.cartItems;

    let i = cartItems.findIndex((item) => item.item.id == data.id);

    if (i > -1) {
      cartItems[i].count = cartItems[i].count + newQuantity;
    } else cartItems.push(newItem);

    globalDispatch({
      type: "ADD_TO_CART",
      payload: cartItems,
    });
  };

  useEffect(() => {
    getProduct(id);
  }, []);

  return (
    <div>
      {data && data.title && (
        <div className="flex mt-16 flex-wrap md:flex-nowrap p-6">
          <div className="w-[50%] flex justify-center ">
            <div className="w-[300px]">
              <img src={data.thumbnail} />
            </div>
          </div>
          <div className="text-left">
            <div className="text-2xl">{data.title}</div>
            <div className="text-slate-500">{data.brand}</div>
            <Rating star={Math.floor(data.rating)} />
            <div className="text-3xl text-left text-lg pt-1 font-bold flex items-center">
              <span className="text-[13px]">$</span>
              {data.price}
              <span className="ml-3 px-2 py-[2px] bg-green-400 rounded-xl text-xs font-normal">
                {Math.floor(data.discountPercentage)}% Off
              </span>
            </div>
            <div className="">{data.description}</div>
            <div className="mt-4">
              <button
                className={"bg-yellow-400 rounded-full px-4 py-[4px]"}
                onClick={handleAddToCart}
              >
                <ShoppingCart size="15" />
                &emsp;
                {"Add to cart"}
              </button>
            </div>
          </div>
        </div>
      )}
      <Modal show={show} setShow={setShow} data={modalData} type="success" />
      <Modal
        show={showStock}
        setShow={setShowStock}
        data={modalStockData}
        type="warning"
      />
    </div>
  );
}

export default ProductDetail;
