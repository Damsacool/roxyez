import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "../../utils/api"

export default function ManageContacts() {
  const [contacts, setContacts] = useState([])
  const [expanded, setExpanded] = useState(null)

  const fetchContacts = () => {
    api.get("/contact").then((res) => setContacts(res.data))
  }

  useEffect(() => {
    fetchContacts()
  }, [])

  const handleMarkRead = async (id) => {
    await api.put(`/contact/${id}/read`)
    fetchContacts()
  }

  const toggle = (id) => {
    setExpanded(expanded === id ? null : id)
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this message?")) 
      return
    await api.delete(`/contact/${id}`)
    fetchContacts()
  }

  return (
    <div className="min-h-screen bg-gray-950 px-6 py-12">
      <div className="max-w-4xl mx-auto">

        <div className="mb-10">
          <Link
            to="/admin/dashboard"
            className="text-xs text-gray-500 hover:text-yellow-500 transition-colors mb-2 block"
          >
            Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-white">Contact Submissions</h1>
        </div>

        <div className="flex flex-col gap-4">
          {contacts.length === 0 ? (
            <p className="text-gray-500 text-sm">No submissions yet.</p>
          ) : (
            contacts.map((contact) => (
              <div
                key={contact._id}
                className={`bg-gray-900 border rounded-2xl overflow-hidden transition-colors ${
                  contact.isRead ? "border-gray-800" : "border-yellow-500"
                }`}
              >
                <button
                  onClick={() => toggle(contact._id)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-800 transition-colors"
                >
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-3">
                      <p className="text-white font-medium text-sm">{contact.name}</p>
                      {!contact.isRead && (
                        <span className="text-xs bg-yellow-500 text-gray-950 font-semibold px-2 py-0.5 rounded-full">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-gray-500 text-xs">{contact.email}</p>
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <p className="text-xs text-gray-600">
                      {new Date(contact.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                    <span className="text-gray-400 text-lg">
                      {expanded === contact._id ? "−" : "+"}
                    </span>
                  </div>
                </button>

                {expanded === contact._id && (
                  <div className="px-6 py-5 border-t border-gray-800 flex flex-col gap-4">
                    {contact.phone && (
                      <p className="text-sm text-gray-400">
                        Phone: <span className="text-white">{contact.phone}</span>
                      </p>
                    )}
                    <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">
                      {contact.message}
                    </p>
                    {!contact.isRead && (
                      <button
                        onClick={() => handleMarkRead(contact._id)}
                        className="self-start text-xs text-yellow-500 hover:underline"
                      >
                        Mark as read
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  )
}