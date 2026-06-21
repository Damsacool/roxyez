import { useState } from "react"
import api from "../utils/api"

export default function ImageUploader({ value, onChange, label = "Image" }) {
  const [tab, setTab] = useState("url")
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(value || "")

  const handleUrlChange = (e) => {
    setPreview(e.target.value)
    onChange(e.target.value)
  }

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("image", file)

      const res = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      setPreview(res.data.url)
      onChange(res.data.url)
    } catch {
      alert("Upload failed. Try again.")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <label className="text-xs text-gray-400 uppercase tracking-widest">
        {label}
      </label>

      {/* Tab switcher */}
      <div className="flex rounded-xl overflow-hidden border border-gray-700 w-fit">
        <button
          type="button"
          onClick={() => setTab("url")}
          className={`px-4 py-2 text-xs font-medium transition-colors ${
            tab === "url"
              ? "bg-yellow-500 text-gray-950"
              : "bg-gray-800 text-gray-400 hover:text-white"
          }`}
        >
          Paste URL
        </button>
        <button
          type="button"
          onClick={() => setTab("file")}
          className={`px-4 py-2 text-xs font-medium transition-colors ${
            tab === "file"
              ? "bg-yellow-500 text-gray-950"
              : "bg-gray-800 text-gray-400 hover:text-white"
          }`}
        >
          Upload File
        </button>
      </div>

      {/* URL input */}
      {tab === "url" && (
        <input
          type="text"
          value={value}
          onChange={handleUrlChange}
          placeholder="https://..."
          className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-yellow-500 transition-colors"
        />
      )}

      {/* File upload */}
      {tab === "file" && (
        <div className="flex flex-col gap-3">
          <label className="cursor-pointer">
            <div className="bg-gray-800 border border-dashed border-gray-600 rounded-xl px-4 py-8 text-center hover:border-yellow-500 transition-colors">
              {uploading ? (
                <p className="text-sm text-gray-400">Uploading...</p>
              ) : (
                <>
                  <p className="text-sm text-gray-400">
                    Click to select an image
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    JPG, PNG, WebP or PDF
                  </p>
                </>
              )}
            </div>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,application/pdf"
              onChange={handleFileChange}
              className="hidden"
              disabled={uploading}
            />
          </label>
        </div>
      )}

      {/* Preview */}
      {preview && (
  <div className="flex flex-col gap-2">
    <p className="text-xs text-gray-500 uppercase tracking-widest">Preview</p>
    {preview.toLowerCase().endsWith(".pdf") ? (
      <div className="relative w-full rounded-xl overflow-hidden border border-gray-700 bg-gray-800 p-4 flex items-center justify-between">
        <span className="text-sm text-gray-300">PDF file uploaded</span>
        <button
          type="button"
          onClick={() => { setPreview(""); onChange("") }}
          className="bg-gray-900 text-white text-xs px-2 py-1 rounded-lg hover:bg-red-500 transition-colors"
        >
          Remove
        </button>
      </div>
    ) : (
      <div className="relative w-full h-48 rounded-xl overflow-hidden border border-gray-700">
        <img
          src={preview}
          alt="Preview"
          className="w-full h-full object-cover"
          onError={() => setPreview("")}
        />
        <button
          type="button"
          onClick={() => { setPreview(""); onChange("") }}
          className="absolute top-2 right-2 bg-gray-900 text-white text-xs px-2 py-1 rounded-lg hover:bg-red-500 transition-colors"
        >
          Remove
        </button>
      </div>
    )}
  </div>
)}
    </div>
  )
}