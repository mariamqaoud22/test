import axios from "axios";
import { useEffect, useState } from "react";
import { createContext } from "react";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [allProducts, setAllProducts] = useState(null);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [cartId, setCartId] = useState(null);

function clearUI(){
  setAllProducts(null);
  setTotalCartPrice(0);
  setNumOfCartItems(0);
  setCartId(null);
}

  let headers = {
    token: localStorage.getItem("tkn"),
  };

  async function addProduct(productId) { 
    return axios.post("https://ecommerce.routemisr.com/api/v1/cart",{
          "productId": productId
        },{ headers:{
          token: localStorage.getItem("tkn"),
        } ,
  })
      .then((res) => {
        // console.log(res);
        // setNumOfCartItems(res.data.numOfCartItems);
        // setAllProducts(res.data.data.products);
        // setTotalCartPrice(res.data.data.totalCartPrice);
        getUserCart()
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  }
  
  function getUserCart() {
    axios.get("https://ecommerce.routemisr.com/api/v1/cart",
       {
        headers},) 
      .then((res) => {
        setNumOfCartItems(res.data.numOfCartItems);
        setAllProducts(res.data.data.products);
        setTotalCartPrice(res.data.data.totalCartPrice);
        setCartId(res.data.data._id);
      })

      .catch((error) => {
        console.log("error", error);
      });
  }

  function updateCount(productId , newCount){
    axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
     { 'count': newCount ,}
   ,{
    headers
   })
   
   .then((res) => {
    setNumOfCartItems(res.data.numOfCartItems);
    setAllProducts(res.data.data.products);
    setTotalCartPrice(res.data.data.totalCartPrice);
  })

  .catch((error) => {
    console.log("error", error);
  });}


async  function deleteProduct(productId){
 return  axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` ,
  {headers}
)
.then((res) => {
  setNumOfCartItems(res.data.numOfCartItems);
  setAllProducts(res.data.data.products);
  setTotalCartPrice(res.data.data.totalCartPrice);

  return true;
})

.catch((error) => {
  console.log("error", error);
  return false ;
})
}
  function clearCart(){
  axios.delete('https://ecommerce.routemisr.com/api/v1/cart' ,
    {headers}
  )
  .then((res) => {
    setNumOfCartItems(0);
    setAllProducts([]);
    setTotalCartPrice(0);
  })

  .catch((error) => {
    console.log("error", error);
  })


}
  

  useEffect(() => {
    getUserCart();
  }, []);
 
  return (
    <CartContext.Provider
      value={{
        addProduct,
        allProducts,
        totalCartPrice,
        numOfCartItems,
        getUserCart,
        updateCount,
        clearCart,
        deleteProduct,
        cartId,
        // updateUI,
        clearUI,
        
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
