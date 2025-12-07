"use client";

import { useState, useEffect } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import Image from "next/image";
import type { Locale } from "../../i18n/config";

interface HeaderProps {
  locale: Locale;
  dict: {
    nav: {
      home: string;
      products: string;
      features: string;
      about: string;
      contact: string;
    };
  };
}

export default function Header({ locale, dict }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isRTL = locale === "he";

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-500 ease-out
        backdrop-blur-md border-b
        ${
          scrolled
            ? "bg-black/30 border-white/20 shadow-lg py-4"
            : "bg-black/20 border-white/10 py-6"
        }
      `}
    >
      <nav className={`max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 md:w-12 md:h-12">
            <Image
              src="/crystolia-logo.png"
              alt="Crystolia"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="text-2xl md:text-3xl font-light tracking-tight text-white">
            Crystolia
          </span>
        </div>

        {/* Navigation Links - Desktop */}
        <div
          className={`hidden md:flex items-center gap-8 ${
            isRTL ? "flex-row-reverse" : ""
          }`}
        >
          <a
            href="#home"
            className={`relative text-sm font-light text-white/90 hover:text-white transition-all duration-300 px-2 py-1 group ${
              isRTL ? "text-right" : "text-left"
            }`}
          >
            {dict.nav.home}
            <span className={`absolute bottom-0 h-0.5 bg-[#F5C542] transition-all duration-300 group-hover:w-full ${
              isRTL ? "right-0 w-0 group-hover:w-full" : "left-0 w-0 group-hover:w-full"
            }`} />
          </a>
          <a
            href="#products"
            className={`relative text-sm font-light text-white/90 hover:text-white transition-all duration-300 px-2 py-1 group ${
              isRTL ? "text-right" : "text-left"
            }`}
          >
            {dict.nav.products}
            <span className={`absolute bottom-0 h-0.5 bg-[#F5C542] transition-all duration-300 group-hover:w-full ${
              isRTL ? "right-0 w-0 group-hover:w-full" : "left-0 w-0 group-hover:w-full"
            }`} />
          </a>
          <a
            href="#features"
            className={`relative text-sm font-light text-white/90 hover:text-white transition-all duration-300 px-2 py-1 group ${
              isRTL ? "text-right" : "text-left"
            }`}
          >
            {dict.nav.features}
            <span className={`absolute bottom-0 h-0.5 bg-[#F5C542] transition-all duration-300 group-hover:w-full ${
              isRTL ? "right-0 w-0 group-hover:w-full" : "left-0 w-0 group-hover:w-full"
            }`} />
          </a>
          <a
            href="#about"
            className={`relative text-sm font-light text-white/90 hover:text-white transition-all duration-300 px-2 py-1 group ${
              isRTL ? "text-right" : "text-left"
            }`}
          >
            {dict.nav.about}
            <span className={`absolute bottom-0 h-0.5 bg-[#F5C542] transition-all duration-300 group-hover:w-full ${
              isRTL ? "right-0 w-0 group-hover:w-full" : "left-0 w-0 group-hover:w-full"
            }`} />
          </a>
          <a
            href="#contact"
            className={`relative text-sm font-light text-white/90 hover:text-white transition-all duration-300 px-2 py-1 group ${
              isRTL ? "text-right" : "text-left"
            }`}
          >
            {dict.nav.contact}
            <span className={`absolute bottom-0 h-0.5 bg-[#F5C542] transition-all duration-300 group-hover:w-full ${
              isRTL ? "right-0 w-0 group-hover:w-full" : "left-0 w-0 group-hover:w-full"
            }`} />
          </a>
        </div>

        {/* Language Switcher */}
        <LanguageSwitcher />
      </nav>
    </header>
  );
}
