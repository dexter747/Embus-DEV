'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaLeaf, FaRegClock, FaCoins, FaRegSmile, FaUsers } from 'react-icons/fa';
import { TbMapPin, TbBus } from 'react-icons/tb';

const AboutUs = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const textY = useTransform(scrollYProgress, [0, 0.3], [100, 0]);

  return (
    <div ref={containerRef} className="overflow-hidden">
      {/* Hero Section with 2.png Background and Frosted Glass Overlay */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/2.png')", // Apply 2.png as background
            scale: useTransform(scrollYProgress, [0, 1], [1, 1.2]),
          }}
        >
          <div className="absolute inset-0 bg-[#0E0E0E]/50 backdrop-blur-sm"></div>
        </motion.div>
        <div className="absolute inset-0 z-10">
          <div className="h-full w-full flex items-center justify-center">
            <div className="container mx-auto px-6 md:px-12 text-center">
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-7xl font-bold text-[#F7FFF2] mb-6 drop-shadow-lg"
              >
                About EMBUS
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl font-medium text-[#F7FFF2]/80 max-w-3xl mx-auto"
              >
                Revolutionizing urban and intercity commuting with sustainable, tech-driven solutions.
              </motion.p>
              {/* Call-to-Action Button in Hero */}
              <motion.a
                href="/intercity"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="inline-block mt-8 px-8 py-4 bg-gradient-to-r from-[#01DF73] to-[#C9E600] text-[#0E0E0E] font-semibold rounded-xl shadow-lg hover:from-[#01C966] hover:to-[#A8C200] transition-all duration-300 transform hover:scale-105 glow-effect"
              >
                Book Your Journey
              </motion.a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-0 right-0 flex justify-center z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <TbMapPin className="text-[#F7FFF2] text-4xl" />
          </motion.div>
        </div>
      </section>

      {/* Who We Are Section with 3.png as Subtle Background */}
      <section className="py-20 md:py-32 bg-[#F7FFF2] relative">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: "url('/3.png')" }} // Apply 3.png as subtle background
        />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div
              className="w-full md:w-1/2"
              style={{ opacity: textOpacity, y: textY }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-[#0E0E0E] mb-6">Who We Are</h2>
              <p className="text-lg text-[#0E0E0E]/70 mb-6">
                EMBUS is a forward-thinking transportation company redefining urban and intercity commuting in India. We recognize the inefficiencies and frustrations faced by daily commuters due to overcrowded public transport, expensive alternatives, and the underutilization of bus services.
              </p>
              <p className="text-lg text-[#0E0E0E]/70">
                With innovation at our core, EMBUS optimizes unused intercity bus seats, transforming them into an eco-friendly, cost-effective, and tech-driven travel solution for city residents. Our services cater to the everyday needs of young professionals, students, and budget-conscious commuters who seek comfort and reliability without compromising their finances.
              </p>
            </motion.div>
            <motion.div
              className="w-full md:w-1/2 relative aspect-video"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="rounded-2xl overflow-hidden bg-[#01DF73] w-full h-full p-12 flex items-center justify-center shadow-lg">
                <TbBus className="text-[#F7FFF2] text-9xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center text-[#0E0E0E] mb-16"
          >
            Our Mission
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <FaLeaf className="text-[#01DF73] text-4xl" />,
                title: "Empowering Commutes",
                description: "We aim to make travel within and between cities accessible, affordable, and efficient for all.",
              },
              {
                icon: <FaUsers className="text-[#01DF73] text-4xl" />,
                title: "Supporting Operators",
                description: "We partner with bus operators to maximize seat utilization and improve their revenue.",
              },
              {
                icon: <FaCoins className="text-[#01DF73] text-4xl" />,
                title: "Reducing Impact",
                description: "By optimizing existing buses, we reduce urban congestion and environmental impact.",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-[#F7FFF2]/50 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <div className="mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-[#0E0E0E] mb-2">{feature.title}</h3>
                <p className="text-[#0E0E0E]/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Customers Section */}
      <section className="py-20 md:py-32 bg-[#F7FFF2]">
        <div className="container mx-auto px-6 md:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center text-[#0E0E0E] mb-16"
          >
            Our Customers
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaRegSmile className="text-[#01DF73] text-4xl" />,
                title: "Young Professionals",
                description: "Affordable and reliable transportation for daily commutes.",
              },
              {
                icon: <FaRegClock className="text-[#01DF73] text-4xl" />,
                title: "Students",
                description: "Budget-friendly travel options for students.",
              },
              {
                icon: <FaCoins className="text-[#01DF73] text-4xl" />,
                title: "Budget-Conscious Travelers",
                description: "Economical alternatives to expensive ride-sharing.",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <div className="mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-[#0E0E0E] mb-2">{feature.title}</h3>
                <p className="text-[#0E0E0E]/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-[#0E0E0E] text-[#F7FFF2] text-center">
        <p>© {new Date().getFullYear()} EMBUS. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutUs;