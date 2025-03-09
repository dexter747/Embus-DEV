'use client';

import { ArrowRight, Bus, Navigation2 } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { useRef } from 'react';

const plusJakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  display: 'swap',
});

export default function Home() {
  const router = useRouter();
  const targetRef = useRef(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  // Add smooth scroll values
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // Add scroll handler function
  const scrollToCards = () => {
    cardsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen bg-white ${plusJakarta.className}`} ref={targetRef}>
      {/* Hero Section with Enhanced Animation */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <motion.div 
          className="absolute inset-0 z-0"
          animate={{ 
            background: [
              "linear-gradient(to right, rgba(1,223,115,0.1), rgba(201,230,0,0.1))",
              "linear-gradient(to right, rgba(1,223,115,0.2), rgba(201,230,0,0.2))",
              "linear-gradient(to right, rgba(1,223,115,0.1), rgba(201,230,0,0.1))"
            ]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />

        <div className="relative z-10 text-center">
          <motion.h1 
            className="text-[120px] font-bold tracking-tight"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1,
              type: "spring",
              stiffness: 100,
              delay: 0.2
            }}
          >
            <span className="bg-gradient-to-r from-[#01DF73] to-[#C9E600] bg-clip-text text-transparent">
              embus
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-2xl text-gray-600 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            Your journey, our priority
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToCards}
              className="bg-[#01DF73] text-white px-8 py-4 rounded-full text-lg font-medium"
            >
              Get Started
            </motion.button>
          </motion.div>
        </div>

        {/* Floating Elements Animation */}
        <motion.div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 rounded-full bg-[#01DF73]/10"
              initial={{ 
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight
              }}
              animate={{ 
                y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
                x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Travel Cards Section with Parallax */}
      <motion.div 
        ref={cardsRef}
        style={{ opacity, scale }}
        className="py-32 relative"
      >
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="container mx-auto px-4 py-24"
        >
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <motion.div
              whileHover={{ 
                scale: 1.05, // Increased from 1.03
                rotate: -1,
                y: -10, // Added y translation
                transition: { type: "spring", stiffness: 400, damping: 10 } // Added spring physics
              }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, type: "spring" }}
              onClick={() => router.push('/')}
              className="bg-white rounded-2xl p-10 shadow-xl border border-gray-100 cursor-pointer transform transition-all hover:shadow-2xl" // Added shadow transition
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
              whileHover={{ 
                scale: 1.05, // Increased from 1.03
                rotate: 1,
                y: -10, // Added y translation
                transition: { type: "spring", stiffness: 400, damping: 10 } // Added spring physics
              }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, type: "spring" }}
              onClick={() => router.push('/intercity')}
              className="bg-white rounded-2xl p-10 shadow-xl border border-gray-100 cursor-pointer transform transition-all hover:shadow-2xl" // Added shadow transition
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
                At EMBUS, we are passionate about reducing urban congestion and environmental impact while enhancing commuter convenience. With a smart and scalable solution, we bridge the gap between intercity and intra-city travel to unlock a new era of efficient transportation in Indias bustling cities.
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

      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="bg-black text-white py-20"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            {/* Logo Section */}
            <div className="space-y-6">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-[#01DF73] to-[#C9E600] bg-clip-text text-transparent">
                embus
              </h2>
              <p className="text-gray-400">
                Your journey, our priority
              </p>
            </div>

            {/* Find Location */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Find Location</h3>
              <ul className="space-y-4 text-gray-400">
                <li>Mumbai</li>
                <li>Pune</li>
                <li>Bangalore</li>
                <li>Delhi</li>
              </ul>
            </div>

            {/* Get Help */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Get Help</h3>
              <ul className="space-y-4 text-gray-400">
                <li>Contact Us</li>
                <li>FAQs</li>
                <li>Safety</li>
                <li>Terms & Conditions</li>
                <li>Privacy Policy</li>
              </ul>
            </div>

            {/* Connect */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Connect With Us</h3>
              <div className="flex space-x-4">
                {[
                  { icon: 'facebook', href: '#' },
                  { icon: 'twitter', href: '#' },
                  { icon: 'instagram', href: '#' },
                  { icon: 'linkedin', href: '#' }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#01DF73] transition-colors"
                  >
                    <i className={`fab fa-${social.icon} text-white`}></i>
                  </motion.a>
                ))}
              </div>
              <div className="mt-8">
                <h4 className="text-sm font-semibold mb-4">Download Our App</h4>
                <div className="flex flex-col space-y-4"> {/* Changed to flex-col and space-y-4 */}
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    src="/app-store.png"
                    alt="Download on App Store"
                    className="h-10 cursor-pointer"
                  />
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    src="/play-store.png"
                    alt="Get it on Play Store"
                    className="h-10 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
              <p>© 2024 Embus. All rights reserved.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-[#01DF73] transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-[#01DF73] transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-[#01DF73] transition-colors">Cookie Settings</a>
              </div>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}