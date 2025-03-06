'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFacebookF, FaGoogle, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { Plus_Jakarta_Sans } from 'next/font/google';
import '../../globals.css';

const plusJakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  display: 'swap',
});

const SignUpPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();

  return (
    <div className={`flex items-center justify-center min-h-screen bg-gradient-to-br from-[#01DF73]/90 via-[#7EE668]/80 to-[#C9E600]/70 p-6 ${plusJakarta.className}`}>
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-[900px] max-w-full min-h-[600px] bg-white/40 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/20"
      >
        {/* Form Container */}
        <motion.div
          animate={{ x: isSignUp ? '100%' : '0%' }}
          transition={{ duration: 0.7, ease: [0.4, 0.0, 0.2, 1] }}
          className="absolute top-0 left-0 w-1/2 h-full bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center p-12"
        >
          <AnimatePresence mode="wait">
            {!isSignUp ? (
              <motion.div
                key="signin"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center w-full space-y-4"
              >
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                <div className="flex space-x-4 mt-2">
                  {[FaFacebookF, FaGoogle, FaGithub, FaLinkedinIn].map((Icon, index) => (
                    <motion.a
                      key={index}
                      whileHover={{ scale: 1.1, backgroundColor: '#01DF73', borderColor: '#01DF73', color: 'white' }}
                      whileTap={{ scale: 0.95 }}
                      href="#"
                      className="w-12 h-12 flex items-center justify-center border-2 border-gray-200 rounded-full transition-colors"
                    >
                      <Icon className="text-current text-xl" />
                    </motion.a>
                  ))}
                </div>
                <span className="text-sm text-gray-600">or use your email to sign in</span>
                <motion.input 
                  whileFocus={{ scale: 1.02 }}
                  type="email" 
                  placeholder="Email" 
                  className="input mb-4" 
                />
                <motion.input 
                  whileFocus={{ scale: 1.02 }}
                  type="password" 
                  placeholder="Password" 
                  className="input mb-6" 
                />
                <motion.button 
                  whileHover={{ scale: 1.02, backgroundColor: '#00c567' }}
                  whileTap={{ scale: 0.98 }}
                  className="btn w-full"
                  onClick={() => router.push('/landing')}
                  style={{ backgroundColor: '#01DF73' }}
                >
                  Sign In
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="signup"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center w-full space-y-4"
              >
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Create Account</h1>
                <div className="flex space-x-4 mt-2">
                  {[FaFacebookF, FaGoogle, FaGithub, FaLinkedinIn].map((Icon, index) => (
                    <motion.a
                      key={index}
                      whileHover={{ scale: 1.1, backgroundColor: '#01DF73', borderColor: '#01DF73', color: 'white' }}
                      whileTap={{ scale: 0.95 }}
                      href="#"
                      className="w-12 h-12 flex items-center justify-center border-2 border-gray-200 rounded-full transition-colors"
                    >
                      <Icon className="text-current text-xl" />
                    </motion.a>
                  ))}
                </div>
                <span className="text-sm text-gray-600">or use your email for registration</span>
                <motion.input 
                  whileFocus={{ scale: 1.02 }}
                  type="text" 
                  placeholder="Name" 
                  className="input mb-4" 
                />
                <motion.input 
                  whileFocus={{ scale: 1.02 }}
                  type="email" 
                  placeholder="Email" 
                  className="input mb-4" 
                />
                <motion.input 
                  whileFocus={{ scale: 1.02 }}
                  type="password" 
                  placeholder="Password" 
                  className="input mb-6" 
                />
                <motion.button 
                  whileHover={{ scale: 1.02, backgroundColor: '#00c567' }}
                  whileTap={{ scale: 0.98 }}
                  className="btn w-full"
                  onClick={() => router.push('/landing')}
                  style={{ backgroundColor: '#01DF73' }}
                >
                  Sign Up
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Overlay Container */}
        <motion.div
          animate={{ x: isSignUp ? '-100%' : '0%' }}
          transition={{ duration: 0.7, ease: [0.4, 0.0, 0.2, 1] }}
          className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-br from-[#01DF73]/90 to-[#C9E600]/80 backdrop-blur-sm text-white flex flex-col items-center justify-center p-12 text-center"
        >
          <AnimatePresence mode="wait">
            {!isSignUp ? (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-4xl font-bold mb-6">Hello, Friend!</h1>
                <p className="text-lg mb-8 opacity-90 leading-relaxed">
                  Start your journey with us today and experience seamless bus booking services
                </p>
                <motion.button 
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                  whileTap={{ scale: 0.95 }}
                  className="btn border-2 border-white bg-transparent hover:bg-white/10 transition-colors text-lg px-12"
                  onClick={() => setIsSignUp(true)}
                >
                  Create Account
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="welcomeBack"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-4xl font-bold mb-6">Welcome Back!</h1>
                <p className="text-lg mb-8 opacity-90 leading-relaxed">
                  Already have an account? Sign in to continue your journey
                </p>
                <motion.button 
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                  whileTap={{ scale: 0.95 }}
                  className="btn border-2 border-white bg-transparent hover:bg-white/10 transition-colors text-lg px-12"
                  onClick={() => setIsSignUp(false)}
                >
                  Sign In
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignUpPage;
