import "server-only";

import en from "./dictionaries/en.json";
import he from "./dictionaries/he.json";
import ru from "./dictionaries/ru.json";
import type { Locale } from "./config";

export type Dictionary = {
  welcomeTitle: string;
  welcomeSubtitle: string;
  nav: {
    home: string;
    products: string;
    features: string;
    about: string;
    contact: string;
  };
  hero: {
    title: string;
    subtitle: string;
    description: string;
    whatsapp: string;
    contactNow: string;
    leaveDetails: string;
  };
  features: {
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
  products: {
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      description: string;
      whatsapp: string;
    }>;
  };
  about: {
    title: string;
    content: string[];
  };
  contact: {
    title: string;
    subtitle: string;
    form: {
      name: string;
      phone: string;
      message: string;
      submit: string;
      sending: string;
      success: string;
      error: string;
    };
    whatsapp: string;
  };
  footer: {
    copyright: string;
    rights: string;
  };
};

const dictionaries = {
  en,
  he,
  ru,
} satisfies Record<Locale, Dictionary>;

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  return dictionaries[locale];
};
