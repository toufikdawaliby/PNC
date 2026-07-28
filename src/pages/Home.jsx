import React from 'react'
import { PromoBanner } from '../components/PromoBanner/PromoBanner'
import { Navbar } from '../components/Navbar/Navbar'
import { Hero } from '../components/Hero/Hero'
import { TodaySpecials } from '../components/Specials/TodaySpecials'
import { WhyChoosePNC } from '../components/WhyChoosePNC/WhyChoosePNC'
import { Menu } from '../components/Menu/Menu'
import { PaddlePricing } from '../components/PaddlePricing/PaddlePricing'
import { NetworkPricing } from '../components/NetworkPricing/NetworkPricing'
import { Reservation } from '../components/Reservation/Reservation'
import { Testimonials } from '../components/Testimonials/Testimonials'
import { FAQ } from '../components/FAQ/FAQ'
import { Newsletter } from '../components/Newsletter/Newsletter'
import { Contact } from '../components/Contact/Contact'
import { Footer } from '../components/Footer/Footer'
import { Chatbot } from '../components/Chatbot/Chatbot'
import { ScrollToTop } from '../components/ui/ScrollToTop'
import { WhatsAppButton } from '../components/ui/WhatsAppButton'

export const Home = ({ toast }) => {
  return (
    <div className="min-h-screen bg-coffee-950 text-cream-100 flex flex-col font-sans selection:bg-orange-500 selection:text-coffee-950">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <WhyChoosePNC />
        <Menu />
        <PaddlePricing />
        <NetworkPricing />
        <Reservation toast={toast} />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
      <ScrollToTop />
    </div>
  )
}
