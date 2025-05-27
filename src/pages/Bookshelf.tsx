import { useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { useBooks } from "../hooks/useBooks";
import { useDebounce } from "../hooks/useDebounce";

const Bookshelf = () => {
  const [inputValue, setInputValue] = useState("programming");
  const debouncedSearchQuery = useDebounce(inputValue, 500); // 500ms delay
  const { data: books = [], isLoading, error } = useBooks(debouncedSearchQuery);

  const handleClearInput = () => {
    setInputValue("");
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">My Bookshelf</h1>
      <div className="mb-8">
        <div className="relative inline-block w-full max-w-lg">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search for books..."
            className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
            {isLoading && <LoadingSpinner />}
            {!isLoading && inputValue && (
              <button
                onClick={handleClearInput}
                className="text-gray-400 hover:text-gray-600 focus:outline-none p-1 rounded-full hover:bg-gray-100"
                aria-label="Clear search"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
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

      {error ? (
        <p className="text-red-600">
          Error loading books. Please try again later.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {books.map((book) => (
            <a
              key={book.id}
              className="bg-white rounded-lg shadow-md p-4 border border-gray-100 hover:shadow-lg transition-transform duration-200 hover:-translate-y-1"
              href={book.saleInfo.buyLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {book.volumeInfo.imageLinks?.thumbnail && (
                <img
                  src={book.volumeInfo.imageLinks.thumbnail}
                  alt={book.volumeInfo.title}
                  className="w-full h-48 object-contain mb-4"
                />
              )}
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {book.volumeInfo.title}
              </h3>
              {book.volumeInfo.authors && (
                <p className="text-sm text-gray-600 mb-2">
                  By: {book.volumeInfo.authors.join(", ")}
                </p>
              )}
              {book.volumeInfo.description && (
                <p className="text-sm text-gray-700 line-clamp-3">
                  {book.volumeInfo.description}
                </p>
              )}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookshelf;
