import { useEffect, useState } from "react"
import api from "../utils/api"
import Animate from "./Animate"

export default function LeadMagnetForm() {
  const [magnet, setMagnet] = useState(null)
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [downloadUrl, setDownloadUrl] = useState("")

  useEffect(() => {
    api.get("/lead-magnet").then((res) => setMagnet(res.data)).catch(() => setMagnet(null))
  }, [])

  if (!magnet) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await api.post("/lead-magnet/subscribe", {
        email,
        leadMagnetTitle: magnet.title,
      })
      setDownloadUrl(res.data.fileUrl)
      setSuccess(true)
    } catch {
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-24 bg-yellow-500">
      <div className="max-w-3xl mx-auto px-6 text-center flex flex-col gap-6">
        <Animate type="fadeUp">
          <p className="text-gray-900 text-xs tracking-widest uppercase font-medium">
            Free Resource
          </p>
        </Animate>
        <Animate type="fadeUp" delay={0.1}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-950">
            {magnet.title}
          </h2>
        </Animate>
        {magnet.description && (
          <Animate type="fadeUp" delay={0.2}>
            <p className="text-gray-800 leading-relaxed max-w-xl mx-auto">
              {magnet.description}
            </p>
          </Animate>
        )}

        <Animate type="fadeUp" delay={0.3}>
          {success ? (
            <div className="flex flex-col gap-3 items-center">
              <p className="text-gray-950 font-medium">You are subscribed.</p>
              <a 
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-950 text-white font-semibold px-8 py-3 rounded-full hover:bg-gray-800 transition-colors duration-200"
              >
                Download Now
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 rounded-full px-5 py-3 text-sm text-gray-900 focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-gray-950 text-white font-semibold px-8 py-3 rounded-full hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50"
              >
                {loading ? "Sending..." : "Get It Free"}
              </button>
            </form>
          )}
        </Animate>
      </div>
    </section>
  )
}