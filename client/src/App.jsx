import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import AdminLayout from "./layouts/AdminLayout"
import Home from "./pages/Home"
import About from "./pages/About"
import Services from "./pages/Services"
import Blog from "./pages/Blog"
import BlogPost from "./pages/BlogPost"
import Books from "./pages/Books"
import Contact from "./pages/Contact"
import Login from "./pages/admin/Login"
import Dashboard from "./pages/admin/Dashboard"
import ManageBlogs from "./pages/admin/ManageBlogs"
import ManageBooks from "./pages/admin/ManageBooks"
import ManageContacts from "./pages/admin/ManageContacts"
import ProtectedRoute from "./components/ProtectedRoute"
import NotFound from "./pages/NotFound"
import ManageLeadMagnet from "./pages/admin/ManageLeadMagnet"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/admin/lead-magnet" element={
            <ProtectedRoute>
              <ManageLeadMagnet />
            </ProtectedRoute>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/books" element={<Books />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Login />} />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          } />
          <Route path="/admin/blogs" element={
            <ProtectedRoute><ManageBlogs /></ProtectedRoute>
          } />
          <Route path="/admin/books" element={
            <ProtectedRoute><ManageBooks /></ProtectedRoute>
          } />
          <Route path="/admin/contacts" element={
            <ProtectedRoute><ManageContacts /></ProtectedRoute>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App