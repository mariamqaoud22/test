import SimpleSlider from "../HomeSlider/HomeSlider";
import img1 from '../../assets/images/XCM_Manual_1396328_4379575_Egypt_EG_BAU_GW_DC_SL_Bags_Wallets_379x304_1X._SY304_CB650636675_.jpg'
import img0 from '../../assets/images/XCM_Manual_1533480_5305769_379x304_1X._SY304_CB616236518_.jpg'
import VariableWidth from "../CategoriesSlider/CategoriesSlider";
import Products from "../Products/Products";
export default function Home() {
  return <>
  <div className="container mx-auto  pt-10 pb-10">
  <div className="flex items-center justify-center  ">
  <div className="w-[25%]">
  <SimpleSlider />
  </div>
  <div className="w-[20%]">  
<div>
  <img src={img1} className="w-full h-[250px] " alt="" />
</div>
<div>
  <img src={img0} className="w-full h-[250px]" alt="" />
</div>
  </div>
  </div>
  </div>

<div className="m-5 pt-2 pb-2"> 
  <VariableWidth/>
  </div>
 
 <div>
  <Products/>
 </div>
  </>

  
}


 