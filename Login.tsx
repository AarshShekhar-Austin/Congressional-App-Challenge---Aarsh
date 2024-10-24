import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, ArrowRight, UserPlus, Info, HelpCircle, Phone, Mail, Heart } from 'lucide-react';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('login');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="w-1/2 flex flex-col justify-center items-center p-10 bg-blue-100">
        <div className="w-full max-w-md">
          <img
            src="https://www.getsafe.com/wp-content/uploads/2024/04/autism-home-therapy.jpg"
            alt="Children learning"
            className="rounded-lg shadow-lg mb-8 w-full"
          />
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="p-8">
              <h1 className="text-4xl font-bold mb-2 text-blue-700">MindMates</h1>
              <p className="text-gray-600 mb-8">Welcome to your learning adventure!</p>
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-blue-600 mb-1">
                    Email or username
                  </label>
                  <div className="relative">
                    <User className="absolute top-3 left-3 text-blue-500" size={18} />
                    <input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="Enter your email or username"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-blue-600 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute top-3 left-3 text-blue-500" size={18} />
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="Enter your password"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center"
                  >
                    Log in
                    <ArrowRight className="ml-2" size={18} />
                  </button>
                </div>
              </form>
            </div>
            <div className="px-8 py-4 bg-blue-50 border-t border-blue-100">
              <p className="text-xs text-blue-600">© 2024 MindMates. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2 bg-blue-600 p-10 flex flex-col justify-center">
        <div className="bg-white rounded-xl shadow-2xl p-8 space-y-6">
          <div className="flex flex-col space-y-2">
            <button onClick={() => setActiveTab('contact')} className={`py-2 px-4 ${activeTab === 'contact' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700'} rounded-md transition duration-300`}>
              <Phone size={18} className="inline mr-2" />Contact Us
            </button>
            <button onClick={() => setActiveTab('signup')} className={`py-2 px-4 ${activeTab === 'signup' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700'} rounded-md transition duration-300`}>
              <UserPlus size={18} className="inline mr-2" />Sign Up
            </button>
            <button onClick={() => setActiveTab('about')} className={`py-2 px-4 ${activeTab === 'about' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700'} rounded-md transition duration-300`}>
              <Info size={18} className="inline mr-2" />About
            </button>
            <button onClick={() => setActiveTab('faq')} className={`py-2 px-4 ${activeTab === 'faq' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700'} rounded-md transition duration-300`}>
              <HelpCircle size={18} className="inline mr-2" />FAQ
            </button>
            <button onClick={() => setActiveTab('donate')} className={`py-2 px-4 ${activeTab === 'donate' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700'} rounded-md transition duration-300`}>
              <Heart size={18} className="inline mr-2" />Donate
            </button>
          </div>
          {activeTab === 'contact' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold mb-4 text-blue-700">Contact Us</h2>
              <p className="text-gray-600">Have questions? We're here to help!</p>
              <div className="flex items-center space-x-2 text-gray-600">
                <Phone size={18} className="text-blue-500" />
                <a href="tel:737-510-1061" className="hover:text-blue-600">737-510-1061</a>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Mail size={18} className="text-blue-500" />
                <a href="mailto:support@mindmates.com" className="hover:text-blue-600">support@mindmates.com</a>
              </div>
            </div>
          )}
          {activeTab === 'signup' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold mb-4 text-blue-700">Create an Account</h2>
              <p className="text-gray-600">Join MindMates and start your learning journey today!</p>
              <button className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition duration-300">
                Sign Up Now
              </button>
            </div>
          )}
          {activeTab === 'about' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold mb-4 text-blue-700">About MindMates</h2>
              <p className="text-gray-600">MindMates is an innovative learning platform designed to support children with autism in their educational journey. Our interactive tools and personalized approach help children aged 2-10 develop essential skills and reach their full potential.</p>
              <ul className="list-disc list-inside text-gray-600">
                <li>Personalized learning experiences</li>
                <li>Interactive and engaging content</li>
                <li>Progress tracking for parents and educators</li>
                <li>Developed by experts in autism education</li>
              </ul>
            </div>
          )}
          {activeTab === 'faq' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold mb-4 text-blue-700">Frequently Asked Questions</h2>
              <div className="space-y-2">
                <h3 className="font-semibold text-blue-600">How does MindMates work?</h3>
                <p className="text-gray-600">MindMates offers personalized learning modules tailored to each child's needs, focusing on key areas such as communication, emotional understanding, and cognitive skills.</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-blue-600">How is data privacy and security addressed?</h3>
                <p className="text-gray-600">MindMates complies with all relevant federal regulations, including COPPA and FERPA. We use state-of-the-art encryption and secure data storage practices to protect your child's information. Our privacy policy details how we collect, use, and safeguard data.</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-blue-600">How often should my child use MindMates?</h3>
                <p className="text-gray-600">We recommend 45-90 minutes of daily engagement for optimal results, but usage can be adjusted based on individual needs and schedules.</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-blue-600">Can I track my child's progress?</h3>
                <p className="text-gray-600">Yes, MindMates provides detailed progress reports and insights for parents and educators to monitor and support each child's learning journey.</p>
              </div>
            </div>
          )}
          {activeTab === 'donate' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold mb-4 text-blue-700">Support Our Mission</h2>
              <p className="text-gray-600">Your donation helps us continue to develop innovative learning tools for children with autism. Every contribution makes a difference!</p>
              <button className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition duration-300 flex items-center justify-center">
                <Heart size={18} className="mr-2" />
                Donate Now
              </button>
              <p className="text-sm text-gray-500 mt-2">MindMates is a 501(c)(3) non-profit organization. All donations are tax-deductible.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;