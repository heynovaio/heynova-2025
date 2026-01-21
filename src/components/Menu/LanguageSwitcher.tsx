"use client";
import { PrismicDocument } from "@prismicio/client";
import { useRouter, usePathname } from "next/navigation";
import { fullLangList } from "@/constants/languages";

interface LanguageSwitcherProps {
  locales: PrismicDocument[];
  classname?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  locales,
  classname,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const currentLang = pathname.split("/")[1];
  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedLocale = locales.find(
      (locale) => locale.lang === event.target.value
    );
    if (selectedLocale && selectedLocale.url) {
      router.push(selectedLocale.url);
    }
  };
  return (
    <>
      <style>{`
        select:focus {
          outline: 2px solid #97e1e5;
          outline-offset: 2px;
          background-color: rgba(151, 225, 229, 0.1);
        }
      `}</style>
      <div className={`print:hidden ${classname}`}>
        <div className="inline-flex text-sm items-center px-2 pt-1 pb-2 bg-midnight md:bg-transparent border-t border-l rounded-tl-lg lg:border-none">
          <label htmlFor="language-switcher" className="px-1 py-1 text-sm">
            Language:
          </label>

          <select
            id="language-switcher"
            value={currentLang}
            onChange={handleLanguageChange}
            className="bg-transparent px-1 py-1 rounded-lg text-sm transition-all"
            aria-label="Select language"
          >
            {locales.map((locale) => (
              <option key={locale.id} value={locale.lang}>
                {fullLangList[locale.lang as keyof typeof fullLangList]}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};
