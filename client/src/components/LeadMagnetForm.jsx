import { useEffect, useState } from "react"
import api from "../utils/api"
import Animate from "./Animate"
import LeadMagnetCard from "./LeadMagnetCard"
import MagneticButton from "./MagneticButton"

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
      // fail silently for the visitor
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-24 bg-white dark:bg-gray-950">
      <div className="max-w-3xl mx-auto px-6">
        <Animate type="zoomIn">
          <LeadMagnetCard>
              <div className="text-center flex flex-col gap-6">
                <p className="text-yellow-500 text-xs tracking-widest uppercase font-medium">
                  Free Resource
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  {magnet.title}
                </h2>
                {magnet.description && (
                  <p className="text-gray-400 leading-relaxed max-w-xl mx-auto">
                    {magnet.description}
                  </p>
                )}
                <p className="text-gray-500 text-sm">
                  Join hundreds already getting free tips on education, wealth and growth straight to their inbox.
                </p>

                {success ? (
                  <div className="flex flex-col gap-4 items-center pt-2">
                    <p className="text-yellow-500 font-medium">You're in. Your download is ready below.</p>
                    <a 
                      href={downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-yellow-500 text-gray-950 font-semibold px-10 py-4 rounded-full hover:bg-yellow-400 transition-colors duration-200"
                    >
                      Download Now
                    </a>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2"
                  >
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      className="flex-1 rounded-full px-5 py-3.5 text-sm text-white bg-gray-900 border border-gray-700 focus:outline-none focus:border-yellow-500 transition-colors"
                    />
                    <MagneticButton disabled={loading}>
                      {loading ? "Sending..." : "Send It To My Email"}
                    </MagneticButton>
                  </form>
                )}
              </div>
          </LeadMagnetCard>
        </Animate>
      </div>
    </section>
  )
}