import React from 'react'
import Navbar from '../Components/Navbar'
import Hero from '../Components/Hero'
import Features from '../Components/Features'
import About from '../Components/About'
import Footer from '../Components/Footer'

const Landing = () => {
  return (
    <div className='w-full min-h-screen dotted-bg scroll-smooth'>
      <Navbar />
      <Hero />
      <Features />
      <About />
      <Footer />
    </div>
  )
}

export default Landing