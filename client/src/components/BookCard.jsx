export default function BookCard({ book }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:border-yellow-400 dark:hover:border-yellow-500 hover:shadow-md transition-all duration-300 flex flex-col h-full">
      
      <div className="w-full h-56 overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
        {book.coverImage ? (
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-gray-400 dark:text-gray-500 text-sm">No cover</span>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col gap-3 flex-1">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-snug">
          {book.title}
        </h3>

        {book.status === "coming_soon" ? (
          <span className="text-xs text-gray-400 dark:text-gray-500 font-medium tracking-widest uppercase">
            Coming Soon
          </span>
        ) : (
          <div className="flex flex-col gap-1">
            {book.kindlePrice && (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Kindle: <span className="text-gray-900 dark:text-white font-medium">{book.kindlePrice}</span>
              </p>
            )}
            {book.paperbackPrice && (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Paperback: <span className="text-gray-900 dark:text-white font-medium">{book.paperbackPrice}</span>
              </p>
            )}
          </div>
        )}

        {book.amazonLink && book.status === "live" && (
          <a 
            href={book.amazonLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto bg-gray-900 dark:bg-yellow-500 text-white dark:text-gray-950 text-xs font-medium px-4 py-2.5 rounded-full text-center hover:bg-yellow-500 dark:hover:bg-yellow-400 hover:text-gray-950 transition-colors duration-200"
          >
            Buy on Amazon
          </a>
        )}
      </div>

    </div>
  )
}