"use client";

import { useState, useEffect } from "react";
import { Author } from "@/types/author";

interface AuthorFormProps {
  onSubmit: (author: Omit<Author, "id">) => void;
  initialData?: Author;
  loading?: boolean;
}

export default function AuthorForm({
  onSubmit,
  initialData,
  loading = false,
}: AuthorFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        birthDate: initialData.birthDate,
        description: initialData.description,
        image: initialData.image,
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block mb-1">
          Nombre
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="birthDate" className="block mb-1">
          Fecha de nacimiento
        </label>
        <input
          type="date"
          id="birthDate"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="description" className="block mb-1">
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
          rows={4}
        />
      </div>

      <div>
        <label htmlFor="image" className="block mb-1">
          URL de la imagen
        </label>
        <input
          type="url"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
      >
        {loading ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
}
