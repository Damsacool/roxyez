import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "../../utils/api"
import ImageUploader from "../../components/ImageUploader"

const emptyForm = {
  title: "",
  content: "",
  excerpt: "",
  coverImage: "",
  category: "General",
  isPublished: false,
}

export default function ManageBlogs() {
  const [blogs, setBlogs] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)

  const fetchBlogs = () => {
    api.get("/blogs").then((res) => setBlogs(res.data))
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  const handleChange = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value
    setForm({ ...form, [e.target.name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (editingId) {
        await api.put(`/blogs/${editingId}`, form)
      } else {
        await api.post("/blogs", form)
      }
      setForm(emptyForm)
      setEditingId(null)
      setShowForm(false)
      fetchBlogs()
    } catch {
      alert("Something went wrong. Try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (blog) => {
    setForm({
      title: blog.title,
      content: blog.content,
      excerpt: blog.excerpt || "",
      coverImage: blog.coverImage || "",
      category: blog.category,
      isPublished: blog.isPublished,
    })
    setEditingId(blog._id)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog post?")) return
    await api.delete(`/blogs/${id}`)
    fetchBlogs()
  }

  const handleCancel = () => {
    setForm(emptyForm)
    setEditingId(null)
    setShowForm(false)
  }

  return (
    <div className="min-h-screen bg-gray-950 px-6 py-12">
      <div className="max-w-4xl mx-auto">

        <div className="flex items-center justify-between mb-10">
          <div>
            <Link
              to="/admin/dashboard"
              className="text-xs text-gray-500 hover:text-yellow-500 transition-colors mb-2 block"
            >
              Back to Dashboard
            </Link>
            <h1 className="text-2xl font-bold text-white">Manage Blogs</h1>
          </div>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-yellow-500 text-gray-950 font-semibold px-6 py-2.5 rounded-full hover:bg-yellow-400 transition-colors text-sm"
            >
              New Post
            </button>
          )}
        </div>

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-10 flex flex-col gap-5"
          >
            <h2 className="text-white font-semibold text-lg">
              {editingId ? "Edit Post" : "New Post"}
            </h2>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-gray-400 uppercase tracking-widest">Title</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-yellow-500 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-gray-400 uppercase tracking-widest">Excerpt</label>
              <input
                type="text"
                name="excerpt"
                value={form.excerpt}
                onChange={handleChange}
                className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-yellow-500 transition-colors"
                placeholder="Short preview shown on the blog listing page"
              />
            </div>

            <ImageUploader
              label="Cover Image"
              value={form.coverImage}
              onChange={(url) => setForm({ ...form, coverImage: url })}
            />

            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-gray-400 uppercase tracking-widest">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-yellow-500 transition-colors"
              >
                {["Education", "Entrepreneurship", "Finance", "Faith", "General"].map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-gray-400 uppercase tracking-widest">Content</label>
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                required
                rows={10}
                className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-yellow-500 transition-colors resize-none"
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="isPublished"
                id="isPublished"
                checked={form.isPublished}
                onChange={handleChange}
                className="w-4 h-4 accent-yellow-500"
              />
              <label htmlFor="isPublished" className="text-sm text-gray-300">
                Publish immediately
              </label>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="bg-yellow-500 text-gray-950 font-semibold px-8 py-3 rounded-full hover:bg-yellow-400 transition-colors text-sm disabled:opacity-50"
              >
                {loading ? "Saving..." : editingId ? "Update Post" : "Create Post"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="text-sm text-gray-500 hover:text-white transition-colors px-4"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="flex flex-col gap-4">
          {blogs.length === 0 ? (
            <p className="text-gray-500 text-sm">No blog posts yet.</p>
          ) : (
            blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-gray-900 border border-gray-800 rounded-2xl px-6 py-5 flex items-center justify-between gap-4"
              >
                <div className="flex flex-col gap-1">
                  <p className="text-white font-medium text-sm">{blog.title}</p>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500">{blog.category}</span>
                    <span className={`text-xs font-medium ${blog.isPublished ? "text-green-400" : "text-gray-500"}`}>
                      {blog.isPublished ? "Published" : "Draft"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                  <button
                    onClick={() => handleEdit(blog)}
                    className="text-xs text-yellow-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="text-xs text-red-400 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  )
}