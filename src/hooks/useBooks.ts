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

const MAX_RETRIES = 3;
const BASE_DELAY = 1000;

const fetchBooks = async (query: string, retryCount = 0): Promise<Book[]> => {
  if (!query.trim()) {
    return [];
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
        query
      )}&maxResults=12`
    );

    // Handle rate limit error
    if (response.status === 429 && retryCount < MAX_RETRIES) {
      const delay = BASE_DELAY * Math.pow(2, retryCount); // Exponential backoff
      console.log(`Rate limited. Retrying in ${delay}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchBooks(query, retryCount + 1);
    }

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data: GoogleBooksResponse = await response.json();
    console.log("respons", data);
    return data.items || [];
  } catch (error) {
    if (retryCount < MAX_RETRIES) {
      const delay = BASE_DELAY * Math.pow(2, retryCount); // Exponential backoff
      console.log(`Request failed. Retrying in ${delay}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchBooks(query, retryCount + 1);
    }
    throw error;
  }
};

export const useBooks = (searchQuery: string) => {
  return useQuery({
    queryKey: ["books", searchQuery],
    queryFn: () => fetchBooks(searchQuery),
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    retry: false, // Disable TanStack Query's built-in retries since we handle them ourselves
    enabled: searchQuery.trim().length > 0, // Only run query if there's a search term
  });
};

export type { Book };
