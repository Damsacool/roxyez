import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "../../utils/api"
import ImageUploader from "../../components/ImageUploader"

export default function ManageLeadMagnet() {
  const [magnet, setMagnet] = useState(null)
  const [form, setForm] = useState({ title: "", description: "", fileUrl: "" })
  const [subscribers, setSubscribers] = useState([])
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchMagnet()
    fetchSubscribers()
  }, [])

  const fetchMagnet = () => {
    api.get("/lead-magnet").then((res) => {
      if (res.data) {
        setMagnet(res.data)
        setForm({
          title: res.data.title,
          description: res.data.description || "",
          fileUrl: res.data.fileUrl,
        })
      }
    })
  }

  const fetchSubscribers = () => {
    api.get("/lead-magnet/subscribers").then((res) => setSubscribers(res.data))
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (magnet) {
        await api.put(`/lead-magnet/${magnet._id}`, form)
      } else {
        await api.post("/lead-magnet", form)
      }
      fetchMagnet()
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 px-6 py-12">
      <div className="max-w-3xl mx-auto flex flex-col gap-12">

        <div className="flex items-center justify-between">
          <div>
            <p className="text-yellow-500 text-xs tracking-widest uppercase font-medium mb-1">
              Admin
            </p>
            <h1 className="text-3xl font-bold text-white">Lead Magnet</h1>
          </div>
          <Link
            to="/admin/dashboard"
            className="text-sm text-gray-500 hover:text-white transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 bg-gray-900 border border-gray-800 rounded-2xl p-8">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-400 uppercase tracking-widest">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-yellow-500 transition-colors"
              placeholder="e.g. Free Budgeting Worksheet"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-400 uppercase tracking-widest">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-yellow-500 transition-colors resize-none"
              placeholder="Short description visitors will see"
            />
          </div>

          <ImageUploader
            label="Lead Magnet File (PDF or image)"
            value={form.fileUrl}
            onChange={(url) => setForm({ ...form, fileUrl: url })}
          />

          <button
            type="submit"
            disabled={saving}
            className="bg-yellow-500 text-gray-950 font-semibold px-8 py-3 rounded-full hover:bg-yellow-400 transition-colors duration-200 disabled:opacity-50 mt-2"
          >
            {saving ? "Saving..." : magnet ? "Update Lead Magnet" : "Create Lead Magnet"}
          </button>
        </form>

        <div>
          <h2 className="text-xl font-bold text-white mb-4">
            Subscribers ({subscribers.length})
          </h2>
          <div className="flex flex-col gap-2">
            {subscribers.length === 0 ? (
              <p className="text-gray-500 text-sm">No subscribers yet.</p>
            ) : (
              subscribers.map((sub) => (
                <div
                  key={sub._id}
                  className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 flex items-center justify-between"
                >
                  <span className="text-white text-sm">{sub.email}</span>
                  <span className="text-gray-500 text-xs">
                    {new Date(sub.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  )
}