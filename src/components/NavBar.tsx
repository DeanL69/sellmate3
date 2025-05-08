import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserCircle, Menu, X, Sun, Moon } from "lucide-react";
import { useState } from "react";

interface NavBarProps {
  userType?: "buyer" | "seller" | "middleman" | "admin";
  darkMode?: boolean;
  setDarkMode?: (val: boolean) => void;
}

export function NavBar({ userType, darkMode, setDarkMode }: NavBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getNavColorClass = () => {
    switch (userType) {
      case "buyer":
        return "bg-blue-50 border-blue-100";
      case "seller":
        return "bg-green-50 border-green-100";
      case "middleman":
        return "bg-purple-50 border-purple-100";
      case "admin":
        return "bg-red-50 border-red-100";
      default:
        return "bg-white border-gray-100";
    }
  };

  const isLoggedIn = userType !== undefined;
  const isAuthPage = location.pathname.includes("/login") || location.pathname.includes("/signup");

  if (isAuthPage) {
    return null;
  }

  return (
    <nav className={`border-b ${getNavColorClass()} sticky top-0 z-50`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">
            <span className="text-blue-600">SellMate</span>
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop navigation + Night mode toggle */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Link to="/">
                  <Button variant="ghost" size="sm">
                    Logout
                  </Button>
                </Link>
                <Link to={userType ? `/profile/${userType}` : '/profile'}>
                  <Button size="sm" variant="ghost">
                    <UserCircle className="h-5 w-5" />
                  </Button>
                </Link>
              </>
            ) : null}
            {/* Night mode toggle button */}
            {typeof darkMode !== 'undefined' && setDarkMode && (
              <button
                className="ml-2 z-50 bg-white/80 dark:bg-[#232b3a] border border-gray-200 dark:border-gray-700 rounded-full p-2 shadow hover:scale-110 transition-all"
                onClick={() => setDarkMode(!darkMode)}
                aria-label="Toggle night mode"
                type="button"
              >
                {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-blue-700" />}
              </button>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} pt-4 pb-2 space-y-2`}>
          {isLoggedIn ? (
            <>
              <Link to="/" className="block px-2 py-1 hover:bg-gray-100 rounded">
                Logout
              </Link>
              <Link to="/profile" className="block px-2 py-1 hover:bg-gray-100 rounded">
                Profile
              </Link>
            </>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
