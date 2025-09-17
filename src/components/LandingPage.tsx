import React from 'react';
import { Leaf, Users, Trophy, BarChart3, BookOpen, Camera, Star, Zap, Target, Globe, Shield, Award, ArrowRight, Play } from 'lucide-react';

interface LandingPageProps {
  onAuth: (type: 'student' | 'teacher') => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onAuth }) => {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-green-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                EcoQuest
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => onAuth('student')}
                className="px-6 py-2 text-green-700 hover:text-green-900 font-medium transition-colors"
              >
                Student Login
              </button>
              <button
                onClick={() => onAuth('teacher')}
                className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Teacher Dashboard
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-emerald-100 opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Gamifying Sustainability for the{' '}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Next Generation
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Transform environmental education into an engaging adventure where students become Eco-Warriors,
              completing real-world challenges and making measurable impact on our planet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onAuth('student')}
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <Zap className="w-5 h-5" />
                <span>Start Your Eco-Journey</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 bg-white text-green-700 border-2 border-green-200 rounded-xl hover:border-green-300 font-semibold transition-all duration-200 flex items-center justify-center space-x-2">
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Learn → Act → Verify → Reward
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our comprehensive platform bridges the gap between environmental knowledge and real-world action
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* For Students */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">For Students</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-green-500" />
                  <span>Personalized Eco-Warrior avatars</span>
                </li>
                <li className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 text-green-500" />
                  <span>Tailored learning paths</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Camera className="w-4 h-4 text-green-500" />
                  <span>Real-world challenge verification</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Trophy className="w-4 h-4 text-green-500" />
                  <span>Badges and leaderboards</span>
                </li>
              </ul>
            </div>

            {/* For Teachers */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">For Educators</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center space-x-2">
                  <BarChart3 className="w-4 h-4 text-blue-500" />
                  <span>Real-time progress analytics</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-blue-500" />
                  <span>Custom challenge creation</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-blue-500" />
                  <span>Collective impact tracking</span>
                </li>
                <li className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 text-blue-500" />
                  <span>Curated resource hub</span>
                </li>
              </ul>
            </div>

            {/* For Institutions */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-6">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">For Institutions</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center space-x-2">
                  <Trophy className="w-4 h-4 text-purple-500" />
                  <span>Inter-college eco-leagues</span>
                </li>
                <li className="flex items-center space-x-2">
                  <BarChart3 className="w-4 h-4 text-purple-500" />
                  <span>Sustainability reporting</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-purple-500" />
                  <span>Accreditation support</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-purple-500" />
                  <span>CSR partnership integration</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-emerald-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Making Real Environmental Impact</h2>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Track your collective contribution to a sustainable future
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-green-100">Trees Planted</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">2.5M</div>
              <div className="text-green-100">Plastic Bottles Recycled</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">1.2M</div>
              <div className="text-green-100">kWh Energy Saved</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">15K</div>
              <div className="text-green-100">Active Eco-Warriors</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Transform Environmental Education?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of schools and colleges already making a difference with EcoQuest
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onAuth('student')}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Start as Student
            </button>
            <button
              onClick={() => onAuth('teacher')}
              className="px-8 py-4 bg-white text-green-700 border-2 border-green-200 rounded-xl hover:border-green-300 font-semibold transition-all duration-200"
            >
              Register Institution
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold">EcoQuest</span>
            </div>
            <p className="text-gray-400">
              Gamifying Sustainability for the Next Generation
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;