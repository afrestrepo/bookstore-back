"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthorForm from "@/components/AuthorForm";
import { useAuthors } from "@/hooks/useAuthors";

export default function CreateAuthorPage() {
  const router = useRouter();
  const { createAuthor } = useAuthors();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (authorData: any) => {
    setLoading(true);
    try {
      await createAuthor(authorData);
      router.push("/authors");
    } catch (error) {
      console.error("Error creando autor:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Crear Nuevo Autor</h1>
      <AuthorForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}
