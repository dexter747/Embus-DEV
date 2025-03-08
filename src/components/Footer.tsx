'use client';

import { motion } from 'framer-motion';

const Footer = () => {
  return (
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
              <div className="flex flex-col space-y-4">
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
  );
};

export default Footer;