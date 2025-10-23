"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-muted/95 relative z-50">
      <div className="px-4 sm:px-0 py-3 flex items-center justify-between">
        {/* Mobile logo */}
        <Link href="/">
          <Image
            src="/images/SAK_icon.png"
            alt="Sveriges Astrologiska Förening"
            width={67}
            height={67}
            priority
            className="block lg:hidden"
          />
          {/* Desktop logo - no left padding */}
          <Image
            src="/images/SAK_banner_D.png"
            alt="Stockholms Astrologiska Konferens"
            width={350}
            height={67}
            priority
            className="lg:block hidden"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 mr-8">
          <Link
            href="/#forelesare"
            className="text-primary hover:text-accent transition-colors font-medium"
          >
            Föreläsare
          </Link>
          {/* <Link
            href="/program"
            className="text-primary hover:text-accent transition-colors font-medium"
          >
            Program
          </Link> */}
          <Link
            href="/om-konferensen"
            className="text-primary hover:text-accent transition-colors font-medium"
          >
            Om konferensen
          </Link>
          <Link
            href="/kontakt"
            className="text-primary hover:text-accent transition-colors font-medium"
          >
            Kontakt
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-primary p-2"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="bg-muted border-t border-primary/20 fixed top-[90px] left-0 right-0">
          <div className="px-4 py-4 flex flex-col gap-4">
            <Link
              href="/#forelesare"
              className="text-primary hover:text-accent transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Föreläsare
            </Link>
            {/* <Link
              href="/program"
              className="text-primary hover:text-accent transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Program
            </Link> */}
            <Link
              href="/om-konferensen"
              className="text-primary hover:text-accent transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Om konferensen
            </Link>
            <Link
              href="/kontakt"
              className="text-primary hover:text-accent transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Kontakt
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
