import axios from "axios";
import { useContext, useState } from "react";
import { Bars } from "react-loader-spinner";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
// import {WishListContext} from "../../Context/WishListContext";

export default function ProductDetails() {
  const { id } = useParams();




const { wishList, addWishlist  }=useContext(WishListContext);
const {addProduct}= useContext(CartContext)
const [loading, setLoading] = useState(false);

async function handleAddProduct (id){
 const resFlag = await addProduct (id);
 console.log('resFlag',resFlag);
 
 if (resFlag) {
toast.success ('Product Added successfully',{
  position :'top-center',
  duration : 2000,
    })

 }
 else{
  toast.error ('addding errror'
    ,{
      position :'top-center',
      duration : 2000,
    }
  )
 }
}



// async function addProductWishlist(id) {
//   setLoading(true);
//   const response = await addWishlist(id);
//   setLoading(false);

//   if (response.data.status === "success") {
//     toast.success(response.data.message);
//   } else {
//     toast.error("Product not added successfully to your wishList");
//   }
// }



 

  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  const { data, isError, isLoading } = useQuery({
    queryKey: ["ProductDetails", id],
    queryFn: getProductDetails,
    retry : 0,
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

  const objectDetails = data.data.data;
  return <>
      <div className="container mx-auto p-10 flex items-center justify-center">
        <div className="w-1/4">
          <img
            src={objectDetails.imageCover}
            className="w-full"
            alt={objectDetails.name}
          />
        </div>

        <div className="w-2/4">
          <h1>{objectDetails.title}</h1>
          <p>{objectDetails.description}</p>
          <h5>category: {objectDetails.category.name}</h5>
          <h5>{objectDetails.price}</h5>
          <button onClick={() =>handleAddProduct(objectDetails._id)}  className="bg-emerald-500 p-5 rounded-xl w-full">
            + Add
          </button>
        </div>
        <div className="w-1/4">
          <p className="">
            <i className="fa-solid fa-star text-amber-500"></i>
            {objectDetails.ratingsAverage}
          </p>
           
          {/* <button
                onClick={() => {
                  addProductWishlist(id);
                }}
                className="btn text-white bg-main btn-sm">
                <i
                  className={`fa-${
                    wishlist.includes(id) ? "solid" : "regular"
                  } fa-heart`}></i>
              </button> */}
           
            <button className="" > <i className="fa-solid fa-heart text-dark-500 p-5"></i> </button>
        </div>
      </div>
    </>
 
}



