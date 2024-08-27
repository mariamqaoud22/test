import axios from "axios";
import { useContext } from "react";
import { Bars } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function Products() {
  const { addProduct } = useContext(CartContext);
  async function handleAddProduct(id) {
    const resFlag = await addProduct(id);
    if (resFlag) {
 toast.success("Product Added successfully", {
   position: "top-center",
   duration: 2000,
 });
    } else {
 toast.error("addding errror", {
   position: "top-center",
   duration: 2000,
 });
    }
  }

  function getAllProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  
  const { data, isError, isLoading, error, isFetching } = useQuery({
    queryKey: "allProducts",
    queryFn: getAllProducts,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  if (isError) {
    return (
 <>
   <h3>lablablaaaaabla</h3>
 </>
    );
  }

  if (isLoading) {
    return (
 <div className="h-screen bg-emerald-200 flex justify-center items-center">
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
    );
  }

  return (
    <>
<div className="container mx-auto">
   <div className=" grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
{data.data.data.map((product) => (
  <div className="relative overflow-hidden group">
    <div key={product._id} className="product p-2">
 <div
   onClick={() => handleAddProduct(product._id)}
   className="cursor-pointer group-hover:translate-x-0 transition-[500ms] p-2 rounded-xl bg-emerald-500 absolute top-2 end-2 translate-x-[200%] "
 >
   <i className="fa-solid fa-plus text-white"></i>
 </div>
 <Link to={`/ProductDetails/${product._id}`}>
   <img
className="w-full"
src={product.imageCover}
alt={product.title}
   />

   <h6 className="text-emerald-600">{product.category.name}</h6>

   <h2>{product.title.split(" ").slice(0, 2).join(" ")}</h2>

   <div className="flex justify-between items-center">
<p>
  <span
    className={
 product.priceAfterDiscount
   ? "line-through text-red-600" 
   : ""
    }
  >
    {product.price}
  </span>
  <span className="ml-3">{product.priceAfterDiscount}</span>
</p>
<p>
  <i className="fa-solid fa-star text-amber-500"></i>{" "}
  {product.ratingsAverage}
</p>
   </div>
 </Link>
<button   onClick > <i className="fa-regular  fa-heart  text-red-500 p-5"></i> </button>
    </div>
  </div>
))}
   </div>
 </div>
    </>
  );
}
