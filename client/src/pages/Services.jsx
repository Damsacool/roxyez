import { useState } from "react"
import { Link } from "react-router-dom"
import Animate from "../components/Animate"

const services = [
  {
    title: "Online Mathematics Courses",
    description: "Math courses built for learners at every level. Virtual lessons that make the subject click, whether you are a student struggling to keep up or someone returning to the subject after years away.",
    features: ["Flexible scheduling", "All levels welcome", "Interactive virtual lessons", "Progress tracking"],
  },
  {
    title: "Personalized Virtual Tutoring",
    description: "One-on-one sessions focused entirely on your specific needs. No generic lessons. Just targeted support on exactly what you need to understand.",
    features: ["One-on-one sessions", "Custom learning plan", "Focused on your weak areas", "Delivered from your own space"],
  },
  {
    title: "Digital Content Creation",
    description: "Content that educates, connects and builds real audiences. From videos to written content, the goal is always the same: say something worth hearing.",
    features: ["Educational content", "Social media strategy", "Video and visual content", "Brand storytelling"],
  },
  {
    title: "Entrepreneurship Coaching",
    description: "Practical guidance for people serious about building a business. Not theory. Real strategies from someone who has actually done it.",
    features: ["Business model development", "Multiple income streams", "Digital product strategy", "Accountability coaching"],
  },
  {
    title: "Education Technology Consulting",
    description: "Helping schools, teachers and students use technology in ways that actually improve learning. From assessment to full implementation.",
    features: ["Tech infrastructure assessment", "Implementation strategy", "Teacher training", "Student engagement tools"],
  },
  {
    title: "Financial Literacy Coaching",
    description: "Honest, practical guidance on building wealth and creating passive income. Based on the same strategies covered in her published books.",
    features: ["Budgeting and saving", "Passive income strategies", "Investment basics", "Wealth building mindset"],
  },
]

const faqs = [
  { question: "How do I book a session?", answer: "Fill out the contact form and you will hear back within 24 hours to schedule a discovery call." },
  { question: "Are sessions available online?", answer: "Yes. All sessions run online via Zoom or Google Meet. In-person sessions may be available depending on location." },
  { question: "What age groups do you teach?", answer: "All ages. From high school through university level and adult learners returning to education." },
  { question: "Is group coaching available?", answer: "Yes, for entrepreneurship and financial literacy. Reach out through the contact form for current availability and pricing." },
]

function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null)
  const toggle = (index) => setOpenIndex(openIndex === index ? null : index)

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, index) => (
        <Animate key={item.question} type="fadeLeft" delay={index * 0.08}>
          <div className="border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden">
            <button
              onClick={() => toggle(index)}
              className="w-full flex items-center justify-between px-6 py-5 text-left bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              <span className="font-semibold text-gray-900 dark:text-white text-sm pr-4">
                {item.question}
              </span>
              <span className="text-gray-400 text-lg flex-shrink-0">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>
            {openIndex === index && (
              <div className="px-6 py-5 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800">
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        </Animate>
      ))}
    </div>
  )
}

export default function Services() {
  return (
    <div className="bg-white dark:bg-gray-950 transition-colors duration-300">

      {/* HERO */}
      <section className="bg-gray-950 py-24">
        <div className="max-w-4xl mx-auto px-6 text-center flex flex-col gap-6">
          <Animate type="fadeDown">
            <p className="text-yellow-500 text-sm tracking-widest uppercase font-medium">
              What I Offer
            </p>
          </Animate>
          <Animate type="fadeDown" delay={0.1}>
            <h1 className="text-5xl font-bold text-white leading-tight">
              Services Built Around
              <span className="block text-yellow-500">Your Goals</span>
            </h1>
          </Animate>
          <Animate type="fadeDown" delay={0.2}>
            <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
              From math tutoring to business coaching. Every service is designed around one thing: helping you move forward.
            </p>
          </Animate>
          <Animate type="fadeDown" delay={0.3}>
            <div>
              <Link
                to="/contact"
                className="bg-yellow-500 text-gray-950 font-semibold px-10 py-4 rounded-full hover:bg-yellow-400 transition-colors duration-200 inline-block"
              >
                Book a Session
              </Link>
            </div>
          </Animate>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <Animate key={service.title} type="zoomIn" delay={i * 0.08} hover>
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-800 hover:border-yellow-400 dark:hover:border-yellow-500 hover:shadow-md transition-all duration-300 flex flex-col gap-4 h-full">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{service.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{service.description}</p>
                  <ul className="flex flex-col gap-2 mt-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-6">
          <Animate type="fadeUp">
            <div className="text-center mb-16">
              <p className="text-yellow-600 dark:text-yellow-500 text-sm tracking-widest uppercase font-medium mb-3">
                The Process
              </p>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">How It Works</h2>
            </div>
          </Animate>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Reach Out", description: "Fill out the contact form with your needs and goals." },
              { step: "02", title: "Discovery Call", description: "We get on a call to understand exactly where you are and where you want to go." },
              { step: "03", title: "Custom Plan", description: "A plan is put together specifically for you. Not a template." },
              { step: "04", title: "Get to Work", description: "We start and track progress together every step of the way." },
            ].map((item, i) => (
              <Animate key={item.step} type="flipY" delay={i * 0.1}>
                <div className="text-center flex flex-col gap-3">
                  <div className="w-14 h-14 rounded-full bg-yellow-500 flex items-center justify-center mx-auto">
                    <span className="text-gray-950 font-bold text-sm">{item.step}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{item.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{item.description}</p>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="max-w-3xl mx-auto px-6">
          <Animate type="fadeUp">
            <div className="text-center mb-16">
              <p className="text-yellow-600 dark:text-yellow-500 text-sm tracking-widest uppercase font-medium mb-3">
                FAQ
              </p>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Common Questions</h2>
            </div>
          </Animate>
          <Accordion items={faqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gray-950 dark:bg-black">
        <div className="max-w-3xl mx-auto px-6 text-center flex flex-col gap-6">
          <Animate type="slideUp">
            <h2 className="text-4xl font-bold text-white">Ready to Get Started?</h2>
          </Animate>
          <Animate type="fadeUp" delay={0.1}>
            <p className="text-gray-400 text-lg leading-relaxed">
              Book a session and take the first real step toward your goals.
            </p>
          </Animate>
          <Animate type="zoomIn" delay={0.2}>
            <div>
              <Link
                to="/contact"
                className="bg-yellow-500 text-gray-950 font-semibold px-10 py-4 rounded-full hover:bg-yellow-400 transition-colors duration-200 inline-block"
              >
                Contact Me Now
              </Link>
            </div>
          </Animate>
        </div>
      </section>

    </div>
  )
}