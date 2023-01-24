import React from "react";
import { Star } from "@styled-icons/bootstrap/Star";
import { StarFill } from "@styled-icons/bootstrap/StarFill";
import { useNavigate } from "react-router-dom";
import Rating from "./Rating";

function ProductCard({ item }) {
  const navigate = useNavigate();

  return (
    <div>
      <div
        className="px-6 cursor-pointer hover:shadow-lg m-1 hover:rounded"
        onClick={() => navigate(`/${item.id}`)}
      >
        <div className="h-[200px] w-full p-2 ">
          <img className="h-full w-full object-contain" src={item.thumbnail} />
        </div>
        <div className="py-4">
          <div className="text-md text-left text-sm text-black pt-1">
            {item.title}
          </div>
          <div className="text-md text-left text-xs text-slate-400 pt-1">
            {item.brand}
          </div>
          <div className="text-left">
            <Rating star={Math.floor(item.rating)} />
          </div>
          <div className="text-md text-left text-lg pt-1 font-bold flex items-center">
            <span className="text-[13px]">$</span>
            {item.price}
            <span className="ml-3 px-2 py-[2px] bg-green-400 rounded-xl text-xs font-normal">
              {Math.floor(item.discountPercentage)}% Off
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
