import { Button } from "../Button";
import { Menu, X, Phone, Mail, Search } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import logo from "../../assets/logo.png";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Shadow on scroll for sticky nav
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (isMenuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isMenuOpen]);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeMenu]);

  return (
    <nav
      className={[
        "w-full sticky h-[105px] top-0 z-50",
        "bg-black", // 💥 solid black background
        scrolled ? "shadow-[0_2px_12px_rgba(0,0,0,0.4)]" : "shadow-none",
      ].join(" ")}
      role="navigation"
      aria-label="Main"
    >
      {/* Top thin contact bar */}
      <div className="w-full bg-black text-white">
        <div className="container mx-auto px-4 py-1 text-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 text-xs">
              <a
                href="tel:+94412200270"
                className="flex items-center gap-2 hover:text-[#41D085] transition-colors"
              >
                <Phone className="w-3 h-3" />
                <span className="hidden sm:inline">+94 412 200 270</span>
              </a>
              <a
                href="mailto:info@certix.lk"
                className="flex items-center gap-2 hover:text-[#41D085] transition-colors"
              >
                <Mail className="w-3 h-3" />
                <span className="hidden sm:inline">info@certix.lk</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="w-full border-border">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="Certix logo"
                className="w-[92px] h-[92px] object-contain"
              />
            </div>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center flex-1">
              <div className="flex items-center gap-8">
                <a
                  href="#home"
                  className="text-white hover:text-[#41D085] transition-colors font-medium"
                >
                  Home
                </a>
                <a
                  href="#about"
                  className="text-white/80 hover:text-[#41D085] transition-colors"
                >
                  About us
                </a>
                <a
                  href="#courses"
                  className="text-white/80 hover:text-[#41D085] transition-colors"
                >
                  Courses
                </a>
                <a
                  href="#career"
                  className="text-white/80 hover:text-[#41D085] transition-colors"
                >
                  Career paths
                </a>
                <a
                  href="#news"
                  className="text-white/80 hover:text-[#41D085] transition-colors"
                >
                  News
                </a>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Search className="w-5 h-5 text-white/90" />
              </Button>

              {/* Hamburger */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                onClick={() => setIsMenuOpen((s) => !s)}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6 text-white" />
                ) : (
                  <Menu className="w-6 h-6 text-white" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Overlay */}
          {isMenuOpen && (
            <button
              type="button"
              className="fixed inset-0 bg-black/50 lg:hidden"
              aria-hidden="true"
              onClick={closeMenu}
            />
          )}

          {/* Mobile Menu Panel */}
          <div
            id="mobile-menu"
            className={[
              "lg:hidden mx-5 overflow-hidden",
              "transition-[max-height,opacity] duration-300 ease-out",
              isMenuOpen ? "max-h-96 opacity-100 mt-3" : "max-h-0 opacity-0",
            ].join(" ")}
          >
            <div className="rounded-lg border border-white/10 bg-black/95 backdrop-blur p-4 space-y-3">
              <a
                href="#home"
                onClick={closeMenu}
                className="block text-white hover:text-[#41D085] transition-colors py-1"
              >
                Home
              </a>
              <a
                href="#about"
                onClick={closeMenu}
                className="block text-white/80 hover:text-[#41D085] transition-colors py-1"
              >
                About us
              </a>
              <a
                href="#courses"
                onClick={closeMenu}
                className="block text-white/80 hover:text-[#41D085] transition-colors py-1"
              >
                Courses
              </a>
              <a
                href="#career"
                onClick={closeMenu}
                className="block text-white/80 hover:text-[#41D085] transition-colors py-1"
              >
                Career paths
              </a>
              <a
                href="#news"
                onClick={closeMenu}
                className="block text-white/80 hover:text-[#41D085] transition-colors py-1"
              >
                News
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
