
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Cart() {

  const { allProducts,totalCartPrice,numOfCartItems,updateCount, deleteProduct, clearCart } = useContext(CartContext);
function handelUpdateCount(id , newCount){
  updateCount(id , newCount)
}

async function handelDelete(productId){
 const resFlag =await deleteProduct(productId)
if(resFlag){
  toast.success("delete success");
}
  else{
    toast.error("error")
  }
  

}

  return <>
  <div className=" w-[85%] mx-auto" >
  <div className="flex pt-6 justify-between items-end mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Cart Shop</h2>
            <p className="text-lg font-semibold text-gray-700">
              Total price: <span className="text-emerald-600"> {totalCartPrice}</span> EGP
            </p>
          </div>
          <div>
            <Link  to='/Payment'>
            <button className="bg-emerald-500 text-white px-4 py-2 rounded">check out</button>
            </Link>
            <p className="text-lg font-semibold text-gray-700">
              total number of  <span className="text-emerald-600">{numOfCartItems}</span> items
            </p>
          </div>
        </div>


<div className="relative py-5  overflow-x-auto shadow-md sm:rounded-lg">
  <table className="w-full text-sm text-left rtl:text-right text-emerald-500">
    <thead className="text-xs text-gray-700 uppercase bg-emerald-100">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Items
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
    {allProducts?.map(product =>   <tr key={product._id} className="bg-white border-b hover:bg-emerald-50">
        <td className="p-4">
          <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product.product.title}/>
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900">
        {product.product.title}
        
                </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <button disabled={product.count === 0} onClick={() => handelUpdateCount(product.product._id , product.count - 1 )}  className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-emerald-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
              </svg>
            </button>
            <div>
              <input type="number" id="first_product" className="bg-emerald-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emring-emerald-500 block px-2.5 py-1" placeholder={product.count} required />
            </div>
            <button onClick={() => handelUpdateCount(product.product._id , product.count + 1 )} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-emerald-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
              </svg>
            </button>
          </div>
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900">
        {product.price}
        </td>
        <td className="px-6 py-4">
          <a  onClick={() => handelDelete(product.product._id)} href="#" className="font-medium text-red-600 hover:underline">Remove</a>
        </td>
      </tr>

)}

    </tbody>
  </table>
<div className="flex  justify-center mt-6">
<button 
  onClick={(clearCart)}className="  text-gray-900 border border-emerald-500 rounded px-4 py-2 hover:bg-emerald-50"
>
  Clear Your Cart
</button>
</div>
</div>

</div>
  
  
  </>
  
}







