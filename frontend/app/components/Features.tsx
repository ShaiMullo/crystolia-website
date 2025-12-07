"use client";

import type { Locale } from "../../i18n/config";
import {
  PremiumIcon,
  SizesIcon,
  PriceIcon,
  FastIcon,
  ProvenIcon,
  ServiceIcon,
} from "@/app/icons/CrystoliaIcons";

interface FeaturesProps {
  locale: Locale;
  dict: {
    features: {
      title: string;
      subtitle: string;
      items: Array<{
        title: string;
        description: string;
      }>;
    };
  };
}

// Map icon components to feature indices based on exact title matching
// English: Premium Quality, Multiple Sizes, Competitive Pricing, Fast Service, Proven Quality, Customer Service
// Hebrew: איכות פרימיום, מגוון גדלים, מחיר תחרותי, שירות מהיר, איכות מוכחת, שירות לקוחות
const featureIcons = [
  PremiumIcon, // Index 0: Premium Quality / איכות פרימיום
  SizesIcon,   // Index 1: Multiple Sizes / מגוון גדלים
  PriceIcon,   // Index 2: Competitive Pricing / מחיר תחרותי
  FastIcon,    // Index 3: Fast Service / שירות מהיר
  ProvenIcon, // Index 4: Proven Quality / איכות מוכחת
  ServiceIcon, // Index 5: Customer Service / שירות לקוחות
];

export default function Features({ locale, dict }: FeaturesProps) {
  const isRTL = locale === "he";

  return (
    <section
      id="features"
      className="relative py-32 bg-white overflow-hidden animate-fade-slow"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#F5C542] rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#F5C542] rounded-full blur-3xl" />
      </div>

      <div
        className={`relative z-10 max-w-7xl mx-auto px-6 lg:px-12 ${
          isRTL ? "rtl" : "ltr"
        }`}
      >
        {/* Section Header */}
        <div className="text-center mb-20 animate-slide-up">
          <h2 className="text-5xl md:text-6xl font-extralight tracking-tight text-gray-900 mb-4">
            {dict.features.title}
          </h2>
          <p className="text-xl font-light text-gray-600 max-w-2xl mx-auto animate-fade-in-delay">
            {dict.features.subtitle}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dict.features.items.map((feature, index) => {
            const IconComponent = featureIcons[index] || PremiumIcon;
            return (
              <div
                key={index}
                className="group relative p-8 rounded-3xl bg-gradient-to-br from-white to-gray-50/50 border border-gray-100 hover:border-[#F5C542]/30 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 hover:shadow-[0_0_16px_rgba(245,197,66,0.25)]"
              >
                {/* Premium Icon Container - Always visually on the right */}
                <div className="absolute top-4 right-4 flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md border border-[#F5C542]/30" dir="ltr">
                  <IconComponent />
                </div>

                {/* Title - Positioned with proper spacing for icon */}
                <div className={`mb-6 ${isRTL ? "pr-20" : "pl-20"}`}>
                  <h3 className="text-2xl font-light text-gray-900">
                    {feature.title}
                  </h3>
                </div>

                <p className="text-gray-600 font-light leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Effect Glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#F5C542]/0 to-[#F5C542]/0 group-hover:from-[#F5C542]/5 group-hover:to-transparent transition-all duration-500 pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
