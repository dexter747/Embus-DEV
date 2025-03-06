'use client';

import { ArrowRight, Bus, Navigation2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Plus_Jakarta_Sans } from 'next/font/google';

const plusJakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  display: 'swap',
});

export default function Home() {
  const router = useRouter();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className={`min-h-screen bg-white ${plusJakarta.className}`}>
      {/* Hero Section with Enhanced Animation */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, type: "spring", bounce: 0.4 }}
        className="container mx-auto px-4 pt-24 text-center"
      >
        <motion.h1 
          className="text-8xl font-bold mb-8 tracking-tight bg-gradient-to-r from-[#01DF73] to-[#C9E600] bg-clip-text text-transparent"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          embus
        </motion.h1>
        <motion.p 
          className="text-2xl text-gray-600 max-w-2xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Your journey, our priority
        </motion.p>
      </motion.div>

      {/* Travel Cards Section with Enhanced Animations */}
      <motion.div 
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="container mx-auto px-4 py-24"
      >
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div
            whileHover={{ scale: 1.03, rotate: -1 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            onClick={() => router.push('/')}
            className="bg-white rounded-2xl p-10 shadow-xl border border-gray-100 cursor-pointer transform transition-all"
          >
            <motion.div 
              className="flex items-center justify-center w-20 h-20 bg-[#01DF73] rounded-full mb-8"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8 }}
            >
              <Navigation2 className="w-10 h-10 text-white" />
            </motion.div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Intra-City Travel</h2>
            <p className="text-gray-600 text-lg mb-8">Perfect for daily commutes and getting around the city. Quick, convenient local bus services.</p>
            <motion.button 
              className="group flex items-center justify-center w-full bg-[#01DF73] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:bg-[#00c566]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore Routes
              <motion.span
                className="ml-2"
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
              >
                <ArrowRight className="w-6 h-6" />
              </motion.span>
            </motion.button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03, rotate: 1 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            onClick={() => router.push('/intercity')}
            className="bg-white rounded-2xl p-10 shadow-xl border border-gray-100 cursor-pointer transform transition-all"
          >
            <motion.div 
              className="flex items-center justify-center w-20 h-20 bg-[#C9E600] rounded-full mb-8"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8 }}
            >
              <Bus className="w-10 h-10 text-white" />
            </motion.div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Inter-City Travel</h2>
            <p className="text-gray-600 text-lg mb-8">For traveling between cities. Comfortable, long-distance bus services with amenities.</p>
            <motion.button 
              className="group flex items-center justify-center w-full bg-[#C9E600] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:bg-[#b5cf00]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Book Tickets
              <motion.span
                className="ml-2"
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
              >
                <ArrowRight className="w-6 h-6" />
              </motion.span>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Who We Are Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-24 bg-gradient-to-b from-white to-gray-50"
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-[#01DF73] to-[#C9E600] bg-clip-text text-transparent"
          >
            Who We Are
          </motion.h2>
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <p className="text-xl text-gray-800 leading-relaxed">
                EMBUS is a forward-thinking transportation company redefining urban and intercity commuting in India. We recognize the inefficiencies and frustrations faced by daily commuters due to overcrowded public transport, expensive alternatives, and the underutilization of bus services.
              </p>
              <p className="text-xl text-gray-800 leading-relaxed">
                With innovation at our core, EMBUS optimizes unused intercity bus seats, transforming them into an eco-friendly, cost-effective, and tech-driven travel solution for city residents.
              </p>
            </motion.div>
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <p className="text-xl text-gray-800 leading-relaxed">
                Our services cater to the everyday needs of young professionals, students, and budget-conscious commuters who seek comfort and reliability without compromising their finances.
              </p>
              <p className="text-xl text-gray-800 leading-relaxed">
                At EMBUS, we are passionate about reducing urban congestion and environmental impact while enhancing commuter convenience. With a smart and scalable solution, we bridge the gap between intercity and intra-city travel to unlock a new era of efficient transportation in India's bustling cities.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Mission Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-24 bg-[#01DF73] bg-opacity-5"
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-[#01DF73] to-[#C9E600] bg-clip-text text-transparent"
          >
            Our Mission
          </motion.h2>
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h3 className="text-3xl font-bold text-gray-800 mb-8">
              Empowering Commutes, Supporting Operators, Reducing Impact.
            </h3>
            <p className="text-xl text-gray-800 leading-relaxed">
              Our mission is to create a sustainable and tech-enabled transportation model that empowers commuters, supports bus operators, and reduces environmental impact. We aim to make travel within and between cities accessible, affordable, and efficient for all.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Customers Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-24"
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-[#01DF73] to-[#C9E600] bg-clip-text text-transparent"
          >
            Our Customers
          </motion.h2>
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Young Professionals",
                description: "Young College Students and Newly Working Professionals (18-30 years old) who regularly travel within the city.",
                icon: "👨‍💼"
              },
              {
                title: "Budget-Conscious",
                description: "Commuters looking for economical alternatives to expensive ride-sharing or premium bus services.",
                icon: "💰"
              },
              {
                title: "Urban Residents",
                description: "People in Pune and Mumbai transitioning from traditional public transport to more convenient options.",
                icon: "🌆"
              }
            ].map((customer, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
              >
                <div className="text-4xl mb-6">{customer.icon}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{customer.title}</h3>
                <p className="text-lg text-gray-700 leading-relaxed">{customer.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}