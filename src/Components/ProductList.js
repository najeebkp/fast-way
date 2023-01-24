import React, { useState, useEffect } from "react";

import ProductCard from "./ProductCard";
import SideBar from "./Sidebar";
import Sort from "./Sort";
import Loading from "./Loading";

function ProductList() {
  const [data, setData] = useState([]);
  const [cat, setCat] = useState([]);
  const [activeCat, setActiveCat] = useState("All");
  const [filteredData, setFilteredData] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSort, setSelectedSort] = useState();
  const sortOptions = [
    "Featured",
    "Price:Low to High",
    "Price:High to Low",
    "Discount:Low to High",
    "Discount:High to Low",
    "Rating:Low to High",
    "Rating:High to Low",
  ];
  const getProducts = () => {
    fetch("https://dummyjson.com/products?limit=100")
      .then((response) => response.json())
      .then((res) => {
        setData(res.products);
        setFilteredData(res.products);
        getCategories(res.products);
        getBrands(res.products);
      });
  };
  const getCategories = (datas) => {
    let arr = [];
    if (datas && datas.length > 0) {
      datas.map((item, index) => {
        if (!arr.includes(item.category)) {
          arr.push(item.category);
        }
      });
    }
    setCat(arr);
  };
  const getBrands = (datas) => {
    let arr = [];
    if (datas && datas.length > 0) {
      datas.map((item, index) => {
        if (!arr.includes(item.brand)) {
          arr.push(item.brand);
        }
      });
    }
    setBrands(arr);
  };

  const handleActiveCat = (category) => {
    setActiveCat(category);
    let filterData = [...data];
    if (category != "All") {
      filterData = filterData.filter((item) => item.category == category);
    }
    setFilteredData(filterData);
    setSelectedSort("Featured");
    setSelectedBrands([]);
    getBrands(filterData);
  };
  const handleSelectedBrands = (items) => {
    setSelectedBrands(items);
    let filterData = [...data];
    if (items.length > 0) {
      filterData = filterData.filter((item) => items.includes(item.brand));
    }

    setFilteredData(filterData);
    setSelectedSort("Featured");
    setActiveCat("All");
  };

  const handleSort = (item) => {
    setSelectedSort(item);
    if (item == "Price:Low to High") {
      let filterData = [...filteredData];
      filterData = filterData.sort((a, b) => a.price - b.price);
      setFilteredData(filterData);
    } else if (item == "Price:High to Low") {
      let filterData = [...filteredData];
      filterData = filterData.sort((a, b) => b.price - a.price);
      setFilteredData(filterData);
    } else if (item == "Discount:Low to High") {
      let filterData = [...filteredData];
      filterData = filterData.sort(
        (a, b) => a.discountPercentage - b.discountPercentage,
      );
      setFilteredData(filterData);
    } else if (item == "Discount:High to Low") {
      let filterData = [...filteredData];
      filterData = filterData.sort(
        (a, b) => b.discountPercentage - a.discountPercentage,
      );
      setFilteredData(filterData);
    } else if (item == "Rating:High to Low") {
      let filterData = [...filteredData];
      filterData = filterData.sort((a, b) => b.rating - a.rating);
      setFilteredData(filterData);
    } else if (item == "Rating:Low to High") {
      let filterData = [...filteredData];
      filterData = filterData.sort((a, b) => a.rating - b.rating);
      setFilteredData(filterData);
    } else if (item == "Featured") {
      let filterData = [...filteredData];
      setFilteredData(filterData);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="md:flex py-12 flex-wrap md:flex-nowrap">
      {filteredData && filteredData.length > 0 ? (
        <>
          <div>
            <SideBar
              cat={cat}
              activeCat={activeCat}
              handleActiveCat={handleActiveCat}
              brands={brands}
              selectedBrands={selectedBrands}
              handleSelectedBrands={handleSelectedBrands}
            />
          </div>
          <div>
            <div>
              <Sort
                sortOptions={sortOptions}
                handleSort={handleSort}
                selectedSort={selectedSort}
              />
            </div>
            <div className="grid md:grid-cols-4 gap-4 grid-cols-1">
              {filteredData &&
                filteredData.length > 0 &&
                filteredData.map((item, index) => (
                  <div key={index}>
                    <ProductCard item={item} />
                  </div>
                ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <Loading />
        </>
      )}
    </div>
  );
}

export default ProductList;
