import { useQuery } from "@tanstack/react-query";

interface Book {
  id: string;
  saleInfo: {
    buyLink: string;
  };
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    imageLinks?: {
      thumbnail: string;
    };
  };
}

interface GoogleBooksResponse {
  items: Book[];
}

const fetchBooks = async (query: string): Promise<Book[]> => {
  if (!query.trim()) {
    return [];
  }

  try {
    // Use the Cloudflare Worker API endpoint instead of calling Google Books API directly
    const response = await fetch(`/api/books?q=${encodeURIComponent(query)}`);

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data: GoogleBooksResponse = await response.json();
    console.log("API response:", data);
    return data.items || [];
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

export const useBooks = (searchQuery: string) => {
  return useQuery({
    queryKey: ["books", searchQuery],
    queryFn: () => fetchBooks(searchQuery),
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    retry: 2, // Allow a few retries for network issues
    enabled: searchQuery.trim().length > 0, // Only run query if there's a search term
  });
};

export type { Book };
