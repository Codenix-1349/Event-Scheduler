import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, Calendar, PlusCircle, UserPlus, LogIn } from "lucide-react";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  return (
    <div className="navbar bg-base-100/80 backdrop-blur-md sticky top-0 z-50 px-4 md:px-12 border-b border-base-content/5">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-2xl flex gap-2 items-center hover:bg-transparent">
          <div className="bg-primary p-2 rounded-xl">
            <Calendar className="w-6 h-6 text-primary-content" />
          </div>
          <span className="font-black tracking-tighter text-base-content">EVENTLY.</span>
        </Link>
      </div>
      <div className="flex-none gap-4">
        <ul className="menu menu-horizontal p-0 gap-2 items-center">
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/create-event" className="btn btn-primary btn-sm md:btn-md rounded-full px-6 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all border-none">
                  <PlusCircle className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="hidden md:inline">Create Event</span>
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="btn btn-ghost btn-sm md:btn-md rounded-full hover:text-error transition-colors">
                  <LogOut className="w-4 h-4" />
                  <span className="hidden md:inline">Sign Out</span>
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/signin" className="btn btn-ghost btn-sm md:btn-md rounded-full font-bold">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/signup" className="btn btn-primary btn-sm md:btn-md rounded-full px-6 shadow-lg shadow-primary/20 border-none">
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

const Layout = () => {
  return (
    <div className="min-h-screen bg-base-200/50" data-theme="nord">
      <Navbar />
      <main className="container mx-auto p-6 md:p-12 min-h-[calc(100vh-140px)]">
        <Outlet />
      </main>
      <footer className="footer footer-center p-10 bg-base-100 border-t border-base-content/5 text-base-content/60">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 opacity-100">
             <div className="bg-primary/10 p-1.5 rounded-lg">
               <Calendar className="w-4 h-4 text-primary" />
             </div>
             <span className="font-bold tracking-tighter text-base-content">EVENTLY.</span>
          </div>
          <p>© 2026 Evently. Built for creators and communities.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
