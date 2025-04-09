// src/components/Header.jsx

import { useContext } from "react";
import { Menu, User } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Header = ({ onToggle, searchTerm, setSearchTerm }) => {
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <header className="bg-white shadow px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
  {/* Left: Toggle Button + Logo */}
  <div className="flex items-center justify-between sm:justify-start gap-4 w-full sm:w-auto">
    <button onClick={onToggle} className="p-2 rounded hover:bg-gray-100">
      <Menu className="h-6 w-6" />
    </button>
    <h1 className="text-xl font-semibold text-red-600">YouTube</h1>
  </div>

  {/* Center: Search Bar */}
  <div className="w-full sm:flex-1 max-w-xl">
    <input
      type="text"
      placeholder="Search videos..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
    />
  </div>

  {/* Right: Auth Section */}
  <div className="flex items-center gap-3 justify-end w-full sm:w-auto">
    {!user ? (
      <Link
        to="/login"
        className="flex items-center gap-2 border border-blue-600 text-blue-600 px-4 py-1.5 rounded-full hover:bg-blue-50 transition text-sm font-medium"
      >
        <User className="w-4 h-4" />
        Sign in
      </Link>
    ) : (
      <>
        <span className="text-sm font-medium">{user.username}</span>
        <img
          src={user.avatar || "/default-avatar.png"}
          alt="avatar"
          className="w-8 h-8 rounded-full"
        />
        <button
          onClick={handleLogout}
          className="text-sm text-gray-600 hover:text-red-600"
        >
          Logout
        </button>
      </>
    )}
  </div>
</header>

  );
};

export default Header;
