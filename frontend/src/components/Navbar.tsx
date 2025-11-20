import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import { Menu, X, Home, Building2, MapPin, Users, Briefcase, MessageSquare, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Construction", path: "/construction", icon: Building2 },
    { name: "Properties", path: "/properties", icon: MapPin },
    { name: "Community", path: "/community", icon: MessageSquare },
    { name: "Careers", path: "/careers", icon: Briefcase },
    { name: "About", path: "/about", icon: Users },
    { name: "Contact", path: "/contact", icon: Phone },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">Lotsdacity</span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button variant="ghost" className="gap-2">
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Button>
              </Link>
            ))}

            {!user ? (
              <>
                <Link to="/login"><Button className="ml-2">Login</Button></Link>
                <Link to="/register"><Button className="ml-2">Register</Button></Link>
              </>
            ) : (
              <>
                <Button onClick={handleLogout} className="ml-2">Logout</Button>
                <Link to="/account"><Button className="ml-2">Account</Button></Link>
              </>
            )}
          </div>

          {/* Mobile menu */}
          <button className="md:hidden rounded-md p-2 hover:bg-accent" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

<div
  className={cn(
    "md:hidden overflow-y-auto transition-all duration-300 ease-in-out",
    isOpen ? "max-h-[70vh] pb-4" : "max-h-0"
  )}>
          <div className="flex flex-col space-y-2 pt-2">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path} onClick={() => setIsOpen(false)}>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Button>
              </Link>
            ))}

            {!user ? (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)}><Button className="w-full">Login</Button></Link>
                <Link to="/register" onClick={() => setIsOpen(false)}><Button className="w-full">Register</Button></Link>
              </>
            ) : (
              <>
                <span className="px-2">Welcome, {user.name}</span>
                <Button onClick={handleLogout} className="w-full text-left">Logout</Button>
                <Link to="/account" onClick={() => setIsOpen(false)}><Button className="w-full text-left">Account</Button></Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
