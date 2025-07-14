import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { data, useParams } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import toast from "react-hot-toast";

export default function ProductDetails() {

  let {addCartItem} = useContext(CartContext);
  async function handleAddToCart(prodID) {
    let response = await addCartItem(prodID);
    console.log("Add to cart response:", response);
    // console.log(response);
    if (response?.data?.status === "success") {
      toast.success(response?.message, {
        duration: 3000,
        position: "top-right",
      });
    } else {
      toast.success(response?.message);
    }
  }


  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  let { id, category } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [relatedProduct, setRelatedProduct] = useState(null);

  function getProductDetails() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((response) => {
        setProductDetails(response?.data?.data);
        console.log("Product Details:", response.data.data);
        
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function getAllProducta() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then((response) => {
        console.log("All Products:", response.data.data);
        console.log("Category:", category);
        let related = response.data.data.filter(
          (prod) => prod.category.name === category
        );
        setRelatedProduct(related);
        console.log("Related Products:", related);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }

  useEffect(() => {
    getProductDetails();
    getAllProducta();
  }, [id]);

  if (!productDetails) {
    return <Spinner />;
  }

  return (
    <>
      <div className=" flex items-center justify-center bg-white">
        <div className="flex flex-wrap w-full max-w-6xl mx-auto items-center">
          <div className="w-full md:w-1/4 ">
            <Slider {...settings}>
              {productDetails.images.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={productDetails?.title}
                  className="w-full max-h-[400px] object-contain"
                />
              ))}
            </Slider>
          </div>
          <div className="w-full md:w-3/4 flex flex-col justify-center px-8">
            <div className="flex items-center justify-between w-full">
              <h3 className="text-4xl font-bold mb-2">
                {productDetails.title}
              </h3>
            </div>
            <p className="text-lg text-slate-600 mb-2">
              {productDetails.description}
            </p>
            <div className="text-green-500 text-xl mb-1">
              {productDetails.category?.name}
            </div>
            <div className="flex justify-between my-5">
              <span>{productDetails.price}EGP</span>
              <span className="flex items-center text-l">
                <i className="fas fa-star text-yellow-400 mr-1"></i>
                {productDetails.ratingsAverage}
              </span>
            </div>
            <div className="flex  justify-between mb-5 w-full">
              <div className="flex-1">
                <button
                  onClick={() => {
                    handleAddToCart(productDetails.id);
                  }}
                  className="w-[80%] py-2 text-white bg-lime-600 hover:bg-lime-400 rounded-md text-lg font-semibold transition-all duration-200"
                >
                  + Add
                </button>
              </div>

              <span className="text-2xl">
                <i className="fas fa-heart text-green-900"></i>
              </span>
            </div>
            <div className="flex items-center w-full"></div>
          </div>
        </div>
      </div>

      <div className="mt-28 w-full ">
        <h3 className="text-2xl text-green-500 mb-4">Related Products</h3>
        <div className="flex flex-wrap gap-9 container mx-auto">
          {relatedProduct && relatedProduct.length > 0 ? (
            relatedProduct.map((product) => (
              // <div className="container mx-auto">

              
                <div
                key={product._id} className="product group border rounded-lg p-4 bg-white shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:scale-105 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <Link
                    to={`/productdetails/${product._id}/${product.category.name}`}
                    className="relative z-10"
                  >
                    <div className="relative overflow-hidden rounded-lg mb-3">
                      <img
                        src={product.imageCover}
                        className="w-full h-48 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                        alt={product.title}
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-white font-semibold text-sm bg-green-500 px-3 py-1 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          View Details
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="text-green-600 text-sm font-medium uppercase tracking-wide group-hover:text-green-700 transition-colors duration-200">
                        {product.category?.name}
                      </span>
                      <h3 className="text-lg font-semibold text-gray-800 group-hover:text-green-600 transition-colors duration-200 line-clamp-2">
                        {product.title.split(" ").slice(0, 2).join(" ")}
                      </h3>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-200">
                          {product.price} EGP
                        </span>
                        <div className="flex items-center space-x-1">
                          <i className="fas fa-star text-yellow-400 group-hover:text-yellow-500 transition-colors duration-200"></i>
                          <span className="text-gray-600 font-medium group-hover:text-gray-800 transition-colors duration-200">
                            {product.ratingsAverage}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>

                  <button
                    onClick={() => {
                      handleAddToCart(product._id);
                    }}
                    className="relative z-10 w-full mt-4 py-3 text-white bg-green-500 hover:bg-green-600 rounded-lg font-medium transition-all duration-300 ease-in-out transform translate-y-64 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 hover:scale-105 hover:shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    <span className="flex items-center justify-center space-x-2">
                      <i className="fas fa-shopping-cart transition-transform duration-200 group-hover:scale-110"></i>
                      <span>Add to Cart</span>
                    </span>
                  </button>
                </div>
              // </div>
            ))
          ) : (
            <div className="text-gray-400">No related products found.</div>
          )}
        </div>
      </div>
    </>
  );
}
