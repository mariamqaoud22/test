import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import sliderImage1 from '../../assets/images/41nN4nvKaAL._AC_SY200_.jpg'
import sliderImage2 from '../../assets/images/61cSNgtEISL._AC_SY200_.jpg'
import sliderImage3 from '../../assets/images/XCM_Manual_1396328_4379574_Egypt_EG_BAU_GW_DC_SL_Jewelry_379x304_1X._SY304_CB650636675_.jpg'


export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings} arrows={false}>

      
      <div >
        <img className="w-full h-[500px]"  src={sliderImage1} alt=""/>
      </div>
      <div>
        <img className="w-full h-[500px]"  src={sliderImage2} alt=""/>
      </div>
      <div>
        <img className="w-full h-[250px] pt-1"  src={sliderImage3} alt=""/>
      </div>
    
    
    </Slider>
  );
}