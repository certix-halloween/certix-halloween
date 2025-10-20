// src/components/Footer.tsx
import React from "react";

type SocialIconProps = {
  label: string;
  href: string;
  children: React.ReactNode;
};

const iconCls = "h-5 w-5 shrink-0 text-[#9AD79E]";
const linkCls =
  "text-[#C9D3C9] hover:text-white transition-colors leading-7 inline-flex items-center";

const SocialIcon: React.FC<SocialIconProps> = ({ label, href, children }) => (
  <a
    aria-label={label}
    href={href}
    target="_blank"
    rel="noreferrer"
    className="inline-flex h-9 w-9 items-center justify-center rounded-md text-[#A5B5A6] hover:text-white transition-colors"
  >
    {children}
  </a>
);

const Footer: React.FC = () => {
  return (
    <footer id="career" className="w-full bg-[#151717] text-[#E7F0E8]">
      {/* Top container (max 1920px) */}
      <div className="w-full max-w-[1920px] mx-auto px-6 md:px-10 lg:px-16 py-12">
        {/* Responsive grid: 1 → 2 → 4 */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand + blurb */}
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-3 w-3 rounded-full bg-[#2BB673]" />
              <span className="text-2xl font-semibold tracking-wide text-[#2BB673]">
                CERTIX
              </span>
            </div>

            <p className="mt-4 max-w-sm text-sm leading-6 text-[#C9D3C9]">
              Transforming education with a spooky twist this Halloween season.
            </p>
          </div>

          {/* Quick Links */}
          <nav aria-label="Footer quick links">
            <h3 className="text-[#CFE8D2] font-semibold text-lg">Quick Links</h3>
            <ul className="mt-4 space-y-1">
              <li>
                <a className={linkCls} href="#">
                  About Us
                </a>
              </li>
              <li>
                <a className={linkCls} href="#">
                  Courses
                </a>
              </li>
              <li>
                <a className={linkCls} href="#">
                  Career Paths
                </a>
              </li>
              <li>
                <a className={linkCls} href="#">
                  News
                </a>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="text-[#CFE8D2] font-semibold text-lg">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <span className={iconCls} aria-hidden>
                  📞
                </span>
                <span className="text-[#C9D3C9]">+94 412 200 270</span>
              </li>
              <li className="flex items-center gap-3">
                <span className={iconCls} aria-hidden>
                  📱
                </span>
                <span className="text-[#C9D3C9]">+94 771 182 119</span>
              </li>
              <li className="flex items-center gap-3">
                <span className={iconCls} aria-hidden>
                  📧
                </span>
                <a
                  className="text-[#C9D3C9] hover:text-white transition-colors"
                  href="mailto:info@certix.lk"
                >
                  info@certix.lk
                </a>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-[#CFE8D2] font-semibold text-lg">Follow Us</h3>
            <div className="mt-4 flex items-center gap-4">
              <SocialIcon label="Facebook" href="#">
                F
              </SocialIcon>
              <SocialIcon label="Twitter / X" href="#">
                X
              </SocialIcon>
              <SocialIcon label="Instagram" href="#">
                IG
              </SocialIcon>
              <SocialIcon label="LinkedIn" href="#">
                in
              </SocialIcon>
              <SocialIcon label="YouTube" href="#">
                ▶
              </SocialIcon>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[#242828]" />

      {/* Bottom bar (max 1920px) */}
      <div className="w-full max-w-[1920px] mx-auto px-6 md:px-10 lg:px-16 py-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm text-[#A5B5A6]">
          <p className="text-center sm:text-left">
            © 2024 Certix Institute. All rights reserved.
          </p>
          <p className="text-center sm:text-right">🎃 Happy Halloween! 👻</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;