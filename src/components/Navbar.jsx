import { Link, NavLink, useNavigate } from "react-router-dom";

const navLinkStyle = ({ isActive }) =>
  `px-4 py-2 rounded-lg transition-all duration-200 ${
    isActive
      ? "underline underline-offset-8 font-semibold"
      : "hover:bg-white/10"
  }`;

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");

    navigate("/login", { replace: true });
  };

  return (
    <nav className="bg-blue-600 text-white px-8 py-3 flex justify-between items-center">
      <NavLink to="/dashboard">
        {" "}
        <h1 className="text-2xl font-bold">Fitness Tracker</h1>
      </NavLink>
      <div className="flex gap-6">
        <NavLink to="/dashboard" className={navLinkStyle}>
          Dashboard
        </NavLink>
        <NavLink to="/activities" className={navLinkStyle}>
          Activities
        </NavLink>
        <NavLink to="/add-activity" className={navLinkStyle}>
          Add Activity
        </NavLink>
      </div>
      <button
        type="button"
        onClick={handleLogout}
        className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 cursor-pointer"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
