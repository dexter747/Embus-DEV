'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

// Fallback for useRef if it's not recognized
const useRefFallback = typeof useRef === 'undefined' ? () => ({ current: null }) : useRef;

const ContactUs = () => {
  const containerRef = useRefFallback(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // These values are now used in the motion.div components below
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <div ref={containerRef} className="overflow-hidden">
      {/* Hero Section with 2.png Background and Frosted Glass Overlay */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/2.png')", // Apply 2.png as background
            scale: heroScale,
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
                Contact Us
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl font-medium text-[#F7FFF2]/80 max-w-3xl mx-auto"
              >
                Let&apos;s bridge the gap between intercity and urban transport. Reach out to us for any inquiries or feedback.
              </motion.p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-0 right-0 flex justify-center z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <FaMapMarkerAlt className="text-[#F7FFF2] text-4xl" />
          </motion.div>
        </div>
      </section>

      {/* Contact Information Section with 2.png as Subtle Background */}
      <section className="py-20 md:py-32 bg-[#F7FFF2] relative">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: "url('/2.png')" }} // Apply 2.png as subtle background
        />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center text-[#0E0E0E] mb-16"
          >
            Get in Touch
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <div className="mb-4 flex justify-center">
                <FaEnvelope className="text-[#01DF73] text-4xl" />
              </div>
              <h3 className="text-xl font-semibold text-[#0E0E0E] mb-2">Email</h3>
              <p className="text-[#0E0E0E]/70">admin@embus.in</p>
            </motion.div>

            {/* Phone */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <div className="mb-4 flex justify-center">
                <FaPhone className="text-[#01DF73] text-4xl" />
              </div>
              <h3 className="text-xl font-semibold text-[#0E0E0E] mb-2">Phone</h3>
              <p className="text-[#0E0E0E]/70">+91 9179620772</p>
              <p className="text-[#0E0E0E]/70">+91 8108507165</p>
            </motion.div>

            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <div className="mb-4 flex justify-center">
                <FaMapMarkerAlt className="text-[#01DF73] text-4xl" />
              </div>
              <h3 className="text-xl font-semibold text-[#0E0E0E] mb-2">Follow Us</h3>
              <div className="flex justify-center space-x-4">
                <a
                  href="https://instagram.com/embus_official"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#01DF73] hover:text-[#C9E600] transition-colors"
                >
                  <FaInstagram className="text-2xl" />
                </a>
                <a
                  href="https://twitter.com/embus_official"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#01DF73] hover:text-[#C9E600] transition-colors"
                >
                  <FaTwitter className="text-2xl" />
                </a>
                <a
                  href="https://linkedin.com/company/embus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#01DF73] hover:text-[#C9E600] transition-colors"
                >
                  <FaLinkedin className="text-2xl" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center text-[#0E0E0E] mb-16"
          >
            Send Us a Message
          </motion.h2>
          <form className="max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <label className="block text-sm font-medium text-[#0E0E0E] mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-[#F7FFF2]/50 backdrop-blur-sm rounded-lg border border-[#0E0E0E]/10 focus:outline-none focus:ring-2 focus:ring-[#01DF73] transition-all duration-300 hover:bg-[#F7FFF2]/80 focus:scale-105"
                  placeholder="Your Name"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <label className="block text-sm font-medium text-[#0E0E0E] mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 bg-[#F7FFF2]/50 backdrop-blur-sm rounded-lg border border-[#0E0E0E]/10 focus:outline-none focus:ring-2 focus:ring-[#01DF73] transition-all duration-300 hover:bg-[#F7FFF2]/80 focus:scale-105"
                  placeholder="Your Email"
                />
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
              className="mt-6"
            >
              <label className="block text-sm font-medium text-[#0E0E0E] mb-2">Message</label>
              <textarea
                className="w-full px-4 py-2 bg-[#F7FFF2]/50 backdrop-blur-sm rounded-lg border border-[#0E0E0E]/10 focus:outline-none focus:ring-2 focus:ring-[#01DF73] transition-all duration-300 hover:bg-[#F7FFF2]/80 focus:scale-105"
                rows={5}
                placeholder="Your Message"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              viewport={{ once: true }}
              className="mt-6"
            >
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#01DF73] to-[#C9E600] text-[#0E0E0E] font-semibold py-2 rounded-lg shadow-lg hover:from-[#01C966] hover:to-[#A8C200] transition-all duration-300 transform hover:scale-105 glow-effect"
              >
                Send Message
              </button>
            </motion.div>
          </form>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-20 md:py-32 bg-[#F7FFF2]">
        <div className="container mx-auto px-6 md:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center text-[#0E0E0E] mb-16"
          >
            Find Us on the Map
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-lg border border-[#0E0E0E]/10"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.265588856342!2d73.9145564154165!3d18.562253287384868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c147b8b3a3bf%3A0x6f7fdcc8e4d6c77e!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1633023226785!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-[#0E0E0E] text-[#F7FFF2] text-center">
        <p>© {new Date().getFullYear()} EMBUS. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ContactUs;