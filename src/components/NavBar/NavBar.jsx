import { useContext, useState } from "react";
// Logo is now in public folder, referenced directly
import { NavLink, useNavigate } from "react-router-dom";
import { CounterContext } from "../contexts/CounterContext";
import { UserContext } from "../contexts/UserContext";
import { CartContext } from "../contexts/CartContext";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  let { numOfCartItems } = useContext(CartContext);
  // let { counter, setCounter } = useContext(CounterContext);
  let { userLogin, setUserLogin } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setUserLogin(null);
    navigate("/login");
  };
  return (
    <>
      <nav className="bg-slate-100 p-2 fixed top-0 end-0 start-0 z-40">
        <div className="container max-w-6xl mx-auto flex flex-row justify-between items-center">
          <div className="flex items-center py-4">
            <img width={130} src="/freshcart-logo.svg" alt="FreshCart Logo" />
          </div>

          <button
            className="md:hidden ml-auto text-3xl focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span>{menuOpen ? "✖" : "☰"}</span>
          </button>

          <div
            className={`fixed top-0 left-0 w-full h-auto bg-slate-100 z-50 flex flex-col items-center p-6 gap-6 transition-transform duration-300 md:static md:bg-transparent md:w-auto md:h-auto md:p-0 md:flex-row md:items-center md:justify-center ${
              menuOpen ? "top-16  translate-y-0" : "-translate-y-full"
            } md:translate-y-0`}
          >
            <ul
              onClick={() => setMenuOpen(false)}
              className="w-full flex flex-col gap-4 items-start md:flex-row md:items-center md:justify-center md:mx-auto md:gap-6 md:w-auto text-gray-600"
            >
              {userLogin !== null ? (
                <>
                  <li>
                    <NavLink to="/home">Home</NavLink>
                  </li>
                  <li>
                    <NavLink to="cart">Cart</NavLink>
                  </li>
                  <li>
                    <NavLink to="wishlist">Wishlist</NavLink>
                  </li>
                  <li>
                    <NavLink to="products">Products</NavLink>
                  </li>
                  <li>
                    <NavLink to="categories">Categories</NavLink>
                  </li>
                  <li>
                    <NavLink to="brands">Brands</NavLink>
                  </li>
                  <div className="w-full flex flex-col md:flex-row gap-6 items-center justify-center">
                    <li className="flex items-center gap-2 ms-44 mt-8 md:mt-0">
                      <span className="relative">
                        <i
                          onClick={() => navigate("/cart")}
                          className="cursor-pointer fa-solid fa-cart-shopping text-2xl"
                        ></i>
                        <span className="absolute -top-2 -right-3 bg-green-600 text-white text-xs rounded-full px-2 py-0.5">
                          {numOfCartItems}
                        </span>
                      </span>
                    </li>
                    <li
                      onClick={() => {
                        navigate("/personal");
                      }}
                      className="cursor-pointer"
                    >
                      <i className="fa-solid fa-user"></i>
                    </li>
                    <li
                      className="mt-2 md:mt-0 ms-5"
                      onClick={() => {
                        handleLogout();
                        setMenuOpen(false);
                      }}
                    >
                      <span className="cursor-pointer text-lg">log out</span>
                    </li>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-full flex flex-col md:flex-row gap-4 items-center justify-center">
                    <li>
                      <NavLink to="register" onClick={() => setMenuOpen(false)}>
                        Register
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="login" onClick={() => setMenuOpen(false)}>
                        Login
                      </NavLink>
                    </li>
                  </div>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
