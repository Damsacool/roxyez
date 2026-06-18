import { useState } from "react"
import api from "../utils/api"
import Animate from "../components/Animate"

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      await api.post("/contact", form)
      setSuccess(true)
      setForm({ name: "", email: "", phone: "", message: "" })
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white">

      {/* HERO */}
      <section className="bg-gray-950 py-24">
        <div className="max-w-4xl mx-auto px-6 text-center flex flex-col gap-6">
          <Animate type="fadeDown">
            <p className="text-yellow-500 text-sm tracking-widest uppercase font-medium">
              Get In Touch
            </p>
          </Animate>
          <Animate type="fadeDown" delay={0.1}>
            <h1 className="text-5xl font-bold text-white leading-tight">
              Let's Start a
              <span className="block text-yellow-500">Conversation</span>
            </h1>
          </Animate>
          <Animate type="fadeDown" delay={0.2}>
            <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
              Whether you have a question about a service or you are ready to get started, send a message and you will hear back within 24 hours.
            </p>
          </Animate>
        </div>
      </section>

      {/* FORM + INFO */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16">

          {/* Form */}
          <Animate type="fadeRight">
            {success ? (
              <div className="bg-gray-50 rounded-2xl p-10 flex flex-col gap-4 items-start">
                <h3 className="text-2xl font-bold text-gray-900">Message received.</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Thank you for reaching out. You will hear back within 24 hours.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="text-sm text-yellow-600 hover:underline mt-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {[
                  { name: "name", label: "Full Name", type: "text", required: true },
                  { name: "email", label: "Email Address", type: "email", required: true },
                  { name: "phone", label: "Phone Number (optional)", type: "text", required: false },
                ].map((field) => (
                  <div key={field.name} className="flex flex-col gap-1.5">
                    <label className="text-xs text-gray-500 uppercase tracking-widest">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={form[field.name]}
                      onChange={handleChange}
                      required={field.required}
                      className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-yellow-500 transition-colors"
                    />
                  </div>
                ))}

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-gray-500 uppercase tracking-widest">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-yellow-500 transition-colors resize-none"
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-sm">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-gray-900 text-white font-semibold px-8 py-3.5 rounded-full hover:bg-yellow-500 hover:text-gray-950 transition-colors duration-200 text-sm disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </Animate>

          {/* Info */}
          <Animate type="fadeLeft" delay={0.15}>
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-3">
                <p className="text-xs text-gray-400 uppercase tracking-widest">Email</p>
                <a
                  href="mailto:roxy@roxannaezenekwe600.com"
                  className="text-gray-900 font-medium text-sm hover:text-yellow-600 transition-colors"
                >
                  roxy@roxannaezenekwe600.com
                </a>
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xs text-gray-400 uppercase tracking-widest">Connect</p>
                <div className="flex flex-col gap-2">
                  {[
                    { name: "YouTube", url: "https://www.youtube.com/@roxyezmathandmoney" },
                    { name: "LinkedIn", url: "https://www.linkedin.com/in/rezenekwe/" },
                    { name: "Stan Store", url: "https://stan.store/rezenekwe" },
                    { name: "Linktree", url: "https://linktr.ee/rezenekwe" },
                  ].map((s) => (
                    <a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-500 hover:text-yellow-600 transition-colors"
                    >
                      {s.name}
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xs text-gray-400 uppercase tracking-widest">Response Time</p>
                <p className="text-sm text-gray-500">Within 24 hours on business days.</p>
              </div>
            </div>
          </Animate>

        </div>
      </section>

    </div>
  )
}