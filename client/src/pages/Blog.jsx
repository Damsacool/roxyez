import { useEffect, useState } from "react"
import api from "../utils/api"
import BlogCard from "../components/BlogCard"
import Animate from "../components/Animate"

export default function Blog() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get("/blogs")
      .then((res) => setBlogs(res.data))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="bg-white dark:bg-gray-950 transition-colors duration-300">

      {/* HERO */}
      <section className="bg-gray-950 py-24">
        <div className="max-w-4xl mx-auto px-6 text-center flex flex-col gap-6">
          <Animate type="fadeDown">
            <p className="text-yellow-500 text-sm tracking-widest uppercase font-medium">
              The Blog
            </p>
          </Animate>
          <Animate type="fadeDown" delay={0.1}>
            <h1 className="text-5xl font-bold text-white leading-tight">
              Thoughts Worth
              <span className="block text-yellow-500">Reading</span>
            </h1>
          </Animate>
          <Animate type="fadeDown" delay={0.2}>
            <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
              Education, entrepreneurship, finance and everything in between. Written by someone who has lived it.
            </p>
          </Animate>
        </div>
      </section>

      {/* BLOG GRID */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="max-w-6xl mx-auto px-6">
          {loading ? (
            <p className="text-center text-gray-400 dark:text-gray-500 text-sm">Loading articles...</p>
          ) : blogs.length === 0 ? (
            <p className="text-center text-gray-400 dark:text-gray-500 text-sm">No articles published yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogs.map((blog, i) => (
                <Animate key={blog._id} type={i % 3 === 0 ? "fadeLeft" : i % 3 === 1 ? "fadeUp" : "fadeRight"} delay={(i % 3) * 0.08}>
                  <BlogCard blog={blog} />
                </Animate>
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  )
}