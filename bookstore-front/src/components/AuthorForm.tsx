'use client';

import { useState, useEffect } from 'react';
import { Author, CreateAuthorDto } from '@/types/author';

interface AuthorFormProps {
  onSubmit: (author: CreateAuthorDto) => void;
  initialData?: Author;
  loading?: boolean;
  errors?: { [key: string]: string };
}

export default function AuthorForm({ onSubmit, initialData, loading = false, errors = {} }: AuthorFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    description: '',
    image: ''
  });

  useEffect(() => {
    if (initialData) {
      const birthDateString = initialData.birthDate instanceof Date 
        ? initialData.birthDate.toISOString().split('T')[0]
        : new Date(initialData.birthDate).toISOString().split('T')[0];
      
      setFormData({
        name: initialData.name,
        birthDate: birthDateString,
        description: initialData.description,
        image: initialData.image
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSubmit = {
      ...formData,
      birthDate: new Date(formData.birthDate)
    };
    onSubmit(dataToSubmit);
  };

  const hasError = (field: string) => errors[field] !== undefined;

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="name" className="block mb-1">Nombre</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className={`w-full p-2 border rounded bg-gray-800 text-white ${
            hasError('name') ? 'border-red-500' : 'border-gray-600'
          }`}
          aria-invalid={hasError('name')}
          aria-describedby={hasError('name') ? 'name-error' : undefined}
        />
        {hasError('name') && (
          <span id="name-error" className="text-red-500 text-sm" role="alert">
            {errors.name}
          </span>
        )}
      </div>
      
      <div>
        <label htmlFor="birthDate" className="block mb-1">Fecha de nacimiento</label>
        <input
          type="date"
          id="birthDate"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
          required
          className={`w-full p-2 border rounded bg-gray-800 text-white ${
            hasError('birthDate') ? 'border-red-500' : 'border-gray-600'
          }`}
          aria-invalid={hasError('birthDate')}
          aria-describedby={hasError('birthDate') ? 'birthDate-error' : undefined}
        />
        {hasError('birthDate') && (
          <span id="birthDate-error" className="text-red-500 text-sm" role="alert">
            {errors.birthDate}
          </span>
        )}
      </div>
      
      <div>
        <label htmlFor="description" className="block mb-1">Descripción</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className={`w-full p-2 border rounded bg-gray-800 text-white ${
            hasError('description') ? 'border-red-500' : 'border-gray-600'
          }`}
          rows={4}
          aria-invalid={hasError('description')}
          aria-describedby={hasError('description') ? 'description-error' : undefined}
        />
        {hasError('description') && (
          <span id="description-error" className="text-red-500 text-sm" role="alert">
            {errors.description}
          </span>
        )}
      </div>
      
      <div>
        <label htmlFor="image" className="block mb-1">URL de la imagen</label>
        <input
          type="url"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          required
          className={`w-full p-2 border rounded bg-gray-800 text-white ${
            hasError('image') ? 'border-red-500' : 'border-gray-600'
          }`}
          aria-invalid={hasError('image')}
          aria-describedby={hasError('image') ? 'image-error' : undefined}
        />
        {hasError('image') && (
          <span id="image-error" className="text-red-500 text-sm" role="alert">
            {errors.image}
          </span>
        )}
      </div>
      
      <button 
        type="submit" 
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
        aria-label={loading ? "Guardando autor..." : "Guardar autor"}
      >
        {loading ? 'Guardando...' : 'Guardar'}
      </button>
    </form>
  );
}