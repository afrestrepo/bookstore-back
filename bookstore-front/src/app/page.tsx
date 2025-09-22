import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-4xl font-bold mb-8">Bookstore</h1>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/authors"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-center transition-colors duration-300"
        >
          Ver Lista de Autores
        </Link>
        <Link
          href="/authors/create"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-center transition-colors duration-300"
        >
          Crear Nuevo Autor
        </Link>
      </div>
    </div>
  );
}
