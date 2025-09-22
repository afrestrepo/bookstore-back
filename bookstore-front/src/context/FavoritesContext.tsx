'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FavoritesContextType {
  favorites: number[]; 
  toggleFavorite: (authorId: number) => void;
  isFavorite: (authorId: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (authorId: number) => {
    setFavorites(prev => 
      prev.includes(authorId) 
        ? prev.filter(id => id !== authorId)
        : [...prev, authorId]
    );
  };

  const isFavorite = (authorId: number) => favorites.includes(authorId);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('error del contexto');
  }
  return context;
};
