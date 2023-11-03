import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import { createContext } from "react";
import { I18nManager } from "react-native";
import en from "./en";

/**
 * We include "*-US" for some valid language codes because when you change the system language,
 * the language code is the suffixed with "-US". i.e. if a device is set to English ("en"),
 * if you change to another language and then return to English language code is now "en-US".
 */
const i18n = new I18n({ en, "en-US": en });

const localeInfo = Localization.getLocales()[0];
i18n.defaultLocale = "en";
i18n.enableFallback = true;
i18n.locale = localeInfo.languageCode;

// TODO: Redo rtl based on expo docs
// handle RTL languages
export const isRTL = localeInfo.textDirection === "rtl";
I18nManager.allowRTL(isRTL);
I18nManager.forceRTL(isRTL);

export const I18nContext = createContext(i18n);
