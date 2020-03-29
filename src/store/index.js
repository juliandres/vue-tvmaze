const STORAGE_KEY = "favorites-vue-tvmaze";

export const favoriteStorage = {
  fetch() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  },
  save(favorites) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }
};
