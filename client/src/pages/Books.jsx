import { useEffect, useState } from "react"
import api from "../utils/api"
import BookCard from "../components/BookCard"
import Animate from "../components/Animate"

export default function Books() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get("/books")
      .then((res) => setBooks(res.data))
      .finally(() => setLoading(false))
  }, [])

  const live = books.filter((b) => b.status === "live")
  const coming = books.filter((b) => b.status === "coming_soon")

  return (
    <div className="bg-white dark:bg-gray-950 transition-colors duration-300">

      <section className="bg-gray-950 py-24">
        <div className="max-w-4xl mx-auto px-6 text-center flex flex-col gap-6">
          <Animate type="fadeDown">
            <p className="text-yellow-500 text-sm tracking-widest uppercase font-medium">
              Published Works
            </p>
          </Animate>
          <Animate type="fadeDown" delay={0.1}>
            <h1 className="text-5xl font-bold text-white leading-tight">
              Books by
              <span className="block text-yellow-500">Prof. Roxanna</span>
            </h1>
          </Animate>
          <Animate type="fadeDown" delay={0.2}>
            <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
              Books on wealth, education, passive income and mindset. Available on Amazon.
            </p>
          </Animate>
        </div>
      </section>

      {live.length > 0 && (
        <section className="py-24 bg-white dark:bg-gray-950">
          <div className="max-w-6xl mx-auto px-6">
            <Animate type="fadeUp">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-12">
                Available Now
              </h2>
            </Animate>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {live.map((book, i) => (
                <Animate key={book._id} type="zoomIn" delay={i * 0.1} hover>
                  <BookCard book={book} />
                </Animate>
              ))}
            </div>
          </div>
        </section>
      )}

      {coming.length > 0 && (
        <section className="py-24 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-6">
            <Animate type="fadeUp">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-12">
                Coming Soon
              </h2>
            </Animate>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {coming.map((book, i) => (
                <Animate key={book._id} type="zoomIn" delay={i * 0.1} hover>
                  <BookCard book={book} />
                </Animate>
              ))}
            </div>
          </div>
        </section>
      )}

      {loading && (
        <div className="py-24 text-center">
          <p className="text-gray-400 dark:text-gray-500 text-sm">Loading books...</p>
        </div>
      )}

    </div>
  )
}