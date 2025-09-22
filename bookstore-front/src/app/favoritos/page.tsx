'use client';

import Link from 'next/link';
import { useAuthors } from '@/hooks/useAuthors';
import { useFavorites } from '@/context/FavoritesContext';

export default function FavoritesPage() {
  const { authors, loading } = useAuthors();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();


  const favoriteAuthors = authors.filter(author => favorites.includes(author.id!));

  return (

        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold">Autores Favoritos</h1>
            <Link href="/authors" 
            className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Volver a la lista
            </Link>
          
          
          
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {favoriteAuthors.map(author => (
                <div key={author.id} className="border border-gray-700 rounded p-4 bg-gray-900">
                  <img 
                    src={author.image} 
                    alt={author.name} 
                    className="w-full h-48 object-cover rounded mb-2"
                  />
                  <h2 className="text-xl font-semibold">{author.name}</h2>
                  <p className="text-gray-400">{new Date(author.birthDate).toLocaleDateString()}</p>
                  <p className="mt-2 text-gray-300">{author.description}</p>
                  
                  <div className="mt-4 flex space-x-2">
                    <Link 
                      href={`/authors/edit/${author.id}`}
                      className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                    >
                      Editar
                    </Link>
                    <button 
                      onClick={() => toggleFavorite(author.id!)}
                      className="bg-yellow-500 text-black px-3 py-1 rounded text-sm"
                      aria-label="Quitar de favoritos"
                      aria-pressed={true}
                    >
                       Eliminar
                    </button>
                  </div>
                </div>
              ))}
        </div>
      </div>
  );
}