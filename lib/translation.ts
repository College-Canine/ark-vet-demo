import lang from "@/lang.csv";

interface Translations {
  [key: string]: {
    [lang: string]: string;
  };
}

// Cache translations to avoid re-reading the file multiple times.
const translations: Translations = {};

/**
 * Loads translations from a CSV file.
 * Expects a CSV with a header row having a "key" column and additional columns per language code.
 *
 * Example CSV:
 * key,en_US,es_ES
 * name,Acme Vet,Acme Veterinaria
 *
 * @param csvFilePath - The file path to your CSV.
 */
function loadTranslations(): void {
  // console.log(lang);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lang.forEach((record: any) => {
    const key = record["key"];
    if (key) {
      translations[key] = {};
      Object.keys(record).forEach((column) => {
        if (column !== "key") {
          translations[key][column] = record[column];
        }
      });
    }
  });
}

/**
 * Instantiates the translation service.
 * Reads the CSV file (only once) and returns a function to get translations by key and language.
 *
 * @param csvFilePath - The path to your translations CSV file.
 * @returns A function that takes a translation key and a language code and returns the corresponding translation.
 */
export function instantiateTranslation(
  lang: string = "en_US"
): (key: string) => string {
  if (Object.keys(translations).length === 0) {
    loadTranslations();
  }
  return (key: string): string => {
    return translations[key]?.[lang] || key;
  };
}
