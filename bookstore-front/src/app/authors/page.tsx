"use client";

import Link from "next/link";
import { useAuthors } from "@/hooks/useAuthors";
import { useFavorites } from "@/context/FavoritesContext";

export default function AuthorsPage() {
  const { authors, loading, deleteAuthor } = useAuthors();
  const { toggleFavorite, isFavorite } = useFavorites();

  const handleDelete = async (id: number) => {
    if (confirm("¿Estás seguro de que quieres eliminar este autor?")) {
      try {
        await deleteAuthor(id);
      } catch (error) {
        console.error("Error eliminando author:", error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Autores</h1>

      <Link
        href="/authors/create"
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 inline-block"
      >
        Crear Nuevo Autor
      </Link>
      <Link
        href="/favoritos"
        className="bg-yellow-500 text-black px-4 py-2 rounded"
      >
        Ver Favoritos
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {authors.map((author) => (
          <div
            key={author.id}
            className="border border-gray-700 rounded p-4 bg-gray-900"
          >
            <img
              src={author.image}
              alt={author.name}
              className="w-full h-48 object-cover rounded mb-2"
            />
            <h2 className="text-xl font-semibold">{author.name}</h2>
            <p className="text-gray-400">
              {new Date(author.birthDate).toLocaleDateString()}
            </p>
            <p className="mt-2 text-gray-300">{author.description}</p>

            <div className="mt-4 flex space-x-2">
              <Link
                href={`/authors/edit/${author.id}`}
                className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
              >
                Editar
              </Link>
              <button
                onClick={() => handleDelete(author.id!)}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm"
              >
                Eliminar
              </button>
              <button
                onClick={() => toggleFavorite(author.id!)}
                className={`px-3 py-1 rounded text-sm ${
                  isFavorite(author.id!)
                    ? "bg-yellow-500 text-black"
                    : "bg-gray-700 text-white"
                }`}
                aria-label={
                  isFavorite(author.id!)
                    ? "Quitar de favoritos"
                    : "Agregar a favoritos"
                }
                aria-pressed={isFavorite(author.id!)}
              >
                {isFavorite(author.id!) ? "★ Favorito" : "☆ Favorito"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
