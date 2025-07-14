import React from 'react'
import Slider from "react-slick";
import img1 from "../../../assets/images/grocery-banner.png";
import img2 from "../../../assets/images/grocery-banner-2.jpeg";
import img3 from "../../../assets/images/slider-2.jpeg";
import img4 from "../../../assets/images/slider-image-1.jpeg";
import img5 from "../../../assets/images/slider-image-2.jpeg";
import img6 from "../../../assets/images/slider-image-3.jpeg";

export default function MainSlider() {

    var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    
  }

  return (
    <div className="flex flex-wrap container mx-auto mb-20">
      <div className="w-3/4 p-2">
                <Slider {...settings} className="w-full h-[250px]">
          <img src={img3} alt="" className="p-1  h-[250px] object-cover"/>
          <img src={img4} alt="" className="p-1 h-[250px] object-cover"/>
          <img src={img5} alt="" className="p-1 h-[250px] object-cover"/>
          <img src={img6} alt="" className="p-1 h-[250px] object-cover"/>
        </Slider>
      </div>
      <div className="w-1/4 p-2 ">
        <img src={img1} className="p-1 mt-0.5" alt="" />
        <img src={img2} alt="" className="p-1" />
      </div>
    </div>
  );
}
