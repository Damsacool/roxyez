import { Link } from "react-router-dom"
import Animate from "../components/Animate"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-6">
      <div className="text-center flex flex-col gap-6">
        <Animate type="fadeDown">
          <p className="text-yellow-500 text-8xl font-bold">404</p>
        </Animate>
        <Animate type="fadeUp" delay={0.1}>
          <h1 className="text-3xl font-bold text-white">Page Not Found</h1>
        </Animate>
        <Animate type="fadeUp" delay={0.2}>
          <p className="text-gray-400 text-sm leading-relaxed max-w-sm mx-auto">
            The page you are looking for does not exist or has been moved.
          </p>
        </Animate>
        <Animate type="zoomIn" delay={0.3}>
          <Link
            to="/"
            className="bg-yellow-500 text-gray-950 font-semibold px-8 py-3 rounded-full hover:bg-yellow-400 transition-colors duration-200 inline-block text-sm"
          >
            Back to Home
          </Link>
        </Animate>
      </div>
    </div>
  )
}