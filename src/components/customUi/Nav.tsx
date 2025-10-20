import { Button } from "../Button"
import { Menu, Phone, Mail, Search } from "lucide-react";
import { useState } from "react";
import  logo  from "../../assets/logo.png"

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full sticky top-0 z-50 bg-[#141414]">
      {/* Top thin contact bar */}
      <div className="w-full bg-black text-white">
        <div className="container mx-auto px-4 py-1 text-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 text-xs">
              <a href="tel:+94412200270" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone className="w-3 h-3" />
                <span className="hidden sm:inline">+94 412 200 270</span>
              </a>
              <a href="mailto:info@certix.lk" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="w-3 h-3" />
                <span className="hidden sm:inline">info@certix.lk</span>
              </a>
            </div>
            <div className="text-xs opacity-80 hidden md:block">&nbsp;</div>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="w-full bg-transparent border-b border-border">
        <div className="container mx-auto px- py-3">
          <div className="flex items-center justify-between gap-10 mx-5">
            <div className="flex items-center gap-6">
              <img src={logo} alt="logo" className="w-[92px] h-[92px] ml-[px] mr-[62px]  object-contain" />
            </div>

            <div className="hidden lg:flex items-center flex-1">
              <div className="flex items-center gap-8">
                <a href="#home" className="text-white hover:text-primary transition-colors font-medium">Home</a>
                <a href="#about" className="text-white/80 hover:text-primary transition-colors">About us</a>
                <a href="#courses" className="text-white/80 hover:text-primary transition-colors">Courses</a>
                <a href="#career" className="text-white/80 hover:text-primary transition-colors">Career paths</a>
                <a href="#news" className="text-white/80 hover:text-primary transition-colors">News</a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Search className="w-5 h-5 text-white/90" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="w-6 h-6 text-white" />
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden mt-3 pb-4 border-t border-border pt-3 mx-5 space-y-3">
              <a href="#home" className="block text-white hover:text-primary transition-colors">Home</a>
              <a href="#about" className="block text-white/80 hover:text-primary transition-colors">About us</a>
              <a href="#courses" className="block text-white/80 hover:text-primary transition-colors">Courses</a>
              <a href="#career" className="block text-white/80 hover:text-primary transition-colors">Career paths</a>
              <a href="#news" className="block text-white/80 hover:text-primary transition-colors">News</a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;