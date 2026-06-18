import { Link } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import api from "../utils/api"
import BlogCard from "../components/BlogCard"
import BookCard from "../components/BookCard"
import Animate from "../components/Animate"

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const [blogs, setBlogs] = useState([])
  const [books, setBooks] = useState([])
  const servicesRef = useRef(null)

  useEffect(() => {
    api.get("/blogs").then((res) => setBlogs(res.data.slice(0, 3)))
    api.get("/books/live").then((res) => setBooks(res.data.slice(0, 4)))
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".service-card",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: servicesRef.current,
            start: "top 75%",
            once: true,
          },
        }
      )
    }, servicesRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="bg-white dark:bg-gray-950 transition-colors duration-300">

      {/* HERO */}
      <section className="min-h-screen bg-gray-950 flex items-center">
        <div className="max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-6">
            <Animate type="fadeDown" delay={0}>
              <p className="text-yellow-500 text-sm tracking-widest uppercase font-medium">
                Educator. Creator. Entrepreneur.
              </p>
            </Animate>
            <Animate type="fadeRight" delay={0.1}>
              <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                Prof. Roxanna
                <span className="block text-yellow-500">Ezenekwe</span>
              </h1>
            </Animate>
            <Animate type="fadeUp" delay={0.2}>
              <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                Mathematics professor. Published author. Entrepreneur. Content creator. This is the official home of Prof. Roxanna Ezenekwe.
              </p>
            </Animate>
            <Animate type="fadeUp" delay={0.3}>
              <div className="flex flex-wrap gap-4 mt-2">
                <Link
                  to="/contact"
                  className="bg-yellow-500 text-gray-950 font-semibold px-8 py-3 rounded-full hover:bg-yellow-400 transition-colors duration-200"
                >
                  Work With Me
                </Link>
                <Link
                  to="/about"
                  className="border border-gray-600 text-white px-8 py-3 rounded-full hover:border-yellow-500 hover:text-yellow-500 transition-colors duration-200"
                >
                  Learn More
                </Link>
              </div>
            </Animate>
          </div>

          <Animate type="zoomIn" delay={0.2}>
            <div className="flex justify-center items-center">
              <div className="relative w-72 h-72 md:w-80 md:h-80">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-yellow-500 shadow-2xl">
                  <img
                    src="https://media.licdn.com/dms/image/v2/D4E03AQGEnpcQmFgBTw/profile-displayphoto-scale_400_400/B4EZ0qwGRqJcAo-/0/1774538745914?e=1783555200&v=beta&t=zLIuYDoNbWwvYPbiCvntj78hUAwGTUSptgh1LE69lHE"
                    alt="Prof. Roxanna Ezenekwe"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </Animate>
        </div>
      </section>

      {/* WHAT I DO */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900" ref={servicesRef}>
        <div className="max-w-6xl mx-auto px-6">
          <Animate type="fadeUp">
            <div className="text-center mb-16">
              <p className="text-yellow-600 dark:text-yellow-500 text-sm tracking-widest uppercase font-medium mb-3">
                What I Do
              </p>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                How I Can Help You
              </h2>
            </div>
          </Animate>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Mathematics Education",
                description: "Online and in-person math sessions for learners at every level. Interactive, structured and results focused.",
              },
              {
                title: "Digital Content Creation",
                description: "Content that educates, sparks conversations and builds real audiences across platforms.",
              },
              {
                title: "Entrepreneurship Coaching",
                description: "Practical guidance for people building businesses and creating income outside of a 9 to 5.",
              },
            ].map((item) => (
              <div key={item.title} className="service-card opacity-0">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 hover:border-yellow-400 dark:hover:border-yellow-500 hover:shadow-md transition-all duration-300 h-full">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <Animate type="fadeUp" delay={0.2}>
            <div className="text-center mt-12">
              <Link
                to="/services"
                className="border border-gray-900 dark:border-gray-600 text-gray-900 dark:text-white px-8 py-3 rounded-full hover:bg-gray-900 dark:hover:bg-yellow-500 hover:text-white dark:hover:text-gray-950 transition-colors duration-200 text-sm font-medium"
              >
                View All Services
              </Link>
            </div>
          </Animate>
        </div>
      </section>

      {/* BOOKS */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="max-w-6xl mx-auto px-6">
          <Animate type="flipY">
            <div className="text-center mb-16">
              <p className="text-yellow-600 dark:text-yellow-500 text-sm tracking-widest uppercase font-medium mb-3">
                Published Works
              </p>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">My Books</h2>
            </div>
          </Animate>

          {books.length === 0 ? (
            <p className="text-center text-gray-400 dark:text-gray-500">No books yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {books.map((book, i) => (
                <Animate key={book._id} type="zoomIn" delay={i * 0.1} hover>
                  <BookCard book={book} />
                </Animate>
              ))}
            </div>
          )}
        </div>
        <Animate type="fadeUp" delay={0.2}>
          <div className="text-center mt-12">
            <Link
              to="/books"
              className="border border-gray-900 dark:border-gray-600 text-gray-900 dark:text-white px-8 py-3 rounded-full hover:bg-gray-900 dark:hover:bg-yellow-500 hover:text-white dark:hover:text-gray-950 transition-colors duration-200 text-sm font-medium"
            >
              View All Books
            </Link>
          </div>
        </Animate>
      </section>

      {/* LATEST BLOGS */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <Animate type="fadeUp">
            <div className="text-center mb-16">
              <p className="text-yellow-600 dark:text-yellow-500 text-sm tracking-widest uppercase font-medium mb-3">
                From The Blog
              </p>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Latest Articles</h2>
            </div>
          </Animate>

          {blogs.length === 0 ? (
            <p className="text-center text-gray-400 dark:text-gray-500">No articles yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogs.map((blog, i) => (
                <Animate key={blog._id} type={i === 0 ? "fadeRight" : i === 1 ? "fadeUp" : "fadeLeft"} delay={i * 0.1}>
                  <BlogCard blog={blog} />
                </Animate>
              ))}
            </div>
          )}

          <Animate type="fadeUp" delay={0.2}>
            <div className="text-center mt-12">
              <Link
                to="/blog"
                className="border border-gray-900 dark:border-gray-600 text-gray-900 dark:text-white px-8 py-3 rounded-full hover:bg-gray-900 dark:hover:bg-yellow-500 hover:text-white dark:hover:text-gray-950 transition-colors duration-200 text-sm font-medium"
              >
                View All Articles
              </Link>
            </div>
          </Animate>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gray-950 dark:bg-black">
        <div className="max-w-3xl mx-auto px-6 text-center flex flex-col gap-6">
          <Animate type="slideUp">
            <h2 className="text-4xl font-bold text-white">
              Ready to Make a Move?
            </h2>
          </Animate>
          <Animate type="fadeUp" delay={0.1}>
            <p className="text-gray-400 text-lg leading-relaxed">
              Math tutoring, business coaching or content strategy. Pick your lane and let's get started.
            </p>
          </Animate>
          <Animate type="zoomIn" delay={0.2}>
            <div>
              <Link
                to="/contact"
                className="bg-yellow-500 text-gray-950 font-semibold px-10 py-4 rounded-full hover:bg-yellow-400 transition-colors duration-200 inline-block"
              >
                Get In Touch
              </Link>
            </div>
          </Animate>
        </div>
      </section>

    </div>
  )
}