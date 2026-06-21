import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

export default function Dashboard() {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate("/admin")
  }

  return (
    <div className="min-h-screen bg-gray-950 px-6 py-12">
      <div className="max-w-4xl mx-auto">

        <div className="flex items-center justify-between mb-12">
          <div>
            <p className="text-yellow-500 text-xs tracking-widest uppercase font-medium mb-1">
              Admin
            </p>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-500 hover:text-white transition-colors"
          >
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/admin/blogs"
            className="bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-yellow-500 transition-colors duration-300 flex flex-col gap-3"
          >
            <p className="text-white font-bold text-lg">Blog Posts</p>
            <p className="text-gray-500 text-sm">Create, edit and publish articles.</p>
            <p className="text-yellow-500 text-xs font-medium mt-auto">Manage</p>
          </Link>

          <Link
            to="/admin/books"
            className="bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-yellow-500 transition-colors duration-300 flex flex-col gap-3"
          >
            <p className="text-white font-bold text-lg">Books</p>
            <p className="text-gray-500 text-sm">Add and update your published books.</p>
            <p className="text-yellow-500 text-xs font-medium mt-auto">Manage</p>
          </Link>

          <Link
            to="/admin/lead-magnet"
            className="bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-yellow-500 transition-colors duration-300 flex flex-col gap-3"
          >
            <p className="text-white font-bold text-lg">Lead Magnet</p>
            <p className="text-gray-500 text-sm">Manage your free download and see subscribers.</p>
            <p className="text-yellow-500 text-xs font-medium mt-auto">Manage</p>
          </Link>

          <Link
            to="/admin/contacts"
            className="bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-yellow-500 transition-colors duration-300 flex flex-col gap-3"
          >
            <p className="text-white font-bold text-lg">Contact Submissions</p>
            <p className="text-gray-500 text-sm">View and manage messages from visitors.</p>
            <p className="text-yellow-500 text-xs font-medium mt-auto">View</p>
          </Link>
        </div>

      </div>
    </div>
  )
}