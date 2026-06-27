import { Link } from "react-router-dom"
import Animate from "../components/Animate"

const achievements = [
  { number: "10+", label: "Years Teaching" },
  { number: "10+", label: "Books Published" },
  { number: "1000+", label: "Students Impacted" },
  { number: "3", label: "Business Ventures" },
]

const featuredLinks = [
  { name: "RoxyEZ Academy", url: "https://roxyezacademy.com" },
  { name: "The Learning Lab", url: "https://thelearninglab600.shop" },
]

const timeline = [
  {
    year: "2023",
    title: "Founded RoxyEZ74 Consulting LLC",
    description: "Launched a consulting business combining education, digital content and entrepreneurship coaching.",
  },
  {
    year: "2024",
    title: "Published Multiple Books",
    description: "Released several titles on Amazon covering wealth building, passive income, education technology and digital marketing.",
  },
  {
    year: "2025",
    title: "Launched The Learning Lab",
    description: "Built a faith-inspired apparel brand serving Kingdom entrepreneurs across the United States.",
  },
  {
    year: "2026",
    title: "Expanding Digital Presence",
    description: "Growing YouTube, TikTok and LinkedIn platforms while continuing to serve students and entrepreneurs globally.",
  },
]

export default function About() {
  return (
    <div className="bg-white dark:bg-gray-950 transition-colors duration-300">

      {/* HERO */}
      <section className="bg-gray-950 py-24">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-start md:items-center">
          <div className="flex flex-col gap-6">
            <Animate type="fadeRight">
              <p className="text-yellow-500 text-sm tracking-widest uppercase font-medium">
                About Me
              </p>
            </Animate>
            <Animate type="fadeRight" delay={0.1}>
              <h1 className="text-5xl font-bold text-white leading-tight">
                Professor, Author
                <span className="block text-yellow-500">and Entrepreneur</span>
              </h1>
            </Animate>
            <Animate type="fadeRight" delay={0.2}>
              <p className="text-gray-400 leading-relaxed">
                Roxanna Ezenekwe is an Educational Consultant and Financial Literacy Advocate. She built RoxyEZ74 Consulting LLC to serve people who are serious about growth.
              </p>
            </Animate>
            <Animate type="fadeRight" delay={0.3}>
              <p className="text-gray-400 leading-relaxed">
                Her work sits at the intersection of education, faith and business. Everything she does is built around one idea: people deserve access to knowledge that actually changes their lives.
              </p>
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
                <div className="absolute inset-0 rounded-full border-2 border-yellow-500 opacity-30 scale-110" />
              </div>
            </div>
          </Animate>
        </div>
      </section>

      {/* FEATURED LINKS */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <Animate type="fadeUp">
            <div className="text-center mb-10">
              <p className="text-yellow-600 dark:text-yellow-500 text-sm tracking-widest uppercase font-medium mb-3">
                Featured Spaces
              </p>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Explore More of Her Work
              </h2>
            </div>
          </Animate>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 hover:border-yellow-500 hover:shadow-md transition-all duration-200"
              >
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{link.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Visit this platform directly</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 bg-yellow-500">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((item, i) => (
              <Animate key={item.label} type="flipX" delay={i * 0.1}>
                <div className="text-center">
                  <p className="text-4xl font-bold text-gray-950">{item.number}</p>
                  <p className="text-gray-800 text-sm font-medium mt-1">{item.label}</p>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-6">
          <Animate type="fadeUp">
            <div className="text-center mb-16">
              <p className="text-yellow-600 dark:text-yellow-500 text-sm tracking-widest uppercase font-medium mb-3">
                My Story
              </p>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                The Journey So Far
              </h2>
            </div>
          </Animate>

          <div className="flex flex-col gap-0">
            {timeline.map((item, index) => (
              <Animate key={item.year} type="fadeLeft" delay={index * 0.1}>
                <div className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-gray-950">
                        {item.year.slice(2)}
                      </span>
                    </div>
                    {index < timeline.length - 1 && (
                      <div className="w-0.5 h-16 bg-gray-200 dark:bg-gray-800 mt-2" />
                    )}
                  </div>
                  <div className="pb-12">
                    <p className="text-xs text-yellow-600 dark:text-yellow-500 font-medium tracking-widest uppercase mb-1">
                      {item.year}
                    </p>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <Animate type="fadeUp">
            <div className="text-center mb-16">
              <p className="text-yellow-600 dark:text-yellow-500 text-sm tracking-widest uppercase font-medium mb-3">
                My Values
              </p>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">What Drives Her</h2>
            </div>
          </Animate>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Education First",
                description: "Education is the greatest equalizer. Every person deserves access to quality learning that unlocks what they are actually capable of.",
              },
              {
                title: "Faith and Purpose",
                description: "Everything is built with intention. She creates with meaning and serves with a standard of excellence that does not move.",
              },
              {
                title: "Entrepreneurial Spirit",
                description: "Building multiple streams of income and impact is possible for anyone willing to do the work. That is what she teaches.",
              },
            ].map((item, i) => (
              <Animate key={item.title} type="zoomIn" delay={i * 0.1} hover>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 hover:border-yellow-400 dark:hover:border-yellow-500 hover:shadow-md transition-all duration-300 h-full">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{item.description}</p>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gray-950 dark:bg-black">
        <div className="max-w-3xl mx-auto px-6 text-center flex flex-col gap-6">
          <Animate type="slideUp">
            <h2 className="text-4xl font-bold text-white">
              Your Next Level Starts Here
            </h2>
          </Animate>
          <Animate type="fadeUp" delay={0.1}>
            <p className="text-gray-400 text-lg leading-relaxed">
              Student, professional or entrepreneur. Whatever your starting point, there is a next level and she can help you get there.
            </p>
          </Animate>
          <Animate type="zoomIn" delay={0.2}>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-yellow-500 text-gray-950 font-semibold px-10 py-4 rounded-full hover:bg-yellow-400 transition-colors duration-200"
              >
                Get In Touch
              </Link>
              <Link
                to="/services"
                className="border border-gray-600 text-white px-10 py-4 rounded-full hover:border-yellow-500 hover:text-yellow-500 transition-colors duration-200"
              >
                View Services
              </Link>
            </div>
          </Animate>
        </div>
      </section>

    </div>
  )
}