import { useContext } from "react";
import { I18nContext } from "../i18n";
import { TranslationKeyPath } from "../meditations";

/**
 * Returns a function that can be used to translate strings with type safety.
 */
export function useTranslations() {
  const i18n = useContext(I18nContext);
  const translate = (stringId: TranslationKeyPath): string => i18n.t(stringId);
  return translate;
}
