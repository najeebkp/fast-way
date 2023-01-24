import React, { useState, useEffect } from "react";
import { Close } from "@styled-icons/ionicons-solid/Close";

export default function SideBar({
  cat,
  activeCat,
  handleActiveCat,
  brands,
  selectedBrands,
  handleSelectedBrands,
}) {
  const handleCheckboxChange = (e) => {
    const { name } = e.target;
    if (e.target.checked) {
      handleSelectedBrands([...selectedBrands, name]);
    } else {
      handleSelectedBrands(selectedBrands.filter((brand) => brand !== name));
    }
  };
  const handleRemoveBrands = (item) => {
    handleSelectedBrands(selectedBrands.filter((brand) => brand !== item));
  };

  return (
    <div className="min-w-[200px] height-[100vh] border-r text-left px-4">
      <div className="text-xl font-bold text-[#A5A5A5] pb-4">
        Show results for
      </div>
      <div className="text-[#A5A5A5] text-sm font-medium cursor-pointer">
        <div
          className={activeCat == "All" ? "text-red-900" : ""}
          onClick={() => handleActiveCat("All")}
        >
          All
        </div>
        {cat &&
          cat.length > 0 &&
          cat.map((category, index) => (
            <div
              className={
                "pt-3 " + (activeCat == category ? "text-red-900" : "")
              }
              key={index}
              onClick={() => handleActiveCat(category)}
            >
              {category}
            </div>
          ))}
      </div>
      <div>
        <div className="text-xl font-bold text-[#A5A5A5] pt-4">Brands</div>
        <div className="flex flex-wrap flex-grow pb-3">
          {selectedBrands.map((item, index) => (
            <div
              className="bg-cyan-100 rounded-xl text-slate-600 text-sm text-center px-3 py-1 m-1 flex items-center cursor-pointer"
              key={index}
              onClick={() => handleRemoveBrands(item)}
            >
              {item}&ensp;
              <Close size={13} color={"black"} />
            </div>
          ))}
        </div>
        <form>
          {brands.map((brand) => (
            <div key={brand}>
              <input
                type="checkbox"
                name={brand}
                checked={selectedBrands.includes(brand)}
                onChange={handleCheckboxChange}
              />
              <label className="text-xs pl-2 text-slate-600">{brand}</label>
            </div>
          ))}
        </form>
      </div>
    </div>
  );
}
