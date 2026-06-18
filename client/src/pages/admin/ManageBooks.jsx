import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "../../utils/api"
import ImageUploader from "../../components/ImageUploader"

const emptyForm = {
  title: "",
  description: "",
  coverImage: "",
  kindlePrice: "",
  paperbackPrice: "",
  amazonLink: "",
  status: "coming_soon",
}

export default function ManageBooks() {
  const [books, setBooks] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)

  const fetchBooks = () => {
    api.get("/books").then((res) => setBooks(res.data))
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (editingId) {
        await api.put(`/books/${editingId}`, form)
      } else {
        await api.post("/books", form)
      }
      setForm(emptyForm)
      setEditingId(null)
      setShowForm(false)
      fetchBooks()
    } catch {
      alert("Something went wrong. Try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (book) => {
    setForm({
      title: book.title,
      description: book.description || "",
      coverImage: book.coverImage || "",
      kindlePrice: book.kindlePrice || "",
      paperbackPrice: book.paperbackPrice || "",
      amazonLink: book.amazonLink || "",
      status: book.status,
    })
    setEditingId(book._id)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this book?")) return
    await api.delete(`/books/${id}`)
    fetchBooks()
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
            <h1 className="text-2xl font-bold text-white">Manage Books</h1>
          </div>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-yellow-500 text-gray-950 font-semibold px-6 py-2.5 rounded-full hover:bg-yellow-400 transition-colors text-sm"
            >
              Add Book
            </button>
          )}
        </div>

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-10 flex flex-col gap-5"
          >
            <h2 className="text-white font-semibold text-lg">
              {editingId ? "Edit Book" : "Add Book"}
            </h2>

            {[
              { name: "title", label: "Title", required: true },
              { name: "kindlePrice", label: "Kindle Price", placeholder: "$0.99" },
              { name: "paperbackPrice", label: "Paperback Price", placeholder: "$11.07" },
              { name: "amazonLink", label: "Amazon Link", placeholder: "https://amazon.com/..." },
            ].map((field) => (
              <div key={field.name} className="flex flex-col gap-1.5">
                <label className="text-xs text-gray-400 uppercase tracking-widest">
                  {field.label}
                </label>
                <input
                  type="text"
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  required={field.required}
                  placeholder={field.placeholder || ""}
                  className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-yellow-500 transition-colors"
                />
              </div>
            ))}

            <ImageUploader
              label="Cover Image"
              value={form.coverImage}
              onChange={(url) => setForm({ ...form, coverImage: url })}
            />

            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-gray-400 uppercase tracking-widest">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-yellow-500 transition-colors resize-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-gray-400 uppercase tracking-widest">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-yellow-500 transition-colors"
              >
                <option value="live">Live</option>
                <option value="coming_soon">Coming Soon</option>
              </select>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="bg-yellow-500 text-gray-950 font-semibold px-8 py-3 rounded-full hover:bg-yellow-400 transition-colors text-sm disabled:opacity-50"
              >
                {loading ? "Saving..." : editingId ? "Update Book" : "Add Book"}
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
          {books.length === 0 ? (
            <p className="text-gray-500 text-sm">No books yet.</p>
          ) : (
            books.map((book) => (
              <div
                key={book._id}
                className="bg-gray-900 border border-gray-800 rounded-2xl px-6 py-5 flex items-center justify-between gap-4"
              >
                <div className="flex flex-col gap-1">
                  <p className="text-white font-medium text-sm">{book.title}</p>
                  <span className={`text-xs font-medium ${book.status === "live" ? "text-green-400" : "text-gray-500"}`}>
                    {book.status === "live" ? "Live" : "Coming Soon"}
                  </span>
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                  <button
                    onClick={() => handleEdit(book)}
                    className="text-xs text-yellow-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(book._id)}
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