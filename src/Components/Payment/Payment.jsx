import axios from "axios"
import { useFormik } from "formik"
import { useContext, useState } from "react"
import { CartContext } from "../../Context/CartContext"

export default function Payment() {

 const{cartId , clearUI} = useContext(CartContext);
// console.log( 'cartId' , cartId);
const [isOnline, setIsOnline] = useState(false);


function deleteAndCall(values){
if(isOnline){
    onlinePayment(values);
}
else{
    createCashOrder(values);
}
}

function createCashOrder (values){

const backend = {
    shippingAddress: values ,
}
axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, backend ,{
        headers : {
            token : localStorage.getItem('tkn')
        }
    })

.then((res) =>{
    console.log( "after cash",res);
    clearUI()
})
.catch((err) =>{
    console.log(err ,"err");
    
})

}
function onlinePayment (values){

const backend = {
    shippingAddress: values ,
}
axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`, backend ,{
        headers : {
            token : localStorage.getItem('tkn')
        },
        params :{
            url : 'http://localhost:3000'
        }
    })
.then((res) =>{
    console.log( "online order",res);
window,open (res.data.session.url ,'_self' ) ;  
 // clearUI()
})
.catch((err) =>{
    console.log(err ,"err");
    
})

}


const PaymentFormik = useFormik({
    initialValues: {
        details : '',
        city :'',
        phone :'',
    },
    // onSubmit : createCashOrder ,
    onSubmit : deleteAndCall ,
})

 return <>
 <div className="w-[85%] mx-auto p-5">

<form onSubmit={PaymentFormik.handleSubmit} className="max-w-md mx-auto">

<div className="relative z-0 w-full mb-5 group">
  <input value={PaymentFormik.values.details} onBlur={PaymentFormik.handleBlur} onChange={PaymentFormik.handleChange} type="text" name="details" id="details" className="block py-2.5 px-0 w-full text-sm text-emerald-900 bg-transparent border-0 border-b-2 border-emerald-300 appearance-none dark:text-dark dark:border-emerald-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
  <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-emerald-500 dark:text-emerald-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Details </label>


  {PaymentFormik.errors.details && PaymentFormik.touched.details ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
    {PaymentFormik.errors.details}

  </div> : ""}


</div>
<div className="relative z-0 w-full mb-5 group">
  <input value={PaymentFormik.values.phone} onBlur={PaymentFormik.handleBlur} onChange={PaymentFormik.handleChange} type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-emerald-900 bg-transparent border-0 border-b-2 border-emerald-300 appearance-none dark:text-dark dark:border-emerald-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
  <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-emerald-500 dark:text-emerald-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone </label>


  {PaymentFormik.errors.phone && PaymentFormik.touched.phone ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
    {PaymentFormik.errors.phone}

  </div> : ""}


</div>

<div className="relative z-0 w-full mb-5 group">
  <input value={PaymentFormik.values.city} onBlur={PaymentFormik.handleBlur} onChange={PaymentFormik.handleChange} type="text" name="city" id="city" className="block py-2.5 px-0 w-full text-sm text-emerald-900 bg-transparent border-0 border-b-2 border-emerald-300 appearance-none dark:text-dark dark:border-emerald-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
  <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-emerald-500 dark:text-emerald-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City</label>


  {PaymentFormik.errors.city && PaymentFormik.touched.city ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
    {PaymentFormik.errors.city}

  </div> : ""}


</div>



<button  onClick={() => setIsOnline (false)}     type="submit" className="text-dark bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
Cash Order
</button>
<button  onClick={() => setIsOnline (true)}     type="submit" className="text-dark mx-2 bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
Online Order
</button>
</form>








 </div>
 
 
 
 
 
 
 
 
 
 
 
 
 









    </>

}
