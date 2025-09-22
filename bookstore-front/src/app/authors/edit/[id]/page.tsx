"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import AuthorForm from "@/components/AuthorForm";
import { useAuthors } from "@/hooks/useAuthors";
import { Author } from "@/types/author";

export default function EditAuthorPage() {
  const router = useRouter();
  const params = useParams();
  const id = parseInt(params.id as string);

  const { authors, updateAuthor, loading: authorsLoading } = useAuthors();
  const [author, setAuthor] = useState<Author | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    if (authors.length > 0) {
      const foundAuthor = authors.find((a) => a.id === id);
      if (foundAuthor) {
        setAuthor(foundAuthor);
      } else {
        router.push("/authors");
      }
    }
  }, [authors, id, router]);

  const handleSubmit = async (authorData: any) => {
    setFormLoading(true);
    try {
      await updateAuthor(id, authorData);
      router.push("/authors");
    } catch (error) {
      console.error("Error actualizando autor:", error);
    } finally {
      setFormLoading(false);
    }
  };

  if (authorsLoading) return <div>Cargando...</div>;
  if (!author) return <div>Autor no encontrado</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Editar Autor</h1>
      <AuthorForm
        onSubmit={handleSubmit}
        initialData={author}
        loading={formLoading}
      />
    </div>
  );
}
