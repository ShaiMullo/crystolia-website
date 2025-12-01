import "server-only";

import en from "./dictionaries/en.json";
import he from "./dictionaries/he.json";
import ru from "./dictionaries/ru.json";

type Dictionary = {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    whatsapp: string;
    contactNow: string;
    leaveDetails: string;
  };
  // במידה ויש עוד חלקים, נוסיף אותם כאן
};

const dictionaries: Record<string, Dictionary> = {
  en,
  he,
  ru,
};

export const getDictionary = async (locale: string): Promise<Dictionary> => {
  return dictionaries[locale];
};
