
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Bars } from "react-loader-spinner";
import useAllCategories from "../customHooks/useAllCategories";



export default function VariableWidth() {

  const settings = {
    className: "slider variable-width",
    dots: true,
    infinite: true,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true
  };

  const {data, isError, isLoading} =useAllCategories();

if (isLoading) {
  return<div className="h-screen bg-emerald-200 flex justify-center items-center">
    <Bars
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="bars-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  </div>
}
if (isError) {return<>
      <h3>lablablaaaaabla</h3>
    </>
  }

  return <>
  <div className="slider-container">
  <Slider {...settings}>

{data.data.data.map((category) => <div key={category._id}>

<img className="w-full h-80"  src={category.image} alt={category.name}/>
<h6>{category.name}</h6>
</div>
)}
  </Slider>
</div>
  </>;
}




