'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';

interface FormData {
  email: string;
  password: string;
}

const SignInPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const colors = {
    primaryGreen: 'rgb(1, 223, 115)',    // #01DF73
    secondaryGreen: 'rgb(201, 230, 0)',  // #C9E600
    lightBg: '#F7FFF2',
    darkText: '#0E0E0E',
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    router.push('/landing');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8" 
         style={{ backgroundColor: colors.lightBg }}>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo */}
        <div className="flex justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="font-bold text-4xl flex items-center"
            style={{ color: colors.primaryGreen }}
          >
            embus
          </motion.div>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-6 text-center text-3xl font-chillax font-bold"
          style={{ color: colors.darkText }}
        >
          Sign in to your account
        </motion.h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="bg-white py-8 px-4 shadow-xl rounded-xl sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 p-4 rounded-md flex items-start space-x-2"
              >
                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                <p className="text-sm text-red-500">{error}</p>
              </motion.div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-2 focus:border-primary sm:text-sm transition-colors"
                  style={{ borderColor: error ? '#ef4444' : undefined }}
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-2 focus:border-primary sm:text-sm transition-colors"
                  style={{ borderColor: error ? '#ef4444' : undefined }}
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 accent-[#01DF73] transition-colors"
                />
                <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <button
                type="button"
                onClick={() => router.push('/auth/forgot-password')}
                className="text-sm font-medium transition-colors"
                style={{ color: colors.primaryGreen }}
              >
                Forgot password?
              </button>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: colors.primaryGreen }}
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                'Sign in'
              )}
            </motion.button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Don't have an account?</span>
              </div>
            </div>

            <div className="mt-6">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => router.push('/auth/signup')}
                className="w-full flex items-center justify-center px-4 py-2 border rounded-lg shadow-sm text-sm font-medium transition-all"
                style={{ 
                  borderColor: colors.primaryGreen,
                  color: colors.primaryGreen 
                }}
              >
                Create new account
                <ArrowRight className="ml-2 w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignInPage;