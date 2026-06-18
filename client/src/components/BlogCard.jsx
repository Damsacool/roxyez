import { Link } from "react-router-dom"

export default function BlogCard({ blog }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:border-yellow-400 dark:hover:border-yellow-500 hover:shadow-md transition-all duration-300 flex flex-col h-full">
      
      <div className="w-full h-48 overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
        {blog.coverImage ? (
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-gray-400 dark:text-gray-500 text-sm">No image</span>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col gap-3 flex-1">
        <span className="text-xs text-yellow-600 dark:text-yellow-500 font-medium tracking-widest uppercase">
          {blog.category}
        </span>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-snug line-clamp-2">
          {blog.title}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed line-clamp-2 flex-1">
          {blog.excerpt}
        </p>
        <Link
          to={`/blog/${blog._id}`}
          className="text-sm font-medium text-yellow-600 dark:text-yellow-500 hover:underline mt-auto"
        >
          Read More →
        </Link>
      </div>

    </div>
  )
}