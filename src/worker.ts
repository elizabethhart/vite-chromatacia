export interface Env {
  // Add any environment variables here if needed
  // This interface is intentionally empty for now but may be extended later
  [key: string]: unknown;
}

// Import Cloudflare Workers types
import type { ExecutionContext } from "@cloudflare/workers-types";

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

async function fetchWithRetry(url: string, retryCount = 0): Promise<Response> {
  try {
    const response = await fetch(url);

    // Handle rate limit error
    if (response.status === 429 && retryCount < MAX_RETRIES) {
      const delay = BASE_DELAY * Math.pow(2, retryCount); // Exponential backoff
      console.log(`Rate limited. Retrying in ${delay}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchWithRetry(url, retryCount + 1);
    }

    return response;
  } catch (error) {
    if (retryCount < MAX_RETRIES) {
      const delay = BASE_DELAY * Math.pow(2, retryCount); // Exponential backoff
      console.log(`Request failed. Retrying in ${delay}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchWithRetry(url, retryCount + 1);
    }
    throw error;
  }
}

export default {
  async fetch(
    request: Request,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _env: Env,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _ctx: ExecutionContext
  ): Promise<Response> {
    // Only allow GET requests
    if (request.method !== "GET") {
      return new Response("Method not allowed", {
        status: 405,
      });
    }

    try {
      const url = new URL(request.url);
      const query = url.searchParams.get("q");

      if (!query || !query.trim()) {
        return new Response(JSON.stringify({ items: [] }), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      // Proxy the request to Google Books API
      const googleBooksUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
        query
      )}&maxResults=12`;

      const response = await fetchWithRetry(googleBooksUrl);

      if (!response.ok) {
        throw new Error(
          `Google Books API request failed with status ${response.status}`
        );
      }

      const data: GoogleBooksResponse = await response.json();

      // Return the response
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error in worker:", error);

      return new Response(
        JSON.stringify({
          error: "Failed to fetch books",
          message: error instanceof Error ? error.message : "Unknown error",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  },
};
