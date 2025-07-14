import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./CategorySlider.css"; 

export default function CategorySlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }

  const [categories, setCategories] = useState(null);
  function getAllCategories() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then((response) => {
        // console.log("All Categories:", response?.data?.data);
        setCategories(response?.data?.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }
  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <>
      <div className="mt-3 mb-24 ">
        <Slider {...settings} className="w-full">
          {categories?.map((cat) => {
            return (
              <div key={cat._id} className="flex flex-col items-center w-full">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-[230px] object-cover"
                />
                <h3 className="text-center text-2xl font-semibold mt-2">
                  {cat.name}
                </h3>
              </div>
            );
          })}
        </Slider>
      </div>
    </>
  );
}
