
// import axios from 'axios';
// import { createContext, useState } from 'react'

// export const WishListContext =createContext();



// export default function WishListContextProvider({ children }) {
//   const [wishlist, setWishList] = useState([]);
//   function addWishClick(id) {
//     if (!wishlist.includes(id)) {
//       setWishList([...wishlist, id]);
//     }
//   }

//   let headers = {
//     token: localStorage.getItem("tkn"),
//   }; 

// async function addWishList(productId){
//  return axios.post('https://ecommerce.routemisr.com/api/v1/wishlist',
// {    "productId": productId} , { headers } ,
//   )
//   .then((response) => {
//     addWishClick(productId);
//     return true;
//   })
// .catch((error) => {
//   console.log(error);
// })





//  }
  
 
 
 
 
 
//  return <WishListContext.Provider value={{
//   addWishList,
//   wishlist,
//   setWishList,
//   }}>
//   { children }
//     </WishListContext.Provider>
  
// }
