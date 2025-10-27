import { create } from "zustand";

type State = {
    favorites: string[];
    toggleFavorite: (name: string) => void;
};

export const useFavoritesStore = create<State>((set, get) => ({
    favorites: [],
    toggleFavorite: (name) => {
        const { favorites } = get();
        set({
            favorites: favorites.includes(name)
                ? favorites.filter((f) => f !== name)
                : [...favorites, name],
        });
    },
}));
