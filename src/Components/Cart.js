import React from "react";

import { GlobalContext } from "./Context/GlobalContextProvider";

function Cart() {
  const { globalState, globalDispatch } = React.useContext(GlobalContext);

  const total = () => {
    let array = [];
    globalState.cartItems.map((product) => {
      array.push(product.count * product.item.price);
    });
    return array.reduce((a, b) => a + b, 0).toFixed(2);
  };

  const handleQuantity = (action, id) => {
    let i = globalState.cartItems.find((item) => item.item.id == id);
    let cartItems = globalState.cartItems;

    if (action == "decrease") {
      if (i.count > 1) {
        cartItems.map((product) => {
          if (product.item.id == id) {
            product.count = product.count - 1;
          }
        });
        globalDispatch({
          type: "TOTAL_CART_COUNT",
          payload: globalState.cartCount - 1,
        });
        globalDispatch({
          type: "ADD_TO_CART",
          payload: cartItems,
        });
      }
    } else {
      cartItems.map((product) => {
        if (product.item.id == id) {
          product.count = product.count + 1;
        }
      });
      globalDispatch({
        type: "TOTAL_CART_COUNT",
        payload: globalState.cartCount + 1,
      });
      globalDispatch({
        type: "ADD_TO_CART",
        payload: cartItems,
      });
    }
  };

  // remove item
  const removeItem = (item) => {
    let cartItems = globalState.cartItems;

    let newCartCount = globalState.cartCount - item.count;
    cartItems = cartItems.filter((product) => product.item.id != item.item.id);

    globalDispatch({
      type: "ADD_TO_CART",
      payload: cartItems,
    });
    globalDispatch({
      type: "TOTAL_CART_COUNT",
      payload: newCartCount,
    });
  };
  return (
    <div className={"product-detail-wrapper p-5 "}>
      <div>
        <div className="flex flex-wrap md:flex-nowrap">
          <div className="w-full">
            <>
              {globalState && globalState.cartItems.length > 0 && (
                <React.Fragment>
                  <div className="font-bold text-left text-xl">
                    Shopping Cart
                  </div>
                  <div className="text-end text-sm">Price</div>
                </React.Fragment>
              )}
            </>
            <>
              {globalState && globalState.cartItems.length > 0 ? (
                globalState.cartItems.map((item, key) => (
                  <>
                    <div key={key} className="flex">
                      <div className="w-[100px]">
                        <img src={item.item.thumbnail} />
                      </div>
                      <div className="text-left ml-4">
                        <div>
                          <div>{item.item.title}</div>
                          <div className="text-sm text-slate-400">In Stock</div>
                          <div className={"text-sm text-slate-400"}>
                            Eligible for FREE Shipping
                          </div>

                          <div className="flex items-center mt-2">
                            <button
                              className={"rounded-full bg-yellow-400 w-6 h-6"}
                              onClick={() =>
                                handleQuantity("decrease", item.item.id)
                              }
                            >
                              -
                            </button>
                            <div className="px-4">{item.count}</div>
                            <button
                              className={"rounded-full bg-yellow-400 w-6 h-6"}
                              onClick={() =>
                                handleQuantity("increase", item.item.id)
                              }
                            >
                              +
                            </button>
                            &emsp;
                            <div className="border border-r-slate-200 h-[20px]"></div>
                            &emsp;
                            <div
                              style={{ cursor: "pointer" }}
                              className={`text-sm`}
                              onClick={() => removeItem(item)}
                            >
                              Delete
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={`ml-auto text-md font-bold`}>
                        {"$ " + item.item.price}
                      </div>
                    </div>
                    <hr className="my-6"></hr>
                  </>
                ))
              ) : (
                <div className="flex justify-center h-[60vh] items-center">
                  <div className="text-left border border-slate-200 p-8">
                    <div className="text-2xl">Your Cart is empty.</div>
                    <div className="normal-font">
                      Your Shopping Cart lives to serve. Give it purpose — fill
                      it with groceries, clothing, household supplies,
                      electronics, and more. <br></br>Continue shopping on the
                      <a
                        href="/"
                        style={{
                          color: "#ff7449",
                        }}
                      >
                        {" homepage"}
                      </a>
                      {", learn about today's deals, or visit your Wish List."}
                    </div>
                  </div>
                </div>
              )}
            </>
          </div>
          {globalState && globalState.cartItems.length > 0 && (
            <div className="mx-6 md:w-[25%] text  w-full">
              <div className="py-4 border border-slate-200">
                <div>
                  <div className="flex justify-center items-center">
                    Subtotal ({globalState.cartCount} items):{" "}
                    <div className={`text-xl font-bold `}>&ensp;${total()}</div>
                  </div>
                  <br></br>
                  <button className={`bg-green-400 shadow px-4 py-1 text-sm`}>
                    Proceed to checkout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
