// src/components/Layout.jsx

import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser && storedUser !== "undefined") {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Error parsing stored user in Layout.jsx", err);
      setUser(null);
    }
  }, []);

  return (
    <div className="flex flex-col sm:flex-row h-screen overflow-hidden">
  {/* Sidebar */}
  {sidebarOpen && (
    <div className="sm:block w-full sm:w-64 bg-white shadow z-20 absolute sm:relative sm:z-auto">
      <Sidebar />
    </div>
  )}

  {/* Main Content */}
  <div className="flex flex-col flex-1">
    <Header
      onToggle={() => setSidebarOpen(!sidebarOpen)}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      user={user}
      setUser={setUser}
    />
    <main className="flex-1 overflow-auto bg-gray-50 px-4 py-6">
      <Outlet context={{ searchTerm }} />
    </main>
  </div>
</div>

  );
};

export default Layout;
