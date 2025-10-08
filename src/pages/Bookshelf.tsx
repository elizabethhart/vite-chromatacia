import { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { useBooks } from "../hooks/useBooks";
import { useDebounce } from "../hooks/useDebounce";

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    imageLinks?: {
      thumbnail: string;
    };
  };
  saleInfo: {
    buyLink: string;
  };
}

const favoriteBookTitles = [
  "Shades of Grey Jasper Fforde",
  "Oryx and Crake Margaret Atwood",
  "Sapiens",
];

const Bookshelf = () => {
  const [inputValue, setInputValue] = useState("");
  const [favoriteBooks, setFavoriteBooks] = useState<Book[]>([]);
  const [favoritesLoading, setFavoritesLoading] = useState(true);
  const debouncedSearchQuery = useDebounce(inputValue, 500); // 500ms delay
  const {
    data: searchResults = [],
    isLoading,
    error,
  } = useBooks(debouncedSearchQuery);

  // Fetch favorite books from Google Books API
  useEffect(() => {
    const fetchFavoriteBooks = async () => {
      setFavoritesLoading(true);
      try {
        const bookPromises = favoriteBookTitles.map(async (title) => {
          const response = await fetch(
            `/api/books?q=${encodeURIComponent(title)}`
          );
          if (!response.ok) throw new Error("Failed to fetch book");
          const data = await response.json();
          return data.items?.[0] || null; // Get the first result
        });

        const books = await Promise.all(bookPromises);
        setFavoriteBooks(books.filter((book) => book !== null));
      } catch (error) {
        console.error("Error fetching favorite books:", error);
        setFavoriteBooks([]);
      } finally {
        setFavoritesLoading(false);
      }
    };

    fetchFavoriteBooks();
  }, []);

  const handleClearInput = () => {
    setInputValue("");
  };

  // Show favorite books if no search query, otherwise show search results
  const books = inputValue.trim() ? searchResults : favoriteBooks;
  const isShowingFavorites = !inputValue.trim();
  const isLoadingBooks = inputValue.trim() ? isLoading : favoritesLoading;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
          My Current Favorite Reads
        </h1>
        <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-8">
          {isShowingFavorites
            ? "Books that have made a lasting impact on me"
            : "Search results from Google Books API"}
        </p>
      </div>

      {/* Results Section */}
      {error && inputValue.trim() ? (
        <div className="card p-8 text-center animate-scale-in">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600 dark:text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
            Oops! Something went wrong
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400">
            Error loading search results. Please try again later.
          </p>
        </div>
      ) : (
        <>
          {!isShowingFavorites && books.length > 0 && (
            <div className="mb-8 animate-fade-in">
              <p className="text-neutral-600 dark:text-neutral-400 text-center">
                Found {books.length} book{books.length !== 1 ? "s" : ""} for "
                {debouncedSearchQuery}"
              </p>
            </div>
          )}

          {isLoadingBooks && isShowingFavorites ? (
            <div className="flex justify-center items-center py-12">
              <LoadingSpinner />
              <span className="ml-3 text-neutral-600 dark:text-neutral-400">
                Loading your favorite books...
              </span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.map((book, index) => (
                <a
                  key={book.id}
                  className="card card-hover p-6 group animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  href={book.saleInfo.buyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {book.volumeInfo.imageLinks?.thumbnail ? (
                    <div className="relative mb-4 overflow-hidden rounded-xl">
                      <img
                        src={book.volumeInfo.imageLinks.thumbnail}
                        alt={book.volumeInfo.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      {isShowingFavorites && (
                        <div className="absolute top-2 right-2 bg-primary-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                          Favorite
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700 rounded-xl flex items-center justify-center mb-4">
                      <svg
                        className="w-12 h-12 text-neutral-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>
                  )}

                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                    {book.volumeInfo.title}
                  </h3>

                  {book.volumeInfo.authors && (
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3 line-clamp-1">
                      By {book.volumeInfo.authors.join(", ")}
                    </p>
                  )}

                  {book.volumeInfo.description && (
                    <p className="text-sm text-neutral-700 dark:text-neutral-300 line-clamp-3 leading-relaxed">
                      {book.volumeInfo.description}
                    </p>
                  )}

                  <div className="mt-4 flex items-center text-primary-600 dark:text-primary-400 text-sm font-medium group-hover:translate-x-1 transition-transform duration-200">
                    <span>View on Google Books</span>
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          )}

          {/* Search Section - Only show when displaying favorites */}
          {isShowingFavorites && (
            <div className="mt-16 mb-8 animate-slide-up">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                  Want to explore more books?
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Search the Google Books API to discover new reads
                </p>
              </div>
              <div className="card p-6 max-w-2xl mx-auto">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-neutral-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Search for books, authors, or topics..."
                    className="input pl-12 pr-12"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
                    {isLoadingBooks && <LoadingSpinner />}
                    {!isLoadingBooks && inputValue && (
                      <button
                        onClick={handleClearInput}
                        className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 focus:outline-none p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-200"
                        aria-label="Clear search"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {books.length === 0 && !isLoadingBooks && inputValue.trim() && (
            <div className="card p-12 text-center animate-scale-in">
              <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-neutral-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                No books found
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Try searching for a different term or check your spelling.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Bookshelf;
