import React, { useState } from 'react';
import { X, User, BookOpen, Eye, EyeOff, ArrowLeft } from 'lucide-react';

interface AuthModalProps {
  type: 'student' | 'teacher';
  onClose: () => void;
  onLogin: (email: string, password: string, isSignUp?: boolean) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ type, onClose, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const demoCredentials = type === 'student' 
    ? { email: 'alex.chen@school.edu', password: 'demo123' }
    : { email: 'teacher@school.edu', password: 'demo123' };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSignUp && password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (isSignUp && password.length < 6) {
      alert('Password must be at least 6 characters long!');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      onLogin(email, password, isSignUp);
      setIsLoading(false);
    }, 1000);
  };

  const handleDemoLogin = () => {
    setEmail(demoCredentials.email);
    setPassword(demoCredentials.password);
    setIsLoading(true);
    
    setTimeout(() => {
      onLogin(demoCredentials.email, demoCredentials.password);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md relative shadow-2xl">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={onClose}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Home</span>
          </button>
        </div>
        <button
          onClick={onClose}
          className="absolute top-6 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 ${
            type === 'student' 
              ? 'bg-gradient-to-br from-green-500 to-emerald-600' 
              : 'bg-gradient-to-br from-blue-500 to-indigo-600'
          }`}>
            {type === 'student' ? (
              <User className="w-8 h-8 text-white" />
            ) : (
              <BookOpen className="w-8 h-8 text-white" />
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {type === 'student' ? 'Student Portal' : 'Teacher Dashboard'}
          </h2>
          <p className="text-gray-600">
            {isSignUp ? 'Create your EcoQuest account' : 'Sign in to continue your eco-journey'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="Enter your password"
                required
                minLength={isSignUp ? 6 : undefined}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {isSignUp && (
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="Confirm your password"
                required
                minLength={6}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed ${
              type === 'student'
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white'
                : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>{isSignUp ? 'Creating Account...' : 'Signing In...'}</span>
              </div>
            ) : (
              isSignUp ? 'Create Account' : 'Sign In'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-green-600 hover:text-green-700 font-medium transition-colors"
          >
            {isSignUp 
              ? 'Already have an account? Sign in' 
              : "Don't have an account? Sign up"
            }
          </button>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-700 font-medium mb-2 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Demo Credentials:
          </p>
          <div className="text-sm text-gray-600 space-y-1">
            <p><span className="font-medium">Email:</span> {demoCredentials.email}</p>
            <p><span className="font-medium">Password:</span> {demoCredentials.password}</p>
          </div>
          <button
            onClick={handleDemoLogin}
            disabled={isLoading}
            className="mt-3 w-full text-xs text-green-600 hover:text-green-700 font-medium py-2 px-3 border border-green-200 rounded-lg hover:bg-green-50 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Loading...' : 'Use Demo Account'}
          </button>
        </div>

        {/* Features Preview */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 mb-2">What you'll get:</p>
          <div className="flex justify-center space-x-4 text-xs text-gray-600">
            {type === 'student' ? (
              <>
                <span>🎮 Gamified Learning</span>
                <span>🏆 Achievements</span>
                <span>🌱 Real Impact</span>
              </>
            ) : (
              <>
                <span>📊 Analytics</span>
                <span>👥 Student Management</span>
                <span>🎯 Custom Challenges</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;