import React, { useState, useEffect } from 'react'
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

const Mainlayout = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

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
        <section id='hero'><Homepages/></section>
        <section id="home"><Servies /></section>
        <section id="count"><Count /></section>
        <section id="portfolio"><Projects /></section>
        <section id="testimonials"><Testimonials /></section>
        <section id="packages"><Package /></section>
        <section id="contact"><Contact/></section>
      </main>
      <Footer/>
    </div>
  )
}

export default Mainlayout
