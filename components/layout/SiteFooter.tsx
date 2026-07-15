import { FaChevronDown, FaFacebookF, FaLinkedinIn, FaTwitter, FaYoutube, MdOutlineLocationOn } from "@/components/ui/icons";
import Link from "next/link";
import {
  footerCompanyLinks,
  footerPlatformLinks,
  footerResourceLinks,
  footerTopLinks,
  footerWhyLinks,
  LANGUAGES,
} from "@/lib/navigation";

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="font-bold text-sm uppercase tracking-widest mb-6">{title}</h3>
      <ul className="text-sm text-gray-400 space-y-4">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="nav-link-animated inline-block hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="footer-bg text-white pb-6 pt-8 px-6 bg-navy" id="footer">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-8 justify-between mb-10 pb-10 border-b border-white/10">
          <div className="flex gap-6 text-xl">
            <a href="#" className="hover:text-teal transition-colors" aria-label="Facebook">
              <FaFacebookF aria-hidden="true" />
            </a>
            <a href="#" className="hover:text-teal transition-colors" aria-label="Twitter">
              <FaTwitter aria-hidden="true" />
            </a>
            <a href="#" className="hover:text-teal transition-colors" aria-label="LinkedIn">
              <FaLinkedinIn aria-hidden="true" />
            </a>
            <a href="#" className="hover:text-teal transition-colors" aria-label="YouTube">
              <FaYoutube aria-hidden="true" />
            </a>
          </div>
          <div className="flex flex-wrap gap-12 text-sm font-bold uppercase tracking-wider">
            {footerTopLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="hover:text-teal"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-5">
          <div>
            <Link
              href="/contact"
              className="border-2 border-teal text-teal px-8 py-3 rounded-full font-bold mb-10 w-full hover:bg-teal hover:text-navy transition-all inline-flex items-center justify-center"
            >
              Contact us
            </Link>
            <div className="mb-8 space-y-3">
              <div className="flex items-start gap-3">
                <MdOutlineLocationOn
                  className="mt-0.5 h-5 w-5 shrink-0 text-teal"
                  aria-hidden="true"
                />
                <p className="text-sm text-gray-400">
                  Palo Alto, California 94306, USA
                </p>
              </div>
              <div className="flex items-start gap-3">
                <MdOutlineLocationOn
                  className="mt-0.5 h-5 w-5 shrink-0 text-teal"
                  aria-hidden="true"
                />
                <p className="text-sm text-gray-400">
                  Akadeemia tee 12618, Tallinn, Estonia
                </p>
              </div>
            </div>
            <div className="relative inline-block w-full">
              <select
                className="bg-navy border border-white/20 rounded-full px-6 py-2 text-sm appearance-none w-full cursor-pointer focus:outline-none"
                defaultValue="English"
                aria-label="Language"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang}>{lang}</option>
                ))}
              </select>
              <FaChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-xs pointer-events-none" aria-hidden="true" />
            </div>
          </div>
          <FooterColumn title="Company" links={footerCompanyLinks} />
          <FooterColumn title="Why Suricat" links={footerWhyLinks} />
          <FooterColumn title="Platform" links={footerPlatformLinks} />
          <FooterColumn title="Resources" links={footerResourceLinks} />
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 pt-4 border-t border-white/10 text-[10px] text-gray-500 uppercase tracking-widest">
          <p>
            © 2026 Suricat. All rights reserved.{" "}
            <a href="#" className="nav-link-animated inline-block hover:text-white ml-2">
              Terms &amp; Conditions
            </a>{" "}
            |{" "}
            <a href="#" className="nav-link-animated inline-block hover:text-white ml-2">
              Privacy Policy
            </a>{" "}
            |{" "}
            <a href="#" className="nav-link-animated inline-block hover:text-white ml-2">
              Cookie Settings
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
