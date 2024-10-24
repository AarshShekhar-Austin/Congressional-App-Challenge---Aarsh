import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, BarChart2, User, Heart, Brain, MessageSquare, Book, Focus, Gift, Settings, Home, Activity, List, Smile, DollarSign, Star } from 'lucide-react';

const modules = [
  { name: 'Verbal Communication', icon: MessageSquare, color: 'bg-blue-100', textColor: 'text-blue-500', progress: 75 },
  { name: 'Emotional Reading', icon: Heart, color: 'bg-pink-100', textColor: 'text-pink-500', progress: 60 },
  { name: 'Cognitive Practice', icon: Brain, color: 'bg-green-100', textColor: 'text-green-500', progress: 45 },
  { name: 'Language Skills', icon: Book, color: 'bg-yellow-100', textColor: 'text-yellow-500', progress: 80 },
  { name: 'Focus Training', icon: Focus, color: 'bg-purple-100', textColor: 'text-purple-500', progress: 30 },
  { name: 'Electives', icon: Star, color: 'bg-orange-100', textColor: 'text-orange-500', progress: 20 },
];

const Dashboard: React.FC = () => {
  const [mood, setMood] = useState('');
  const [energy, setEnergy] = useState('');

  const weeklyActivity = [
    { day: 'Mo', total: 120, modules: [30, 25, 20, 30, 10, 5] },
    { day: 'Tu', total: 90, modules: [20, 15, 25, 20, 5, 5] },
    { day: 'We', total: 150, modules: [40, 30, 25, 35, 15, 5] },
    { day: 'Th', total: 180, modules: [45, 35, 30, 40, 20, 10] },
    { day: 'Fr', total: 135, modules: [35, 25, 30, 25, 15, 5] },
    { day: 'Sa', total: 60, modules: [15, 10, 15, 10, 5, 5] },
    { day: 'Su', total: 75, modules: [20, 15, 15, 15, 5, 5] },
  ];

  const todaysTasks = [
    { color: 'bg-blue-500', name: 'Verbal Communication Practice', time: '09:00 AM - 10:00 AM' },
    { color: 'bg-green-500', name: 'Cognitive Skills Game', time: '11:00 AM - 12:00 PM' },
    { color: 'bg-yellow-500', name: 'Language Interpretation Exercise', time: '02:00 PM - 03:00 PM' },
    { color: 'bg-pink-500', name: 'Emotional Reading Session', time: '04:00 PM - 05:00 PM' },
    { color: 'bg-purple-500', name: 'Focus Training Exercise', time: '06:00 PM - 06:30 PM' },
  ];

  const upcomingTasks = [
    { date: 'Oct 25', tasks: ['Reading Comprehension', 'Math Quiz'] },
    { date: 'Oct 26', tasks: ['Science Experiment', 'Art Project'] },
    { date: 'Oct 27', tasks: ['Social Skills Workshop', 'Music Therapy'] },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-blue-600 text-white p-6">
        <div className="flex items-center mb-8">
          <img src="https://api.dicebear.com/6.x/avataaars/svg?seed=Aarsh&gender=male" alt="User" className="w-12 h-12 rounded-full mr-3" />
          <div>
            <h2 className="font-bold">Aarsh</h2>
            <p className="text-sm text-blue-200">Student</p>
          </div>
        </div>
        <nav>
          <ul className="space-y-2">
            <li><Link to="#" className="flex items-center py-2 px-4 bg-blue-700 rounded"><Home className="mr-3" size={18} /> Dashboard</Link></li>
            <li><Link to="#" className="flex items-center py-2 px-4 hover:bg-blue-700 rounded"><Activity className="mr-3" size={18} /> Progress</Link></li>
            <li><Link to="#" className="flex items-center py-2 px-4 hover:bg-blue-700 rounded"><List className="mr-3" size={18} /> Tasks</Link></li>
            <li><Link to="#" className="flex items-center py-2 px-4 hover:bg-blue-700 rounded"><Calendar className="mr-3" size={18} /> Schedule</Link></li>
            <li><Link to="#" className="flex items-center py-2 px-4 hover:bg-blue-700 rounded"><DollarSign className="mr-3" size={18} /> Rewards</Link></li>
            <li><Link to="#" className="flex items-center py-2 px-4 hover:bg-blue-700 rounded"><Settings className="mr-3" size={18} /> Settings</Link></li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">Welcome back, Aarsh!</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                <Gift size={18} className="mr-2" />
                <span className="font-semibold">2,450 points</span>
              </div>
              <button className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200">
                <Gift size={24} />
              </button>
              <button className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200">
                <Smile size={24} />
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Daily Check-in */}
          <div className="mb-8 bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Daily Check-in</h2>
            <p className="mb-4">How are you feeling today, Aarsh?</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="mb-2 font-medium">Mood:</p>
                <div className="flex space-x-2">
                  {['😃', '😊', '😐', '😕', '😢'].map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => setMood(emoji)}
                      className={`p-2 rounded-full ${mood === emoji ? 'bg-blue-200 text-blue-800' : 'bg-gray-100 hover:bg-gray-200'}`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 font-medium">Energy Level:</p>
                <div className="flex space-x-2">
                  {['Very Low', 'Low', 'Medium', 'High', 'Very High'].map((level) => (
                    <button
                      key={level}
                      onClick={() => setEnergy(level)}
                      className={`px-3 py-1 rounded-full text-xs ${energy === level ? 'bg-green-200 text-green-800' : 'bg-gray-100 hover:bg-gray-200'}`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {mood && energy && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-blue-800">
                  Thanks for sharing, Aarsh! It looks like you're feeling {mood} with {energy.toLowerCase()} energy today.
                  Remember, every day is a new opportunity to learn and grow!
                </p>
              </div>
            )}
          </div>

          {/* Learning Modules */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Learning Modules</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map((module) => (
                <Link
                  key={module.name}
                  to={`/learn/${module.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`${module.color} p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center`}
                >
                  <module.icon size={48} className={`mb-4 ${module.textColor}`} />
                  <h3 className={`text-xl font-semibold text-center ${module.textColor} mb-2`}>{module.name}</h3>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div 
                      className={`${module.textColor.replace('text', 'bg')} h-2.5 rounded-full`} 
                      style={{ width: `${module.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 mt-2">{module.progress}% Complete</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Statistics */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Your Progress</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-md font-semibold mb-4">Weekly Activity</h3>
                <div className="h-64 flex items-end justify-between">
                  {weeklyActivity.map((day) => (
                    <div key={day.day} className="flex flex-col items-center">
                      <div className="w-10 bg-gray-100 rounded-t-lg overflow-hidden" style={{ height: '200px' }}>
                        {day.modules.map((time, index) => (
                          <div
                            key={index}
                            className={`w-full ${modules[index].textColor.replace('text', 'bg')}`}
                            style={{
                              height: `${(time / day.total) * 200}px`,
                            }}
                          ></div>
                        ))}
                      </div>
                      <span className="text-xs mt-2">{day.day}</span>
                      <span className="text-xs font-semibold">{Math.round(day.total / 60 * 10) / 10}h</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {modules.map((module) => (
                    <div key={module.name} className="flex items-center">
                      <div className={`w-3 h-3 ${module.textColor.replace('text', 'bg')} rounded-full mr-1`}></div>
                      <span className="text-xs">{module.name.split(' ')[0]}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-md font-semibold mb-4">Overall Progress</h3>
                <div className="flex items-center justify-center h-64">
                  <div className="relative w-48 h-48">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle className="text-gray-200 stroke-current" strokeWidth="10" cx="50" cy="50" r="40" fill="transparent"/>
                      <circle className="text-blue-500 progress-ring stroke-current" strokeWidth="10" strokeLinecap="round" cx="50" cy="50" r="40" fill="transparent"
                        style={{
                          strokeDasharray: `${2 * Math.PI * 40}`,
                          strokeDashoffset: `${2 * Math.PI * 40 * (1 - 0.65)}`
                        }}
                      />
                    </svg>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                      <span className="text-3xl font-bold text-gray-700">65%</span>
                      <span className="text-sm text-gray-500 block">Complete</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Schedule and Upcoming Tasks */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Schedule and Tasks</h2>
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-md font-semibold">October 2024</h3>
                <div>
                  <button className="text-gray-600 hover:text-gray-800">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                  </button>
                  <button className="text-gray-600 hover:text-gray-800 ml-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su'].map((day) => (
                  <div key={day} className="text-center text-sm font-medium text-gray-500">{day}</div>
                ))}
                {Array.from({length: 31}, (_, i) => i + 1).map((date) => (
                  <div key={`date-${date}`} className={`text-center py-1 ${date === 24 ? 'bg-blue-100 rounded-full text-blue-600' : ''}`}>{date}</div>
                ))}
              </div>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <h4 className="font-semibold mb-2">Today's Tasks</h4>
                  <ul className="space-y-3">
                    {todaysTasks.map((task, index) => (
                      <li key={index} className="flex items-center">
                        <div className={`w-2 h-2 ${task.color} rounded-full mr-2`}></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{task.name}</p>
                          <p className="text-xs text-gray-500">{task.time}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-2">Upcoming Tasks</h4>
                  {upcomingTasks.map((day, index) => (
                    <div key={index} className="mb-4 last:mb-0">
                      <h5 className="text-sm font-semibold text-blue-600 mb-2">{day.date}</h5>
                      <ul className="space-y-2">
                        {day.tasks.map((task, taskIndex) => (
                          <li key={taskIndex} className="flex items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                            <span className="text-sm">{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;