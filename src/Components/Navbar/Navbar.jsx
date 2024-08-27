import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/freshcart-logo.svg";
import { useContext } from "react";
import { authContext } from "../../Context/AuthContext";
import { CartContext } from "../../Context/CartContext";

export default function Navbar() {
  const { token, setToken } = useContext(authContext);
  const navigate = useNavigate();
const {numOfCartItems} =useContext(CartContext)
  function handleLogout() {
    localStorage.removeItem("tkn");
    setToken(null);

    navigate("/Login");
  }

  return (
    <>
      <nav className=" bg-emerald-500 text-white">
        <div className="flex p-3 mx-auto container items-center justify-between">
          <div className="flex w-100 items-center justify-between ">
            <Link to="/Home" className="p-3">
              <img src={logo} alt="" /> 
            </Link>

            {token ? (
              <ul className="flex items-center  space-x-5">
                <li>
                  <NavLink to="/Home"> Home </NavLink>
                </li>
                <li className="relative">
                  <NavLink to="/Cart">Cart 
<div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-black bg-red-500 border-2 border-black rounded-full -top-4 -end-4">
  {numOfCartItems}
</div>
                  </NavLink>
                </li>
                {/* <li>
                  <NavLink to="/WishList">Wish list </NavLink>
                </li> */}
                <li>
                  <NavLink to="/Products">Products </NavLink>
                </li>
                <li>
                  <NavLink to="/Categories"> Categories</NavLink>
                </li>
                <li>
                  <NavLink to="/Brands"> Brands</NavLink>
                </li>
                {/* <li>
                  <NavLink to="/ForgotPassword"> ForgotPassword</NavLink>
                </li>
                <li>
                  <NavLink to="/VerifyResetCode"> VerifyResetCode</NavLink>
                </li>
               
                <li>
                  <NavLink to="/ResetPassword"> ResetPassword</NavLink>
                </li> */}
                
                
                
              
              </ul>
            ) : null}
          </div>

          <div className="flex items-center gap-4 ">
            <ul className="flex items-center gap-3 p-2 ">
              <li>
                <i className="fa-brands cursor-pointer fa-instagram"></i>
              </li>
              <li>
                <i className="fa-brands cursor-pointer fa-facebook-f"></i>
              </li>
              <li>
                <i className="fa-brands cursor-pointer fa-tiktok"></i>
              </li>
              <li>
                <i className="fa-brands cursor-pointer fa-twitter"></i>
              </li>
              <li>
                <i className="fa-brands cursor-pointer fa-linkedin-in"></i>
              </li>
              <li>
                <i className="fa-brands cursor-pointer fa-youtube"></i>
              </li>
            </ul>

            <ul className="flex items-center gap-1">
              {token ? (
                <li>
                  <span className="cursor-pointer" onClick={handleLogout}>
                    Logout
                  </span>
                </li>
              ) : (
                <>
                  <li>
                    <NavLink to="/Register"> Register</NavLink>
                  </li>
                  <li>
                    <NavLink to="/Login">Login</NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
