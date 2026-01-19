import { PrismicDocument, RichTextField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { GlobalDocumentData } from "../../../prismicio-types";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface AnnouncementProps {
  text: RichTextField;
  locales: PrismicDocument[];
  global: GlobalDocumentData | undefined;
}

export const Announcement: React.FC<AnnouncementProps> = ({
  text,
  locales,
}) => {
  return (
    <div className="bg-[#83B3C1] w-full text-center text-midnight px-2 md:px-0 py-2 flex-col">
      <PrismicRichText
        field={text}
        components={{
          paragraph: ({ children }) => <p className="text-sm">{children}</p>,
        }}
      />

      {locales && locales.length > 1 && (
        <div className="absolute top-0 right-4 z-[60] ">
          <LanguageSwitcher locales={locales} classname="hidden lg:block" />
        </div>
      )}
    </div>
  );
};
