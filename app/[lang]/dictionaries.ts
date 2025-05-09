import "server-only"

const dictionaries = {
  id: () => import("./dictionaries/id.json").then((module) => module.default),
  en: () => import("./dictionaries/en.json").then((module) => module.default),
}

export const getDictionary = async (locale: "id" | "en") => {
  const validLocale = locale === "en" ? "en" : "id"
  return dictionaries[validLocale]()
}
