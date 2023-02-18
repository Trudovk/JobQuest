import { Link } from "react-router-dom";
import jbLogoLight from "../../assets/images/logolight.svg";

export const Header: React.FC = () => {
  const loggedIn = document.cookie.indexOf("session=") !== -1;
  const menu = (
    <>
      <li>
        <Link to={"/vacancies"}>Вакансии</Link>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-100 shadow-lg">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {menu}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          <img src={jbLogoLight} alt="JobQuest Logo" className="h-[0.9rem]" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{menu}</ul>
      </div>
      <div className="navbar-end">
        {!loggedIn && (
          <>
            <Link to="/registration" className="btn mr-2">
              Регистрация
            </Link>
            <Link to="/login" className="btn">
              Войти
            </Link>
          </>
        )}
        {loggedIn && (
          <Link to="/lk" className="btn mr-2">
            Личный кабинет
          </Link>
        )}
      </div>
    </div>
  );
};
