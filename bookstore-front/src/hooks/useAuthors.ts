"use client";

import { useState, useEffect } from "react";
import { Author } from "@/types/author";

const API_URL = "http://127.0.0.1:8080/api/authors";

export const useAuthors = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setAuthors(data);
    } catch (error) {
      console.error("Error mostrando autores:", error);
    } finally {
      setLoading(false);
    }
  };

  const createAuthor = async (author: Omit<Author, "id">) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(author),
      });
      const newAuthor = await response.json();
      setAuthors((prev) => [...prev, newAuthor]);
      return newAuthor;
    } catch (error) {
      console.error("Error creando autor:", error);
      throw error;
    }
  };

  const updateAuthor = async (id: number, author: Omit<Author, "id">) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(author),
      });
      const updatedAuthor = await response.json();
      setAuthors((prev) => prev.map((a) => (a.id === id ? updatedAuthor : a)));
      return updatedAuthor;
    } catch (error) {
      console.error("Error actualizando:", error);
      throw error;
    }
  };

  const deleteAuthor = async (id: number) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      setAuthors((prev) => prev.filter((a) => a.id !== id));
    } catch (error) {
      console.error("Error eliminando:", error);
      throw error;
    }
  };

  return {
    authors,
    loading,
    createAuthor,
    updateAuthor,
    deleteAuthor,
    refetch: fetchAuthors,
  };
};
