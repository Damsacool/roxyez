import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import api from "../utils/api"
import Animate from "../components/Animate"
import ShareButtons from "../components/ShareButtons"

export default function BlogPost() {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get(`/blogs/${id}`)
      .then((res) => setBlog(res.data))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
      <p className="text-gray-400 dark:text-gray-500 text-sm">Loading...</p>
    </div>
  )

  if (!blog) return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
      <p className="text-gray-400 dark:text-gray-500 text-sm">Article not found.</p>
    </div>
  )

  return (
    <div className="bg-white dark:bg-gray-950 transition-colors duration-300">

      {/* HERO */}
      <section className="bg-gray-950 py-24">
        <div className="max-w-3xl mx-auto px-6 flex flex-col gap-6">
          <Animate type="fadeRight">
            <Link
              to="/blog"
              className="text-xs text-gray-500 hover:text-yellow-500 transition-colors uppercase tracking-widest"
            >
              Back to Blog
            </Link>
          </Animate>
          <Animate type="fadeRight" delay={0.1}>
            <span className="text-yellow-500 text-xs font-medium tracking-widest uppercase">
              {blog.category}
            </span>
          </Animate>
          <Animate type="fadeRight" delay={0.2}>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              {blog.title}
            </h1>
          </Animate>
          <Animate type="fadeRight" delay={0.3}>
            <p className="text-gray-500 text-sm">
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </Animate>
        </div>
      </section>

      {/* COVER IMAGE */}
      {blog.coverImage && (
        <div className="max-w-3xl mx-auto px-6 -mt-8">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-72 object-cover rounded-2xl shadow-lg"
          />
        </div>
      )}

      {/* CONTENT */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <Animate type="fadeUp">
            <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {blog.content}
            </div>
          </Animate>

          <Animate type="fadeUp" delay={0.05}>
            <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
              <ShareButtons title={blog.title} url={window.location.href} />
            </div>
          </Animate>

          <Animate type="fadeUp" delay={0.1}>
            <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
              <Link
                to="/blog"
                className="text-sm font-medium text-yellow-600 dark:text-yellow-500 hover:underline"
              >
                Back to all articles
              </Link>
            </div>
          </Animate>
        </div>
      </section>

    </div>
  )
}