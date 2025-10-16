// import React, { useState, useEffect } from 'react'
// import Navbar from '../components/Navbar'
// import Servies from '../Sections/Servies'
// import Loader from '../components/Loader'
// import Count from '../Sections/Count'
// import Projects from '../Sections/Projects'
// import Testimonials from '../Sections/Testimonials'
// import Package from '../Sections/Package'
// import Homepages from '../Sections/Homepages'
// import Footer from '../components/Footer'
// import Contact from '../Sections/Contact'
// import uparrow from '../assets/icon/arrow-up.svg'
// const Mainlayout = () => {
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 1500)
//     return () => clearTimeout(timer)
//   }, [])

//   return (
//     <div className="relative">
//       <Navbar />

//       {loading && (
//         <div className="fixed inset-0 z-50">
//           <Loader />
//         </div>
//       )}

//       <main
//         className={`bg-[#CDD8FF] transition-opacity duration-700 ${
//           loading ? 'opacity-0' : 'opacity-100'
//         }`}
//       >
//         <section id='hero'><Homepages/></section>
//         <section id="home"><Servies /></section>
//         <section id="count"><Count /></section>
//         <section id="portfolio"><Projects /></section>
//         <section id="testimonials"><Testimonials /></section>
//         <section id="packages"><Package /></section>
//         <section id="contact"><Contact/></section>
//       </main>
//      <div
//   onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
//   className="fixed bottom-5 right-5 bg-[#b39de6] rounded-full shadow-lg z-10 cursor-pointer hover:bg-gray-100 transition"
// >
//   <img src={uparrow} className="p-2 w-10 h-10" alt="Go to top" />
// </div>

//       <Footer/>
//     </div>
//   )
// }

// export default Mainlayout
import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar'
import Servies from '../Sections/Servies'
import Loader from '../components/Loader'
import Count from '../Sections/Count'
import Projects from '../Sections/Projects'
import Testimonials from '../Sections/Testimonials'
import Package from '../Sections/Package'
import Homepages from '../Sections/Homepages'
import Footer from '../components/Footer'
import Contact from '../Sections/Contact'
import uparrow from '../assets/icon/arrow-up.svg'

gsap.registerPlugin(ScrollTrigger)

const Mainlayout = () => {
  const [loading, setLoading] = useState(true)

  // Refs for sections
  const heroRef = useRef(null)
  const servicesRef = useRef(null)
  const countRef = useRef(null)
  const portfolioRef = useRef(null)
  const testimonialsRef = useRef(null)
  const packagesRef = useRef(null)
  const contactRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!loading) {
      // Hero animation
      gsap.from(heroRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
      })

      // Scroll-triggered animations for other sections
      const sections = [
        servicesRef,
        countRef,
        portfolioRef,
        testimonialsRef,
        packagesRef,
        contactRef,
      ]

      sections.forEach((section) => {
        gsap.from(section.current, {
          scrollTrigger: {
            trigger: section.current,
            start: 'top 80%',
          },
          opacity: 0,
          y: 50,
          duration: 1,
          ease: 'power2.out',
        })
      })
    }
  }, [loading])

  return (
    <div className="relative">
      <Navbar />

      {loading && (
        <div className="fixed inset-0 z-50">
          <Loader />
        </div>
      )}

      <main
        className={`bg-[#CDD8FF] transition-opacity duration-700 ${
          loading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <section id="hero" ref={heroRef}>
  <Homepages loading={!loading} />
</section>

        <section id="home" ref={servicesRef}>
          <Servies />
        </section>
        <section id="count" ref={countRef}>
          <Count />
        </section>
        <section id="portfolio" ref={portfolioRef}>
          <Projects />
        </section>
        <section id="testimonials" ref={testimonialsRef}>
          <Testimonials />
        </section>
        <section id="packages" ref={packagesRef}>
          <Package />
        </section>
        <section id="contact" ref={contactRef}>
          <Contact />
        </section>
      </main>

      <div
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-5 right-5 bg-[#b39de6] rounded-full shadow-lg z-10 cursor-pointer hover:bg-gray-100 transition"
      >
        <img src={uparrow} className="p-2 w-10 h-10" alt="Go to top" />
      </div>

      <Footer />
    </div>
  )
}

export default Mainlayout
