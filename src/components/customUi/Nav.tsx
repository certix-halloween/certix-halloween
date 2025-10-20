import { Button } from "../Button";
import { Menu, X, Phone, Mail, Search } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import logo from "../../assets/logo.png";

const SECTION_IDS = ["home", "about", "courses", "career", "news"] as const;

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("home");

  // Measure navbar height (fallback 105)
  const navHeight = 105;

  // Shadow on scroll for sticky nav
  useEffect(() => {
    if (typeof window === "undefined") return;

    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Lock body scroll when mobile menu open (always return a cleanup)
  useEffect(() => {
    if (typeof document === "undefined") return;

    const prev = document.body.style.overflow;
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isMenuOpen]);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  // Smooth scroll with offset helper
  const scrollToSection = useCallback(
    (id: string) => {
      if (typeof window === "undefined" || typeof document === "undefined") return;
      const el = document.getElementById(id);
      if (!el) return;
      const y = el.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({ top: y, behavior: "smooth" });
    },
    [navHeight]
  );

  // Handle clicks on nav links
  const onNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      scrollToSection(id);
      setActive(id);
      closeMenu();
      // update URL hash without jumping
      if (typeof history !== "undefined") {
        history.replaceState?.(null, "", `#${id}`);
      }
    },
    [scrollToSection, closeMenu]
  );

  // Close on Escape (always return cleanup)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [closeMenu]);

  // On load: if there is a hash, smooth-scroll to it with offset
  useEffect(() => {
    if (typeof window === "undefined") return;

    const hash = window.location.hash.replace("#", "");
    if (hash && SECTION_IDS.includes(hash as (typeof SECTION_IDS)[number])) {
      const t = setTimeout(() => scrollToSection(hash), 50);
      setActive(hash);
      return () => clearTimeout(t);
    }
  }, [scrollToSection]);

  // Observe active section while scrolling
  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;
    if (typeof IntersectionObserver === "undefined") return;

    const opts: IntersectionObserverInit = {
      root: null,
      rootMargin: `-${navHeight + 8}px 0px -60% 0px`,
      threshold: 0,
    };
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const id = (entry.target as HTMLElement).id;
        if (entry.isIntersecting && SECTION_IDS.includes(id as (typeof SECTION_IDS)[number])) {
          setActive(id);
        }
      }
    }, opts);

    const nodes = SECTION_IDS
      .map((id) => document.getElementById(id))
      .filter((n): n is HTMLElement => !!n);

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [navHeight]);

  const linkBase = "transition-colors cursor-pointer";
  const linkInactive = "text-white/80 hover:text-[#41D085]";
  const linkActive = "text-white font-medium";

  const NavLink = useCallback(
    ({ id, children }: { id: string; children: React.ReactNode }) => (
      <a
        href={`#${id}`}
        onClick={(e) => onNavClick(e, id)}
        className={`${linkBase} ${active === id ? linkActive : linkInactive}`}
        aria-current={active === id ? "page" : undefined}
      >
        {children}
      </a>
    ),
    [active, onNavClick]
  );

  return (
    <nav
      className={[
        "w-full sticky h-[105px] top-0 z-50",
        "bg-black",
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
                <NavLink id="home">Home</NavLink>
                <NavLink id="about">About us</NavLink>
                <NavLink id="courses">Courses</NavLink>
                <NavLink id="career">Career paths</NavLink>
                <NavLink id="news">News</NavLink>
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
              {SECTION_IDS.map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => onNavClick(e, id)}
                  className={[
                    "block transition-colors py-1",
                    active === id
                      ? "text-white"
                      : "text-white/80 hover:text-[#41D085]",
                  ].join(" ")}
                >
                  {id === "home"
                    ? "Home"
                    : id === "about"
                    ? "About us"
                    : id === "courses"
                    ? "Courses"
                    : id === "career"
                    ? "Career paths"
                    : "News"}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
